import React from 'react'
import { Redirect } from '@reach/router'
import { useSelector } from 'react-redux'

import { getUserSelector } from '_modules/user/selectors'

const App = () => {
  const user = useSelector(getUserSelector)

  if (!user?.accessToken) {
    return <Redirect to="/login" />
  }

  return <div />
}

export default React.memo(App)
