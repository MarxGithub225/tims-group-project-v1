import { FileText, Circle, ShoppingCart, Truck, ArrowDownRight, ArrowUpLeft, ArrowRight, Server } from 'react-feather'
export default [
  {
    header: 'Ventes et stock'
  },
  // {
  //   id: 'sales',
  //   title: 'Ventes',
  //   icon: <ShoppingCart size={20} />,
  //   children: [
      
      {
        id: 'devis',
        title: 'Devis',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/sale/quotations'
      },
      {
        id: 'bon-cde',
        title: 'Bons de commande',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/sale/purchase-orders'
      },
  //     {
  //       id: 'bon-liv',
  //       title: 'Bons de livraison',
  //       icon: <Circle size={12} />,
  //       permissions: ['admin', 'editor'],
  //       navLink: '/sale/delivery-notes'
  //     },
  //     {
  //       id: 'bills',
  //       title: 'Factures',
  //       icon: <Circle size={12} />,
  //       permissions: ['admin', 'editor'],
  //       navLink: '/sale/bills',
  //     },
  //     {
  //       id: 'returns',
  //       title: 'Retours produits',
  //       icon: <Circle size={12} />,
  //       permissions: ['admin', 'editor'],
  //       navLink: '/sale/products-returns'
  //     }
  //   ]
  // },
  {
    id: 'stocks',
    title: 'Gestion de stocks',
    icon: <Truck size={20} />,
    children: [
      
      {
        id: 'stocklevel',
        title: 'Niveau de stock',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/stock/level'
      },
      // {
      //   id: 'delivery',
      //   title: 'Livraisons',
      //   icon: <Server size={12} />,
      //   permissions: ['admin', 'editor'],
      //   navLink: '/stock/deliveries'
      // },
      {
        id: 'stockin',
        title: 'Entrée de stock',
        icon: <ArrowDownRight size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/stock/stock-in',
      },
      {
        id: 'stockout',
        title: 'Sorties de stock',
        icon: <ArrowUpLeft size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/stock/stock-out'
      },
      // {
      //   id: 'inventory',
      //   title: 'Inventaire',
      //   icon: <FileText size={12} />,
      //   permissions: ['admin', 'editor'],
      //   navLink: '/stock/inventory'
      // }
    ]
  }
]
