import cookies from 'react-cookies'
import humps from 'humps'

import { createReducer } from '_utils/redux'
import { Authentication } from '_models'

import { LOGIN, LOGOUT } from './actions'

const INITIAL_STATE = new Authentication()

const saveAccessToken = payload => {
  const { accessToken } = humps.camelizeKeys(payload)
  cookies.save('accessToken', accessToken, { path: '/', maxAge: 60 * 60 * 24 * 6 })
  return new Authentication({
    accessToken,
  })
}

const authentication = createReducer(INITIAL_STATE, {
  [LOGIN.FULFILLED]: (state, { payload }) => saveAccessToken({ accessToken: payload.accessToken }),
  [LOGOUT]: (state, { payload }) => saveAccessToken({ accessToken: '' }),
})

export default authentication
