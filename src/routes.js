import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router'

import App from '_views/app'
import NotFoundPage from '_views/not-found'

const ConnectedSwitch = connect(state => ({
  location: state.location,
}))(Switch)

const Routes = () => (
  <ConnectedSwitch>
    <Route exact path="/" component={App} />
    <Route component={NotFoundPage} />
  </ConnectedSwitch>
)

export default Routes
