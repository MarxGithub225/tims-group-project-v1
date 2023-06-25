import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import errorImg from '@src/assets/images/pages/error.svg'

import '@styles/base/pages/page-misc.scss'
import Logo from '../../../assets/images/logo-tims-group.png'
const Error = () => {
  return (
    <div className='misc-wrapper'>
      <a className='brand-logo' href='/'>
      <img src={Logo} alt = '' width={100} />
      </a>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>Page non trouvée 🕵🏻‍♀️</h2>
          <p className='mb-2'>Oops! 😖 L'URL demandée est introuvable sur ce serveur.</p>
          <Button tag={Link} to='/' color='primary' className='btn-sm-block mb-2'>
          Retour
          </Button>
          <img className='img-fluid' src={errorImg} alt='Not authorized page' />
        </div>
      </div>
    </div>
  )
}
export default Error
