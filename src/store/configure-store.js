import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { routerMiddleware } from 'react-router-redux'

import rootReducer from '_modules/reducers'

const DEFAULT_STATE = {}

const configureStore = (history, preloadedState = DEFAULT_STATE) =>
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, promise(), routerMiddleware(history))
  )

export default configureStore
