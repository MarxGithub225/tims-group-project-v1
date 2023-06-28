import { Fragment } from 'react'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { Heart, MessageSquare, Share2 } from 'react-feather'
import { Card, CardBody, CardText, Row, Col, UncontrolledTooltip, Input, Label, Button } from 'reactstrap'
import { file_url_file } from '../../../../../../../tims-admin-app/src/utility/baseUrl'


import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const ProfilePosts = ({ data }) => {

  const checkURL = (url) => {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}
  const renderPosts = () => {
    return <><Card className='post'>
    <CardBody>
      <div className='d-flex justify-content-start align-items-center mb-1'>
        <div className='profile-user-info'>
          <h6 className='mb-0'>ID TYPE: {data?.personnalInfo?.IDType}</h6>
          <small className='text-muted'>ID N°: {data?.personnalInfo?.IDNumber}</small>
        </div>
      </div>
      {checkURL(data?.personnalInfo?.IDFile) ? (
              <Zoom><img src={`${file_url_file}/${data?.personnalInfo?.IDFile}`} alt={data?.personnalInfo?.IDNumber} className='img-fluid rounded mb-75' /></Zoom>
            ) : <iframe
            src={`${file_url_file}/${data?.personnalInfo?.IDFile}`}
            width="100%" height="500px"
          ></iframe>}
      
    </CardBody>
  </Card>
  <Card className='post'>
    <CardBody>
      <div className='d-flex justify-content-start align-items-center mb-1'>
        <div className='profile-user-info'>
          <h6 className='mb-0'>BANK: {data?.bankInfo?.bankName} - {data?.bankInfo?.bankCode} / {data?.bankInfo?.iban}</h6>
          <small className='text-muted'>RIB°: {data?.bankInfo?.rib}</small>
        </div>
      </div>
      <CardText>{data?.bankInfo?.ownerFullName}</CardText>
      {checkURL(data?.bankInfo?.ribFile) ? (
              <Zoom><img src={`${file_url_file}/${data?.bankInfo?.ribFile}`} alt={data?.bankInfo?.bankCode} className='img-fluid rounded mb-75' /></Zoom>
            ) : <iframe
            src={`${file_url_file}/${data?.bankInfo?.ribFile}`}
            width="100%" height="500px"
          ></iframe>}
      
    </CardBody>
  </Card>
  </>
  }
  return renderPosts()
}
export default ProfilePosts
