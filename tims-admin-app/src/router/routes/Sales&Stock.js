import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const AppRoutes = [
  {
    path: '/sale/quotations',
    component: lazy(() => import('../../views/sales-and-stocks/quotations')),
    exact: true,
  },
  {
    path: '/sale/quotations/new',
    component: lazy(() => import('../../views/sales-and-stocks/quotations/add'))
  },
  {
    path: '/sale/quotations/edit/:id',
    component: lazy(() => import('../../views/sales-and-stocks/quotations/add'))
  },
  {
    path: '/sale/purchase-orders',
    component: lazy(() => import('../../views/sales-and-stocks/purchase-orders')),
    exact: true,
  },
  {
    path: '/sale/purchase-orders/new',
    component: lazy(() => import('../../views/sales-and-stocks/purchase-orders/add'))
  },
  {
    path: '/sale/purchase-orders/edit/:id',
    component: lazy(() => import('../../views/sales-and-stocks/purchase-orders/add'))
  },
  // {
  //   path: '/sale/delivery-notes',
  //   component: lazy(() => import('../../views/sales-and-stocks/delivery-notes')),
  //   exact: true,
  // },
  // {
  //   path: '/sale/delivery-notes/new',
  //   component: lazy(() => import('../../views/sales-and-stocks/delivery-notes/add'))
  // },
  // {
  //   path: '/sale/delivery-notes/edit/:id',
  //   component: lazy(() => import('../../views/sales-and-stocks/delivery-notes/add'))
  // },
  // {
  //   path: '/stock/deliveries',
  //   component: lazy(() => import('../../views/sales-and-stocks/deliveries')),
  //   exact: true,
  // },
  // {
  //   path: '/stock/deliveries/:id',
  //   component: lazy(() => import('../../views/sales-and-stocks/deliveries/preview')),
  //   exact: true,
  // },
  {
    path: '/stock/supply/add/:id',
    component: lazy(() => import('../../views/sales-and-stocks/supplies/add')),
    exact: true,
  },
  {
    path: '/stock/level',
    component: lazy(() => import('../../views/sales-and-stocks/level')),
    exact: true,
  },
  // {
  //   path: '/sale/bills',
  //   component: lazy(() => import('../../views/sales-and-stocks/bills')),
  //   exact: true,
  // },
  // {
  //   path: '/sale/bills/new',
  //   component: lazy(() => import('../../views/sales-and-stocks/bills/add'))
  // },
  // {
  //   path: '/sale/bills/edit/:id',
  //   component: lazy(() => import('../../views/sales-and-stocks/bills/add'))
  // },
  
  // {
  //   path: '/sale/products-returns',
  //   component: lazy(() => import('../../views/sales-and-stocks/products-returns')),
  //   exact: true,
  // },
  // {
  //   path: '/sale/products-returns/edit/:id',
  //   component: lazy(() => import('../../views/sales-and-stocks/products-returns/add'))
  // },
  {
    path: '/stock/stock-out',
    component: lazy(() => import('../../views/sales-and-stocks/stock-out')),
    exact: true,
  },
  // {
  //   path: '/stock/stock-out/new',
  //   component: lazy(() => import('../../views/sales-and-stocks/stock-out/add'))
  // },
  // {
  //   path: '/stock/stock-out/edit/:id',
  //   component: lazy(() => import('../../views/sales-and-stocks/stock-out/add'))
  // },
  {
    path: '/stock/stock-in',
    component: lazy(() => import('../../views/sales-and-stocks/stock-in')),
    exact: true,
  },
  // {
  //   path: '/stock/stock-in/new',
  //   component: lazy(() => import('../../views/sales-and-stocks/stock-in/add'))
  // },
  // {
  //   path: '/stock/stock-in/edit/:id',
  //   component: lazy(() => import('../../views/sales-and-stocks/stock-in/add'))
  // },
  // {
  //   path: '/stock/inventory',
  //   component: lazy(() => import('../../views/sales-and-stocks/inventory')),
  //   exact: true,
  // },
  // {
  //   path: '/stock/inventory/new',
  //   component: lazy(() => import('../../views/sales-and-stocks/inventory/add')),
  //   exact: true,
  // },
  // {
  //   path: '/stock/inventory/edit/:id',
  //   component: lazy(() => import('../../views/sales-and-stocks/inventory/add')),
  //   exact: true,
  // },
  // {
  //   path: '/stock/inventory/new/categorie/:categoryId',
  //   component: lazy(() => import('../../views/sales-and-stocks/inventory/view'))
  // },
  // {
  //   path: '/stock/inventory/edit/categorie/:id/:categoryId',
  //   component: lazy(() => import('../../views/sales-and-stocks/inventory/view'))
  // },
  // {
  //   path: '/stock/inventory/view/:id',
  //   component: lazy(() => import('../../views/sales-and-stocks/inventory/watch')),
  //   exact: true,
  // },
  // {
  //   path: '/stock/inventory/lost-list/:id',
  //   component: lazy(() => import('../../views/sales-and-stocks/inventory/lostList')),
  //   exact: true,
  // },
  
]

export default AppRoutes
