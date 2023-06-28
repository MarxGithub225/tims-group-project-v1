import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const AppRoutes = [
  {
    path: '/service/products',
    component: lazy(() => import('../../views/services/products')),
    exact: true,
  },
  {
    path: '/service/products-archived',
    component: lazy(() => import('../../views/services/products-archived')),
    exact: true,
  },
  {
    path: '/service/products/new',
    component: lazy(() => import('../../views/services/products/add'))
  },
  {
    path: '/service/products/edit/:id',
    component: lazy(() => import('../../views/services/products/add'))
  },
]

export default AppRoutes
