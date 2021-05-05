import { Map } from 'immutable'

import { LOGIN } from './actions'

export const tokenSelector = state => state.authentication.accessToken

export const keySelector = state => state.authentication.key

export const loginErrorSelector = state => state.error.get(LOGIN.ACTION, Map())
