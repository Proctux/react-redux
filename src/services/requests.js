import axios from 'axios'

import { parseURL, parseConfig } from '_utils/request'
import { API_URL } from '_config/environment'

const instance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
})

const returnData = response => response.data
const handleResponseError = error => new Promise((resolve, reject) => reject(error.response.data))

const parseParams = (url, config, data) => fn => {
  const { removeTrailingSlash, ...configParams } = config
  if (fn === instance.delete || fn === instance.get) {
    return fn(parseURL(url, removeTrailingSlash), parseConfig(configParams))
      .then(returnData)
      .catch(handleResponseError)
  }
  return fn(parseURL(url, removeTrailingSlash), data, parseConfig(configParams))
    .then(returnData)
    .catch(handleResponseError)
}

export const post = (...params) => parseParams(...params)(instance.post)
export const patch = (...params) => parseParams(...params)(instance.patch)
export const put = (...params) => parseParams(...params)(instance.put)
export const upload = (...params) => parseParams(...params)(instance.post)
export const del = (...params) => parseParams(...params)(instance.delete)
export const get = (...params) => parseParams(...params)(instance.get)

instance.getURL = url => API_URL + parseURL(url)

export default instance
