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
import {Check, Copy} from 'react-feather'

import { useDispatch } from 'react-redux'

import { Slide, toast } from 'react-toastify'

import axios from 'axios'
import { base_url } from "@src/utility/baseUrl"
import { config } from '@src/utility/axiosconfig'
import { addCommas, removeNonNumeric } from '../../../../utility/helper'
import { Password } from '../../../../utility/helper'
import countries from '@src/utility/countries.json'
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
  closeSidebar,
  rowsPerPage,
  currentPage,
  searchTerm
}) => {

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    numbers: [],
    password: Password.generate(16),
    gender: 'man',
    role: 'manager',
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
  const [countryCities, setSities] = useState([])
  const [countryCode, setCountryCode] = useState('')
  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  // ** Function to handle form submit
  const onSubmit = async (values) => {
    setLoading(true)
    if (isObjEmpty(errors)) {
      if(!editMode) {
        await axios.post(`${base_url}user/register`, user)
        .then(response => {
          dispatch(getAllData({limit: rowsPerPage, page: currentPage, search: searchTerm}))
        })
        .then(() => {
          setUser({
            firstName: '',
            lastName: '',
            email: '',
            numbers: [],
            password: Password.generate(16),
            gender: 'man',
            role: 'manager',
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
          dispatch(getAllData({limit: rowsPerPage, page: currentPage, search: searchTerm}))
        })
        .then(() => {
          setUser({
            firstName: '',
            lastName: '',
            email: '',
            numbers: [],
            password: Password.generate(16),
            gender: 'man',
            role: 'manager',
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
      numbers: [],
      password: Password.generate(16),
      gender: 'man',
      role: 'manager',
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

  const copyPassword = async () =>{
    await navigator.clipboard.writeText(user.password);
    
    // Alert the copied text
    toast.success(
      <Fragment>
        <div className='toastify-header'>
          <div className='title-wrapper'>
            <Avatar size='sm' color='success' icon={<Check size={12} />} />
            <h6 className='toast-title font-weight-bold'>Copié avec succès</h6>
          </div>
        </div>
      </Fragment>,
      { transition: Slide, hideProgressBar: true, autoClose: 2000 }
    )
  }


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

        {!editMode && <FormGroup>
          <Label for='email'>
            Mot de passe <span className='text-danger'>*</span>
          </Label>
          <div
          style={{
            position: 'relative'
          }}
          >
          <Input
          type = 'text'
            value = {user.password}
            name='password'
            id='password'
            disabled
            placeholder=''
            onChange={e => setUser({...user, password: e.target.value})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['password'] })}
          />
          <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            height: '100%',
            width: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '0.357rem'
          }}
          onClick={copyPassword}
          >
            <Copy/>
          </div>
          </div>
        </FormGroup>}

        

        <FormGroup>
          <Label for='address'>
            Pays <span className='text-danger'>*</span>
          </Label>
          <Input type='select'
            onChange={e => 
              {
                const currentCountry = countries.filter((count) => count.name === e.target.value)[0]
                setSities(currentCountry.cities)
                setCountryCode(`+${currentCountry.phone_code}`)
                setUser({...user, addresses: [{...user.addresses[0], country: e.target.value, isPrincipal: true}]})
              }
            }
            value = {user.addresses.length ? user.addresses[0]?.country : ''}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['country'] })}
            name='country'
            id='country'
            >
              <option value={''}>Selectionner</option>
            {
              countries.map(({name, emoji, cities}, index) => {
                return <option key={index} value={name}> {name} </option>
              })
            }
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for='address'>
            Ville/Commune <span className='text-danger'>*</span>
          </Label>
          {countryCities.length ?
            <Input type='select' 
            name='city'
            id='city'
            onChange={e => setUser({...user, addresses: [{...user.addresses[0], city: e.target.value}]})}
            value = {user.addresses.length ? user.addresses[0]?.city : ''}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['city'] })}
            >
              <option value={''}>Selectionner</option>
            {
              countryCities.map(({name}, index) => {
                return <option key={index} value={name}> {name} </option>
              })
            }
            </Input> : <Input
            value = {user.addresses.length ? user.addresses[0]?.city : ''}
            name='city'
            id='city'
            placeholder=''
            onChange={e => setUser({...user, addresses: [{...user.addresses[0], city: e.target.value}]})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['city'] })}
          />
            }
          
        </FormGroup>

        <FormGroup>
          <Label for='numbers'>
            Contacts  <span className='text-danger'>*</span>
          </Label>
          <Input
          type = 'numbers'
            value = {user.numbers.length ? user.numbers[0]: ''}
            name='numbers'
            id='numbers'
            placeholder=''
            onChange={e => setUser({...user, numbers: [`${e.target.value}`]})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['numbers'] })}
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
