import React from 'react'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader/root'

const App = () => (
  <div><p>Hello World</p></div>
)

render(React.createElement(hot(App)), document.getElementById('app'))
