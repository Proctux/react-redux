import createHistory from 'history/createBrowserHistory'

import configureStore from './store/configure-store'

const setupApp = () =>
  new Promise(resolve => {
    const history = createHistory()
    const store = configureStore(history)
    resolve({ store, history })
  })

export default setupApp
