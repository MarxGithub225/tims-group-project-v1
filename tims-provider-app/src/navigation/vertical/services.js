import { Tag, ShoppingBag, Tool, ShoppingCart, Package, ArrowDownRight, ArrowUpRight } from 'react-feather'
export default [
  {
    header: 'Produits et services'
  },
  {
    id: 'produits',
    title: 'Produits',
    icon: <Tag size={12} />,
    permissions: ['admin', 'editor'],
    navLink: '/service/products'
  },
  {
    id: 'myaskingstock',
    title: 'Mes demandes de reapp.',
    icon: <ArrowUpRight size={12} />,
    permissions: ['admin', 'editor'],
    navLink: '/service/my-asking-supply'
  },
  {
    id: 'askingstock',
    title: 'Demandes de reapp.',
    icon: <ArrowDownRight size={12} />,
    permissions: ['admin', 'editor'],
    navLink: '/service/asking-supply'
  },
  // {
  //   id: 'orders',
  //   title: 'Commandes',
  //   icon: <ShoppingCart size={20} />,
  //   children: [
  //     {
  //       id: 'all-orders',
  //       title: 'Ttes les commandes',
  //       icon: <ShoppingBag size={12} />,
  //       permissions: ['admin', 'editor'],
  //       navLink: '/service/all-orders'
  //     },
  //     {
  //       id: 'new-orders',
  //       title: 'Nvlles commandes',
  //       icon: <ShoppingCart size={12} />,
  //       permissions: ['admin', 'editor'],
  //       navLink: '/service/new-orders'
  //     },
  //     {
  //       id: 'traited-orders',
  //       title: 'En préparation',
  //       icon: <Package size={12} />,
  //       permissions: ['admin', 'editor'],
  //       navLink: '/service/orders'
  //     }
      
  //   ]
  // },
  // {
  //   id: 'sva',
  //   title: 'SAV',
  //   icon: <Tool size={12} />,
  //   permissions: ['admin', 'editor'],
  //   navLink: '/service/sav'
  // },
  
]
