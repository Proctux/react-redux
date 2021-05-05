import * as authenticationService from '_services/authentication'
import { defineAction } from '_utils/redux'

export const LOGIN = defineAction('LOGIN')
export const LOGOUT = defineAction('LOGOUT')

export const login = payload => ({
  type: LOGIN.ACTION,
  payload: authenticationService.login(payload),
})

export const logout = payload => ({
  type: LOGOUT.ACTION,
})
