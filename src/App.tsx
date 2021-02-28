import React, { FC, Fragment } from 'react';
import styled from 'styled-components'

const App: FC = () => (
  <Container>
    <h1>Hello World</h1>
  </Container>
);

export default App;


const Container = styled.div`
  text-align: center;
`