import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Third Party Components
import axios from 'axios'
import { Row, Col, Alert, Spinner } from 'reactstrap'

// ** Invoice Preview Components
import PreviewCard from './PreviewCard'
import PreviewActions from './PreviewActions'
import SendInvoiceSidebar from '../shared-sidebar/SidebarSendInvoice'
import AddPaymentSidebar from '../shared-sidebar/SidebarAddPayment'
import { Client } from "@tims-group/sdk";

import useJwt from '@src/auth/jwt/useJwt'

// ** Styles
import '@styles/base/pages/app-invoice.scss'

const config = useJwt.jwtConfig

const token = localStorage.getItem(config.storageTokenKeyName)
const InvoicePreview = () => {

  // ** Configure SDK Client
const apiUrl = process.env.REACT_APP_API_BASE_URL + "/api/v1";
const client = new Client({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${token}`,
    getNewToken: useJwt.refreshToken()
  },
});
client.configure();

  // ** Vars
  const { id } = useParams()

  // ** States
  const [order, setOrder] = useState(null)
  const [data, setData] = useState(null)
  const [details, setDetails] = useState(null)
  const [sendSidebarOpen, setSendSidebarOpen] = useState(false)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  // ** Functions to toggle add & send sidebar
  const toggleSendSidebar = () => setSendSidebarOpen(!sendSidebarOpen)
  const toggleAddSidebar = () => setAddPaymentOpen(!addPaymentOpen)

  // ** Get invoice on mount based on id
  useEffect(() => {
    ;(async () => {
      try {
        const order = await client.getShippingById(id)
        setOrder(order.infos)
        setData({...order})
      } catch (error) {
        console.error(error)
      }
      setLoading(false)

    })()
  }, [])

  useEffect(() => {
    if(details) {
      toggleAddSidebar()
    }
  }, [details])

  return  loading ? <Spinner/> :
  data !== null ? (
    <div className='invoice-preview-wrapper'>
      <Row className='invoice-preview'>
        <Col xl={9} md={8} sm={12}>
          <PreviewCard data={data} setDetails = {setDetails} />
        </Col>
        <Col xl={3} md={4} sm={12}>
          <PreviewActions data={data} id = {id} order = {order} />
        </Col>
      </Row>
      <SendInvoiceSidebar toggleSidebar={toggleSendSidebar} open={sendSidebarOpen} />
      <AddPaymentSidebar toggleSidebar={toggleAddSidebar} open={addPaymentOpen} details = {details} data = {data} setData = {setData} setDetails = {setDetails}/>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>Commande non trovée</h4>
      <div className='alert-body'>
        Une commande avec ID: {id} n'existe pas.data
      </div>
    </Alert>
  )
}

export default InvoicePreview
