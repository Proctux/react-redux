import React from 'react'

import logo from './logo.svg'
import styles from './App.css'

const App = () => (
  <div className={styles.App}>
    <header className={styles['App-header']}>
      <svg className={styles['App-logo']}>
        <use xlinkHref={logo} />
      </svg>
      <h1 className={styles['App-title']}>Welcome to React</h1>
    </header>
    <p className={styles['App-intro']}>
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
  </div>
)

export default App
