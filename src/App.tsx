import React, { FC } from 'react';
import styled from 'styled-components';
import SlimsimSketch from './slime-sim/sketch';

// Let's do something like this temporarily https://www.coding-dude.com/wp/web-design/create-dynamic-backgrounds-website-using-html5-canvas/
const App: FC = () => (
  <Container>
    <SlimsimSketch/>
  </Container>
);

export default App;

const Container = styled.div`
  text-align: center;
`;
