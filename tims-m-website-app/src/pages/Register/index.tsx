import React, { Fragment, useState } from "react";
import PhoneInput from "react-phone-input-2";
import {ReactComponent as CarIcon} from '../../assets/icons/features/CarIcon.svg'
import {ReactComponent as HeadPhone} from '../../assets/icons/features/HeadPhone.svg'
import {ReactComponent as MoneyIcon} from '../../assets/icons/features/MoneyIcon.svg'
import FullButton from "../../components/Buttons/FullButton";
import DetailsTitle from "../../components/Details/DetailsTitle";
import PartnerLists from "../../screens/PartnerLists";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";

import { Slide, toast } from 'react-toastify'

import axios from 'axios'
import { base_url } from "../../utils/baseUrl";

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

function RegisterPage() {
  const search = useLocation().search;
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    numbers: [''],
    gender: 'man',
    role: 'user',
    isBlocked: false,
    addresses: [{
      isPrincipal: true,
      country: '',
      city: '',
      location: ''
    }],
    password: '',
    confirm: '',
  });
  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    setLoading(true)
    await axios.post(`${base_url}user/register`, user)
    .then((response): any => {
      setUser({
        firstName: '',
        lastName: '',
        email: '',
        numbers: [''],
        gender: 'man',
        role: 'user',
        isBlocked: false,
        addresses: [{
          isPrincipal: true,
          country: '',
          city: '',
          location: ''
        }],
        password: '',
        confirm: '',
      });
      setLoading(false)
      if(search) {
        const urlRequest = new URLSearchParams(search).get('urlRequest');
        const tagData = new URLSearchParams(search).get('tag') ?? '';
        let tag='';
        if(tagData) {
          tag= `&tag=${tagData}`
        }
        window.location.href = `/login?redirect=true&urlRequest=${urlRequest}${tag}`
      }else {
        window.location.href = '/login'
      }
      toast.success(
        <Fragment>
          <div className='toastify-header'>
            <div className='title-wrapper'>
              <h6 className='toast-title font-weight-bold'>Enregistrement réussi!</h6>
            </div>
          </div>
        </Fragment>,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
    })

    .catch((error) => {
      let errMessage = "Une erreur s'est produite, merci de réessayer plustard.";
      console.log('Error', error)
      toast.error(
        errMessage,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      setLoading(false)
    })
  }
  return <div className="auth-page">
    <div className="w-max-width w-full flex justify-between">
      <div className="w-2/5 px-6 py-3 ">
        <div className="auth-header">
        Rejoignez +2 millions de vendeurs qui proposent les meilleurs produits dans tout le pays.
        <span>Inscrivez-vous maintenant et bénéficiez de tous les avantages de 6tims.com:</span>
        </div>

        <div className="mt-8">
        {_features.map((f: any, index: number) => {
          return <div key={index} className="feature-item flex items-center">
            {f.icon}
            <div className="infos"> 
              <div className="label">
                {f.label}
              </div>
              <div className="descirption">
                {f.descirption}
              </div>
            </div>
          </div>
        })}
        </div>
      </div>
      <div className="w-3/6 pl-12 auth-form px-6 py-3 rounded border h-fit">
      <DetailsTitle title = "Nouveau membre ?" />
      <p>Enregistrez votre compte sur 6tims.com et vous pourrez commencer à acheter vos produits. Suivez toutes les étapes pour terminer l'enregistrement.</p>

        <div className="flex w-full items-center address-form flex-wrap mt-4">
          <div className="w-1/2 pr-2">
            <div className="label">Prénom(s)</div>
            <input type="text" placeholder="Prénom(s)" 
            value={user.firstName}
            onChange={e => setUser({...user, firstName: e.target.value})}
            className="address-form-input"/>
          </div>
        
        <div className="w-1/2 pl-2">
          <div className="label">Nom</div>
          <input type="text" placeholder="Nom" 
          value={user.lastName}
          onChange={e => setUser({...user, lastName: e.target.value})}
          className="address-form-input"/>
          </div>
        </div>

        <div className="flex w-full items-center address-form flex-wrap mt-4">
          <div className="w-2/3 pr-2">
            <div className="label">Adresse e-mail</div>
          <input type="text" placeholder="Adresse e-mail" 
          value={user.email}
          onChange={e => setUser({...user, email: e.target.value})}
          className="address-form-input"/>
          </div>
        
        <div className="w-1/3 pl-2">
          <div className="label">Genre</div>
          <select name="" id="" 
          value={user.gender} 
          onChange={e => setUser({...user, gender: e.target.value})}
          className="address-form-input">
            <option value={'man'}>Homme</option>
            <option value={'woman'}>Femme</option>
          </select>
          </div>
        </div>

        <div className="flex w-full items-center address-form flex-wrap mt-4">
            <div className="label">Phone number</div>
            <PhoneInput
            country={'ma'}
            enableLongNumbers
            enableSearch
            searchPlaceholder="Rechercher le pays"
            autocompleteSearch
            onChange={(value: any, country: any, e: any, formattedValue: string) => { 
              setUser({...user, numbers: [formattedValue],
              addresses: [{...user.addresses[0], country: country?.name}]
              })
            }}
          />
        </div>

        <div className="flex w-full items-center address-form flex-wrap mt-4">
          <div className="w-full">
            <div className="label">Ville</div>
            <input type="text" placeholder="Ville" 
            value = {user.addresses.length ? user.addresses[0]?.city : ''}
            onChange={e => setUser({...user, addresses: [{...user.addresses[0], city: e.target.value}]})}
            className="address-form-input"/>
          </div>
        </div>

        <div className="flex w-full items-center address-form flex-wrap mt-4">
          <div className="w-full">
            <div className="label">Adresse</div>
            <input type="text" placeholder="Adresse" 
            value = {user.addresses.length ? user.addresses[0]?.location : ''}
            onChange={e => setUser({...user, addresses: [{...user.addresses[0], location: e.target.value}]})}
            className="address-form-input"/>
          </div>
        </div>

        <div className="flex w-full items-center address-form flex-wrap mt-4">
          <div className="w-1/2 pr-2">
            <div className="label">Mot de passe</div>
          <input type="password" placeholder="Mot de passe" 
          value = {user.password}
          onChange={e => setUser({...user, password: e.target.value})}
          className="address-form-input"/>
          </div>
        
        <div className="w-1/2 pl-2">
          <div className="label">Répéter le mot de passe</div>
          <input type="password" placeholder="Confirmation" 
          value = {user.confirm}
          onChange={e => setUser({...user, confirm: e.target.value})}
          className="address-form-input"/>
          </div>
        </div>

        <div className="flex justify-beween items-center mt-4">
          <div className="w-3/6">
          <FullButton
          disabled={
            !user.lastName ||
            !user.firstName ||
            !user.email ||
            (user.numbers.length && !user.numbers[0]) ||
            (user.addresses.length && !user.addresses[0].country) ||
            (user.addresses.length && !user.addresses[0].city) ||
            (user.addresses.length && !user.addresses[0].location) ||
            !user.password ||
            !user.confirm ||
            user.password !== user.confirm
          }
          background="#E73A5D"
          label={<>{loading ?  <Spinner animation="grow" style={{width: 17, height: 17}}/> : 'Créer votre compte'}</>}
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
                label={<> Se connecter </>}
                color="#5A7184"
                size = {14}
                weight = {500}
                func={(e: any) => navigate('/login')}
                radius = {8}
                />
          </div>
        </div>
      </div>
    </div>

    <div className="w-full mt-12">
  
  <div className="auth-header text-center">
    Trusted by leading brand in the world
    </div>
  <PartnerLists/>
  </div>
  </div>;
}

export default RegisterPage;
