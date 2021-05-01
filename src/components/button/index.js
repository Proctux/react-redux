import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './styles.css'

const ButtonTheme = {
  DEFAULT: 'default',
  SECONDARY: 'secondary',
}

const Button = ({ icon, children, onClick, type, disabled, theme, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={classnames(styles['button-content'], styles[theme], className)}
    >
      {icon && <img src={icon} className={styles['button-icon']} alt="Icon" />}
      {children}
    </button>
  )
}

Button.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.shape({
      viewBox: PropTypes.string,
      id: PropTypes.string,
    }),
    PropTypes.string,
  ]),
  children: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  theme: PropTypes.oneOf(Object.values(ButtonTheme)),
  className: PropTypes.string,
}

Button.defaultProps = {
  onClick: () => {},
  icon: '',
  children: '',
  disabled: false,
  type: 'button',
  theme: ButtonTheme.DEFAULT,
  className: '',
}

export default Button
