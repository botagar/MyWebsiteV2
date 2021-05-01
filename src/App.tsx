import React, { FC } from 'react';
import styled from 'styled-components';
import { HightMap } from './hightmap';

const App: FC = () => (
  <Container>
    <HightMap />
    <h1>Hello World</h1>
  </Container>
);

export default App;

const Container = styled.div`
  text-align: center;
`;
