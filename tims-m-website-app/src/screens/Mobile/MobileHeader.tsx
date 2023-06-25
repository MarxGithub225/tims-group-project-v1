import React, { Fragment, useRef, useState } from "react";
import { Menu, ShoppingBag} from '@mui/icons-material';
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as BackIcon } from "../../assets/icons/BackIcon.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useOnClickOutSide from "../../utils/onClickOutSide";
import ReviewPic from '../../assets/images/UserIcon.png'
import {CreditCard, Edit, Heart, Navigation, User, X, Lock, LogOut} from 'react-feather'
import { getUserData, isUserLoggedIn } from "../../utils/Utils";

import {ReactComponent as FacebookIcon} from '../../assets/icons/socials/FacebookIcon.svg'
import {ReactComponent as InstagramIcon} from '../../assets/icons/socials/InstagramIcon.svg'
import {ReactComponent as TwitterIcon} from '../../assets/icons/socials/TwitterIcon.svg'
import {ReactComponent as YoutubeIcon} from '../../assets/icons/socials/YoutubeIcon.svg'
import {ReactComponent as EnIcon} from '../../assets/icons/langs/EnIcon.svg'
import {ReactComponent as FrIcon} from '../../assets/icons/langs/FrIcon.svg'
import CustomSelect from "../../components/DropDown";
import { confirmAlert } from "react-confirm-alert";
import { toast, Slide } from "react-toastify";
import { setCart } from "../../redux/features/cartSlice";

function MobileHeader({mobileHeader}: any) {
  const [sort, setSort] = useState('fr')
  const _lang = [
    {label: <FrIcon width={19} />, value: 'fr'},
    {label: <EnIcon width={19} /> , value: 'en'},
    {label: <EnIcon />, value: 'ar'},
   ]

  const cart: any[] = useSelector((state: RootState) => state.cart.datas)
  const {pathname} = useLocation()
  const navigate = useNavigate();
  const [openMenu, setOpen] = useState(false)
  let menuRef = useRef(null)
  const pathWithBack = () => {
    const routes = [
      'categories',
      'product-sub-category',
      'product-list',
      'reviews',
      'cart'
    ]

    const currentPath = pathname.split('/')

    if(routes.includes(currentPath[1])) {
      return true
    }else return false
  }
 useOnClickOutSide(menuRef, () => setOpen(false))

 const menu = [
  {icon: <User/>, title: "Mon profile", link: "/account/profile"},
  {icon: <ShoppingBag/>, title: "Mes commandes", link: "/account/orders"},
  {icon: <Navigation/>, title: "Mes adresses", link: "/account/addresses"},
  {icon: <CreditCard/>, title: "Mes cartes", link: "/account/bank-cards"},
  {icon: <Lock/>, title: "Mon mot de passe", link: "/account/password/update"}
]

const footerMenu = [
  {title: "Termes et confidentialités", link: "/terms-and-privacy"},
  {title: "Conditions de vente", link: "/selling-conditions"},
  {title: "Foire aux questions", link: "/q"},
  {title: "Contactez-nous", link: "/contact-us"},
]
const logout = () => {
  setOpen(false)
  confirmAlert({
    title: 'Confirmation',
    message: 'Êtes-vous sûre de vouloir vous déconnecter ?',
    buttons: [
    {
        label: 'Oui, me deconnecter',
        onClick: async () => {
          localStorage.removeItem('userData')
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')

          setTimeout(() => {
            window.location.reload()
          }, 500);
        }
    },
    {
        label: 'Non, rester',
        onClick: () => console.log('ok') 
    }
    ]
});
}
  return <><div className="fixed top-0 left-0 bg-white w-full h-12 flex justify-between items-center px-4" ref={mobileHeader}
  style={{zIndex: 500}}
  >
    <div className="mobile-menu-item flex flex-col items-center"
    onClick={() => {
      if(pathWithBack())
      navigate(-1)
      else {setOpen(!openMenu)}
    }}
     style = {{
      width : 35,
      height: 35,
      borderRadius: 100,
      backgroundColor : '#F5F5F5',
      flexDirection: 'row',
      justifyContent : 'center',
      alignItems : 'center'
    }}
    >
        {!pathWithBack() ? <Menu/> : <BackIcon/>}
    </div>

    <a href="https://partner.6tims.com/" target="_blank" className="sell-on">Vendre sur 6tims</a>
    <div className="relative  flex flex-col items-center"
    style = {{
      width : 60,
      height: 25,
      flexDirection: 'row',
      justifyContent : 'center',
      alignItems : 'center'
    }}
    >
        <CustomSelect
                defaultData={_lang}
                selected={sort}
                onChange={setSort}/>
    </div>
    
  </div>
    <div ref={menuRef} className={`fixed top-0 w-full left-0 transition duration-150 ease-out h-screen ${!openMenu ? '-translate-x-full': 'translate-x-0'}`}
    style={{
      background: 'rgba(29, 30, 32, 0.2)',
      backdropFilter: 'blur(7.5px)',
      zIndex: 1000}}>
      <div className="bg-white h-full w-60 shadow px-3 py-6 overflow-y-auto no-scrollbar">
        <div className="w-10 h-10 flex items-center justify-center rounded-full"
        style={{background: '#F5F5F5'}}
        onClick={() => {setOpen(false)}}
        >
          <X/>
        </div>

        {isUserLoggedIn() &&  <div className="flex items-center space-x-4 my-6">
          <img src={ReviewPic} alt=""/>
          <div className="flex flex-col">
            <div
            style={{
              fontWeight: 500,
              fontSize: 17,
              color: "#1D1E20"
            }}  
            >{getUserData()?.firstName} {getUserData()?.lastName}</div>
            <span
            style={{
              fontSize: 13,
              color: "#8F959E"
            }}  
            >{getUserData()?.email}</span>
          </div>
        </div>}

       {isUserLoggedIn() && <div className="account-menu ">
            {menu.map((m: any, index: number) => {
                return <div key={index} className="account-menu-item flex items-center"
                onClick={() => {navigate(`${m.link}`); setOpen(false)}}
                >
                    {m.icon}
                    <span className="ml-2">{m.title}</span>
                </div>
            })}
        </div>}

        <div className="foot-menu ">
            {!isUserLoggedIn() && 
            <div className="account-menu-item flex items-center"
            onClick={() => {navigate(`/login`); setOpen(false)}}
            >
                <span >Se connecter</span>
            </div>
            }
            {footerMenu.map((m: any, index: number) => {
                return <div key={index} className="account-menu-item flex items-center"
                onClick={() => {navigate(`${m.link}`); setOpen(false)}}
                >
                    <span >{m.title}</span>
                </div>
            })}
        </div>

        {isUserLoggedIn() && <div className="logout flex items-center space-x-2 mt-4 font-medium"  
        style={{color: "#E73A5D"}}
        onClick={() => {
          logout()
        }}
        >
          <LogOut/> <span>Deconnexion</span>
        </div>}
      </div>
    </div>
  </>;
}

export default MobileHeader;
