import { useState, useContext, Fragment } from 'react'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
import { handleLogin } from '@store/actions/auth'
import { AbilityContext } from '@src/utility/context/Can'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils'
import { Coffee } from 'react-feather'
import {
  CardTitle,
  CardText,
  Form,
  Input,
  FormGroup,
  Label,
  CustomInput,
  Button,
  Card,
  CardBody,
  Spinner
} from 'reactstrap'

import '@styles/base/pages/page-auth.scss'
import Logo from '../../../assets/images/logo-tims-group.png'
import axios from "axios"
import { base_url } from "@src/utility/baseUrl"
import { config } from "@src/utility/axiosconfig"
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        <h6 className='toast-title font-weight-bold'>Bienvenue, {name}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>Vous vous êtes connecté avec succès en tant qu'utilisateur {role} à Tims Partenaire Gestion. Vous pouvez maintenant commencer à explorer. Prendre plaisir!</span>
    </div>
  </Fragment>
)

const Login = props => {
  const search = useLocation().search;
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { register, errors, handleSubmit } = useForm()

  const onSubmit = data => {
    let body = {}

    if(!search) {
      body = {
        email, password
      }
    }else {
      body = {
        email, 
        password,
        addAccess: true
      }
    }
    setLoading(true)
    if (isObjEmpty(errors)) {
        axios.post(`${base_url}partner/login`, body)
        .then(res => {
          const data = { ...res.data, ability: [
            {
              action: 'manage',
              subject: 'all'
            }
          ], accessToken: res.data.token}
          dispatch(handleLogin(data))
          ability.update([
            {
              action: 'manage',
              subject: 'all'
            }
          ])
          history.push(getHomeRouteForLoggedInUser('admin'))
          toast.success(
            <ToastContent name={data.personnalInfo.fullName} role={'partenaire TIMS'} />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
        })
        .catch((err) => { console.log(err.errors);
          axios.interceptors.response.use(
            response => response,
            error => {
              // ** const { config, response: { status } } = error
              const { config, response } = error
              const originalRequest = config
              // ** if (status === 401) {

              if (response && response.data?.message === "Account Not Validated Yet") {
                toast.info(
                  <Fragment>
                    <div className='toastify-header'>
                      <div className='title-wrapper'>
                        <h6 className='toast-title font-weight-bold'>Votre compte est toujours en compte de vérification!</h6>
                      </div>
                    </div>
                  </Fragment>,
                  { transition: Slide, hideProgressBar: true, autoClose: 10000 }
                )
                
                return null
              }else {
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
              }
              return Promise.reject(error)
            }
          )
          setLoading(false)
          })
    }else {setLoading(false)}
  }
useEffect(() => {
  if(search) {
    setEmail(new URLSearchParams(search).get('email'))
    setPassword('1234@@')
  }
}, [search])
  return (
<div className='auth-wrapper auth-v1 px-2'>
<div className='auth-inner py-2'>
  <Card className='mb-0'>
    <CardBody>
      <Link className='brand-logo'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      to='/' onClick={e => e.preventDefault()}>
        <img src={Logo} alt = '' width={100} />
      </Link>
      <CardTitle tag='h4' className='mb-1'>
      Bienvenu cher partenaire! 👋
      </CardTitle>
      <CardText className='mb-2'>Veuillez vous connecter à votre compte et commencer l'aventure</CardText>
      <Form className='auth-login-form mt-2' autoComplete="off" role="presentation" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label className='form-label' for='login-email'>
            E-mail
          </Label>
          <Input
            autoFocus
            type='email'
            value={email}
            id='login-email'
            name='login-email'
            placeholder='Adresse e-mail'
            onChange={e => setEmail(e.target.value)}
            className={classnames({ 'is-invalid': errors['login-email'] })}
            innerRef={register({ required: true, validate: value => value !== '' })}
          />
        </FormGroup>
        <FormGroup>
          <div className='d-flex justify-content-between'>
            <Label className='form-label' for='login-password'>
              Mot de passe
            </Label>
            <Link to='/forgot-password'>
              <small>Mot de passe oublié?</small>
            </Link>
          </div>
          <InputPasswordToggle 
          value={password}
          id='login-password'
          name='login-password'
          className='input-group-merge'
          onChange={e => setPassword(e.target.value)}
          className={classnames({ 'is-invalid': errors['login-password'] })}
          innerRef={register({ required: true, validate: value => value !== '' })}
          />
        </FormGroup>
        <Button.Ripple color='primary' block type='submit'
        disabled ={
          !email || !password
        }
        >
        Se connecter {loading && <Spinner/>}
        </Button.Ripple>
      </Form>
      <p className='text-center mt-2'>
      <span className='align-middle'>Je suis nouveau sur Tims Partner</span>
        <Link to='/register'>
          <span className='align-middle'> M'inscrire</span>
        </Link>
      </p>
    </CardBody>
  </Card>
</div>
</div>
  )
}

export default Login
