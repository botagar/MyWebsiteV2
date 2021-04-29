import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import SimplexNoise from "simplex-noise"
import styled from "styled-components"
import { useWindowSize } from "./useWindowSize";

const HightMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [zHeight, setZHeight] = useState<number>(0)
  const animationRef = useRef<number>(0);
  const windowSize = useWindowSize()
  let z = 0

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

  useLayoutEffect(() => {
    if (!!!context) return;

    const {width, height} = windowSize
    const heightmap = new Array(width*height).fill(0)
    for (let i=0; i < height; i++) {
      for (let j=0; j < width; j++) {
        heightmap[i*width + j] = (simplex.noise3D(i/zoomLevel, j/zoomLevel, zHeight) + 0.5) * 255
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
    context.putImageData(imgData,0,0);
  },[context, windowSize])

  useEffect(() =>{
    if (!!!context) return

    animationRef.current = requestAnimationFrame(riseUpZLevel);
    return () => cancelAnimationFrame(animationRef.current);
  }, [context])
  
  const riseUpZLevel = () => {
    setZHeight(prevZHeight => prevZHeight + 0.01);
    z+= 0.01;
    const {width, height} = windowSize
    const heightmap = new Array(width*height).fill(0)
    for (let i=0; i < height; i++) {
      for (let j=0; j < width; j++) {
        heightmap[i*width + j] = (simplex.noise3D(i/zoomLevel, j/zoomLevel, z) + 0.5) * 255
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
    context.putImageData(imgData,0,0);
    requestAnimationFrame(riseUpZLevel);
  }

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