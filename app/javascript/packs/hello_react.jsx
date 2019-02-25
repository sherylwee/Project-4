import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import App from '../components/app'
// import Newitems from '../components/newitems'
import { BrowserRouter } from "react-router-dom";

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <div>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    </div>,
    document.body.appendChild(document.createElement('div')),
  )
})