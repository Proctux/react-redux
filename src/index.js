import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from '_views/app'

import './bootstrap'
import setupApp from './setupApp'
import registerServiceWorker from './registerServiceWorker'

const root = () =>
  setupApp().then(({ store }) => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    )
    registerServiceWorker()
  })

root()
