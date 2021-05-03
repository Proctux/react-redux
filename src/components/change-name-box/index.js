import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { CHANGE_NAME } from '_/utils/dashboard'

import Button, { ButtonTheme } from '../button'
import Input from '../input'

import styles from './styles.css'

const ChangeNameBox = ({ titleClass }) => {
  return (
    <div className={styles['change-name-box-container']}>
      <h1 className={classnames(styles['change-name-title'], titleClass)}>{CHANGE_NAME}</h1>

      <form className={styles['change-form']}>
        <Input
          label="Name"
          hiddenLabel
          id="change-name"
          className={styles['change-input']}
          placeholder="Type your new name here…"
        />
        <Button className={styles['change-button']} type="submit" theme={ButtonTheme.DEFAULT}>
          Change Name
        </Button>
      </form>
    </div>
  )
}

ChangeNameBox.propTypes = {
  titleClass: PropTypes.string,
}

ChangeNameBox.defaultProps = {
  titleClass: '',
}

export default ChangeNameBox
