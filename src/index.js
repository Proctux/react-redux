import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import './bootstrap'
import configureStore from './store/configure-store'
import Router from './router'

const root = () => {
  const initialState = {}
  // eslint-disable-next-line no-underscore-dangle
  const store = configureStore(window.__INITIAL_STATE__ || initialState)
  render(
    <Provider store={store}>
      <Router />
    </Provider>,
    document.getElementById('root')
  )
}

root()
