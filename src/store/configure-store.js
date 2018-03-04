import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { routerMiddleware } from 'react-router-redux'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension' // eslint-disable-line import/no-extraneous-dependencies

import rootReducer from '_modules/reducers'

const DEFAULT_STATE = {}

const configureStore = (history, preloadedState = DEFAULT_STATE) => {
  const middlewares = [thunk, promise(), routerMiddleware(history)]
  if (process.env.NODE_ENV === 'development') {
    return createStore(
      rootReducer,
      preloadedState,
      composeWithDevTools(applyMiddleware(...middlewares, logger))
    )
  }
  return createStore(rootReducer, preloadedState, applyMiddleware(...middlewares))
}

export default configureStore
