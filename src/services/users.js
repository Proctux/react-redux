import { get } from './requests'

export const getUser = key => get(['users'], { key, transformPayload: true })
