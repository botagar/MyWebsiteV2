import p5 from 'p5'
import React, { FC, useRef } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

import { sketch } from './slimeSim'

const Container = styled.div``;

const SlimsimSketch: FC = () => {
    const sketchContainerRef = useRef();

    useEffect(() => {
        if (sketchContainerRef.current) {
            new p5(sketch, sketchContainerRef.current);
        }
    }, [sketchContainerRef.current])

    
    return (
        <Container ref={sketchContainerRef}/>
    );
}

export default SlimsimSketch;
