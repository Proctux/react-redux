import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { navigate } from '@reach/router'

import { login } from '_modules/authentication/actions'
import jungleLogo from '_assets/images/jungle.png'
import Button from '_components/button'
import Input from '_components/input'
import { tokenSelector } from '_modules/authentication/selectors'
import { getUser } from '_modules/user/actions'

import styles from './styles.css'
import { validate } from './validation'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const accessToken = useSelector(tokenSelector)

  const dispatch = useDispatch()

  const onInputChange = useCallback((event, state) => {
    const { value } = event.target

    state(value)
  }, [])

  const onSubmit = useCallback(
    async event => {
      event.preventDefault()

      if (email && password) {
        dispatch(login({ email, password }))
      } else {
        let credentialErrors = {}

        credentialErrors = validate(email, password)

        setErrors(credentialErrors)
      }
    },
    [dispatch, email, password]
  )

  useEffect(() => {
    if (accessToken) {
      dispatch(getUser())
      navigate('/dashboard')
    }
  }, [accessToken, dispatch])

  return (
    <div className={styles.login}>
      <div className={styles['login-card']}>
        <img className={styles['login-icon']} src={jungleLogo} alt="Jungle logo" />

        <form className={styles['form-container']} onSubmit={onSubmit}>
          <Input
            id="email-input"
            label="email"
            hiddenLabel
            value={email}
            onChange={event => onInputChange(event, setEmail)}
            placeholder="Email"
            type="email"
            name="email"
            error={errors.email}
          />
          <Input
            id="password-input"
            label="password"
            hiddenLabel
            value={password}
            onChange={event => onInputChange(event, setPassword)}
            placeholder="Password"
            type="password"
            name="password"
            error={errors.password}
          />

          <Button type="submit" className={styles['button-container']}>
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
