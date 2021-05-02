import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import SimplexNoise from 'simplex-noise';
import styled from 'styled-components';
import { useWindowSize } from '../common/hooks/useWindowSize';

const HightMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [simplex] = useState<SimplexNoise>(new SimplexNoise('SeedVal'));
  const animationRef = useRef<number>(0);
  const windowSize = useWindowSize();
  const heightmap = new Array(1000 * 1000).fill(0);
  let zh = 0;

  const zoomLevel = 200;

  useEffect(() => {
    if (canvasRef.current) {
      const renderContext = canvasRef.current.getContext('2d');

      if (renderContext) {
        setContext(renderContext);
      }
    }
  }, [canvasRef]);

  useLayoutEffect(() => {
    if (!context) return;

    drawHeightMap(zh);
  }, [context, windowSize]);

  useEffect(() => {
    if (!context) return;

    animationRef.current = requestAnimationFrame(riseUpZLevelAndDraw);
    return () => cancelAnimationFrame(animationRef.current);
  }, [context]);

  const getHeightValue = (x: number, y: number, z: number, scalingFn: (unscaled: number) => number): number => {
    return scalingFn((simplex.noise3D(x, y, z) + 0.5) * 255);
  };

  const drawHeightMap = (zLevel = 0) => {
    const { width, height } = windowSize;
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        heightmap[i * width + j] = getHeightValue(i / zoomLevel, j / zoomLevel, zLevel, (n) => n);
      }
    }

    const imgData = context.getImageData(0, 0, width, height);
    const data = imgData.data;

    let hmIndex = 0;
    for (let i = 0; i < data.length; i += 4) {
      const val = heightmap[hmIndex++];
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
      data[i + 3] = 255;
    }
    context.putImageData(imgData, 0, 0);
  };

  const riseUpZLevelAndDraw = () => {
    zh += 0.01;
    drawHeightMap(zh);
    requestAnimationFrame(riseUpZLevelAndDraw);
  };

  return <Canvas width={windowSize.width} height={windowSize.height} id='hightmap-canvas' ref={canvasRef} />;
};

export { HightMap };

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
`;
