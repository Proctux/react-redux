import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
// <material>
import { ThemeProvider } from '@material-ui/styles'
// </material>
import './bootstrap'

// <material>
import { theme } from '_utils/material-ui'
// </material>

import configureStore from './store/configure-store'
import Router from './router'

const root = () => {
  const initialState = {}
  const store = configureStore(initialState)

  // <material>
  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </Provider>,
    document.getElementById('root')
  )
  // </material>

  // <no-material>
  render(
    <Provider store={store}>
      <Router />
    </Provider>,
    document.getElementById('root')
  )
  // </no-material>
}

root()
