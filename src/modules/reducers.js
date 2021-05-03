import { combineReducers } from 'redux'

import authentication from './authentication/reducer'
import user from './user/reducer'
import error from './error/reducer'
import loading from './loading/reducer'

const rootReducer = combineReducers({
  error,
  loading,
  user,
  authentication,
})

export default rootReducer
