import * as userService from '_services/users'
import { defineAction } from '_utils/redux'
import { tokenSelector } from '_modules/authentication/selectors'

export const GET_USER = defineAction('GET_USER')
export const UPDATE_USER = defineAction('UPDATE_USER')

export const getUser = () => (dispatch, getState) => {
  return dispatch({
    type: GET_USER,
    payload: userService.getUser(tokenSelector(getState())),
  })
}

export const updateUser = (payload, id) => (dispatch, getState) =>
  dispatch({
    type: UPDATE_USER,
    payload: userService.updateUser(tokenSelector(getState()), payload, id),
  })
