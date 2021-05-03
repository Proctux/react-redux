import React from 'react'
import PropTypes from 'prop-types'

import JungleIcon from '_assets/icons/jungle-devs-logo.svg'
import Button from '_components/button'

import styles from './styles.css'

const Header = ({ onSignOutClick }) => {
  return (
    <header className={styles['header-container']}>
      <svg className={styles['header-logo']} viewBox={JungleIcon.viewBox}>
        <use xlinkHref={`#${JungleIcon.id}`} />
      </svg>

      <Button onClick={onSignOutClick} className={styles['logout-button']}>
        Sign Out
      </Button>
    </header>
  )
}

Header.propTypes = {
  onSignOutClick: PropTypes.func,
}

Header.defaultProps = {
  onSignOutClick: () => {},
}

export default Header
