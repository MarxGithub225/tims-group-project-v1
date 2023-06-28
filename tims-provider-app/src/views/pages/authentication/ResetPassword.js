import { Link } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'
import InputPassword from '@components/input-password-toggle'
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import Logo from '../../../assets/images/logo-tims-group.png'
const ResetPassword = () => {
  return (
    <div className='auth-wrapper auth-v1 px-2'>
      <div className='auth-inner py-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
            <img src={Logo} alt = '' width={100} />
            </Link>
            <CardTitle tag='h4' className='mb-1'>
            Réinitialiser le mot de passe 🔒
            </CardTitle>
            <CardText className='mb-2'>Votre nouveau mot de passe doit être différent des mots de passe précédemment utilisés</CardText>
            <Form className='auth-reset-password-form mt-2' onSubmit={e => e.preventDefault()}>
              <FormGroup>
                <Label className='form-label' for='new-password'>
                Nouveau mot de passe
                </Label>
                <InputPassword className='input-group-merge' id='new-password' autoFocus />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='confirm-password'>
                Confirmez le mot de passe
                </Label>
                <InputPassword className='input-group-merge' id='confirm-password' />
              </FormGroup>
              <Button.Ripple color='primary' block>
              Definir un nouveau mot de passe
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
}

export default ResetPassword
