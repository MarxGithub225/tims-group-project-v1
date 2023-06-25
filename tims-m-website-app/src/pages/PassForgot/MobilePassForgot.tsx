import { Fragment, useState } from 'react';

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

function MobilePassForgot() {
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
  {!sent && <div className="w-max-width w-full flex flex-col pb-32">
    <div style = {{marginBottom: 30}}>
        <div
          style = {{
            fontWeight: 'bold',
            textAlign : 'center',
            fontSize: 20
          }}
          >
              Récupérer votre compte
        </div>
      </div>
    <div className="w-full  pl-4 auth-form pr-4 py-3 ">
          <div
                style = {{
                  fontSize : 17,
                  fontFamily : 'Inter',
                  textAlign : 'center',
                  marginBottom : 20,
                }}
          >
              Bienvenue, veuillez saisir votre adresse e-mail pour récupérer votre compte.
          </div>

        <div className="flex w-full items-center address-form flex-wrap mt-4">
        <div className="w-full">
        <div className="label">Adresse e-mail</div>
          <input type="text" placeholder="Adresse e-mail" 
          value={user.email}
          onChange={e => setUser({...user, email: e.target.value})}
          className="address-form-input"/>
        </div>
        </div>

        <div className="flex flex-col items-center mt-4">
          <div className="w-full">
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
          <div className="w-full flex justify-center or-class my-2">
            <span>Ou</span>
          </div>

          <div className="w-full">
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
    </div>

  </div>}
  {sent && <div className="w-full px-6 ">

    <div className="flex flex-col items-center">
        <SuccessIcon className={`${window.innerWidth <=768 ? 'w-16': ''}`} />
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
</div>;
}

export default MobilePassForgot;
