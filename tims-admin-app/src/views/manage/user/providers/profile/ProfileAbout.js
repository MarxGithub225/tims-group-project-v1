import { Card, CardBody, CardText } from 'reactstrap'
import dateToLocalString from '../../../../../../../tims-admin-app/src/utility/dateToLocalString'
import moment from 'moment'
const ProfileAbout = ({ data }) => {
  return (
    <Card>
      <CardBody>
        <div className='mt-2'>
          <h5 className='mb-75'>Inscrit le:</h5>
          <CardText>{moment(dateToLocalString(new Date(data?.createdAt).getTime()), 'DD/MM/YYYY hh:mm').format("DD-MM-YYYY à hh:mm")}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Manager:</h5>
          <CardText>{data?.personnalInfo?.fullName}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Email:</h5>
          <CardText>{data?.email}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Téléphone:</h5>
          <CardText>{data?.personnalInfo?.number}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>Adresse:</h5>
          <CardText>{data?.locationInfo?.countryEmoji} {data?.locationInfo?.countryName}, {data?.locationInfo?.cityName} - {data?.locationInfo?.postalCode}</CardText>
        </div>
      </CardBody>
    </Card>
  )
}

export default ProfileAbout
