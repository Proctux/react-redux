import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import cookies from 'react-cookies'

import './bootstrap'
import configureStore from './store/configure-store'
import Router from './router'
import { Authentication, User } from './models'

const root = () => {
  const user = cookies.load('user', { path: '/' })
  const accessToken = cookies.load('accessToken', { path: '/' })

  const initialState = {
    user: user ? new User({ ...JSON.parse(user) }) : new User(),
    authentication: accessToken ? new Authentication({ accessToken }) : new Authentication(),
  }

  const store = configureStore(initialState)

  render(
    <Provider store={store}>
      <Router />
    </Provider>,
    document.getElementById('root')
  )
}

root()
