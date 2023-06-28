import { Card, CardBody, CardText, Button, Spinner} from 'reactstrap'
import dateToLocalString from '../../../../../../../tims-admin-app/src/utility/dateToLocalString'
import moment from 'moment'
import {Check} from 'react-feather'
import axios from 'axios'
import { base_url } from "@src/utility/baseUrl"
import { useState } from 'react'
import Avatar from '@components/avatar'
import { Slide, toast } from 'react-toastify'
import { Fragment } from 'react'
import { useParams } from 'react-router-dom'
const ProfileCompany = ({ data, setData }) => {
  const {id}  = useParams()
  const [loading, setLoading] = useState(false)
  const activateAccount = async () => {
    setLoading(true)
    axios.put(`${base_url}partner/update/${id}`, {isActivated: true, isBlocked: false}).then(response => {
      setData(response.data); setLoading(false);
      toast.success(
        <Fragment>
          <div className='toastify-header'>
            <div className='title-wrapper'>
              <Avatar size='sm' color='success' icon={<Check size={12} />} />
              <h6 className='toast-title font-weight-bold'>Profile Activé!</h6>
            </div>
          </div>
        </Fragment>,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
    })
    .catch(() => {setLoading(false);
      let errMessage = "Une erreur s'est produite, merci de réessayer plustard.";
      toast.error(
        errMessage,
         { transition: Slide, hideProgressBar: true, autoClose: 2000 }
       )
    })
  }

  const changeAccountState = async (state) => {
    axios.put(`${base_url}partner/update/${id}`, {isBlocked: state}).then(response => {
      setData(response.data); setLoading(false);
      toast.success(
        <Fragment>
          <div className='toastify-header'>
            <div className='title-wrapper'>
              <Avatar size='sm' color='success' icon={<Check size={12} />} />
              <h6 className='toast-title font-weight-bold'>Enregistrement réussi!</h6>
            </div>
          </div>
        </Fragment>,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
    
    })
    .catch(() => {setLoading(false);
      let errMessage = "Une erreur s'est produite, merci de réessayer plustard.";
      toast.error(
        errMessage,
         { transition: Slide, hideProgressBar: true, autoClose: 2000 }
       )
    })
  }
  return (
    <Card>
      <CardBody>
        <div className='mt-2'>
          <h5 className='mb-75'>Entreprisee:</h5>
          <CardText>{data?.companyInfo?.companyName}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Registre de commerce N°:</h5>
          <CardText>{data?.companyInfo?.commercialRegister}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>N° de compte du contribuable:</h5>
          <CardText>{data?.companyInfo?.taxpayerAccountNumber}</CardText>
        </div>

        <div className='mt-2'>
          {
            !data?.isActivated ? <Button.Ripple color='warning'
            onClick = {() => activateAccount()}
            >
            Activer le compte {loading && <Spinner/>}
          </Button.Ripple>: <Button.Ripple color={!data?.isBlocked ? 'danger': 'success'} 
          onClick = {() => changeAccountState(!data.isBlocked)}
          >
            {!data?.isBlocked ? 'Désactiver': 'Activer'} {loading && <Spinner/>}
          </Button.Ripple>
          }
        </div>
        
      </CardBody>
    </Card>
  )
}

export default ProfileCompany
