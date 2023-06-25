// ** React Import
import { Fragment, useEffect, useState } from 'react'

import Avatar from '@components/avatar'
// ** Custom Components
import Sidebar from '@components/sidebar'
import { Collapse, CardHeader, CardTitle, Card, CardBody } from 'reactstrap'
// ** Utils

// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { Button, FormGroup, Form, Input, Spinner } from 'reactstrap'

// ** Store & Actions
import {Check, ChevronUp} from 'react-feather'


import { Slide, toast } from 'react-toastify'

import axios from 'axios'
import { base_url } from "@src/utility/baseUrl"

const SidebarBrand = ({ open, toggleSidebar, 
  editMode= false,
  data,
  agencyId
}) => {

  
  const [agencyQty, setQty] = useState([]);

  // ** States
  const [loading, setLoading] = useState(false)
  const [openCollapse, setOpenCollapse] = useState(-1)
  const [askingData, setAskingData] = useState([])
  const [dataFromProduct, setDataFromProduct] = useState([])
  // ** Store Vars
  const handleCollapseToggle = id => {
    if (id === openCollapse) {
      setOpenCollapse(null)
    } else {
      setOpenCollapse(id)
    }
  }
  // ** Vars
  const { handleSubmit } = useForm()

  // ** Function to handle form submit
  const onSubmit = async () => {
    
    setLoading(true)
    await axios.post(`${base_url}asking-supply`, {asking: askingData})
    .then(() => {
      setAskingData([])
      setDataFromProduct([])
      close()
      setLoading(false)
      toast.success(
        <Fragment>
          <div className='toastify-header'>
            <div className='title-wrapper'>
              <Avatar size='sm' color='success' icon={<Check size={12} />} />
              <h6 className='toast-title font-weight-bold'>Demandes envoyées avec succès!</h6>
            </div>
          </div>
        </Fragment>,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
    })

    .catch((error) => {
      let errMessage = "Une erreur s'est produite, merci de réessayer plustard.";
      console.log('Error', error)
      if(error.errors) {
        if(error.errors.name === "ValidationError")
        {
        if(error.errors.label) {
          errMessage = "Une agence existe déjà sous ce libéllé!"
        }
        }
      }

      toast.error(
        errMessage,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
        setLoading(false)
    })
  }

  const close = async () => {
    toggleSidebar(true)
  }

  useEffect(() => {
    ;(async () => {
      try {
        await Promise.all(
          data.map(async (stk) => {
            const queryString = new URLSearchParams({productId: stk.productId?._id}).toString();
            await axios.get(`${base_url}stock-level/agency?${queryString}`).then((response) => {
              stk.agenciesData = response.data.data.filter((rs) => rs._id !== agencyId)
            })
          })
        )
        setDataFromProduct(data);
        
      } catch (error) {
        console.error(error)
      }

      setLoading(false)

    })()
  }, [data])

  const handleInputChangeSerial = (e, key,index) => {
    const { name, value } = e.target;
    const _newVariable = []
    dataFromProduct.forEach((vari, indexItem) => {
      if(indexItem === key) {
        const list = [...vari.agenciesData];
        if(Number(value)<= Number(list[index]['remaindCount']))
        {
          list[index][name] = value;
          vari.agenciesData = list;
        }else toast.warning(
          `Vous ne pouvez commander plus de ${list[index]['remaindCount']} articles chez ce showroom`,
          { transition: Slide, hideProgressBar: true, autoClose: 3000 }
        )
      }
      _newVariable.push(vari)
    })
    setDataFromProduct(_newVariable)
  };
 
  return (
    <Sidebar
      size='lg'
      open={open}
      title={`Demande d'approvisionnement`}
      headerClassName='mb-1'
      contentClassName='pt-0'
      className="width-800"
      toggleSidebar={close}
    >
      <Form onSubmit={handleSubmit(onSubmit)}  autoComplete="off" role="presentation">

     <FormGroup>

          {dataFromProduct.map((vari, key) => {
                return <Card
                className={classnames('app-collapse', {
                  open: openCollapse === key
                })}
                key={key}
              >
                <CardHeader
                  className={classnames('align-items-center', {
                    collapsed: openCollapse !== key
                  })}
                  
                >
                    <CardTitle className='collapse-title' style={{width: '100%', cursor: 'pointer'}}>

                      <div  style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%'
                      }}>

                        <h6 style={{width: '55%'}} onClick={() => handleCollapseToggle(key)}>{vari?.productId?.title}</h6>
                        <h6 style={{width: '30%', margin: '0px 10px'}} onClick={() => handleCollapseToggle(key)}>{vari?.productId?.productId}</h6>

                        <div >
                          <Input
                          name='quantity'
                          id='quantity'
                          placeholder='Quantité'
                          value={vari.remaindCount - vari.inventoryThreshold}
                          disabled
                        />
                        </div>

                      </div>
                      
                    </CardTitle>
                    <ChevronUp onClick={() => handleCollapseToggle(key)} style={{cursor: 'pointer'}} size={14} />
                  
                </CardHeader>
                <Collapse isOpen={openCollapse === key}>
                  <CardBody>
                  <table style={{width: '100%'}}>
                    <thead style={{marginBottom: 20}}>
                      <th>Show room</th>
                      <th className='text-center'>Quantité disponible</th>
                      <th>Quantité à commander</th>
                      <th/>
                    </thead>
                    <tbody>
                      {
                        vari.agenciesData && vari.agenciesData.map((varItem, index) => {
                          return <tr key={index}
                            >
                            <td>
                              <span className='font-weight-bold'>{varItem?.agenceId?.name}</span>
                            </td>
                            <td >
                              <span className='d-flex justify-content-center font-weight-bold'>{varItem?.remaindCount}</span>
                            </td>

                            <td >
                              <Input
                                name='quantity'
                                id='quantity'
                                placeholder='Quantité à commander'
                                value={varItem?.quantity}
                                onChange={(e) => handleInputChangeSerial(e, key, index)}
                                disabled={askingData?.filter((askd) => askd?.agencyId === varItem?.agenceId?._id && askd?.productId === vari?.productId?._id).length}
                              />
                            </td>

                            <td>
                            <Button type='reset' color='secondary' outline
                            disabled={!varItem?.quantity || askingData?.filter(askd =>askd?.agencyId === varItem?.agenceId?._id && askd?.productId === vari?.productId?._id).length}
                            onClick={() => {
                              let list = [...askingData]
                              const askingStock = {
                                agencyId : varItem?.agenceId?._id,
                                askingFrom: agencyId,
                                productId: vari?.productId?._id,
                                quantity: varItem?.quantity,
                                pending: true,
                                resolved: false,
                                declined: false
                              }
                              list.push(askingStock);
                              setAskingData(list)
                            }}
                            >
                                Commander
                            </Button>
                            </td>

                          </tr>
                        })
                      }

                    </tbody>
                  </table>
                  </CardBody>
                </Collapse>
              </Card>
              })}
          
        </FormGroup>


       
      <Button type='submit' className='mr-1' color='primary'
        disabled={
        loading
        ||
        (
          !askingData.length
        )
      }
      >
        {loading ?  <Spinner animation="grow" /> : 'Envoyer les demandes'}
      </Button>
        <Button type='reset' color='secondary' outline onClick={close}>
          {!editMode ? 'Annuler' : 'Fermer'}
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarBrand
