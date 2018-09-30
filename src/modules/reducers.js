import { combineReducers } from 'redux'

import car from './car/reducer'

const rootReducer = combineReducers({
  car,
})

export default rootReducer
