import * as authenticationService from '_services/authentication'
import { defineAction } from '_utils/redux'

export const LOGIN = defineAction('LOGIN')

export const login = payload => ({
  type: LOGIN.ACTION,
  payload: authenticationService.login(payload),
})
