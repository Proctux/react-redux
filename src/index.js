import React from 'react'
import { render } from 'react-dom'

import App from '_views/app'

import './bootstrap'
import registerServiceWorker from './registerServiceWorker'

render(<App />, document.getElementById('root'))
registerServiceWorker()
