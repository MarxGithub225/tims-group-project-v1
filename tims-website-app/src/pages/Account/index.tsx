import React, { useEffect } from "react";
import { CreditCard, Edit, Heart, Lock, LogOut, Navigation, ShoppingBag, User } from "react-feather";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Addresses from "./Pages/Addresses";
import BankCards from "./Pages/BankCards";
import Orders from "./Pages/Orders";
import Profile from "./Pages/Profile";
import UpdateData from "./Pages/UpdateData";
import UpdatePass from "./Pages/UpdatePass";
import { isUserLoggedIn } from "../../utils/Utils";
import Loading from "../../components/Loading";
import { Slide, toast } from 'react-toastify'

import { ReactComponent as BackIcon } from "../../assets/icons/BackIcon.svg";
import { confirmAlert } from "react-confirm-alert";
const menu = [
    {icon: <User/>, title: "Mon profile", link: "/account/profile"},
    {icon: <ShoppingBag/>, title: "Mes commandes", link: "/account/orders"},
    {icon: <Heart/>, title: "Mes favoris", link: "/favorites"},
    {icon: <Navigation/>, title: "Mes adresses", link: "/account/addresses"},
    {icon: <CreditCard/>, title: "Mes cartes", link: "/account/bank-cards"},
    {icon: <Edit/>, title: "Modifier mes information", link: "/account/data/update"},
    {icon: <Lock/>, title: "Modifier mon mot de passe", link: "/account/password/update"}
]
function Account() {
    const navigate = useNavigate()

    useEffect(() => {
    if(!isUserLoggedIn()) {
        navigate('/')
        let errMessage = "Aucun compte connecté. Merci de vous connecter";
        toast.error(
        errMessage,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
    }
    }, [])


    const logout = () => {
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
if(!isUserLoggedIn()) {
    return <Loading/>
    }
  return <div className="account-page">
    <div className="w-max-width">
        <div className="w-full block laptop:flex laptop:justify-between px-2 laptop:px-0 pb-32 laptop:pb-0">
            <div className="account-menu hidden laptop:block ">
                <div className="shadow p-6">
                {menu.map((m: any, index: number) => {
                    return <div key={index} className="account-menu-item flex items-center"
                    onClick={() => navigate(`${m.link}`)}
                    >
                        {m.icon}
                        <span className="ml-2">{m.title}</span>
                    </div>
                })}
                {isUserLoggedIn() && <div className="logout account-menu-item flex items-center"  
                style={{color: "#E73A5D"}}
                onClick={() => {
                logout()
                }}
                >
                <LogOut/> <span className="ml-2">Deconnexion</span>
                </div>}
                </div>
                
            </div>

            <div className="mobile-menu-item mb-4 flex laptop:hidden flex-col items-center"
            onClick={() => {navigate(-1)}}
            style = {{
            width : 40,
            height: 40,
            borderRadius: 100,
            backgroundColor : '#F5F5F5',
            flexDirection: 'row',
            justifyContent : 'center',
            alignItems : 'center'
            }}
            >
                <BackIcon/>
            </div>
            
            <div className="account-content px-2 laptop:px-0">
            <Routes>
                <Route path={'profile'} element={ <Profile /> } />
                <Route path={'orders'} element={ <Orders /> } />
                <Route path={'addresses'} element={ <Addresses /> } />
                <Route path={'bank-cards'} element={ <BankCards /> } />
                <Route path={'data/update'} element={ <UpdateData /> } />
                <Route path={'password/update'} element={ <UpdatePass /> } />
                <Route path={''} element={<Navigate to="profile"/>}/>
            </Routes>
            </div>
        </div>
    </div>
  </div>;
}

export default Account;
