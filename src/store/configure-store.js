import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import rootReducer from '_modules/reducers'

const DEFAULT_STATE = {}

const configureStore = (preloadedState = DEFAULT_STATE) =>
  createStore(rootReducer, preloadedState, applyMiddleware(thunk, promise()))

export default configureStore
