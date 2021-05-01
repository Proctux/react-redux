import { validateEmail, validatePassword } from '_utils/helpers'

export const validate = (email, password) => {
  const errors = {}

  if (!validateEmail(email)) {
    errors.email = 'Email format is invalid'
  }

  if (!validatePassword(password)) {
    errors.password = 'Password length should be at least 8 characters'
  }

  return errors
}
