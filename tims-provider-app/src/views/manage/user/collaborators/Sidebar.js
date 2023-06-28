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

import { Slide, toast } from 'react-toastify'

import axios from 'axios'
import { base_url } from "@src/utility/baseUrl"
import { config } from '@src/utility/axiosconfig'
import { addCommas, removeNonNumeric } from '../../../../utility/helper'

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


const SidebarBrand = ({ open, toggleSidebar, 
  editMode,
  currentData, 
  closeSidebar
}) => {

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    numbers: '',
    gender: 'man',
    role: 'manager',
    defaultAgency: '',
    currentAgency: '',
    isBlocked: false,
    addresses: []
  });


  // ** States
  let timer = useRef()
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [agencies, setAgencies] = useState([])
  // ** Store Vars
  const dispatch = useDispatch()

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  // ** Function to handle form submit
  const onSubmit = async (values) => {
    setLoading(true)
    if (isObjEmpty(errors)) {
      if(!editMode) {
        await axios.post(`${base_url}user/register`, user)
        .then(response => {
          dispatch(getAllData())
        })
        .then(() => {
          setUser({
            firstName: '',
            lastName: '',
            email: '',
            numbers: '',
            gender: 'man',
            role: 'manager',
            defaultAgency: '',
            currentAgency: '',
            isBlocked: false,
            addresses: []
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
        await axios.put(`${base_url}user/update/${id}`, user, config)
        .then(response => {
          dispatch(getAllData())
        })
        .then(() => {
          setUser({
            firstName: '',
            lastName: '',
            email: '',
            numbers: '',
            gender: 'man',
            role: 'manager',
            defaultAgency: '',
            currentAgency: '',
            isBlocked: false,
            addresses: []
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

  const close = () => {
    setUser({
      firstName: '',
      lastName: '',
      email: '',
      numbers: '',
      gender: 'man',
      role: 'manager',
      defaultAgency: '',
      currentAgency: '',
      isBlocked: false,
      addresses: []
    });

    toggleSidebar()
  }

  useEffect(() => {
    if(editMode && currentData) {
      setUser(currentData)
      setId(currentData?._id)
    }
  }, [editMode, currentData])

  useEffect(() => {

    ;(async () => {
      try {
        await axios.get(`${base_url}agency`).then((response) => {
          setAgencies(response.data.data)
        }).catch((e) => {
          console.log(e)
        })
      } catch (error) {
        console.error(error)
      }

    })()
  }, [])


  return (
    <Sidebar
      size='lg'
      open={open}
      title={editMode ? `Modifier le collaborateur: ${currentData?.fullName} `: 'Nouveau collaborateur'}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={close}
    >
      <Form onSubmit={handleSubmit(onSubmit)}  autoComplete="off" role="presentation">
        <FormGroup>
          <Label for='lastName'>
            Prénom <span className='text-danger'>*</span>
          </Label>
          <Input
            value = {user.lastName}
            name='lastName'
            id='lastName'
            placeholder=''
            onChange={e => setUser({...user, lastName: e.target.value})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['lastName'] })}
          />
        </FormGroup>
       
        <FormGroup>
          <Label for='firstName'>
            Nom <span className='text-danger'>*</span>
          </Label>
          <Input
            value = {user.firstName}
            name='firstName'
            id='firstName'
            placeholder=''
            onChange={e => setUser({...user, firstName: e.target.value})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['firstName'] })}
          />
        </FormGroup>

        <FormGroup>
            <Label for='manager'>
              Show room par défaut <span className='text-danger'>*</span>
            </Label>

            <Input type='select' id='user-role' name='user-role' value={user.defaultAgency} onChange={e => setUser({...user, defaultAgency: e.target.value, currentAgency: e.target.value})}>
            <option value={''}>Choisir</option>
            {agencies.map((u) => (
                <option value={u._id}>{u.name}</option>
            ))}
            
          </Input>
          
        </FormGroup>
        <FormGroup>
            <Label for='manager'>
              Genre <span className='text-danger'>*</span>
            </Label>
            
            <Input type='select' id='user-gender' name='user-gender' value={user.gender} onChange={e => setUser({...user, gender: e.target.value})}>
              <option value={'man'}>Homme</option>
              <option value={'woman'}>Femme</option>
            </Input>
          
        </FormGroup>

        <FormGroup>
            <Label for='manager'>
              Rôle <span className='text-danger'>*</span>
            </Label>
            
            <Input type='select' id='user-role' name='user-role' value={user.role} onChange={e => setUser({...user, role: e.target.value})}>
            <option value={'super-admin'}>Super Admin</option>
            <option value={'admin'}>Admin</option>
            <option value={'manager'}>Manager</option>
            <option value={'commercial'}>Manager</option>
            <option value={'delivery-man'}>Livreur</option>
            </Input>
          
        </FormGroup>

        <FormGroup>
          <Label for='email'>
            Adresse e-mail <span className='text-danger'>*</span>
          </Label>
          <Input
          type = 'email'
            value = {user.email}
            name='email'
            id='email'
            placeholder=''
            onChange={e => setUser({...user, email: e.target.value})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['email'] })}
          />
        </FormGroup>

        <FormGroup>
          <Label for='numbers'>
            Contacts  <span className='text-danger'>*</span>
          </Label>
          <Input
          type = 'numbers'
            value = {user.numbers}
            name='numbers'
            id='numbers'
            placeholder=''
            onChange={e => setUser({...user, numbers: addCommas(removeNonNumeric(e.target.value))})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['numbers'] })}
          />
        </FormGroup>

        <FormGroup>
          <Label for='address'>
            Pays <span className='text-danger'>*</span>
          </Label>
          <Input
            value = {user.addresses.length ? user.addresses[0]?.country : ''}
            name='country'
            id='country'
            placeholder=''
            onChange={e => setUser({...user, addresses: [{...user.addresses[0], country: e.target.value}]})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['country'] })}
          />
        </FormGroup>

        <FormGroup>
          <Label for='address'>
            Ville/Commune <span className='text-danger'>*</span>
          </Label>
          <Input
            value = {user.addresses.length ? user.addresses[0]?.city : ''}
            name='city'
            id='city'
            placeholder=''
            onChange={e => setUser({...user, addresses: [{...user.addresses[0], city: e.target.value}]})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['city'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='location'>
            Adresse <span className='text-danger'>*</span>
          </Label>
          <Input
            value = {user.addresses.length ? user.addresses[0]?.location : ''}
            name='location'
            id='location'
            placeholder=''
            onChange={e => setUser({...user, addresses: [{...user.addresses[0], location: e.target.value}]})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['location'] })}
          />
        </FormGroup>

        {editMode  && <FormGroup>
          <Label for='visibility'>Etat</Label>
          <Input type='select' id='visibility' name='visibility' value={!user.isBlocked ? 1 : 0} 
           onChange={e => setUser({...user, isBlocked: Number(e.target.value) === 1 ? false : true})}>
            <option value='1'>Actif</option>
            <option value='0'>Bloqué</option>
          </Input>
        </FormGroup>}

       
        <Button type='submit' className='mr-1' color='primary'
         disabled={
          loading
          ||
          (
            !user.lastName ||
            !user.firstName ||
            !user.numbers.length ||
            !user.defaultAgency ||
            !user.email ||
            !user.addresses.length
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

export default SidebarBrand
