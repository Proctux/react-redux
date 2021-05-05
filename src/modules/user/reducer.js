import cookies from 'react-cookies'
import humps from 'humps'

import { User } from '_models/'
import { createReducer } from '_utils/redux'

import { LOGIN } from '../authentication/actions'

import { GET_USER, UPDATE_USER } from './actions'

const INITIAL_STATE = new User()

const saveUserData = payload => {
  const { ...data } = humps.camelizeKeys(payload)
  cookies.save('user', data, { path: '/', maxAge: 60 * 60 * 24 * 6 })
  return new User({
    ...data,
  })
}

const user = createReducer(INITIAL_STATE, {
  [LOGIN.FULFILLED]: (state, { payload }) =>
    saveUserData({ ...payload.user, accessToken: payload.key }),
  [GET_USER.FULFILLED]: (state, { payload }) => saveUserData({ ...payload[0] }),
  [UPDATE_USER.FULFILLED]: (state, { payload }) => saveUserData({ ...payload }),
})
export default user
