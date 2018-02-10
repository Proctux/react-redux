import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import './bootstrap'
import setupApp from './setupApp'
import Routes from './routes'
import registerServiceWorker from './registerServiceWorker'

const root = () =>
  setupApp().then(({ store, history }) => {
    render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>,
      document.getElementById('root')
    )
    registerServiceWorker()
  })

root()
