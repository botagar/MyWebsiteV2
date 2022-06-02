import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import { NormaliseStyles } from './styling/hocs/NormaliseStyles'

const renderApp = () => {
  const root = createRoot(document.getElementById('app'))
  root.render(
  <NormaliseStyles>
    <App />
  </NormaliseStyles>)
}

renderApp()