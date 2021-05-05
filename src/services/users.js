import { get, patch } from './requests'

export const getUser = key => get(['users'], { key, transformPayload: true })

export const updateUser = (key, payload, id) =>
  patch(['users', id], { key, transformPayload: true }, payload)
