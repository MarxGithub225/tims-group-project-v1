import React, { Fragment, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FullButton from "../../components/Buttons/FullButton";
import {ReactComponent as Facebook} from '../../assets/icons/Facebook.svg'
import {ReactComponent as Twitter} from '../../assets/icons/Twitter.svg'
import {ReactComponent as Google} from '../../assets/icons/Google.svg'
import PartnerLists from "../../screens/PartnerLists";
import { useAppDispatch } from "../../redux/hooks";
import { login } from "../../redux/features/authSlice";

import { Slide, toast } from 'react-toastify'

import axios from 'axios'
import { base_url } from "../../utils/baseUrl";
import { Spinner } from "reactstrap";

function MobileLogin() {
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
              <h6 className='toast-title font-weight-bold'>Enregistrement réussi!</h6>
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
  <div className="w-max-width w-full flex flex-col pb-32">
    <div style = {{marginBottom: 30}}>
        <div
          style = {{
            fontWeight: 'bold',
            textAlign : 'center',
            fontSize: 20
          }}
          >
              Connexion
        </div>

        <div
        className="flex items-center justify-center space-x-2"
        style = {{
          fontSize : 15,
          fontFamily : 'Inter',
          marginRight : 5,
          textAlign: 'center'
        }}
        >
            <span>Vous n'avez pas de compte ?</span> <div onClick={() => navigate('/register')} style = {{fontSize : 15, fontWeight:'bold',textAlign : 'center', color: '#E73A5D'}}>s'inscrire </div>
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
              Veuillez renseigner vos identifiants
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

      <div className="flex justify-beween justify-center mt-4">
        <FullButton
        customClass="w-full"
          disabled={
            !user.email ||
            !user.password
          }
          background="#E73A5D"
          label={<>{loading ?  <Spinner animation="grow" style={{width: 17, height: 17}}/> : 'Connexion'}</>}
          color="#FFFFFF"
          size = {14}
          weight = {500}
          func={(e: any) => onSubmit()}
          radius = {50}
          />

      </div>
    </div>

    <div className="mb-4">
      <div 
      className="w-full flex items-center justify-center mb-3"
      >
        <div style = {{fontSize: 15, fontFamily: 'Inter'}}>Ou se connecter avec</div>
      </div>
      <div
      className="w-full flex items-center justify-center space-x-10"
      
      >

            <div className="flex items-center justify-center"
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#4267B2',
              borderRadius: '50%',
              fontSize: 15,
              color: '#fff'
            }}
            >
              <Facebook/>
            </div>

            <div className="flex items-center justify-center"
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#1DA1F2',
              borderRadius: '50%',
              fontSize: 15,
              color: '#fff'
            }}
            >
              <Twitter/>
            </div>

            <div className="flex items-center justify-center"
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#EA4335',
              borderRadius: '50%',
              fontSize: 15,
              color: '#fff'
            }}
            >
              <Google/>
            </div>

      </div>
    </div>

    <div
    style = {{
      fontSize : 12,
      fontFamily : 'Inter',
      textAlign : 'center',
    }}
    >
        En connectant votre compte, vous confirmez que vous êtes d'accord avec <span onClick={() => navigate('/terms-and-privacy')} style = {{ fontSize : 15, fontWeight : 'bold', color: '#E73A5D'}} >nos termes et conditions.</span>
        
    </div>
  </div>


 
</div>;
}

export default MobileLogin;
