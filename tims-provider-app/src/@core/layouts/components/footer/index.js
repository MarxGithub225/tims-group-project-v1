// ** Icons Import
import { Heart } from 'react-feather'

const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-left d-block d-md-inline-block mt-25'>
        COPYRIGHT © {new Date().getFullYear()}{' '}
        <a href='/' target='_blank' rel='noopener noreferrer'>
          Tims Partenaire
        </a>
        <span className='d-none d-sm-inline-block'>, Tous droits réservés</span>
      </span>
      
    </p>
  )
}

export default Footer
