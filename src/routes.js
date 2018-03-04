import App from '_views/app'
import NotFoundPage from '_views/not-found'

const routes = [
  {
    component: App,
    path: '/',
    exact: true,
  },
  {
    component: NotFoundPage,
    path: '*',
  },
]

export default routes
