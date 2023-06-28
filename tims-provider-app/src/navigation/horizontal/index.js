// ** Navigation sections imports
import product from './product'
import dashboards from './dashboards'
import commande from './commands'
import chartsAndMaps from './charts-maps'

// ** Merge & Export
export default [...dashboards, ...product, ...commande,  ...chartsAndMaps]
