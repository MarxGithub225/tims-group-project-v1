import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Card, CardBody, Row, Col, Form, FormGroup, Label, Input, CustomInput, Modal, ModalBody, ModalHeader, Button, Spinner, Table, CardText } from 'reactstrap'

import useJwt from '@src/auth/jwt/useJwt'

import ReactQuill, {Quill} from 'react-quill';
import { CheckCircle, ChevronDown, Codesandbox, PlayCircle, Plus, PlusCircle, Target, Trash, Trash2, UserX, X } from 'react-feather';
import Select from 'react-select';
import dateToLocalString from '../../../utility/dateToLocalString';
import moment from 'moment';
import { useForm } from 'react-hook-form';

import Avatar from '@components/avatar'
import {Check} from 'react-feather'
import { Slide, toast } from 'react-toastify'
import { useHistory, useParams } from 'react-router-dom';
import AsyncSelect from "react-select/async";
import { Password, randomChar } from '../../../utility/helper';

import ImageResize from 'quill-image-resize-module-react';
import BlotFormatter from 'quill-blot-formatter';
import classnames from 'classnames'
import { useDispatch } from 'react-redux';
import { setDefaultPurchase } from './store/actions';

const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
const CheckIconLabel = () => (
  <Fragment>
    <span className='switch-icon-left'>
      <CheckCircle size={14} />
    </span>
    <span className='switch-icon-right'>
      <X size={14} />
    </span>
  </Fragment>
)

const UserIconLabel = () => (
  <Fragment>
    <span className='switch-icon-left'>
      <UserX size={14} />
    </span>
    <span className='switch-icon-right'>
      <X size={14} />
    </span>
  </Fragment>
)


const varSetting = {
  provider : {value: '', label: 'Choisir'},
  brand : {value: '', label: 'Choisir'},
  productId : '',
  serial: '',
  price: 0,
  arrivalDate : new Date().getTime(),
  bougth: false,
  problem: false
}



function ProductForm() {
  let quillObj;
  const quillRef = useRef();
  const {id} = useParams()
  const history = useHistory()
  const modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }]
    ]
  }


  const formats = [
    'background',
    'bold',
    'color',
    'font',
    'code',
    'italic',
    'link',
    'size',
    'strike',
    'script',
    'underline',
    'blockquote',
    'header',
    'indent',
    'list',
    'align',
    'direction',
    'code-block',
    'image',
    'video',
  ];

  
  const dispatch = useDispatch()
  let timer = useRef()
  const [userModal, setUserModal] = useState(false)
  const [shippingModal, setShippingModal] = useState(false)
  const [billingModal, setBillingModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const [notes, setNotes] = useState('')
  const [search, setSearch] = useState("")
  const [loadingData, setLoadingData] = useState(true)
  const [user, setUser] = useState(null)
  const [order, setOrder] = useState(null)
  const [products, setProducts] = useState([]);
  const [variables, setVariables] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [total, setSum] = useState(0);
  const [allocated, setAllocated] = useState(false);
  const [billCreated, setBillCreated] = useState(false);
  
  
  // ** Vars
  const { register, errors, handleSubmit } = useForm()
  
  const [userForm, setUserForm] = useState({
    lastName: '',
    firstName: '',
    email: '',
    numbers: [],
    isActivated: true,
    isDeleted: false,
    defaultAgency : JSON.parse(localStorage.getItem('tims-group-admin-user-data'))?.agenceId,
    role : 'user',
    password : Password.generate(16)
  });

  const [shippingForm, setShippingForm] = useState({
    location: '',
    numbers: "",
    date: new Date().getTime(),
    cost: 0
  });

  const [billingForm, setBillingForm] = useState({
    location: '',
    numbers: ""
  });


  const smallDescriptionChange = (content, delta, source, editor) => {
    setNotes(editor.getHTML())
  }


  useEffect(() => {
    if(id) {
      ;(async () => {
        try {
          const order = await client.getPurchaseById(id);
          setOrder(order)
          setBillingForm(order?.billingAddress)
          setShippingForm(order?.shippingAddress)
          setUser(order?.user)
          setNotes(order?.notes)
          setSelectedProduct(order?.products)
          setAllocated(order?.allocated)
          setBillCreated(order?.billCreated)

          let sum = 0;
          for (let index = 0; index < order?.products?.length; index++) {
            sum += (((100 - Number(order?.products[index].discount)) * order?.products[index].cost)/100);
          }
          setSum(sum)
          
        } catch (error) {
          console.error(error)
        }
        setLoadingData(false)
        setLoading(false)
  
      })()
    }
  }, [id])

  const toogleUserModal = () => {
    setUserModal(!userModal)
  }

  const toogleBillingModal = () => {
    setBillingModal(!billingModal)
  }
  const toogleShippingModal = () => {
    setShippingModal(!shippingModal)
  }

  const validate= async () => {
    setLoading(true)

    const data = {
      shippingAddress : shippingForm,
      billingAddress : billingForm,
      products: selectedProduct,
      notes: notes,
      user: user
    }
    if(!id) {
      await client.createPurchase(data)
        .then((response) => {
          setLoading(false)
          history.push('/sale/purchase-orders')
          toast.success(
            <Fragment>
              <div className='toastify-header'>
                <div className='title-wrapper'>
                  <Avatar size='sm' color='success' icon={<Check size={12} />} />
                  <h6 className='toast-title font-weight-bold'>Enregistrement réussi!</h6>
                </div>
              </div>
            </Fragment>,
            { transition: Slide, hideProgressBar: true, autoClose: 5000 }
          )
        })

        .catch((error) => {
          let errMessage = "Une erreur s'est produite, merci de réessayer plustard.";
          console.log('Error', error)
          if(error.errors) {
            if(error.errors.name === "ValidationError")
           {
            if (error.errors.email) {
              errMessage = "Un utilisateur existe déjà avec cette adresse email!"
            }
           }
          }

          toast.error(
            errMessage,
             { transition: Slide, hideProgressBar: true, autoClose: 2000 }
           )
           setLoading(false)
        })
    }else await client.updatePurchase(id, data)
    .then((response) => {
      setLoading(false)
      toast.success(
        <Fragment>
          <div className='toastify-header'>
            <div className='title-wrapper'>
              <Avatar size='sm' color='success' icon={<Check size={12} />} />
              <h6 className='toast-title font-weight-bold'>Enregistrement réussi!</h6>
            </div>
          </div>
        </Fragment>,
        { transition: Slide, hideProgressBar: true, autoClose: 5000 }
      )
    })

    .catch((error) => {
      let errMessage = "Une erreur s'est produite, merci de réessayer plustard.";
      console.log('Error', error)
      if(error.errors) {
        if(error.errors.name === "ValidationError")
       {
        if (error.errors.email) {
          errMessage = "Un utilisateur existe déjà avec cette adresse email!"
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
  const onSubmitUser = async () => {
   
    setLoading(true)
    await authClient.register({...userForm, defaultAgency : JSON.parse(localStorage.getItem('tims-group-admin-user-data'))?.agenceId, role: 'user'})
        .then((response) => {
          setUser({
            value: response.data._id,
            label: response.data.fullName,
            id: response.data._id,
            email: response.data.email,
            firstName: response.data.firstName,
            fullName: response.data.fullName,
            lastName: response.data.lastName,
            numbers: response.data.numbers
          })
          setUserForm({
            lastName: '',
            firstName: '',
            email: '',
            numbers: [],
            isActivated: true,
            isDeleted: false,
            defaultAgency : '',
            role : '',
            password : Password.generate(16)
          });

          toogleUserModal()
          setLoading(false)
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

        .catch((error) => {
          let errMessage = "Une erreur s'est produite, merci de réessayer plustard.";
          console.log('Error', error)
          if(error.errors) {
            if(error.errors.name === "ValidationError")
           {
            if (error.errors.email) {
              errMessage = "Un utilisateur existe déjà avec cette adresse email!"
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


  const removeVariable =  (varItem) => {
      const list = [...selectedProduct];
      list.splice(varItem, 1);

      setSelectedProduct (list);
  }


  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...selectedProduct];
      list[index][name] = value;
      setSelectedProduct (list);
  };

  const getSelectData = (data) => {
    const tab = []
    for (let i = 0; i < data.length; i++) {
      tab.push({
        value: data[i]._id,
        label: data[i].fullName,
        id: data[i]._id,
        email: data[i].email,
        firstName: data[i].firstName,
        fullName: data[i].fullName,
        lastName: data[i].lastName,
        numbers: data[i].numbers
      })
    }
    return tab
  }


  const loadOptions = (inputValue, callback) => {
    if (inputValue?.length >= 3) {
      if (timer.current) clearTimeout(timer.current)

      timer.current = setTimeout(async () => {
        await client.getAllUsers({offset: 0, limit: 20, search: inputValue}).then((response) => {
          callback(getSelectData(response.data))
        }).catch((e) => {
          callback(getSelectData([]))
        })
      }, 1000)
    }
  }

 
  const searchProduct = async (value) => {
      setSearch(value)
    if (value?.length >= 2) {
      setSearchLoading(true)
      if (timer.current) clearTimeout(timer.current)

      timer.current = setTimeout(async () => {
        await client.searchProduct({search: value, offset: 0, limit: 20}).then(async (response) => {
          const final_data = [];

          await Promise.all(
            response.data.map(async (pdt) => {
              await Promise.all(
              pdt.variables.map((pdtvar) => {
                pdtvar?.items?.map(pdtVarItem => {
                  const isInclude = selectedProduct.filter((sltp) => sltp.serial === pdtVarItem.serial)?.length ?? false
                  if(!pdtVarItem.bougth && !isInclude)
                  final_data.push({
                    image : `${process.env.REACT_APP_YEPIA_STATIC}${pdt.images[0]?.url}`,
                    label : pdt.title,
                    serial: pdtVarItem.serial,
                    discountThreshold: pdtVarItem.discountThreshold,
                    cost: (pdt.isPromoted && (pdt.startPromo <= new Date().getTime() && new Date().getTime() <= pdt.endPromo))  ?  pdt.promoPrice: pdt.price,
                    id: pdt?._id,
                    title: pdt.title,
                    quantity: 1,
                    variables:  [{serial: pdtVarItem.serial, productId: pdtVarItem.productId}]
                  })
                })
              }))
          })
          )
          setProducts(final_data)
          setSearchLoading(false)
        }).catch((e) => {
          console.log(e)
        })
      }, 1000)
    }
  }


  const onChangeDate = (e) => {
    let dt = new Date(e.target.value).getTime();
    setShippingForm({ ...shippingForm, date: dt });
  }

 

  const styles = {
    multiValue: (base, state) => {
      return { ...base, backgroundColor: "#546e7a" }
    },
    multiValueLabel: (base, state) => {
      return { ...base, backgroundColor: "#546e7a" }
    }
  };

  const createBill = async () => {
    try {
      await client.createBill({purchaseId: id, notes: notes, quorationGlobalDiscount: order?.quorationGlobalDiscount, amount:  (((100 - Number(order?.quorationGlobalDiscount ?? 0)) * (total))/100) + Number(shippingForm?.cost ?? 0), remainder: (((100 - Number(order?.quorationGlobalDiscount ?? 0)) * (total))/100) + Number(shippingForm?.cost ?? 0)}).then(async (billResponse) => {
        await client.updatePurchase(id, {billCreated: true, billId: billResponse?.data?._id})
      .then((response) => {
        setLoading(false)
        history.push('/sale/bills')
        toast.success(
          <Fragment>
            <div className='toastify-header'>
              <div className='title-wrapper'>
                <Avatar size='sm' color='success' icon={<Check size={12} />} />
                <h6 className='toast-title font-weight-bold'>Enregistrement réussi!</h6>
              </div>
            </div>
          </Fragment>,
          { transition: Slide, hideProgressBar: true, autoClose: 5000 }
        )
      })

      .catch((error) => {
        let errMessage = "Une erreur s'est produite, merci de réessayer plustard.";
        console.log('Error', error)
        if(error.errors) {
          if(error.errors.name === "ValidationError")
        {
          if (error.errors.email) {
            errMessage = "Un utilisateur existe déjà avec cette adresse email!"
          }
        }
        }

        toast.error(
          errMessage,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
        setLoading(false)
      })
      })
    } catch (error) {
      
    }
  }

  const updateBill = async () => {
    try {
      await client.updateBill(order?.billId, {notes: notes, amount:  (((100 - Number(order?.quorationGlobalDiscount)) * (total))/100) + Number(shippingForm?.cost ?? 0)}).then(async (billResponse) => {
      }).then((response) => {
        setLoading(false)
      })

      .catch((error) => {
        let errMessage = "Une erreur s'est produite, merci de réessayer plustard.";
        console.log('Error', error)
        if(error.errors) {
          if(error.errors.name === "ValidationError")
        {
          if (error.errors.email) {
            errMessage = "Un utilisateur existe déjà avec cette adresse email!"
          }
        }
        }

        toast.error(
          errMessage,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
        setLoading(false)
      })
    } catch (error) {
      
    }
  }

  const updateShipingAddress = async () => {
    try {
      await client.updatePurchase(id, {billingAddress : billingForm})
    .then((response) => {
      setLoading(false)
     toogleBillingModal()
      toast.success(
        <Fragment>
          <div className='toastify-header'>
            <div className='title-wrapper'>
              <Avatar size='sm' color='success' icon={<Check size={12} />} />
              <h6 className='toast-title font-weight-bold'>Enregistrement réussi!</h6>
            </div>
          </div>
        </Fragment>,
        { transition: Slide, hideProgressBar: true, autoClose: 5000 }
      )
    })

    .catch((error) => {
      let errMessage = "Une erreur s'est produite, merci de réessayer plustard.";
      console.log('Error', error)
      if(error.errors) {
        if(error.errors.name === "ValidationError")
       {
        if (error.errors.email) {
          errMessage = "Un utilisateur existe déjà avec cette adresse email!"
        }
       }
      }

      toast.error(
        errMessage,
         { transition: Slide, hideProgressBar: true, autoClose: 2000 }
       )
       setLoading(false)
    })
    } catch (error) {
      
    }
  }


  return (
    <>
    {id && loadingData ? <Spinner/> :<>
    <Row>
      <Col xl='4'>
        <Card>
          <CardBody> 
            
            <Label for='category'
            
            >
                <span
                style={{
                  fontWeight: 'bold'
                }}
                >Client <span className='text-danger'>*</span></span>
            </Label>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
          }}>

            <div
            style={{width: '85%'}}
            >
             

             {!allocated && <AsyncSelect
                isMulti={false}
                defaultValue={[{ value: 0 , label: 'Choisir' }]}
                name="member"
                className='react-select width-230'
                classNamePrefix='select'
                styles={styles}
                loadOptions={loadOptions}
                value = {user}
                defaultOptions={false}
                isClearable={true}
                onChange={(options) => {setUser(options)}}
            />}
              {allocated && <>
              {user?.label}
              </>}
            </div>

            {!allocated && <PlusCircle
            style={{
              cursor: 'pointer'
            }}

            onClick = {toogleUserModal}
            />}
          </div>
          </CardBody>
        </Card>
        {id && <>

          {order?.fromQuotation && <Button.Ripple color={'secondary'}
          block className='mt-75' onClick = {() => history.push(`/sale/quotations/edit/${order?.quotationId}`)}>
          Dévis lié
        </Button.Ripple>}
          {!allocated && <Button.Ripple color={'warning'}
        block className='mb-75' onClick={() => {
          if(billCreated) {
            updateBill()
          }
          const data = {
            shippingAddress : shippingForm,
            billingAddress : billingForm,
            products: selectedProduct,
            notes: notes,
            user: user,
            quorationGlobalDiscount: order?.quorationGlobalDiscount ?? 0
          }
          dispatch(setDefaultPurchase(data))
          setTimeout(() => {
            history.push(`/sale/delivery-notes/new?purchase_id=${id}`)
          }, 1000);
        }}>
          Créer un bon de livraison
        </Button.Ripple>}

        <Button.Ripple color={'secondary'}
        block className='mb-75' onClick={() => {
          if(!billCreated)
          createBill()
          else history.push(`/sale/bills/edit/${order?.billId}`)
        }}>
          {billCreated ? 'Voir la facture' : 'Créer une facture'}
        </Button.Ripple>

        <Button.Ripple color={'primary'}
        block className='mb-75' onClick={() => {
          
        }}>
          Créer un ordre d'achat
        </Button.Ripple>

        <Button.Ripple color={'success'}
        block className='mb-75' onClick={() => {
          
        }}>
          Créer un mouvement de stock
        </Button.Ripple>
        </>}
      </Col>

      <Col xl='4'>
        <Card>
          <CardBody> 
            
            <Label for='category'>
            <span
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  textTransform: 'uppercase',
                  marginBottom: 20
                }}
                >Livraison <span className='text-danger'>*</span></span>
            </Label>
            <FormGroup >
              <Label for='promo-start'>
                Date de livraison {allocated && <>{moment(dateToLocalString(shippingForm?.date), 'DD/MM/YYYY hh:mm').format("YYYY-MM-DD[T]hh:mm")}</>}
              </Label>
              {!allocated && <Input
                name='promo-start'
                id='promo-start'
                type="datetime-local"
                placeholder=''
                value = {moment(dateToLocalString(shippingForm?.date), 'DD/MM/YYYY hh:mm').format("YYYY-MM-DD[T]hh:mm")}
                onChange={e => onChangeDate(e)}
              />}
            </FormGroup>

            <FormGroup >
              <Label for='promo-start' style={{
                marginRight: 15
              }}>
                Coût de livraison: 
              </Label>
              {!allocated && <Input
                value={shippingForm?.cost}
                onChange={(e) => {
                  if(rx_live.test(e.target.value))
                  setShippingForm({...shippingForm, cost: e.target.value})}
                }
              />}
              {allocated && <>{shippingForm?.cost ?? 0}</>}
            </FormGroup>

            <div >
              <div style={{marginBottom: 15, fontWeight: 'bold'}} >
                Livré à
              </div>
              <p>
                <div>{shippingForm?.location}</div>
                <div>{shippingForm?.numbers}</div>
              </p>
              {(!allocated || (allocated && !shippingForm?.location)) && <Button.Ripple color='primary'
              onClick = {toogleShippingModal}
              >
                Modifier l'adresse de livraison
              </Button.Ripple>}
            </div>

          </CardBody>
        </Card>
      </Col>

      <Col xl='4'>
        <Card>
          <CardBody> 
            
            <Label for='category'>
            <span
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  textTransform: 'uppercase',
                  marginBottom: 20
                }}
                >Facturation <span className='text-danger'>*</span></span>
            </Label>

            <div >
              <div style={{marginBottom: 15, fontWeight: 'bold'}} >
                Facturé à
              </div>
              <p>
                <div>{billingForm?.location}</div>
                <div>{billingForm?.numbers}</div>
              </p>
              {(!allocated || (allocated && !billingForm?.location)) && <Button.Ripple color='primary'
              onClick = {toogleBillingModal}
              >
                Modifier l'adresse de facturation
              </Button.Ripple>}
            </div>

          </CardBody>
        </Card>
      </Col>
    </Row>
    <Card>
      <CardBody>
      <Table responsive>
      <thead>
        <tr>
          <th style={{width: '60%'}}>Produit</th>
          <th>Prix</th>
          <th>Rémise (%)</th>
          <th>total</th>
          {!allocated && <th/>}
        </tr>
      </thead>
      <tbody>
        {selectedProduct.map((slpdt, index) => {
          return  <tr>
                  <td>
                  {slpdt.serial} {slpdt.label}                  
                  </td>
                  <td>{slpdt.cost.toLocaleString('fr-FR')}</td>
                  
                  <td>
                    
                    {!allocated && <Input
                      disabled = {id}
                      readOnly = {id}
                      name='discount'
                      id='discount'
                      placeholder=''
                      value={slpdt.discount}
                      onChange={(e) => {
                        if(rx_live.test(e.target.value))
                        handleInputChange(e, index)}
                      }
                    />}
                    {allocated && <>{slpdt.discount}</>}
                    
                  </td>
                  <td> {(((100 - Number(slpdt.discount)) * slpdt.cost)/100).toLocaleString('fr-FR') }</td>
                  {!allocated && <td className='d-flex justify-content-center align-items-center' style={{
                    height: 58
                  }}>
                  <Trash2  size={25}
                  onClick={() => removeVariable(index)}
                  style = {{
                    cursor: 'pointer'
                  }}
                  />
                  </td>}
                </tr>
        })}
       
        
      </tbody>
    </Table>
        {id &&
      <CardBody className='invoice-padding pb-0'>
        <Row className='invoice-sales-total-wrapper'>
          <Col className='mt-md-0 mt-3' md='6' >
            <CardText className='mb-0'>
            </CardText>
          </Col>
          <Col className='d-flex justify-content-end' md='6' >
            <div className='invoice-total-wrapper'>
              <div className='d-flex invoice-total-item'>
                <p className='invoice-total-title'>Quantité totale:</p>
                <p className='ml-2 invoice-total-amount'>{selectedProduct.length}</p>
              </div>
              <div className='d-flex  invoice-total-item'>
                <p className='invoice-total-title'>Sous total:</p>
                <p className='ml-2 invoice-total-amount'>{total.toLocaleString('fr-FR')}</p>
              </div>

              {order?.quorationGlobalDiscount && <div className='d-flex  invoice-total-item'>
                <p className='invoice-total-title'>Rémise:</p>
                <p className='ml-2 invoice-total-amount'>{order?.quorationGlobalDiscount}%</p>
              </div>}
              {shippingForm?.cost ? <div className='d-flex -total-item'>
                <p className='invoice-total-title'>Livraison :</p>
                <p className='ml-2 invoice-total-amount'>{shippingForm?.cost.toLocaleString('fr-FR')}</p>
              </div>: <></>}
              
              <hr className='my-50' />
              <div className='d-flex invoice-total-item'>
                <p className='invoice-total-title'>Total:</p>
                <p className='ml-2 invoice-total-amount'>{((((100 - Number(order?.quorationGlobalDiscount)) * (total))/100) + Number(shippingForm?.cost ?? 0) ).toLocaleString('fr-FR')} </p>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>}
     {!allocated && !order?.fromQuotation && <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 50,
        marginTop: 50
      }}
      >
        <div
        className='ml-50 w-75'
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
        >
        <Input
          id='search-invoice'
          className='w-100'
          type='text'
          value = {search}
          onChange = {(e) => {
            searchProduct(e.target.value)
          }}
          placeholder = "Ajouter un nouveau produit"
        />
        {search && <div
        className='w-100'
        style={{
          position: 'absolute',
          top: 50,
          boxShadow: '0 5px 10px rgb(0 0 0 / 5%)',
          padding: 15,
          zIndex: 1000000,
          background: '#FFFFFF'
        }}
        >
       {searchLoading ? <div
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
        ><Spinner/> </div> :
       <>
       {products.length === 0 ? <span> Aucun résultat ou produit déjà selectionné</span> : <>
       {products.map((pdt) => {
        return <div
        className='searchProduct'
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: "pointer"
        }}

        onClick = {() => {
          setSelectedProduct([...selectedProduct, {...pdt, discount: 0}])
          setSearch('')
          setProducts([])
        }}
        >
          <img
          width={30}
          height= {30}
          src={pdt.image}
          style = {{
            marginRight: 20
          }}
          />
          <div>
            <div>{pdt.label}</div>
            <div><span style={{fontWeight: 'bold'}} >Sérial</span>: {pdt.serial}</div>
          </div>
        </div>
       }) }
       </> }
       
       </>
       }
        </div>}

        </div>

        <Button.Ripple color='primary'
        >
          scanner le produit
        </Button.Ripple>
      </div>}

      <FormGroup>
        <Label for='promo'>
        <span
              style={{
                fontWeight: 'bold',
                fontSize: 14
              }}
              >Notes</span>
        </Label>
        
       {!allocated && <ReactQuill
          modules={modules}
          formats={formats}
          value={notes}
          onChange={smallDescriptionChange} />}
          {allocated && <p
          dangerouslySetInnerHTML={{__html: notes}}
          />}
      </FormGroup>

     {!allocated && <Button type='button' className='mr-1' color='primary'
         disabled={
          loading
          }

          onClick = {validate}
        >
          {loading ?  <Spinner animation="grow" /> : 'Enregistrer'}
        </Button>}

        {id && <Button type='button' className='mr-1' color='secondary'
         disabled={
          loading
          }
          onClick = {() => history.push('/sale/purchase-orders')}
        >
          Retour
        </Button>}
      </CardBody>
      
    </Card>

    <Modal
      isOpen={userModal}
      toggle={toogleUserModal}
    >
      <ModalBody
       
      >
        <FormGroup>
          <Label for='lastName'>
            Prénom <span className='text-danger'>*</span>
          </Label>
          <Input
            value = {userForm.lastName}
            name='lastName'
            id='lastName'
            placeholder=''
            onChange={e => setUserForm({...userForm, lastName: e.target.value})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['lastName'] })}
          />
        </FormGroup>
       
        <FormGroup>
          <Label for='firstName'>
            Nom <span className='text-danger'>*</span>
          </Label>
          <Input
            value = {userForm.firstName}
            name='firstName'
            id='firstName'
            placeholder=''
            onChange={e => setUserForm({...userForm, firstName: e.target.value})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['firstName'] })}
          />
        </FormGroup>
       
        <FormGroup>
          <Label for='email'>
            Adresse e-mail <span className='text-danger'>*</span>
          </Label>
          <Input
          type = 'email'
            value = {userForm.email}
            name='email'
            id='email'
            placeholder=''
            onChange={e => setUserForm({...userForm, email: e.target.value})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['email'] })}
          />
        </FormGroup>

        <FormGroup>
          <Label for='numbers'>
            Contacts (si plusieurs, séraper par une virgue ',') <span className='text-danger'>*</span>
          </Label>
          <Input
          type = 'numbers'
            value = {userForm.numbers.toString()}
            name='numbers'
            id='numbers'
            placeholder=''
            onChange={e => setUserForm({...userForm, numbers: e.target.value.split(',')})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['numbers'] })}
          />
        </FormGroup>

       
        <Button type='butto,' className='mr-1' color='primary'
         disabled={
          loading
          ||
          (
            !userForm.lastName ||
            !userForm.firstName ||
            !userForm.numbers.length ||
            !userForm.email 
          )
        }
        onClick = {onSubmitUser}
        >
          {loading ?  <Spinner animation="grow" /> : 'Enregistrer'}
        </Button>
        <Button type='reset' color='secondary' outline onClick={toogleUserModal}>
          Annuler
        </Button>
      </ModalBody>
    </Modal>

    <Modal
      isOpen={shippingModal}
      toggle={toogleShippingModal}
    >
      <ModalBody
       
      >
        <FormGroup>
          <Label for='lastName'>
            Addresse de livraison <span className='text-danger'>*</span>
          </Label>
          <Input
            value = {shippingForm?.location}
            name='location'
            id='shippingLocation'
            placeholder=''
            onChange={e => setShippingForm({...shippingForm, location: e.target.value})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['location'] })}
          />
        </FormGroup>
       
        <FormGroup>
          <Label for='numbers'>
            Téléphone <span className='text-danger'>*</span>
          </Label>
          <Input
          type = 'numbers'
            value = {shippingForm?.numbers}
            name='numbers'
            id='shippingnumbers'
            placeholder=''
            onChange={e => setShippingForm({...shippingForm, numbers: e.target.value})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['numbers'] })}
          />
        </FormGroup>

       
        <Button type='button' className='mr-1' color='primary'
         disabled={
          (
            !shippingForm?.location ||
            !shippingForm?.numbers 
          )
        }
        onClick={() => {
          toogleShippingModal()
        }}
        >
          {loading ?  <Spinner animation="grow" /> : 'Enregistrer'}
        </Button>
        <Button type='reset' color='secondary' outline onClick={toogleShippingModal}>
          Annuler
        </Button>
      </ModalBody>
    </Modal>

    <Modal
      isOpen={billingModal}
      toggle={toogleBillingModal}
    >
      <ModalBody
       
      >
        <FormGroup>
          <Label for='lastName'>
            Addresse de facturation <span className='text-danger'>*</span>
          </Label>
          <Input
            value = {billingForm?.location}
            name='location'
            id='billingLocation'
            placeholder=''
            onChange={e => setBillingForm({...billingForm, location: e.target.value})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['location'] })}
          />
        </FormGroup>
       
        <FormGroup>
          <Label for='numbers'>
            Téléphone <span className='text-danger'>*</span>
          </Label>
          <Input
          type = 'numbers'
            value = {billingForm?.numbers}
            name='numbers'
            id='billingnumbers'
            placeholder=''
            onChange={e => setBillingForm({...billingForm, numbers: e.target.value})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['numbers'] })}
          />
        </FormGroup>

       
        <Button type='button' className='mr-1' color='primary'
        onClick={() => {
          if(allocated) {
            updateShipingAddress()
          }else toogleBillingModal()
        }}
         disabled={
          (
            !billingForm?.location ||
            !billingForm?.numbers 
          )
        }
        >
          {loading ?  <Spinner animation="grow" /> : 'Enregistrer'}
        </Button>
        <Button type='reset' color='secondary' outline onClick={toogleBillingModal}>
          Annuler
        </Button>
      </ModalBody>
    </Modal>
    </>}
    </>
    
  )
}

export default ProductForm