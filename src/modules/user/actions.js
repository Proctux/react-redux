import * as userService from '_services/users'
import { defineAction } from '_utils/redux'
import { tokenSelector } from '_modules/authentication/selectors'

export const GET_USER = defineAction('GET_USER')

export const getUser = () => (dispatch, getState) => {
  return dispatch({
    type: GET_USER,
    payload: userService.getUser(tokenSelector(getState())),
  })
}
