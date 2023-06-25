import { Button, Form, Input, Row, Col } from 'reactstrap'
import maintenanceImg from '@src/assets/images/pages/under-maintenance.svg'

import '@styles/base/pages/page-misc.scss'
import Logo from '../../../assets/images/logo-tims-group.png'
const Maintenance = () => {
  return (
    <div className='misc-wrapper'>
      <a className='brand-logo' href='/'>
      <img src={Logo} alt = '' width={100} />
      </a>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>En cours de maintenancee 🛠</h2>
          <p className='mb-3'>Désolé pour la gêne occasionnée mais nous effectuons une maintenance en ce moment</p>
          <img className='img-fluid' src={maintenanceImg} alt='Under maintenance page' />
        </div>
      </div>
    </div>
  )
}
export default Maintenance
