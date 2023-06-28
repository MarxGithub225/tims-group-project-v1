import { Layers, Type, Droplet, Eye, CreditCard, Circle, Briefcase, Box, Layout, ShoppingBag, CheckCircle, ArrowUpRight, Info, XCircle } from 'react-feather'

export default [
  {
    id: 'commands',
    title: 'Commandes',
    icon: <ShoppingBag />,
    children: [
      {
        id: 'pending',
        title: 'En attente',
        icon: <Info />,
        navLink: '/ui-element/typography'
      },
      {
        id: 'traitement',
        title: 'En traitement',
        icon: <Droplet />,
        navLink: '/colors/colors'
      },
      {
        id: 'feather',
        title: 'Expédiées',
        icon: <ArrowUpRight />,
        navLink: '/icons/reactfeather'
      },
      {
        id: 'delivered',
        title: 'Livrées',
        icon: <CheckCircle />,
        navLink: '/icons/reactfeather'
      },
      {
        id: 'canceled',
        title: 'Annulées',
        icon: <XCircle />,
        navLink: '/icons/reactfeather'
      }
    ]
  }
]
