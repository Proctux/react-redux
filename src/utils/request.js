const DEFAULT_AUTHORIZATION_KEYWORD = 'Token '
const DEFAULT_AUTHORIZATION_HEADER = 'Authorization'

const ensureTrailingAndLeadingSlash = url => `/${url}/`.replace(/\/\//g, '/')
export const parseURL = url => {
  if (Array.isArray(url)) {
    return ensureTrailingAndLeadingSlash(url.join('/'))
  }
  return ensureTrailingAndLeadingSlash(url)
}

export const parseConfig = ({ key, ...config } = {}) => {
  const newConfig = { headers: {}, ...config }
  if (key) {
    newConfig.headers[DEFAULT_AUTHORIZATION_HEADER] = `${DEFAULT_AUTHORIZATION_KEYWORD}${key}`
  }
  return newConfig
}
