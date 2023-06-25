import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import notAuthImg from '@src/assets/images/pages/not-authorized.svg'

import '@styles/base/pages/page-misc.scss'
import Logo from '../../../assets/images/logo-tims-group.png'
const NotAuthorized = () => {
  return (
    <div className='misc-wrapper'>
      <a className='brand-logo' href='/'>
      <img src={Logo} alt = '' width={100} />
      </a>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>Vous n'êtes pas autorisé! 🔐</h2>
          <p className='mb-2'>
          Le site Web Webtrends Marketing Lab dans IIS utilise les informations d'identification du compte IUSR par défaut pour accéder aux pages Web
            ça sert.
          </p>
          <Button tag={Link} to='/login' color='primary' className='btn-sm-block mb-1'>
            Retour à la connexion
          </Button>
          <img className='img-fluid' src={notAuthImg} alt='Not authorized page' />
        </div>
      </div>
    </div>
  )
}
export default NotAuthorized
