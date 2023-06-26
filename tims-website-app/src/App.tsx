import MainFooter from './screens/Footers/MainFooter';
import MainHeader from './screens/Headers/MainHeader';
import SocialHeader from './screens/Headers/SocialHeader';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import React, { useEffect, useRef } from 'react';
import FullProductList from './pages/FullProductList';
import Details from './pages/Details';
import BlogDetails from './pages/BlogDetails';
import Cart from './pages/Cart';
import OrderStatus from './pages/OrderStatus';
import OrderTracking from './pages/OrderTracking';
import LoginPage from './pages/Login';
import MobileLogin from './pages/Login/MobileLogin';
import MobilePassForgot from './pages/PassForgot/MobilePassForgot';

import RegisterPage from './pages/Register';
import MobileRegister from './pages/Register/MobileRegister';
import PassForgotPage from './pages/PassForgot';
import Favorites from './pages/Favorites';
import Account from './pages/Account';
import AboutView from './pages/About';
import NotFoundView from './pages/NotFoundView';
import QView from './pages/Q';
import ReportSavView from './pages/ReportSav';
import WhyView from './pages/Why';
import SellingConditionsView from './pages/Footer/SellingConditions';
import TermsView from './pages/Footer/Terms';
import ContactsView from './pages/Contacts';

import MobileMenu from './screens/Mobile/MobileMenu';
import MobileHeader from './screens/Mobile/MobileHeader';
import MobileHome from './pages/Mobile/MobileHome';
import MobileCategories from './pages/Mobile/MobileCategories';
import MobileCart from './pages/Mobile/MobileCart';
import MobileFavorites from './pages/Mobile/MobileFavorites';
import MobileFullProductList from './pages/Mobile/MobileFullProductList';
import MobileFullProductList2 from './pages/Mobile/MobileFullProductList2';

import MobileProductDetails from './pages/Mobile/MobileProductDetails';


import Addresses from './pages/Account/Pages/Addresses';
import BankCards from './pages/Account/Pages/BankCards';
import FullProductList2 from './pages/FullProductList2';
import { getCart } from './redux/features/cartSlice';
import { useAppDispatch } from './redux/hooks';
import MobileReviews from './pages/Mobile/MobileReviews';
function App() {
  const dispatch = useAppDispatch()
    const {pathname} = useLocation()
    const headerRef: any = useRef(null)
    const mobileHeader: any = useRef(null)

    const PublicRoute: React.FunctionComponent = () => {
      
      return <Routes>
            < Route path={'/'} element={ <Home /> } />
            < Route path={'search/*'} element={ <FullProductList /> } />
            < Route path={'product-list/:categoryId/*'} element={ <FullProductList /> } />
            < Route path={'blog-list/*'} element={ <FullProductList /> } />
            < Route path={'blog/:blogId'} element={ <BlogDetails /> } />
            < Route path={'product-sub-category/:subCategory/*'} element={ <FullProductList2 /> } />
            < Route path={'details/:productId/*'} element={ <Details /> } />
            < Route path={'cart'} element={ <Cart /> } />
            < Route path={'order-state/:orderId'} element={ <OrderStatus /> } />
            < Route path={'order-tracking/:orderId'} element={ <OrderTracking /> } />
            < Route path={'login/*'} element={ <LoginPage /> } />
            < Route path={'register/*'} element={ <RegisterPage /> } />
            < Route path={'pass-forgot'} element={ <PassForgotPage /> } />
            < Route path={'favorites'} element={ <Favorites /> } />
            < Route path={'account/*'} element={ <Account /> } />

            < Route path={'why-to-sell-on-yepia'} element={ <WhyView /> } />

            < Route path={'report-a-sav'} element={ <ReportSavView /> } />


            < Route path={'terms-and-privacy'} element={ <TermsView /> } />

            < Route path={'selling-conditions'} element={ <SellingConditionsView /> } />

            < Route path={'about-us'} element={ <AboutView /> } />
            < Route path={'contact-us'} element={ <ContactsView /> } />

            < Route path={'q'} element={ <QView /> } />

            <Route path="/404" element={<NotFoundView />} />
            <Route path={'*'} element={<Navigate to="/404"/>}/>
          </Routes>
    }

    const MobilePublicRoute: React.FunctionComponent = () => {
     
      return <Routes>
            < Route path={'/'} element={ <MobileHome /> } />
            < Route path={'categories'} element={ <MobileCategories /> } />
            < Route path={'search/*'} element={ <MobileFullProductList /> } />
            < Route path={'blog-list/*'} element={ <FullProductList /> } />
            < Route path={'blog/:blogId'} element={ <BlogDetails /> } />
            
            < Route path={'product-list/:categoryId/*'} element={ <MobileFullProductList /> } />
            < Route path={'product-sub-category/:subCategory/*'} element={ <MobileFullProductList2 /> } />
            < Route path={'details/:productId'} element={ <MobileProductDetails /> } />
            < Route path={'cart'} element={ <MobileCart /> } />
            < Route path={'order-state/:orderId'} element={ <OrderStatus /> } />
            < Route path={'order-tracking/:orderId'} element={ <OrderTracking /> } />
            < Route path={'login'} element={ <MobileLogin /> } />
            < Route path={'register'} element={ <MobileRegister /> } />
            < Route path={'pass-forgot'} element={ <MobilePassForgot /> } />
            < Route path={'favorites'} element={ <MobileFavorites /> } />
            < Route path={'account/*'} element={ <Account /> } />
            <Route path={'addresses'} element={ <Addresses /> } />
            <Route path={'bank-cards'} element={ <BankCards /> } />
            <Route path={'reviews/:productId'} element={ <MobileReviews /> } />

            < Route path={'why-to-sell-on-yepia'} element={ <WhyView /> } />

            < Route path={'report-a-sav'} element={ <ReportSavView /> } />


            < Route path={'terms-and-privacy'} element={ <TermsView /> } />

            < Route path={'selling-conditions'} element={ <SellingConditionsView /> } />

            < Route path={'about-us'} element={ <AboutView /> } />
            < Route path={'contact-us'} element={ <ContactsView /> } />

            < Route path={'q'} element={ <QView /> } />

            <Route path="/404" element={<NotFoundView />} />
            <Route path={'*'} element={<Navigate to="/404"/>}/>
          </Routes>
    }

    useEffect(() => {
      dispatch(getCart())
      if (headerRef) {
        headerRef?.current?.scrollIntoView({ behavior: "smooth" })
      }

      if (mobileHeader) {
        mobileHeader?.current?.scrollIntoView({ behavior: "smooth" })
      }
    }, [pathname])

  return (
    <>
      {window.innerWidth > 768 ? 
      <div className='main-container no-scrollbar'>
          <SocialHeader  headerRef={headerRef}/>
          <MainHeader/> 
          <PublicRoute/>
          {pathname!=='/cart' && <MainFooter/>}
      </div> : 
      <div className='relative mobile-main-container'>
          <MobileHeader mobileHeader ={mobileHeader} />
          <div className="mobile-content no-scrollbar">
          <MobilePublicRoute/>
          </div>
          <MobileMenu/>
      </div>}
    </>
  );
}

export default App;
