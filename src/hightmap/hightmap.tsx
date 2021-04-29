import React, { useEffect, useRef, useState } from "react"
import SimplexNoise from "simplex-noise"
import styled from "styled-components"
import { useWindowSize } from "./useWindowSize";

const HightMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null);
  const windowSize = useWindowSize()

  var simplex = new SimplexNoise('SeedVal') // TODO: Set this up in a useMemo
  const zoomLevel = 200

  useEffect(() => {
    if (canvasRef.current) {
      const renderContext = canvasRef.current.getContext('2d');

      if (renderContext) {
        setContext(renderContext);
      }
    }
  }, [canvasRef]);

  useEffect(() => {
    if (!!!context) return;
    
    const {width, height} = windowSize
    const heightmap = new Array(width*height).fill(0)
    for (let i=0; i < width; i++) {
      for (let j=0; j < height; j++) {
        heightmap[i*width + j] = simplex.noise2D(i/zoomLevel, j/zoomLevel) * 255
      }
    }

    const imgData = context.getImageData(0, 0, width, height);
    const data = imgData.data;
    
    let hmIndex = 0;
    for(let i = 0; i < data.length; i += 4) {
      const val = heightmap[hmIndex++]
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
      data[i + 3] = 255;
    }
    console.log('dbg', data.length/4, width,height,width*height,windowSize.width,windowSize.height, heightmap.length, data.length)
    context.putImageData(imgData,0,0);

  },[context, windowSize])

  return (
    <Canvas width={windowSize.width} height={windowSize.height} id="hightmap-canvas" ref={canvasRef} />
  )
}

export { HightMap }

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  `