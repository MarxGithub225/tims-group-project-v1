import { Fragment, useState } from 'react';
import {ReactComponent as CarIcon} from '../../assets/icons/features/CarIcon.svg'
import {ReactComponent as HeadPhone} from '../../assets/icons/features/HeadPhone.svg'
import {ReactComponent as MoneyIcon} from '../../assets/icons/features/MoneyIcon.svg'

import {ReactComponent as SuccessIcon} from '../../assets/icons/SuccessIcon.svg'
import {ReactComponent as ArrowIcon} from '../../assets/icons/ArrowIcon.svg'

import FullButton from "../../components/Buttons/FullButton";
import DetailsTitle from "../../components/Details/DetailsTitle";
import PartnerLists from "../../screens/PartnerLists";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Slide } from 'react-toastify';
import { base_url } from '../../utils/baseUrl';
import { Spinner } from 'reactstrap';

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

function ForgotPassPage() {

  const [user, setUser] = useState({
    email: ''
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const onSubmit = async () => {
    setLoading(true)
    await axios.post(`${base_url}user/forgot-password-token`, user)
    .then((response): any => {
      setUser({
        email: ''
      });
      setLoading(false)
      if(response && response.data) {
        setSent(true)
      }
    })
    .catch((error) => {
        axios.interceptors.response.use(
          response => response,
          error => {
            const { config, response } = error
            if (response && response.data?.message === "User not found with this email") {
              toast.error(
                <Fragment>
                  <div className='toastify-header'>
                    <div className='title-wrapper'>
                      <h6 className='toast-title font-weight-bold'>Cet utilisateur n'existe pas!</h6>
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
  <div className="w-max-width w-full flex justify-between">
    <div className="w-2/5 px-6 py-3 ">
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
    {!sent && <div className="w-3/6 pl-12 auth-form px-6 py-3 rounded border h-fit">
    <DetailsTitle title = "Récupérer votre compte" />
    <p>Bienvenue, veuillez saisir votre adresse e-mail pour récupérer votre compte.</p>

      <div className="flex w-full items-center address-form flex-wrap mt-4">
        <div className="w-full">
        <div className="label">Adresse e-mail</div>
        <input type="text" placeholder="Adresse e-mail" 
          value={user.email}
          onChange={e => setUser({...user, email: e.target.value})}
          className="address-form-input"/>
        </div>
        </div>


      <div className="flex justify-beween items-center mt-4">
        <div className="w-3/6">
        <FullButton
              background="#E73A5D"
              disabled={
                !user.email
              }
              label={<>{loading ?  <Spinner animation="grow" style={{width: 17, height: 17}}/> : 'Envoyer un email'}</>}
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
              label={<>Se connecter</>}
              color="#5A7184"
              size = {14}
              weight = {500}
              func={(e: any) => navigate('/login ')}
              radius = {8}
              />
        </div>
      </div>
    </div>}

    {sent && <div className="w-3/6 pl-12 px-6 py-3">

    <div className="flex flex-col items-center">
        <SuccessIcon />
        <div className="state-header">Message envoyé !</div>
        <div className="state-message">
        Un lien vous a été envoyé dans votre boîte de messagérie, Merci de suivre les instructions. </div>

        <div className="flex flex-col laptop:flex-row space-y-4 laptop:space-y-0 items-center mt-8">
          <div className="back flex items-center mr-12 cursor-pointer" onClick={() => navigate('/login')}>
          <ArrowIcon className="transform rotate-90 mr-3 back-icon-class"/> Retour à la connecion
          </div>
        </div>
      </div>
    </div>}
  </div>

  <div className="w-full mt-12">
  
  <div className="auth-header text-center">
    Trusted by leading brand in the world
    </div>
  <PartnerLists/>
  </div>

 
</div>;
}

export default ForgotPassPage;
