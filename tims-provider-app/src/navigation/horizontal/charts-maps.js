import { BarChart2, PieChart, Circle, Map, DollarSign } from 'react-feather'
export default [
  {
    id: 'datas',
    title: 'Données',
    icon: <BarChart2 />,
    children: [
      {
        id: 'accounting',
        title: 'Comptabilité',
        icon: <DollarSign />,
        navLink: '/maps/leaflet'
      },
      {
        id: 'stats',
        title: 'Statistiques',
        icon: <PieChart />,
        navLink: '/maps/leaflet'
      }
    ]
  }
]
