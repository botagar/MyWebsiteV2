import React from 'react'
import { render } from 'react-dom'

import App from './App'

const renderApp = () => {
  render((<App />), document.getElementById('app'))
}

console.log('Before Render')
renderApp()