// ** React Import
import { Fragment, useEffect, useState } from 'react'

import Avatar from '@components/avatar'
// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { Button, FormGroup, Label, FormText, Form, Input, Spinner } from 'reactstrap'

// ** Store & Actions
import { addBanner, getAllData } from './store/action'
import FileDropzone from '../../components/fileDropzone'
import {Check, Trash} from 'react-feather'

import { useDispatch } from 'react-redux'


import useJwt from '@src/auth/jwt/useJwt'
import { Slide, toast } from 'react-toastify'

import moment from "moment";
import dateToLocalString from '../../../utility/dateToLocalString'

import axios from 'axios'
import { base_url, file_url } from "@src/utility/baseUrl"
import { config } from '@src/utility/axiosconfig'
import $ from 'jquery'

const ToastContent = () => (
  <Fragment>
    <div className='toastify-header'>
      Success action:
    </div>
    <div className='toastify-body'>
      <span>Réssuie!</span>
    </div>
  </Fragment>
)

moment().locale("de");
const SidebarBanner = ({ open, toggleSidebar, 
  editMode,
  currentData,
  rowsPerPage,
  currentPage,
  searchTerm
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

  const [banner, setBanner] = useState({
    title: '',
    price: 0,
    promoPrice: 0,
    description: '',
    link: '',
    type: 'main-banner',
    image: null,
    startAt: new Date(),
    endAt: new Date().setDate(new Date().getDate() + 1),
    isBlocked: false
  });

  // ** States
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(false)

  // ** Store Vars
  const dispatch = useDispatch()

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  // ** Function to handle form submit
  const onSubmit = async (values) => {
    setLoading(true)
    if (isObjEmpty(errors)) {
      if(!editMode) {
        await axios.post(`${base_url}banner`, banner, config)
        .then(response => {
          dispatch(getAllData({limit: rowsPerPage, page: currentPage, search: searchTerm}))
        })
        .then(() => {
          setBanner({
            title: '',
            price: 0,
            promoPrice: 0,
            description: '',
            link: '',
            type: '',
            image: null,
            startAt: new Date(),
            endAt: new Date().setDate(new Date().getDate() + 1),
            isBlocked: false
          });

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
          toast.error(
            'Erreur!',
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
          console.log('Error', error)
          setLoading(false)
        })
      }else {
        await axios.put(`${base_url}banner/update/${id}`, banner, config)
        .then(response => {
          dispatch(getAllData({limit: rowsPerPage, page: currentPage, search: searchTerm}))
        })
        .then(() => {
          setBanner({
            title: '',
            price: 0,
            promoPrice: 0,
            description: '',
            link: '',
            type: '',
            image: null,
            startAt: new Date(),
            endAt: new Date().setDate(new Date().getDate() + 1),
            isBlocked: false
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
          toast.error(
            'Erreur!',
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
          console.log('Error', error)
          setLoading(false)
        })
      }

      
      
    }
  }


  const close = () => {
    setBanner({
      title: '',
      price: 0,
      promoPrice: 0,
      description: '',
      link: '',
      type: '',
      image: null,
      startAt: new Date(),
      endAt: new Date().setDate(new Date().getDate() + 1),
      isBlocked: false
    });

    toggleSidebar()
  }

  useEffect(() => {
    if(editMode && currentData) {
      setBanner(currentData)
      setId(currentData?._id)
    }
  }, [editMode, currentData])


  const onChangeDate = (type, e) => {
    let dt = new Date(e.target.value).getTime();
    let current_timestamp = dt
    let seconds = 0
    if (type === 'start') {
      setBanner({ ...banner, startAt: e.target.value });
    } else {
      if (banner.startAt) {
        seconds = (current_timestamp - banner.startAt)
        if (seconds < 0) {
          alert('Impossible de choisir une date arrière')
        } else {
          setBanner({ ...banner, endAt: e.target.value });
        }
      }
    }
  }
  return (
    <Sidebar
      size='lg'
      open={open}
      title={editMode ? `Modifier la bannière: ${currentData?.link} `: 'Nouvelle bannière'}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={close}
    >
      <Form onSubmit={handleSubmit(onSubmit)}  autoComplete="off" role="presentation">

        <FormGroup>
          <Label for='type'>Type</Label>
          <Input type='select' id='type' name='type' value={banner.type} 
          onChange={e => setBanner({...banner, type: e.target.value})}>
            <option value='main-banner'>Bannière catégorie</option>
            <option value='half-banner'>Bannière produit</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for='title'>
            Libéllé <span className='text-danger'>*</span>
          </Label>
          <Input
            value = {banner.title}
            name='title'
            id='title'
            placeholder=''
            onChange={e => setBanner({...banner, title: e.target.value})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['title'] })}
          />
        </FormGroup>

        <FormGroup>
          <Label for='description'>
            Description <span className='text-danger'>*</span>
          </Label>
          <Input
            value = {banner.description}
            name='description'
            id='description'
            type='textarea'
            row={5}
            placeholder=''
            onChange={e => setBanner({...banner, description: e.target.value})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['description'] })}
          />
        </FormGroup>

        <FormGroup>
          <Label for='price'>
          Prix
          </Label>
          <Input
            value = {banner.price}
            name='price'
            id='price'
            data-type="currency"
            placeholder=''
            onChange={e => setBanner({...banner, price: e.target.value})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['price'] })}
            disabled={editMode}
            style={{borderColor: Number(banner.price) < Number(banner.promoPrice) ? 'red': ''}}
          />
           {(Number(banner.price) < Number(banner.promoPrice)) && <span style={{color: 'red', fontSize: 12}}>Prix inférieur au prix promo</span>}
        </FormGroup>

        <FormGroup>
          <Label for='promoPrice'>
          Prix Promo
          </Label>
          <Input
            value = {banner.promoPrice}
            name='promoPrice'
            id='promoPrice'
            data-type="currency"
            placeholder=''
            onChange={e => setBanner({...banner, promoPrice: e.target.value})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['promoPrice'] })}
            disabled={editMode}
            style={{borderColor: Number(banner.price) < Number(banner.promoPrice) ? 'red': ''}}
          />
           {(Number(banner.price) < Number(banner.promoPrice)) && <span style={{color: 'red', fontSize: 12}}>Prix promo supérieur au prix</span>}
        </FormGroup>

        <FormGroup>
          <Label for='link'>
            Lien associé <span className='text-danger'>*</span>
          </Label>
          <Input
            value = {banner.link}
            name='link'
            id='link'
            placeholder=''
            onChange={e => setBanner({...banner, link: e.target.value})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['link'] })}
          />
        </FormGroup>
       
        <FormGroup>
          <Label for='start_date'>Début</Label>
          <Input
            value = {moment(dateToLocalString(banner.startAt), 'DD/MM/YYYY hh:mm').format("YYYY-MM-DD[T]hh:mm")}
            name='start_date'
            id="start_date"
            type="datetime-local"
            onChange={e => onChangeDate('start', e)}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['start_date'] })}
          />
        </FormGroup>

        <FormGroup>
          <Label for='end_date'>Fin</Label>
          <Input
            value = {moment(dateToLocalString(banner.endAt), 'DD/MM/YYYY hh:mm').format("YYYY-MM-DD[T]hh:mm")}
            name='end_date'
            id="end_date"
            type="datetime-local"
            onChange={e => onChangeDate('end', e)}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['end_date'] })}
          />
        </FormGroup>

        <FormGroup>
          <Label for='image'>
              Image <span className='text-danger'>*</span>
            </Label>

            {
                banner.image ?
              <div
              style={{
                position: 'relative',
                height: 200
              }}
              >

                <img src={`${file_url}/banners/${banner.image}`} alt="image" style={{borderRadius: 5, width: "100%", height: 200, marginBottom: 20}}/>

                <div
              style={{
                position: 'absolute',
                right: 15,
                top: 15
              }}
              ><Trash color='red' style={{cursor: 'pointer'}} 
              onClick = {async () => {

                if(!editMode) {
                  await axios.delete(`${base_url}upload/delete/banners/${banner.image}`, config).then((res) => {
                    setBanner({...banner, image: null})
                  })
                }else {
                  await axios.delete(`${base_url}banner/delete-image/${currentData?._id}/${banner.image} `, config).then((res) => {
                    setBanner({...banner, image: null})
                  })
                }
              }}
              /></div>
              </div> :
              <FileDropzone editMode = {editMode} onChange = {async (file) => {
                const formData = new FormData();
                formData.append("image", file);
                await axios.post(`${base_url}upload/banner`, formData, config).then((res) => {
                  setBanner({...banner, image: res.data?.filename})
                })
                
              } } />
            }
          
        </FormGroup>

        <FormGroup>
          <Label for='visibility'>Visibilité</Label>
          <Input type='select' id='visibility' name='visibility' value={!banner.isBlocked ? 1 : 0} 
          onChange={e => setBanner({...banner, isBlocked: Number(e.target.value) === 1 ? false : true})}>
            <option value='1'>Visible</option>
            <option value='0'>Non visible</option>
          </Input>
        </FormGroup>
       
        <Button type='submit' className='mr-1' color='primary'
         disabled={
          loading
          ||
          (
            !banner.type ||
            !banner.link ||
            !banner.image
          )
        }
        >
          {loading ?  <Spinner animation="grow" /> : 'Enregistrer'}
        </Button>
        <Button type='reset' color='secondary' outline onClick={close}>
          Annuler
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarBanner
