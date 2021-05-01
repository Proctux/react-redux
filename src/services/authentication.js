import { post } from './requests'

export const login = payload => post(['login'], {}, payload)
