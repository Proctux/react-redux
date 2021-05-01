import cookies from 'react-cookies'
import humps from 'humps'

import { User } from '_models/'
import { createReducer } from '_utils/redux'

import { LOGIN } from '../authentication/actions'

import { GET_USER } from './actions'

const INITIAL_STATE = new User()

const saveUserData = payload => {
  const { accessToken, ...data } = humps.camelizeKeys(payload)
  cookies.save('accessToken', accessToken, { path: '/', maxAge: 60 * 60 * 24 * 6 })
  // 60 * 60 * 24 * 6 expires in the next 6 days
  cookies.save('user', data, { path: '/', maxAge: 60 * 60 * 24 * 6 })
  return new User({
    ...data,
    accessToken,
  })
}

const user = createReducer(INITIAL_STATE, {
  [LOGIN.FULFILLED]: (state, { payload }) =>
    saveUserData({ ...payload.user, accessToken: payload.key }),
  [GET_USER.FULFILLED]: (state, { payload }) => saveUserData({ ...payload[0] }),
})
export default user
