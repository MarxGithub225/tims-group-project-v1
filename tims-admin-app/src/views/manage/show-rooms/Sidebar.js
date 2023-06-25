// ** React Import
import { Fragment, useEffect, useRef, useState } from 'react'

import Avatar from '@components/avatar'
// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { Button, FormGroup, Label, Form, Input, Spinner } from 'reactstrap'

// ** Store & Actions
import { getAllData } from './store/action'
import {Check} from 'react-feather'

import { useDispatch } from 'react-redux'


import useJwt from '@src/auth/jwt/useJwt'
import { Slide, toast } from 'react-toastify'

import moment from "moment";
import Select from 'react-select';
import AsyncSelect from "react-select/async";

import axios from 'axios'
import { base_url, file_url } from "@src/utility/baseUrl"
import { config } from '@src/utility/axiosconfig'
import { addCommas, removeNonNumeric } from '../../../utility/helper'

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
const SidebarAgency = ({ open, toggleSidebar, 
  editMode,
  currentData, 
}) => {

  const [agency, setAgency] = useState({
    name: '',
    location: '',
    city: '',
    country: '',
    email: '',
    managerId: '',
    commercialId: '',
    numbers: '',
    isBlocked: false
  });

  let timer = useRef()
  // ** States
  const [user, setUser] = useState(null)
  const [commercial, setCommercial] = useState(null)
  const [image, setImage] = useState(null)
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
        await axios.post(`${base_url}agency`, {...agency, commercialId: agency.managerId}, config)
        .then(response => {
          dispatch(getAllData({limit: 10, page: 1}))
        })
        .then(() => {
          setAgency({
            name: '',
            location: '',
            city: '',
            country: '',
            email: '',
            managerId: '',
            commercialId: '',
            numbers: '',
            isBlocked: false
          });

          setImage('')
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
      }else {
        await axios.put(`${base_url}agency/update/${id}`, agency, config)
        .then(response => {
          dispatch(getAllData({limit: 10, page: 1}))
        })
        .then(() => {
          setAgency({
            name: '',
            location: '',
            city: '',
            country: '',
            email: '',
            managerId: '',
            commercialId: '',
            numbers: '',
            isBlocked: false
          });

          setImage('')
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

      
      
    }
  }


  const close = () => {
    setAgency({
      name: '',
    location: '',
    city: '',
    country: '',
    email: '',
    managerId: '',
    commercialId: '',
    numbers: '',
    isBlocked: false
    });

    setImage('')
    toggleSidebar()
  }

  useEffect(() => {
    if(editMode && currentData) {
      setUser({
        label : currentData?.managerId?.fullName,
        value : currentData?.managerId?._id,
      })
      setCommercial({
        label : currentData?.commercialId?.fullName,
        value : currentData?.commercialId?._id,
      })
      setAgency(currentData)
      setId(currentData?._id)
    }
  }, [editMode, currentData])


  const getSelectData = (data) => {
    const tab = []
    for (let i = 0; i < data.length; i++) {
      tab.push({
        value: data[i]._id,
        label: data[i].fullName
      })
    }
    return tab
  }


  const loadOptions = (inputValue, callback) => {
    if (inputValue?.length >= 3) {
      if (timer.current) clearTimeout(timer.current)

      timer.current = setTimeout(async () => {
        const queryString = new URLSearchParams({offset: 0, limit: 20, fullName: inputValue}).toString();
        await axios.get(`${base_url}user/all?${queryString}`).then((response) => {
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

    if(agency?.managerId) {
      return user
    }else {
      return { value: 0 , label: 'Choisir' }
    }

  }
  const defaultValueCommercial = () => {

    if(agency?.commercialId) {
      return commercial
    }else {
      return { value: 0 , label: 'Choisir' }
    }

  }
  return (
    <Sidebar
      size='lg'
      open={open}
      title={editMode ? `Modifier le show room: ${currentData?.label} `: 'Nouvelle show room'}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={close}
    >
      <Form onSubmit={handleSubmit(onSubmit)}  autoComplete="off" role="presentation">
        <FormGroup>
          <Label for='name'>
            Libéllé du show room <span className='text-danger'>*</span>
          </Label>
          <Input
            value = {agency.name}
            name='name'
            id='name'
            placeholder=''
            onChange={e => setAgency({...agency, name: e.target.value})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['name'] })}
          />
        </FormGroup>
       
        <FormGroup>
          <Label for='address'>
            Pays <span className='text-danger'>*</span>
          </Label>
          <Input
            value = {agency.country}
            name='country'
            id='country'
            placeholder=''
            onChange={e => setAgency({...agency, country: e.target.value})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['country'] })}
          />
        </FormGroup>

        <FormGroup>
          <Label for='address'>
            Ville/Commune <span className='text-danger'>*</span>
          </Label>
          <Input
            value = {agency.city}
            name='city'
            id='city'
            placeholder=''
            onChange={e => setAgency({...agency, city: e.target.value})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['city'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='location'>
            Adresse <span className='text-danger'>*</span>
          </Label>
          <Input
            value = {agency.location}
            name='location'
            id='location'
            placeholder=''
            onChange={e => setAgency({...agency, location: e.target.value})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['location'] })}
          />
        </FormGroup>

        <FormGroup>
            <Label for='manager'>
              Manager <span className='text-danger'>*</span>
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
                onChange={(options) => {setUser(options); setAgency({...agency, managerId: options.value})}}
            />

          
        </FormGroup>

        <FormGroup>
            <Label for='manager'>
              Commercial <span className='text-danger'>*</span>
            </Label>

            <AsyncSelect
                isMulti={false}
                defaultValue={[defaultValueCommercial()]}
                name="member"
                className='react-select width-230'
                classNamePrefix='select'
                styles={styles}
                loadOptions={loadOptions}
                defaultOptions={false}
                isClearable={true}
                onChange={(options) => {setCommercial(options); setAgency({...agency, commercialId: options.value})}}
            />

          
        </FormGroup>
       
        <FormGroup>
          <Label for='email'>
            Email du show room <span className='text-danger'>*</span>
          </Label>
          <Input
          type = 'email'
            value = {agency.email}
            name='email'
            id='email'
            placeholder=''
            onChange={e => setAgency({...agency, email: e.target.value})}
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
            value = {agency.numbers}
            name='numbers'
            id='numbers'
            placeholder=''
            onChange={e => setAgency({...agency, numbers: addCommas(removeNonNumeric(e.target.value))})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['numbers'] })}
          />
        </FormGroup>

        {editMode  && <FormGroup>
          <Label for='visibility'>Visibilité</Label>
          <Input type='select' id='visibility' name='visibility' value={!agency.isBlocked ? 1 : 0} 
           onChange={e => setAgency({...agency, isBlocked: Number(e.target.value) === 1 ? false : true})}>
            <option value='1'>Visible</option>
            <option value='0'>Non visible</option>
          </Input>
        </FormGroup>}
        <Button type='submit' className='mr-1' color='primary'
         disabled={
          loading
          ||
          (
            !agency.name ||
            !agency.location ||
            !agency.country ||
            !agency.city ||
            !agency.numbers.length ||
            !agency.managerId ||
            !Number(agency.managerId) === -1 ||
            !agency.email 
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

export default SidebarAgency
