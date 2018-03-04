import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { renderRoutes } from 'react-router-config'
import createHistory from 'history/createBrowserHistory'

import './bootstrap'
import configureStore from './store/configure-store'
import routes from './routes'

const root = () => {
  const history = createHistory()
  // eslint-disable-next-line no-underscore-dangle
  const store = configureStore(history, window.__INITIAL_STATE__ || {})
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>{renderRoutes(routes)}</ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  )
}

root()
