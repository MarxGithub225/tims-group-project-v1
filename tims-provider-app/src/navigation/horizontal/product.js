import { Box, Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Archive, Package } from 'react-feather'

export default [
  {
    id: 'apps',
    title: 'Produits',
    icon: <Box />,
    children: [
      {
        id: 'my-products',
        title: 'Mes produits',
        icon: <Package />,
        navLink: '/service/products'
      },
      {
        id: 'archived-products',
        title: 'Produits Archivés',
        icon: <Archive />,
        navLink: '/service/products-archived'
      }
    ]
    
  }
]
