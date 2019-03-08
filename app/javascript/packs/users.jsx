import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Profile from '../components/users/profile'
import { BrowserRouter } from "react-router-dom";

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <div>
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    </div>,
    document.body.appendChild(document.createElement('div')),
  )
})