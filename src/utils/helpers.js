import humps from 'humps'

export const createFormData = (data, shouldDecamelize = false) => {
  const formData = new FormData()

  Object.keys(data).forEach(field => {
    const fieldValue = data[field]
    const formDataValue = (() => {
      if (!fieldValue) {
        return ''
      }

      if (fieldValue instanceof Blob || typeof fieldValue !== 'object') {
        return fieldValue
      }

      return JSON.stringify(fieldValue)
    })()

    formData.append(shouldDecamelize ? humps.decamelize(field) : field, formDataValue)
  })

  return formData
}

export const validateEmail = email => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email.toLowerCase())
}

export const validatePassword = password => password.length > 8
