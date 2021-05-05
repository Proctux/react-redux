import React from 'react'
import { Router as ReachRouter } from '@reach/router'

import App from '_views/app'
import NotFoundPage from '_views/not-found'
import Login from '_views/login'
import Dashboard from '_views/dasboard'

const Router = () => (
  <ReachRouter>
    <Login path="/login" />
    <App path="/">
      <Dashboard path="/dashboard" />
    </App>
    <NotFoundPage default />
  </ReachRouter>
)

export default Router
