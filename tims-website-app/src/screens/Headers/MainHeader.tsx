import React, { useRef, useState } from "react";
import {ReactComponent as LogoIcon} from '../../assets/icons/LogoIcon.svg'
import HeaderSearchField from "./HeaderSearchField";
import {ReactComponent as LoopIcon} from '../../assets/icons/LoopIcon.svg'
import {ReactComponent as CartIcon} from '../../assets/icons/CartIcon.svg'
import {ReactComponent as HeartIcon} from '../../assets/icons/HeartIconGray.svg'
import {ReactComponent as UserIcon} from '../../assets/icons/UserIcon.svg'
import {ReactComponent as ArrowIcon} from '../../assets/icons/ArrowIcon.svg'
import { Link, useNavigate } from "react-router-dom";
import useOnClickOutSide from "../../utils/onClickOutSide";
import { Transition } from '@headlessui/react'
import FadeInComponent from '../../components/FadeComponent'
import { getUserData, isUserLoggedIn } from "../../utils/Utils";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function MainHeader() {
  const cart: any[] = useSelector((state: RootState) => state.cart.datas) 

  const [q, setSearch] = useState<string>('')
  const [categoryId, setCategoryId] = useState<string>('all')
  const navigate = useNavigate()
  let ref = useRef<any>(null)
  const [showDrop, setDrop] = useState<boolean>(false)
  useOnClickOutSide(ref, () => setDrop(false))
  return <div className="main-header w-full">
    <div className="w-max-width w-full">
      <div className="relative w-full flex flex-row justify-between items-center">
        <LogoIcon  className="cursor-pointer w-12 laptop:w-auto"
        onClick={() => navigate('/')}
        />
        <div className="relative">
          <HeaderSearchField
          categoryId={categoryId}
          q={q}
          setSearch={(value: string) => setSearch(value)}
          setCategoryId={(value: string) => setCategoryId(value)}

          onKeyEnter={() => 
            {
              let query = '';
              if(categoryId && categoryId!=='all') {
                query = `&category_id=${categoryId}`
              }
              navigate(`/search/?q=${q}${query}`)

              setTimeout(() => {
                setSearch('')
              }, 1000);
            }
          }
          />
          <div className="absolute top-0 -right-10 search-button cursor-pointer"
          style={{
            pointerEvents: (!categoryId && !q) ? 'none': 'initial',
            opacity: (!categoryId && !q) ? .5: 1
          }}
          onClick={() => 
            {
              let query = '';
              if(categoryId && categoryId!=='all') {
                query = `&category_id=${categoryId}`
              }
              navigate(`/search/?q=${q}${query}`)
              setTimeout(() => {
                setSearch('')
              }, 1000);
            }
          }
          >
            <LoopIcon/>
          </div>

        </div>
        
        <div className="tools flex items-center">
          <div className="relative tool-item w-8 h-8 laptop:w-12 laptop:h-12 rounded-full flex items-center justify-center"
          onClick={() => navigate('/cart')}
          >
            <CartIcon/>
            {cart && cart.length ? <div className="absolute w-3 h-3 top-2 right-2 rounded-full bg-mainColor"></div>: <></>}
            
          </div>

          <div className="tool-item w-8 h-8 laptop:w-12 laptop:h-12 rounded-full flex items-center justify-center"
          onClick={() =>
            {
              if(isUserLoggedIn()) {
                navigate('/favorites')
              }else setDrop(!showDrop)
            }
            }
          >
            <HeartIcon/>
          </div>

          <div className="tool-item w-8 h-8 laptop:w-12 laptop:h-12 rounded-full flex items-center justify-center"
          onClick={() => 
            {
              if(isUserLoggedIn()) {
                navigate('/account')
              }else setDrop(!showDrop)
            }
        }
          >
            <UserIcon/>
          </div>

          <div className="user-account">
            {isUserLoggedIn() && <div className="user-name">{`${getUserData()?.firstName} ${getUserData()?.lastName}`} </div>}
            <div className="relative user-login flex items-center w-36" onClick={() => {setDrop(!showDrop)}}>
              <span>{isUserLoggedIn()? 'Mon compte': 'Connexion'}</span>
              {!showDrop && <ArrowIcon />}
              {showDrop && <div className="" style={{transform: 'rotate(-180deg)'}} ><ArrowIcon onClick={() => {setDrop(!showDrop)}}/></div>}

              {!isUserLoggedIn() && <Transition.Root className="absolute w-full top-8 left-0 z-50" show={showDrop}>
                <FadeInComponent><div ref={ref} className="w-full flex flex-col shadow px-3 pt-2 login-options bg-white">
                <Link to={'/login'}>Se connecter</Link>
                <Link to={'/register'}>S'inscrire</Link>
              </div></FadeInComponent></Transition.Root>}

              {isUserLoggedIn() && <Transition.Root className="absolute w-full top-8 left-0 z-50" show={showDrop}>
                <FadeInComponent><div ref={ref} className="w-full flex flex-col shadow px-3 pt-2 login-options bg-white">
                <Link to={'/account/profile'}>Profile</Link>
                <Link to={'/account/orders'}>Commandes</Link>
              </div></FadeInComponent></Transition.Root>}
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>;
}

export default MainHeader;
