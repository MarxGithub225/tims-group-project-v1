import { Tag, ShoppingBag, Tool, ShoppingCart, Package, ArrowDownRight, ArrowUpRight, Archive, BookOpen } from 'react-feather'
export default [
  {
    header: 'Produits et services'
  },
  {
    id: 'produits',
    title: 'Produits',
    icon: <Tag size={12} />,
    permissions: ['admin', 'editor'],
    children: [
          {
            id: 'new-products',
            title: 'Nouveaux produits',
            icon: <Package size={12} />,
            permissions: ['admin', 'editor'],
            navLink: '/service/products',
          },
          {
            id: 'new-products',
            title: 'Tous nos produits',
            icon: <Archive size={12} />,
            permissions: ['admin', 'editor'],
            navLink: '/service/products/all',
          },
    ]
  },
  {
    id: 'blog',
    title: 'Blogs',
    icon: <BookOpen size={12} />,
    permissions: ['admin', 'editor'],
    navLink: '/service/blogs'
  },
  // {
  //   id: 'askingstock',
  //   title: 'Demandes de reapp.',
  //   icon: <ArrowDownRight size={12} />,
  //   permissions: ['admin', 'editor'],
  //   navLink: '/service/asking-supply'
  // },
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
