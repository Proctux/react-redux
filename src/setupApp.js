import configureStore from './store/configure-store'

const setupApp = () =>
  new Promise(resolve => {
    const store = configureStore()
    resolve({ store })
  })

export default setupApp
