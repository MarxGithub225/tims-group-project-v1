// ** React Import
import { Fragment, useEffect, useRef, useState } from 'react'

import Avatar from '@components/avatar'
// ** Custom Components
import Sidebar from '@components/sidebar'
import { Collapse, CardHeader, CardTitle, Card, CardBody, CustomInput } from 'reactstrap'
// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { Button, FormGroup, Label, FormText, Form, Input, Spinner, Row, Col } from 'reactstrap'

// ** Store & Actions
import FileDropzone from '../../components/fileDropzone'
import {Check, CheckCircle, ChevronUp, Facebook, Trash, X} from 'react-feather'

import { useDispatch } from 'react-redux'

import { Slide, toast } from 'react-toastify'
import AsyncSelect from "react-select/async";

import axios from 'axios'
import { base_url, file_url } from "@src/utility/baseUrl"
import { config } from '@src/utility/axiosconfig'
import { randomChar } from '../../../utility/helper'
import dateToLocalString from '../../../utility/dateToLocalString'
import moment from 'moment'
import $ from 'jquery'
import { getAllData } from './store/actions'
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

const SidebarBrand = ({ open, toggleSidebar, 
  editMode,
  currentData, 
  productId,
  rowsPerPage,
  currentPage
}) => {

  $("input[data-type='currency']").on({
    change: function() {
      formatCurrency($(this));
    },
    blur: function() { 
      formatCurrency($(this), "blur");
    }
  });


  function formatNumber(n) {
    // format number 1000000 to 1,234,567
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  function formatCurrency(input, blur) {
    // appends $ to value, validates decimal side
    // and puts cursor back in right position.
    
    // get input value
    var input_val = input.val();
    
    // don't validate empty input
    if (input_val === "") { return; }
    
    // original length
    var original_len = input_val.length;

    // initial caret position 
    var caret_pos = input.prop("selectionStart");
      
    // check for decimal
    if (input_val.indexOf(".") >= 0) {

      // split number by decimal point
      var left_side = input_val
      // add commas to left side of number
      left_side = formatNumber(left_side);
      // join number by .
      input_val = left_side

    } else {
      // remove all non-digits
      input_val = formatNumber(input_val);
      input_val = input_val;
      
      // final formatting
      if (blur === "blur") {
        input_val
      }
    }
    
    // send updated string to input
    input.val(input_val);

    // put caret back in the right position
    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input[0].setSelectionRange(caret_pos, caret_pos);
  }

  const [agencyQty, setQty] = useState([]);

  // ** States
  let timer = useRef()
  const [user, setUser] = useState(null)
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingSerial, setLoadingSerial] = useState(false)
  const [dataError, setDataError] = useState(false)
  const [currentAgency, setCurrentAgency] = useState(-1)
  const [openCollapse, setOpenCollapse] = useState(-1)
  const [partnerData, setPartnerData] = useState([])
  // ** Store Vars
  const dispatch = useDispatch()
  const handleCollapseToggle = id => {
    if (id === openCollapse) {
      setOpenCollapse(null)
    } else {
      setOpenCollapse(id)
    }
  }
  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  // ** Function to handle form submit
  const onSubmit = async (values) => {
    setLoading(true)
    if (isObjEmpty(errors)) {
      if(!editMode) {
        const supplyItems = agencyQty.filter(supp => Number(supp.items.length) > 0);
        await axios.post(`${base_url}variable`, {...form, supplies: supplyItems})
        .then(response => {
        })
        .then(() => {
          setForm({
            productId: productId,
            providerId: '',
            arrivalDate: new Date(),
            sellingPrice: 0,
            purchasePrice: 0,
            promoPrice: 0,
            isPromoted: false,
            promoStartAt: null,
            promoEndAt: null,
            discountThreshold: 0,
            warrantyPeriod: 0,
            supplies: []
          });
          dispatch(getAllData({limit: rowsPerPage, page: currentPage, productId: productId}))
          toggleSidebar()
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
            if(error.errors.label) {
              errMessage = "Une marque existe déjà sous ce libéllé!"
            }else
            if(error.errors.reference) {
              errMessage = "Une marque existe déjà sous cette référence!"
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
        const supplyItems = agencyQty.filter(supp => Number(supp.items.length) > 0);
        await axios.put(`${base_url}variable/${id}`, {...form, supplies: supplyItems})
        .then(response => {
        })
        .then(() => {
          setForm({
            productId: productId,
            providerId: '',
            arrivalDate: new Date(),
            sellingPrice: 0,
            purchasePrice: 0,
            promoPrice: 0,
            isPromoted: false,
            promoStartAt: null,
            promoEndAt: null,
            discountThreshold: 0,
            warrantyPeriod: 0,
            supplies: []
          });
          toggleSidebar()
          setLoading(false)
          toast.success(
            <Fragment>
              <div className='toastify-header'>
                <div className='title-wrapper'>
                  <Avatar size='sm' color='success' icon={<Check size={12} />} />
                  <h6 className='toast-title font-weight-bold'>Modification réussie!</h6>
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
              errMessage = "Une marque existe déjà sous ce libéllé!"
            }else
            if(error.errors.reference) {
              errMessage = "Une marque existe déjà sous cette référence!"
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

  const close = async () => {
    setForm({
      productId: productId,
      providerId: '',
      arrivalDate: new Date(),
      sellingPrice: 0,
      purchasePrice: 0,
      promoPrice: 0,
      isPromoted: false,
      promoStartAt: null,
      promoEndAt: null,
      discountThreshold: 0,
      warrantyPeriod: 0,
      supplies: []
    });
    const list = []
    partnerData.forEach((agency) => {
      list.push({name: agency.name, agencyId: agency._id, quantity: 0});
    })
    setQty(list);
    toggleSidebar()
  }

  const [form, setForm] = useState(
    {
      productId: productId,
      providerId: '',
      arrivalDate: new Date(),
      sellingPrice: 0,
      purchasePrice: 0,
      promoPrice: 0,
      isPromoted: false,
      promoStartAt: null,
      promoEndAt: null,
      discountThreshold: 0,
      warrantyPeriod: 0,
      supplies: []
    }
  )

  const handleInputChange = (e,index) => {
    const { name, value } = e.target;
    const list = [...agencyQty];
    list[index][name] = value;
    setQty (list);
  };

  const generateSerial = async (key) => {
    setCurrentAgency(key)
    setLoadingSerial(true)
    await Promise.all(
      agencyQty.map((agency, index) => {
        const list = [];
        if(key === index) {
          for (let i = 0; i < Number(agency.quantity); i++) {
            list.push({serialNumber: randomChar(10), barCode: randomChar(13)})
          }
          
          agency.items = list;
        }else agency.items = agency.items ?? []
        
      })
    )

    setLoadingSerial(false)
    setCurrentAgency(-1)
    
  }

  useEffect(() => {
    if(editMode && currentData) {
      setUser({
        label : currentData?.providerId?.companyName,
        value : currentData?.providerId?._id,
      })
      setForm(currentData)
      setId(currentData?._id)
      setQty(currentData?.supplies)
    }
  }, [editMode, currentData])

  useEffect(() => {
    ;(async () => {
      try {
        const queryString = new URLSearchParams({page: 1, limit: 1000000000}).toString();
        const [partners] = await Promise.all([
          await axios.get(`${base_url}agency?${queryString}`),
        ])
        setPartnerData(partners.data.data)
        if(!editMode) {
          const list = [...agencyQty]
          partners.data.data.forEach((agency) => {
            list.push({name: agency.name, agencyId: agency._id, quantity: 0});
          })
          setQty(list);
        }
        
      } catch (error) {
        console.error(error)
      }

      setLoading(false)

    })()
  }, [])
  const getSelectData = (data) => {
    const tab = []
    for (let i = 0; i < data.length; i++) {
      tab.push({
        value: data[i]._id,
        label: data[i].companyName
      })
    }
    return tab
}


  const loadOptions = (inputValue, callback) => {
    if (inputValue?.length >= 2) {
      if (timer.current) clearTimeout(timer.current)

      timer.current = setTimeout(async () => {
        const queryString = new URLSearchParams({offset: 0, limit: 20, companyName: inputValue}).toString();
        await axios.get(`${base_url}partner?${queryString}`).then((response) => {
          callback(getSelectData(response.data.data))
        }).catch((e) => {
          callback(getSelectData([]))
        })
      }, 1000)
    }
  }

  const styles = {
    multiValue: (base, state) => {
      return { ...base, backgroundColor: "#546e7a" }
    },
    multiValueLabel: (base, state) => {
      return { ...base, backgroundColor: "#546e7a" }
    }
  };


  const defaultValue = () => {

    if(form?.providerId) {
      return user
    }else {
      return { value: 0 , label: 'Choisir' }
    }

  }


  const onChangeDatePromo = (type, e) => {
    let dt = new Date(e.target.value).getTime();
    let current_timestamp = dt
    let seconds = 0
    if (type === 'start') {
      setForm({ ...form, promoStartAt: e.target.value, 
        promoEndAt: !form.promoEndAt ? new Date().setDate(new Date(e.target.value).getDate() + 7) : form.promoEndAt});
    } else {
      if (form.promoStartAt) {
        seconds = (current_timestamp - new Date(form.promoStartAt).getTime())
        if (seconds < 0) {
          alert('Impossible de choisir une date arrière')
        } else {
          setForm({ ...form, promoEndAt: e.target.value });
        }
      }
    }
  }


  const handleInputChangeSerial = (e, key,index) => {
    setDataError(false)
    const { name, value } = e.target;
    const _newVariable = []
    agencyQty.forEach((vari, indexItem) => {
      if(indexItem === key) {
        const list = [...vari.items];
        list[index][name] = value;
        vari.items = list;
      }
      _newVariable.push(vari)
    })
    setQty (_newVariable);
  };

  const handleInputBlurSerial = async (e, key,index) => {
    setDataError(false)
    const { name, value } = e.target;
    let all_items = [];

    await Promise.all(
      agencyQty.map((vari, indexItem) => {
        all_items.push(...vari.items)
      })
    )

    let  error = false;
    const list = [...all_items];
    const valueArr = all_items.map(function(item){ return item.serialNumber });
    const isDuplicate = valueArr.some(function(item, idx){ 
        return valueArr.indexOf(item) !== idx 
    });

    if(isDuplicate && list[index][name]) {
        
        const _newVariable = []
        agencyQty.forEach((vari, indexItem) => {
          if(indexItem === key) {
            const list = [...vari.items];
            list[index][name] = '';
            vari.items = list;
          }
          _newVariable.push(vari)
        })
        setQty (_newVariable);
        toast.warning(
          'Numéro de série duppliqué',
          { transition: Slide, hideProgressBar: true, autoClose: 3000 }
        )
        setDataError(true)
        return;
    }

    if(!list[index][name]) {
      toast.warning(
        'Le numéro de série ne doit pas être vide',
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
      setDataError(true)
    }
  };
 
  return (
    <Sidebar
      size='lg'
      open={open}
      title={editMode ? `Arrivage du: ${moment(currentData.arrivalDate).format('DD/MM/YYY à HH:mm:s')} de ${currentData.providerId.companyName}`: 'Nouvel arrivage'}
      headerClassName='mb-1'
      contentClassName='pt-0'
      className="width-800"
      toggleSidebar={close}
    >
      <Form onSubmit={handleSubmit(onSubmit)}  autoComplete="off" role="presentation">
     <Row>

      <Col md="4">
       <FormGroup>
          <Label for='reference'>
          Date d'arrivage <span className='text-danger'>*</span>
          </Label>
          <Input
            value = {moment(dateToLocalString(form.arrivalDate), 'DD/MM/YYYY hh:mm').format("YYYY-MM-DD[T]hh:mm")}
            name='arrival_date'
            id="arrival_date"
            type="datetime-local"
            onChange={e => setForm({...form, arrivalDate: e.target.value})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['arrival_date'] })}
            disabled={editMode}
          />
        </FormGroup>
      </Col>

      <Col md="4">
       <FormGroup>
          <Label for='reference'>
          Fournisseur <span className='text-danger'>*</span>
          </Label>
          

          <AsyncSelect
            isMulti={false}
            defaultValue={[defaultValue()]}
            name="member"
            className='react-select width-230'
            classNamePrefix='select'
            styles={styles}
            loadOptions={loadOptions}
            defaultOptions={false}
            isClearable={true}
            onChange={(options) => {setUser(options); setForm({...form, providerId: options.value})}}
            disabled={editMode}
        />
        </FormGroup>
      </Col>

      <Col md="4">
       <FormGroup>
          <Label for='purchasePrice'>
          Prix d'achat <span className='text-danger'>*</span>
          </Label>
          <Input
            value = {form.purchasePrice}
            name='purchasePrice'
            id='purchasePrice'
            data-type="currency"
            placeholder=''
            onChange={e => setForm({...form, purchasePrice: e.target.value})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['purchasePrice'] })}
            disabled={editMode}
            style={{borderColor: Number(form.sellingPrice) < Number(form.purchasePrice) ? 'red': ''}}
          />
           {(Number(form.sellingPrice) < Number(form.purchasePrice)) && <span style={{color: 'red', fontSize: 12}}>Prix d'achat supérieur au prix de vente</span>}
        </FormGroup>
      </Col>

      <Col md="4">
       <FormGroup>
          <Label for='sellingPrice'>
          Prix de vente <span className='text-danger'>*</span>
          </Label>
          <Input
            value = {form.sellingPrice}
            name='sellingPrice'
            id='sellingPrice'
            data-type="currency"
            placeholder=''
            onChange={e => setForm({...form, sellingPrice: e.target.value})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['sellingPrice'] })}
            disabled={editMode}
            style={{borderColor: Number(form.sellingPrice) < Number(form.purchasePrice) ? 'red': ''}}
          />
          {(Number(form.sellingPrice) < Number(form.purchasePrice)) && <span style={{color: 'red', fontSize: 12}}>Prix de vente inférieur au prix d'achat</span>}
        </FormGroup>
      </Col>

      <Col md="4">
       <FormGroup>
          <Label for='discountThreshold'>
          Seuile de rémise <span className='text-danger'>*</span>
          </Label>
          <Input
            value = {form.discountThreshold}
            name='discountThreshold'
            id='discountThreshold'
            placeholder=''
            type="number"
            min="0"
            max="100"
            disabled={editMode}
            onChange={e => 
              {
                if(rx_live.test(e.target.value) && Number(e.target.value) < 100)
                setForm({...form, discountThreshold: e.target.value})
              }
              }
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['discountThreshold'] })}
          />
        </FormGroup>
      </Col>

      <Col md="4">
       <FormGroup>
          <Label for='warrantyPeriod'>
          Période de guarantie <span className='text-danger'>*</span>
          </Label>

          <Input disabled={editMode} type='select' id='warrantyPeriod' name='warrantyPeriod' value={form.warrantyPeriod} 
          onChange={e => setForm({...form, warrantyPeriod: e.target.value})}>
            <option value='0'>Acune guarantie</option>
            <option value='1'>1 mois</option>
            <option value='2'>2 mois</option>
            <option value='3'>3 mois</option>
            <option value='4'>4 mois</option>
            <option value='5'>5 mois</option>
            <option value='6'>6 mois</option>
            <option value='7'>7 mois</option>
            <option value='8'>8 mois</option>
            <option value='9'>9 mois</option>
            <option value='10'>10 mois</option>
            <option value='11'>11 mois</option>
            <option value='12'>12 mois</option>
            <option value='24'>24 mois</option>
            <option value='36'>36 mois</option>
          </Input>
          
        </FormGroup>
      </Col>

      <Col sm = '3'>
        <FormGroup
        style = {{
          height: 65.88,
          display:  'flex',
          alignItems: 'center',
          maarginTop: 15
        }}
        >
          <Label for='is-promo'
          style = {{
            marginRight: 15,
          }}
          >
            En promotion
          </Label>
          <CustomInput
          disabled={editMode}
          type='switch'
          label={<CheckIconLabel />}
          className='custom-control-success'
          id='icon-promo'
          name='icon-promo'
          inline
          defaultChecked = {form.isPromoted}
          value = {form.isPromoted}
          onChange = {(e) => {
            if(!e.target.checked) {
              setForm({...form, isPromoted: e.target.checked, promoPrice: 0, promoStartAt: null, promoEndAt: null})
            }else setForm({...form, isPromoted: e.target.checked})
            
          }}
        />
        </FormGroup>
      </Col>

      {form.isPromoted && <Col sm = '3'>
        <FormGroup>
          <Label for='promo'>
            Prix promotionnel
          </Label>
          <Input
            name='promo'
            id='promo'
            disabled={editMode}
            data-type="currency"
            placeholder=''
            value = {form.promoPrice}
            onChange={(e) => {
              setForm({...form, promoPrice: e.target.value})}}
              style={{borderColor: ((Number(form.promoPrice) < Number(form.purchasePrice)) || (Number(form.promoPrice) > Number(form.sellingPrice))) ? 'red': ''}}
              />
            {Number(form.promoPrice) > 0 && (Number(form.promoPrice) > Number(form.sellingPrice))
            && <span style={{color: 'red', fontSize: 12}}>Le prix promo est superieur au prix de vente.</span>}
            {Number(form.promoPrice) > 0 &&  (Number(form.promoPrice) < Number(form.purchasePrice))
            && <span style={{color: 'red', fontSize: 12}}>Le prix promo est inféreur au prix d'achat.</span>}

            {Number(form.promoPrice) ===0
            && <span style={{color: 'red', fontSize: 12}}>Le prix promo n'est pas définit.</span>}
        </FormGroup>
      </Col>}
         
      {form.isPromoted && <Col sm = '3'>
        <FormGroup>
          <Label for='promo-start'>
            Début de promotion
          </Label>
          <Input
            name='promo-start'
            id='promo-start'
            type="datetime-local"
            disabled={editMode}
            placeholder=''
            value = {moment(dateToLocalString(form.promoStartAt), 'DD/MM/YYYY hh:mm').format("YYYY-MM-DD[T]hh:mm")}
            onChange={e => onChangeDatePromo('start', e)}
            style={{borderColor: (form.isPromoted && !form.promoStartAt) ? 'red': ''}}
          />
          {(form.isPromoted && !form.promoStartAt)
            && <span style={{color: 'red', fontSize: 12}}>La début de la promotion n'est pas définie</span>}
        </FormGroup>
      </Col>}

      {form.isPromoted && <Col sm = '3'>
        <FormGroup>
          <Label for='promo-end'>
            Fin de promotion 
          </Label>
          <Input
            name='promo-end'
            disabled={editMode}
            id='promo-end'
            type="datetime-local"
            placeholder=''
            value = {moment(dateToLocalString(form.promoEndAt), 'DD/MM/YYYY hh:mm').format("YYYY-MM-DD[T]hh:mm")}
            onChange={e => onChangeDatePromo('end', e)}
            style={{borderColor: (form.isPromoted && !form.promoEndAt) ? 'red': ''}}
          />
          {(form.isPromoted && !form.promoEndAt)
            && <span style={{color: 'red', fontSize: 12}}>La début de la promotion n'est pas définie</span>}
        </FormGroup>
      </Col>}
     </Row>

     <FormGroup>
          <h3 for='fullDescription' className='mb-75'>
            Quantité par show room <span className='text-danger'>*</span>
          </h3>

          {agencyQty.map((vari, key) => {
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

                        <h3 style={{width: '40%'}} onClick={() => handleCollapseToggle(key)}>{vari?.name}</h3>

                        <div >
                          <Input
                          name='quantity'
                          id='quantity'
                          placeholder='Quantité'
                          value={vari?.quantity}
                          onChange={(e) => {
                            if(rx_live.test(e.target.value))
                          handleInputChange(e, key)}}
                          disabled={editMode}
                        />
                        </div>

                        {!editMode && <Button type='button' className='mr-1' color='primary'
                        disabled={vari?.quantity === 0}

                        onClick={() => {generateSerial(key); handleCollapseToggle(key)}}
                        >
                          Valider
                        </Button>}

                      </div>
                      
                    </CardTitle>
                    <ChevronUp onClick={() => handleCollapseToggle(key)} style={{cursor: 'pointer'}} size={14} />
                  
                </CardHeader>
                <Collapse isOpen={openCollapse === key}>
                  <CardBody>
                  {(!loadingSerial && currentAgency!==key) ? <table style={{width: '100%'}}>
                    <thead>
                      <th >Numéro de série</th>
                      <th >Code bar</th>
                    </thead>

                    <tbody>
                      {
                        vari.items && vari.items.map((varItem, index) => {
                          return <tr key={index}
                            >
                            <td>

                              <Input
                                name='serialNumber'
                                id='serialNumber'
                                placeholder=''
                                value={varItem?.serialNumber}
                                onChange={(e) => handleInputChangeSerial(e, key, index)}
                                onBlur={(e) => handleInputBlurSerial(e, key, index)}
                                disabled={editMode}
                              />

                            </td>
                            <td >
                              <Input
                                name='barCode'
                                id='barCode'
                                value={varItem?.barCode}
                                disabled
                              />

                            </td>

                          </tr>
                        })
                      }

                    </tbody>
                  </table>: 
                  <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <Spinner/>
                  </div>
                  }
                  </CardBody>
                </Collapse>
              </Card>
              })}
          
        </FormGroup>

        {editMode && <p>Approvisionnement effectuée par: <strong>{currentData.createdBy?.fullName}</strong> </p>}

       
      {!editMode && <Button type='submit' className='mr-1' color='primary'
        disabled={
        loading
        ||
        (
          !form.productId ||
          !form.providerId ||
          !form.arrivalDate ||
          form.sellingPrice === 0 ||
          !form.purchasePrice === 0 ||
          dataError
        )
      }
      >
        {loading ?  <Spinner animation="grow" /> : 'Enregistrer'}
      </Button>}
        <Button type='reset' color='secondary' outline onClick={close}>
          {!editMode ? 'Annuler' : 'Fermer'}
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarBrand
