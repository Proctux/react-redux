import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { renderRoutes } from 'react-router-config'

import './bootstrap'
import setupApp from './setupApp'
import routes from './routes'

const root = () =>
  setupApp().then(({ store, history }) => {
    render(
      <Provider store={store}>
        <ConnectedRouter history={history}>{renderRoutes(routes)}</ConnectedRouter>
      </Provider>,
      document.getElementById('root')
    )
  })

root()
