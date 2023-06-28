import { Sidebar, Circle, User, Shield, Layers, Home, UserCheck, Users, UserX, UserPlus} from 'react-feather'

export default [
  {
    header: 'Geston'
  },
  {
    id: 'brands',
    title: 'Marques',
    icon: <Shield size={20} />,
    navLink: '/manage/brands'
  },
  {
    id: 'users',
    title: 'User',
    icon: <User size={20} />,
    children: [
      {
        id: 'client',
        title: 'Clients',
        icon: <UserX size={12} />,
        navLink: '/manage/users/clients'
      },
      {
        id: 'collaborator',
        title: 'Collaborateurs',
        icon: <Users size={12} />,
        navLink: '/manage/users/collaborators'
      },
      {
        id: 'provider',
        title: 'Fournisseurs',
        icon: <UserPlus size={12} />,
        navLink: '/manage/users/providers'
      }
    ]
  },
  {
    id: 'category',
    title: 'Categories',
    icon: <Layers size={20} />,
    navLink: '/manage/categories'
  },
  // {
  //   id: 'agency',
  //   title: 'Show rooms',
  //   icon: <Home size={20} />,
  //   navLink: '/manage/show-rooms'
  // },
  {
    id: 'banner',
    title: 'Bannières',
    icon: <Sidebar size={20} />,
    navLink: '/manage/banners'
  },
]
