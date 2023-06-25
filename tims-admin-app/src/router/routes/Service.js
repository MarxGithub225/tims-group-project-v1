import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const AppRoutes = [
  {
    path: '/service/products',
    component: lazy(() => import('../../views/services/products')),
    exact: true,
  },
  {
    path: '/service/products/edit/:id',
    component: lazy(() => import('../../views/services/products/add'))
  },
  {
    path: '/service/products/all',
    component: lazy(() => import('../../views/services/all-products'))
  },
  {
    path: '/service/blogs',
    component: lazy(() => import('../../views/services/blogs')),
    exact: true,
  },
  {
    path: '/service/blogs/new',
    component: lazy(() => import('../../views/services/blogs/add'))
  },
  {
    path: '/service/blogs/edit/:id',
    component: lazy(() => import('../../views/services/blogs/add'))
  },
  // {
  //   path: '/service/all-orders',
  //   component: lazy(() => import('../../views/services/all-orders')),
  //   exact: true,
  // },
  // {
  //   path: '/service/all-orders/:id',
  //   component: lazy(() => import('../../views/services/all-orders/preview')),
  //   exact: true,
  // },
  // {
  //   path: '/service/orders',
  //   component: lazy(() => import('../../views/services/orders')),
  //   exact: true,
  // },
  // {
  //   path: '/service/orders/:id',
  //   component: lazy(() => import('../../views/services/orders/preview')),
  //   exact: true,
  // },
  // {
  //   path: '/service/new-orders',
  //   component: lazy(() => import('../../views/services/new-orders')),
  //   exact: true,
  // },
  // {
  //   path: '/service/new-orders/:id',
  //   component: lazy(() => import('../../views/services/new-orders/preview')),
  //   exact: true,
  // },
  // {
  //   path: '/service/sav',
  //   component: lazy(() => import('../../views/services/sav')),
  //   exact: true,
  // },
  // {
  //   path: '/service/sav/edit/:id',
  //   component: lazy(() => import('../../views/services/sav/add')),
  //   exact: true,
  // },
  // {
  //   path: '/service/sav/new',
  //   component: lazy(() => import('../../views/services/sav/add')),
  //   exact: true,
  // },
  
]

export default AppRoutes
