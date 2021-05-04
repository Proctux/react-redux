import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import JungleIcon from '_assets/icons/jungle-devs-logo.svg'
import Button from '_components/button'
import { logout } from '_/modules/authentication/actions'

import styles from './styles.css'

const Header = () => {
  const dispatch = useDispatch()

  const handleLogout = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  return (
    <header className={styles['header-container']}>
      <svg className={styles['header-logo']} viewBox={JungleIcon.viewBox}>
        <use xlinkHref={`#${JungleIcon.id}`} />
      </svg>

      <Button onClick={handleLogout} className={styles['logout-button']}>
        Sign Out
      </Button>
    </header>
  )
}
export default Header
