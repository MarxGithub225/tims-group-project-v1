// ** React Imports
import { Link, useHistory } from 'react-router-dom'
import { Client } from "@tims-group/sdk";

import useJwt from '@src/auth/jwt/useJwt'
// ** Third Party Components
import { Card, CardBody, Button, Spinner, FormGroup, Label, Input } from 'reactstrap'
import { useState } from 'react';

const config = useJwt.jwtConfig

const token = localStorage.getItem(config.storageTokenKeyName)
const PreviewActions = ({id, data, order }) => {
  const history = useHistory()
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
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(data?.step)

  const sendToShipping = async () => {
    setLoading(true)

   try {
   await Promise.all([
    await client.updateShippingStep(data?._id, {step}),
    await client.updateOrderStep(data?.orderId, {step: step === 1 ? 4: (step === 2 || step === 5) ? 5: step === 4 ? 2 : 3}),
    await client.updateDeliveryNote(data?.deliveryNoteId, {step: (step <=2 || step === 4) ? 1: step === 5  ? 2 :  3})
   ])
    history.push('/stock/deliveries')
    setLoading(false)
   } catch (error) { 
    console.log(error)
    setLoading(false)
   }
    
  }
  return (
    <Card className='invoice-action-wrapper'>
      <CardBody>
       <Button.Ripple color={'warning'}
        block className='mb-75' onClick = {() => history.push(`/sale/delivery-notes/edit/${data?.deliveryNoteId}`)}>
          Imprimer le bon de livraison
        </Button.Ripple>

        <Button.Ripple color={'secondary'}
        disabled = {true}
        block className='mb-75' onClick={() => {
          
        }}>
          Imprimer la facture
        </Button.Ripple>

        <FormGroup>
          <Label for='visibility'>Etat de la livraison</Label>
          <Input type='select' id='visibility' name='visibility' className="mb-75" value={step}
          onChange={e => setStep(Number(e.target.value))}
          >
            <option value='1'>En attente</option>
            <option value='2'>Effectuer la livraison</option>
            <option value='5'>Expédiée</option>
            <option value='3'>Livrée</option>
            <option value='4'>Non éffectuée</option>
          </Input>

          <Button.Ripple color={'primary'}
          block onClick={() => {
            sendToShipping()
          }}>
            Mettre à jour
          </Button.Ripple>
        </FormGroup>
      </CardBody>
    </Card>
  )
}

export default PreviewActions
