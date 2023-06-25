import React, { Fragment, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {ReactComponent as CarIcon} from '../../assets/icons/features/CarIcon.svg'
import {ReactComponent as HeadPhone} from '../../assets/icons/features/HeadPhone.svg'
import {ReactComponent as MoneyIcon} from '../../assets/icons/features/MoneyIcon.svg'
import FullButton from "../../components/Buttons/FullButton";
import DetailsTitle from "../../components/Details/DetailsTitle";
import PartnerLists from "../../screens/PartnerLists";
import { useAppDispatch } from "../../redux/hooks";
import { login } from "../../redux/features/authSlice";

import { Slide, toast } from 'react-toastify'

import axios from 'axios'
import { base_url } from "../../utils/baseUrl";
import { Spinner } from "reactstrap";

const _features = [
  {
    icon: <CarIcon className="ath-feature-icon-class"/>,
    label: 'Livraison rapide',
    descirption: 'Livraison à moindre côut.'
  },
  {
    icon: <MoneyIcon className="ath-feature-icon-class"/>,
    label: 'Garantie monétaire',
    descirption: 'Paiement sécurisé / 30 jours de remboursement.'
  },
  {
    icon: <HeadPhone className="ath-feature-icon-class"/>,
    label: 'Support 24/7',
    descirption: 'Assistance amicale 24/7'
  }
]

function LoginPage() {
  const search = useLocation().search;
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)


  

  const [user, setUser] = useState({
    email: '',
    password: ''
  });
const onSubmit = async () => {
    setLoading(true)
    await axios.post(`${base_url}user/login`, user)
    .then((response): any => {
      setUser({
        email: '',
        password: ''
      });
      setLoading(false)
      dispatch(login({data: response.data}))
        setLoading(false)
        if(search) {
          const urlRequest = new URLSearchParams(search).get('urlRequest');
          const tagData = new URLSearchParams(search).get('tag') ?? '';
          let tag='';
          if(tagData) {
            tag= `?tag=${tagData}`
          }
          window.location.href = `${urlRequest}${tag}`
        }else {
          window.location.href = '/account'
        }
      toast.success(
        <Fragment>
          <div className='toastify-header'>
            <div className='title-wrapper'>
              <h6 className='toast-title font-weight-bold'>Content de vous revoir {response?.data?.fullName}</h6>
            </div>
          </div>
        </Fragment>,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
    })

    .catch((error) => {
        axios.interceptors.response.use(
          response => response,
          error => {
            const { config, response } = error
            if (response && response.data?.message === "Invalid Credentials") {
              toast.error(
                <Fragment>
                  <div className='toastify-header'>
                    <div className='title-wrapper'>
                      <h6 className='toast-title font-weight-bold'>Identifiants incorrects!</h6>
                    </div>
                  </div>
                </Fragment>,
                { transition: Slide, hideProgressBar: true, autoClose: 10000 }
              )
              return null
            }else {
              let errMessage = "Une erreur s'est produite, merci de réessayer.";
              toast.error(
              errMessage,
                { transition: Slide, hideProgressBar: true, autoClose: 2000 }
              )

              return null
            }
          }
        )
        setLoading(false)
    })
  }

  return <div className="auth-page">
  <div className="w-max-width w-full flex flex-col laptop:flex-row justify-between">
    <div className="w-full laptop:w-2/5 px-4 laptop:px-6 py-3 ">
      <div className="auth-header hidden laptop:block">
      Rejoignez +2 millions de vendeurs qui proposent les meilleurs produits dans tout le pays.
        <span>Connectez-vous maintenant et bénéficiez de tous les avantages de 6tims.com:</span>
      </div>

      <div className="mt-8 flex justify-between items-center laptop:block">
      {_features.map((f: any, index: number) => {
        return <div key={index} className="feature-item flex flex-col laptop:flex-row items-center">
          {f.icon}
          <div className="infos"> 
            <div className="label">
              {f.label}
            </div>
            <div className="hidden laptop:block descirption">
              {f.descirption}
            </div>
          </div>
        </div>
      })}
      </div>
    </div>
    <div className="w-full laptop:w-3/6 pl-4 laptop:pl-12 auth-form pr-4 laptop:pr-6 py-3 rounded border h-fit">
    <DetailsTitle title = "Bienvenue à nouveau" />
    <p className="hidden laptop:block">Bienvenue, notre utilisateur/utilisatrice préféré(e). Vous avez pleins d'avantages qui vous attendent sur 6tims.com. Ne vous inquiétez pas, il vous suffit d'insérer votre email et votre mot de passe pour recommencer vos achats.</p>

      <div className="flex w-full items-center address-form flex-wrap mt-4">
        <div className="w-full">
        <div className="label">Adresse e-mail</div>
          <input type="text" placeholder="Adresse e-mail" 
          value={user.email}
          onChange={e => setUser({...user, email: e.target.value})}
          className="address-form-input"/>
        </div>
        </div>


      <div className="flex w-full items-center address-form flex-wrap mt-4">
       
      <div className="w-full">
      <div className="label">Mot de passe</div>
          <input type="password" placeholder="Mot de passe" 
          value = {user.password}
          onChange={e => setUser({...user, password: e.target.value})}
          className="address-form-input"/>
        </div>
      </div>

        <div className="flex items-center justify-between mt-4">
            <div className="saving-address items-center mt-0"/>

            <Link to={'/pass-forgot'} className="pass-forgot">
                Mot de passe oublié ?
            </Link>
        </div>

      <div className="flex justify-beween items-center mt-4">
        <div className="w-3/6">
        <FullButton
          disabled={
            !user.email ||
            !user.password
          }
          background="#E73A5D"
          label={<>{loading ?  <Spinner animation="grow" style={{width: 17, height: 17}}/> : 'Se connecter'}</>}
          color="#FFFFFF"
          size = {14}
          weight = {500}
          func={(e: any) => onSubmit()}
          radius = {8}
          />
        </div>
        <div className="w-1/6 flex justify-center or-class">
          <span>Ou</span>
        </div>

        <div className="w-2/6">
        <FullButton
        background="#F4F6F8"
        label={<>S'inscrire</>}
        color="#5A7184"
        size = {14}
        weight = {500}
        func={(e: any) => {
          if(search) {
            const urlRequest = new URLSearchParams(search).get('urlRequest');
            const tagData = new URLSearchParams(search).get('tag') ?? '';
            let tag='';
            if(tagData) {
              tag= `&tag=${tagData}`
            }

            navigate(`/register?redirect=true&urlRequest=${urlRequest}${tag}`)
          }else navigate('/register')}
        }
        radius = {8}
        />
        </div>
      </div>
    </div>
  </div>

  <div className="w-full mt-12 hidden laptop:block">
  
  <div className="auth-header text-center">
  La confiance des plus grandes marques dans le monde
  </div>
  <PartnerLists/>
  </div>

 
</div>;
}

export default LoginPage;
