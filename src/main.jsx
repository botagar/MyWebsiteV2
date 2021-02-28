import React from 'react'
import { render } from 'react-dom'

import App from './App'
import ResetCSS from './RestCSS';

const renderApp = () => {
  render((
    <>
      <ResetCSS />
      <App />
    </>
  ), document.getElementById('app'))
}

renderApp()