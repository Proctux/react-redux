import React from 'react'
import classnames from 'classnames'

import Header from '_components/header'
import ChangeNameBox from '_/components/change-name-box'
import { LOGGED_AS, USER_ID } from '_/utils/dashboard'

import styles from './styles.css'

const Dashboard = () => {
  return (
    <div className={styles['dashboard-container']}>
      <Header />

      <main className={styles['dashboard-content']}>
        <h1 className={classnames(styles['title-bold-information'], styles['logged-as'])}>
          {LOGGED_AS}
        </h1>

        <div className={styles['avatar-container']} />
      </main>

      <h2 className={classnames(styles['title-bold-information'], styles['user-name'])}>
        John Smith
      </h2>
      <p className={classnames(styles['user-email'], styles.user)}>john.doe@gmail.com</p>
      <p className={classnames(styles['user-id'], styles.user)}>{`${USER_ID}: 57`}</p>

      <ChangeNameBox titleClass={styles['title-bold-information']} />
    </div>
  )
}

export default Dashboard
