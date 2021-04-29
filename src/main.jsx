import React from 'react'
import { render } from 'react-dom'

import App from './App'
import { NormaliseStyles } from './styling/hocs/NormaliseStyles';

const renderApp = () => {
  render((
    <NormaliseStyles>
      <App />
    </NormaliseStyles>
  ), document.getElementById('app'))
}

renderApp()