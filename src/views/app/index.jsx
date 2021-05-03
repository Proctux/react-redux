import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from '@reach/router'
import { useSelector } from 'react-redux'

import { tokenSelector } from '_/modules/authentication/selectors'

const App = ({ children }) => {
  const accessToken = useSelector(tokenSelector)

  if (!accessToken) {
    return <Redirect to="/login" />
  }

  return <div>{children}</div>
}

App.propTypes = {
  children: PropTypes.node.isRequired,
}

export default React.memo(App)
