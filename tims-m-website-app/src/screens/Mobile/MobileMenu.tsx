import React from "react";
import { Home, ShoppingBag, Favorite} from '@mui/icons-material';
import classnames from 'classnames';
import { useNavigate } from "react-router-dom";
import {ReactComponent as CategoryIcon} from '../../assets/icons/CategoryIcon.svg'
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ShoppingCart } from "react-feather";
function MobileMenu() {
  const cart: any[] = useSelector((state: RootState) => state.cart.datas)
  const navigate = useNavigate();

  const getActiveClassname = (link: string, linkExtend?: string) => {
    return classnames({
        'mobile-menu-item-active': linkExtend ? window.location.pathname === link || window.location.pathname === linkExtend : window.location.pathname === link
    })
  }
  return <div className="fixed bottom-0 left-0 bg-white shadow w-full h-14 flex justify-between items-center px-4"
  style={{zIndex: 100}}
  >
    <div className={`mobile-menu-item ${getActiveClassname('/')} flex flex-col items-center`}
    onClick={() => navigate('/')}
    >
        <Home/> Accueil
    </div>

    <div className={`mobile-menu-item ${getActiveClassname('/categories')} flex flex-col items-center`}
    onClick={() => navigate('/categories')}
    >
        <CategoryIcon/> Catégories
    </div>

    <div className={`relative mobile-menu-item ${getActiveClassname('/cart')} flex flex-col items-center`}
    onClick={() => navigate('/cart')}
    >
        <ShoppingBag/> Panier

        {cart && cart.length ? <div 
        style = {{
          position : 'absolute',
          top: 0,
          right : 2,
          width : 12,
          height : 12,
          borderRadius : 100,
          backgroundColor : "#E73A5D",

        }}
        ></div>: <></>}
    </div>

    <div className={`mobile-menu-item ${getActiveClassname('/favorites')} flex flex-col items-center`}
    
    onClick={() => navigate('/favorites')}>
        <Favorite/> Favoris
    </div>

    <div className={`mobile-menu-item ${getActiveClassname('/favorites')} flex flex-col items-center`}
    
    onClick={() => window.open('https://partner.6tims.com/', '_blank')}>
        <ShoppingCart/> Vendre
    </div>
  </div>;
}

export default MobileMenu;
