import { isUserLoggedIn } from '@utils'
import { useSkin } from '@hooks/useSkin'
import { ChevronLeft } from 'react-feather'
import { Link, Redirect } from 'react-router-dom'
import {Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import Avatar from '@components/avatar'
import Logo from '../../../assets/images/logo-tims-group.png'

import { Slide, toast } from 'react-toastify'
import { Check } from 'react-feather'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { isObjEmpty } from '@utils'
import classNames from 'classnames'
const ForgotPassword = () => {
  const { register, errors, handleSubmit } = useForm()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  
  const [skin, setSkin] = useSkin()

  const illustration = skin === 'dark' ? 'forgot-password-v2-dark.svg' : 'forgot-password-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  if (!isUserLoggedIn()) {
    return (

<div className='auth-wrapper auth-v1 px-2'>
<div className='auth-inner py-2'>
  <Card className='mb-0'>
    <CardBody>
      <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
      <img src={Logo} alt = '' width={100} />
      </Link>
      <CardTitle tag='h4' className='mb-1'>
      Mot de passe oublié? 🔒
      </CardTitle>
      <CardText className='mb-2'>
      Entrez votre email et nous vous enverrons des instructions pour réinitialiser votre mot de passe
      </CardText>
      <Form className='auth-forgot-password-form mt-2' onSubmit={e => e.preventDefault()}>
        <FormGroup>
          <Label className='form-label' for='login-email'>
          Adresse email
          </Label>
          <Input type='email' id='login-email' placeholder='john@example.com' autoFocus />
        </FormGroup>
        <Button.Ripple color='primary' block>
        Envoyer le lien de réinitialisation
        </Button.Ripple>
      </Form>
      <p className='text-center mt-2'>
      <Link to='/login'>
          <ChevronLeft className='mr-25' size={14} />
          <span className='align-middle'>Retour à la connexion</span>
        </Link>
      </p>
    </CardBody>
  </Card>
</div>
</div>
    )
  } else {
    return <Redirect to='/' />
  }
}

export default ForgotPassword
