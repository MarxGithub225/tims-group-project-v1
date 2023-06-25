// ** Third Party Components
import moment from 'moment'
import { Card, CardBody, CardText, Row, Col, Table } from 'reactstrap'
import themeConfig from '@configs/themeConfig'
import { CheckSquare, Edit2, Eye } from 'react-feather'
import { Link } from 'react-router-dom'
const PreviewCard = ({ data, setDetails }) => {
  return data !== null ? (
    <Card className='invoice-preview-card'>
      <CardBody className='invoice-padding pb-0'>
        {/* Header */}
        <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
          <div>
            <div className='logo-wrapper'>
              <img src={themeConfig.app.appLogoImage} width = {100} alt='logo' />
              <h3 className='text-primary invoice-logo'></h3>
            </div>
            <CardText className='mb-25'>{data.infos.address}</CardText>
            <CardText className='mb-25'>{data.infos.city}</CardText>
            <CardText className='mb-0'>{data.owner.numbers.toString().split(',').join(', ')}</CardText>
          </div>
          <div className='mt-md-0 mt-2'>
            <h4 className='invoice-title'>
              Livraison: <span className='invoice-number'>#{data._id}</span>
            </h4>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>Date:</p>
              <p className='invoice-date'>{moment(data.createdAt).format('DD/MM/YYYY à HH:mm:s')}</p>
            </div>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>Modifié le:</p>
              <p className='invoice-date'>{moment(data.updatedAt).format('DD/MM/YYYY à HH:mm:s')}</p>
            </div>
          </div>
        </div>
        {/* /Header */}
      </CardBody>

      <hr className='invoice-spacing' />

      {/* Address and Contact */}
      <CardBody className='invoice-padding pt-0'>
        <Row className='invoice-spacing'>
          <Col className='p-0' lg='8'>
            <h6 className='mb-2'>Livraison à :</h6>
            <h6 className='mb-25'>{data.owner.firstName}</h6>
            <h6 className='mb-25'>{data.owner.lastName}</h6>
            <CardText className='mb-25'>{data.infos.address}</CardText>
            <CardText className='mb-25'>{data.infos.contact}</CardText>
            <CardText className='mb-0'>{data.owner.email}</CardText>
          </Col>
          <Col className='p-0 mt-xl-0 mt-2' lg='4'>
            <h6 className='mb-2'>Détails de paiement:</h6>
            <table>
              <tbody>
                <tr>
                  <td className='pr-1'>Montant:</td>
                  <td>
                    <span className='font-weight-bolder'>{data.infos.amount}</span>
                  </td>
                </tr>
                <tr>
                  <td className='pr-1'>Frais:</td>
                  <td>
                    <span className='font-weight-bolder'>{data.infos.fees}</span>
                  </td>
                </tr>
                <tr>
                  <td className='pr-1'>Total à payer:</td>
                  <td>
                    <span className='font-weight-bolder'>{data.infos.amount + data.infos.fees}</span>
                  </td>
                </tr>
                <tr>
                  <td className='pr-1'>Méthode:</td>
                  <td>{data.infos.method}</td>
                </tr>
                <tr>
                  <td className='pr-1'>Ville:</td>
                  <td>{data.infos.city}</td>
                </tr>
                
              </tbody>
            </table>
          </Col>
        </Row>
      </CardBody>
      <hr className='invoice-spacing' />

      {/* Address and Contact */}
      <CardBody className='invoice-padding pt-0'>
        <p>Livraison à partir de la commande: <Link
        to={`/service/all-orders/${data.orderId}`}
        className='user-name text-truncate mb-0'
      >
        <span className='font-weight-bold'>{data.orderId}</span>
      </Link></p>
      </CardBody>
    </Card>
  ) : null
}

export default PreviewCard
