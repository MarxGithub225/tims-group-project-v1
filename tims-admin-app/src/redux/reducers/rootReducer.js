// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import chat from '@src/views/apps/chat/store/reducer'
import todo from '@src/views/apps/todo/store/reducer'
import users from '@src/views/manage/user/store/reducer'
import email from '@src/views/apps/email/store/reducer'
import invoice from '@src/views/apps/invoice/store/reducer'
import calendar from '@src/views/apps/calendar/store/reducer'
import ecommerce from '@src/views/apps/ecommerce/store/reducer'
import dataTables from '@src/views/tables/data-tables/store/reducer'

import brands from '@src/views/manage/brands/store/reducer'
import categories from '@src/views/manage/categories/store/reducer'
import subcategories from '@src/views/manage/subcategories/store/reducer'
import banners from '@src/views/manage/banners/store/reducer'
import agencies from '@src/views/manage/show-rooms/store/reducer'
import collaborators from '@src/views/manage/user/collaborators/store/reducer'
import clients from '@src/views/manage/user/clients/store/reducer'
import products from '@src/views/services/products/store/reducer'
import level from '@src/views/sales-and-stocks/level/store/reducer'
import supplies from '@src/views/sales-and-stocks/supplies/store/reducer'
import providers from '@src/views/manage/user/providers/store/reducer'
import stockIn from '@src/views/sales-and-stocks/stock-in/store/reducer'
import stockOut from '@src/views/sales-and-stocks/stock-out/store/reducer'
import purchase from '@src/views/sales-and-stocks/purchase-orders/store/reducer'
import quotation from '@src/views/sales-and-stocks/quotations/store/reducer'
import allproducts from '@src/views/services/all-products/store/reducer'
import blogs from '@src/views/services/blogs/store/reducer'

const rootReducer = combineReducers({
  auth,
  todo,
  chat,
  email,
  users,
  navbar,
  layout,
  invoice,
  calendar,
  ecommerce,
  dataTables,
  brands,
  categories,
  subcategories,
  banners,
  agencies,
  collaborators,
  clients,
  products,
  level,
  providers,
  supplies,
  stockIn,
  stockOut,
  purchase,
  quotation,
  allproducts,
  blogs
})

export default rootReducer
