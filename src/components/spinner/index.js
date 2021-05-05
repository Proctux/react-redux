import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './styles.css'

export const SpinnerTheme = {
  MEDIUM: 'medium',
  X_LARGE: 'x-large',
}

const Spinner = ({ size, color, className }) => {
  const spinnerColor = useMemo(
    () => ({
      borderLeftColor: color,
    }),
    [color]
  )

  return <div style={spinnerColor} className={classnames(styles.loader, styles[size], className)} />
}

Spinner.propTypes = {
  size: PropTypes.oneOf(Object.values(SpinnerTheme)),
  color: PropTypes.string,
  className: PropTypes.string,
}

Spinner.defaultProps = {
  size: SpinnerTheme.MEDIUM,
  color: 'white',
  className: '',
}

export default Spinner
