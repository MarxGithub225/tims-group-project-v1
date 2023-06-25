import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const AppRoutes = [
  {
    path: '/manage/users/collaborators',
    component: lazy(() => import('../../views/manage/user/collaborators'))
  },
  {
    path: '/manage/brands',
    component: lazy(() => import('../../views/manage/brands'))
  },
  {
    path: '/manage/users/clients',
    component: lazy(() => import('../../views/manage/user/clients'))
  },
  {
    path: '/manage/users/providers',
    component: lazy(() => import('../../views/manage/user/providers')),
    exact: true,
  },
  {
    path: '/manage/users/providers/:id',
    component: lazy(() => import('../../views/manage/user/providers/profile')),
    exact: true,
  },
  
  {
    path: '/manage/show-rooms',
    component: lazy(() => import('../../views/manage/show-rooms')),
    exact: true,
  },
  {
    path: '/manage/show-rooms/stock-verification/:id',
    component: lazy(() => import('../../views/manage/show-rooms/stock-verification'))
  },
  {
    path: '/manage/categories',
    exact: true,
    component: lazy(() => import('../../views/manage/categories'))
  },
  {
    path: '/manage/categories/:id',
    exact: true,
    component: lazy(() => import('../../views/manage/subcategories')),
    meta: {
      navLink: '/manage/categories'
    }
  },
  {
    path: '/manage/banners',
    exact: true,
    component: lazy(() => import('../../views/manage/banners'))
  },
  {
    path: '/manage/user/view/:id',
    component: lazy(() => import('../../views/manage/user/view')),
    meta: {
      navLink: '/manage/user/view'
    }
  }
]

export default AppRoutes
