import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Card, CardBody, Row, Col, FormGroup, Label, Input, Modal, ModalBody, Button, Spinner, Table, CardText, Badge } from 'reactstrap'

import ReactQuill from 'react-quill';
import { CheckCircle, PlusCircle, Trash2, UserX, X } from 'react-feather';
import dateToLocalString from '../../../utility/dateToLocalString';
import { useForm } from 'react-hook-form';

import Avatar from '@components/avatar'
import {Check} from 'react-feather'
import { Slide, toast } from 'react-toastify'
import { useHistory, useParams } from 'react-router-dom';
import AsyncSelect from "react-select/async";
import { addCommas, Password, removeNonNumeric } from '../../../utility/helper';

import classnames from 'classnames'
import { useDispatch } from 'react-redux';
import { setDefaultPurchase } from '../purchase-orders/store/actions';

import moment from "moment";

import axios from 'axios'
import { base_url, file_url } from "@src/utility/baseUrl"
import { config } from '@src/utility/axiosconfig'

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
  const [products, setProducts] = useState([]);
  const [expireDate, setExpiration] = useState(new Date(moment(new Date(), "DD-MM-YYYY").add(13, 'days')).getTime());
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [total, setSum] = useState(0);
  const [globalDiscount, setGlobalDiscount] = useState(0);
  
  const [accepted, setAccepted] = useState(false);
  const [transformed, setTransformed] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [purchase, setPurchase] = useState(null);
  
  
  // ** Vars
  const { register, errors, handleSubmit } = useForm()
  
  const [userForm, setUserForm] = useState({
    lastName: '',
    firstName: '',
    email: '',
    numbers: "",
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
          const order = await client.getQuotationById(id);
          
          // setBillingForm(order?.billingAddress)
          // setShippingForm(order?.shippingAddress)
          setUser(order?.user)
          setNotes(order?.notes)
          setSelectedProduct(order?.products)
          setAccepted(order?.accepted)
          setTransformed(order?.transformed)
          setCancelled(order?.cancelled)
          setGlobalDiscount(order?.globalDiscount)

          if(order?.accepted) {
            const purchaseOrder = await client.getByQuotationId(id);
            setPurchase(purchaseOrder)
          }

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
  
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < selectedProduct?.length; index++) {
      sum += (((100 - Number(selectedProduct[index].discount)) * selectedProduct[index].finalMount)/100);
    }
    setSum(sum)
  }, [selectedProduct])



  

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
      expireDate,
      // shippingAddress : shippingForm,
      // billingAddress : billingForm,
      products: selectedProduct,
      notes: notes,
      user: user,
      globalDiscount: globalDiscount
    }

    const dataPurchase = {
      shippingAddress : {},
      billingAddress : {},
      products: selectedProduct,
      notes: notes,
      user: user,
      quotationId: id,
      quorationGlobalDiscount: globalDiscount
    }
    if(!id) {
      await client.createQuotation(data)
        .then((response) => {
          setLoading(false)
          history.push('/sale/quotations')
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
    }else {
      if(accepted) {
        await client.updatePurchase(purchase?._id,  dataPurchase).then(async () => {
          await client.updateQuotation(id, data)
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
        })
      }else {
        await client.updateQuotation(id, data)
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
    }
    
  }
  const onSubmitUser = async () => {
    
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
        const queryString = new URLSearchParams({offset: 0, limit: 20, fullName: inputValue, role: 'user'}).toString();
        await axios.get(`${base_url}user/all?${queryString}`).then((response) => {
          callback(getSelectData(response.data.data))
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
        const queryString = new URLSearchParams({offset: 0, limit: 20, title: value, productId: value}).toString();
        await axios.get(`${base_url}product?${queryString}`).then(async (response) => {
          const final_data = [];
          await Promise.all(
            response.data.data.map(async (pdt) => {
              let variPrice = 0;
              let productCount = 0;
              let discountThreshold = 0;
              let lowest = Number.POSITIVE_INFINITY;
              await Promise.all(
                pdt.variables.map(async (variab) => {
                  discountThreshold = Number(variab.discountThreshold);
                  if (discountThreshold < lowest) lowest = discountThreshold;
                  await Promise.all(
                    variab.supplies.map(variabItem => {
                      productCount = productCount + Number(variabItem?.items?.length);
                      variPrice = variPrice + (!variab?.isPromoted ? Number(variab?.sellingPrice): Number(variab?.promoPrice)) * Number(variabItem?.items?.length) 
                    })
                  )
                })
              )
              pdt.finalMount = Math.ceil(variPrice /  productCount);
              pdt.discountThreshold = lowest;
              final_data.push(pdt)
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
             

             { <AsyncSelect
                disabled = {transformed}
                readOnly = {transformed}
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
              
            </div>

            { <PlusCircle
            style={{
              cursor: 'pointer'
            }}

            onClick = {toogleUserModal}
            />}
          </div>
          </CardBody>
        </Card>
        {id && <>
        {accepted && transformed && <Badge className='text-capitalize mb-75' color={ 'light-success'} pill>
          Accepté et transformé
        </Badge>}
          {!accepted && <Button.Ripple color={'success'}
          disabled = {cancelled}
        block className='mb-75 mt-2' onClick={async () => {
          const data = {
            shippingAddress : {},
            billingAddress : {},
            products: selectedProduct,
            notes: notes,
            user: user,
            fromQuotation: true,
            quotationId: id
          }
          await client.createPurchase({...data, quorationGlobalDiscount: globalDiscount}).then(async (response) => {
           await client.updateQuotation(id, {accepted: true, transformed: true}).then(() => {
            dispatch(setDefaultPurchase(data))
            setTimeout(() => {
              history.push(`/sale/purchase-orders/edit/${response?.data?._id}`)
            }, 1000);
           })
          })
        }}>
          Accepter le devis
          </Button.Ripple>}

          {!cancelled && <Button.Ripple color={'danger'}
          disabled = {accepted}
          block className='mb-75' onClick={async () => {
            await client.updateQuotation(id, {cancelled: true, transformed: true}).then(() => {
              
            })
          }}>
            Rejeter le devis
          </Button.Ripple>}
          { <Button.Ripple color={'warning'}
          disabled = {cancelled}
          block className='mb-75' onClick={async () => {
            const data = {
              shippingAddress : {},
              billingAddress : {},
              products: selectedProduct,
              notes: notes,
              user: user,
              fromQuotation: true,
              quotationId: id
            }

            if(!accepted) {
              await client.createPurchase({...data, quorationGlobalDiscount: globalDiscount}).then(async (response) => {
                await client.updateQuotation(id, {accepted: true, transformed: true}).then(() => {
                  dispatch(setDefaultPurchase(data))
                  setTimeout(() => {
                    history.push(`/sale/purchase-orders/edit/${response?.data?._id}`)
                  }, 1000);
                })
              })
            }else {
              history.push(`/sale/purchase-orders/edit/${purchase?._id}`)
            }
            
            
          }}>
            Bon de commande
          </Button.Ripple>}


        <Button.Ripple color={'primary'}
        disabled = {cancelled}
        block className='mb-75 mt-2' onClick={() => {
          
        }}>
          Imprimer le dévis
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
                >Date d'expiration <span className='text-danger'>*</span></span>
            </Label>
            <FormGroup >
              { <Input
                name='promo-start'
                id='promo-start'
                type="datetime-local"
                placeholder=''
                value = {moment(dateToLocalString(expireDate), 'DD/MM/YYYY hh:mm').format("YYYY-MM-DD[T]hh:mm")}
                onChange={e => {setExpiration(new Date(e.target.value).getTime())}}
              />}
            </FormGroup>
          </CardBody>
        </Card>
      </Col>

      
    </Row>
    <Card>
      <CardBody>
      <Table responsive>
      <thead>
        <tr>
          <th style={{width: '40%'}}>Produit</th>
          <th>Prix</th>
          <th>Quantité</th>
          <th>Rémise (%)</th>
          <th>total</th>
          { <th/>}
        </tr>
      </thead>
      <tbody>
        {selectedProduct.map((slpdt, index) => {
          return  <tr>
                  <td style={{width: '40%'}} >
                  {slpdt.productId} {slpdt.title}             
                  </td>
                  <td>{slpdt.finalMount.toLocaleString('fr-FR')}</td>
                  
                  <td>
                    
                    { <Input
                      name='quantity'
                      id='quantity'
                      placeholder=''
                      value={slpdt.quantity}
                      onChange={(e) => {
                        if(rx_live.test(e.target.value))
                        handleInputChange(e, index)}
                      }
                    />}
                    
                  </td>
                  <td>
                    
                    { <Input
                      name='discount'
                      id='discount'
                      placeholder=''
                      value={slpdt.discount}
                      onChange={(e) => {
                        if(rx_live.test(e.target.value))
                        if(Number(slpdt?.discountThreshold)< Number(e.target.value)) {
                          toast.error(
                            `Le seuil est de ${slpdt?.discountThreshold}% !`,
                            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                          )
                          return
                        }
                        handleInputChange(e, index)}
                      }
                    />}
                    
                  </td>
                  <td> {((((100 - Number(slpdt.discount)) * slpdt.finalMount)/100) * Number(slpdt.quantity)).toLocaleString('fr-FR') }</td>
                  { <td className='d-flex justify-content-center align-items-center' style={{
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
    {!transformed && <div
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
          setSelectedProduct([...selectedProduct, {...pdt, discount: 0, quantity: 1}])
          setSearch('')
          setProducts([])
        }}
        >
          <img
          width={30}
          height= {30}
          src={`${file_url}/products/${pdt?.images[0]}`}
          style = {{
            marginRight: 20
          }}
          />
          <div>
            <div><span style={{fontWeight: 'bold'}} >PRODUCT ID</span>: {pdt.productId}</div>
            <div>{pdt.title}</div>
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
      <CardBody className='invoice-padding pb-0'>
        <Row className='invoice-sales-total-wrapper'>
          <Col className='mt-md-0 mt-3' md='6' >
            <CardText className='mb-0'>
            </CardText>
          </Col>
          <Col className='d-flex justify-content-end' md='6' >
            <div className='invoice-total-wrapper'>
              <div className='d-flex invoice-total-item'>
                <p className='invoice-total-title'>Total:</p>
                <p className='ml-2 invoice-total-amount'>{ (((100 - Number(globalDiscount)) * (Number(shippingForm.cost) + Number(total)))/100).toLocaleString('fr-FR')}</p>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
     

      <FormGroup>
        <Label for='promo'>
        <span
              style={{
                fontWeight: 'bold',
                fontSize: 14
              }}
              >Notes</span>
        </Label>
        
       { <ReactQuill
          modules={modules}
          formats={formats}
          value={notes}
          onChange={smallDescriptionChange} />}
         
      </FormGroup>

     { <Button type='button' className='mr-1' color='primary'
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
          onClick = {() => history.push('/sale/quotations')}
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
            Contacts <span className='text-danger'>*</span>
          </Label>
          <Input
          type = 'numbers'
            value = {userForm.numbers.toString()}
            name='numbers'
            id='numbers'
            placeholder=''
            onChange={e => setUserForm({...userForm, numbers: addCommas(removeNonNumeric(e.target.value))})}
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
        onClick={toogleShippingModal}
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
            onChange={e => setBillingForm({...billingForm, numbers: addCommas(removeNonNumeric(e.target.value))})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['numbers'] })}
          />
        </FormGroup>

       
        <Button type='button' className='mr-1' color='primary'
        onClick={toogleBillingModal}
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