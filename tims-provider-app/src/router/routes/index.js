// ** Routes Imports
import ManageRoutes from './Manage'
import PagesRoutes from './Pages'
import DashboardRoutes from './Dashboards'
import ServiceRoutes from './Service'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/dashboard/analytics'

// ** Merge Routes
const Routes = [
  ...DashboardRoutes,
  ...ServiceRoutes,
  ...PagesRoutes,
  // ...ExtensionsRoutes,
  // ...PageLayoutsRoutes,
  // ...FormRoutes,
  // ...TablesRoutes,
  // ...ChartMapsRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
