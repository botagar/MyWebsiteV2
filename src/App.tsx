import React, { FC } from 'react';
import styled from 'styled-components';

// Let's do something like this temporarily https://www.coding-dude.com/wp/web-design/create-dynamic-backgrounds-website-using-html5-canvas/
const App: FC = () => (
  <Container>
    <h1>Hello World</h1>
  </Container>
);

export default App;

const Container = styled.div`
  text-align: center;
`;
