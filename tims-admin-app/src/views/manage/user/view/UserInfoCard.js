// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { Card, CardBody, CardText, Button, Row, Col, CardHeader, Badge, UncontrolledTooltip } from 'reactstrap'
import { DollarSign, TrendingUp, User, Check, Star, Flag, Phone } from 'react-feather'
import moment from 'moment'
import dateToLocalString from '../../../../utility/dateToLocalString'

const UserInfoCard = ({ selectedUser }) => {
  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser.image && selectedUser.image.length) {
      return <img src={`${process.env.REACT_APP_YEPIA_STATIC}${selectedUser.image}`} alt='user-avatar' className='img-fluid rounded' height='54' width='54' />
    } else {
      const stateNum = Math.floor(Math.random() * 6),
        states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
        color = states[stateNum]
      return (
        <Avatar
          initials
          color={color}
          className='rounded'
          content={selectedUser.fullName}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(36px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '90px',
            width: '90px'
          }}
        />
      )
    }
  }

  return (
    <Card>
      <CardBody>
        <Row>
          <Col xl='6' lg='12' className='d-flex flex-column justify-content-between border-container-lg'>
            <div className='user-avatar-section'>
              <div className='d-flex justify-content-start'>
                {renderUserImg()}
                <div className='d-flex flex-column ml-1'>
                  <div className='user-info mb-1'>
                    <h4 className='mb-0'>{selectedUser !== null ? selectedUser.fullName : ''}</h4>
                    <CardText tag='span'>
                      {selectedUser !== null ? selectedUser.email : ''}
                    </CardText>
                  </div>
                  <div className='d-flex flex-wrap align-items-center'>
                    <Button.Ripple color='primary'>
                    {selectedUser !== null ? selectedUser.role : ''}
                    </Button.Ripple>
                    
                  </div>
                </div>
              </div>
            </div>
            
          </Col>
          <Col xl='6' lg='12' className='mt-2 mt-xl-0'>
            <div className='user-info-wrapper'>
             
              <div className='d-flex flex-wrap align-items-center'>
                <div className='user-info-title'>
                  <Phone className='mr-1' size={14} />
                  <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                    Contact
                  </CardText>
                </div>
                <CardText className='mb-0'>{selectedUser !== null ? selectedUser.numbers.toString() : '(123) 456-7890'}</CardText>
              </div>

              <CardHeader className='d-flex justify-content-between align-items-center pt-75 pb-1'>
              <h5 className='mb-0'>Inscrit le: </h5>
              <Badge id='plan-expiry-date' color='light-secondary'>
                {selectedUser !== null ? moment(dateToLocalString(new Date(selectedUser.createdAt).getTime()), 'DD/MM/YYYY hh:mm').format("DD-MM-YYYY à hh:mm") : '-'}
              </Badge>
              
            </CardHeader>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default UserInfoCard
