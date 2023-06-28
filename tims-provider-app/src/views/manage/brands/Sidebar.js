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
import { Button, FormGroup, Label, FormText, Form, Input, Spinner } from 'reactstrap'

// ** Store & Actions
import { addBrand, getAllData } from './store/action'
import FileDropzone from '../../components/fileDropzone'
import {Check, Trash} from 'react-feather'

import { useDispatch } from 'react-redux'

import { Slide, toast } from 'react-toastify'
import AsyncSelect from "react-select/async";

import axios from 'axios'
import { base_url, file_url } from "@src/utility/baseUrl"
import { config } from '@src/utility/axiosconfig'

import ProgressingComponent from '@components/progressingComponent';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const SidebarBrand = ({ open, toggleSidebar, 
  editMode,
  currentData, 
  closeSidebar
}) => {

  const [brand, setBrand] = useState({
    name: '',
    image: null,
    isBlocked: false
  });


  // ** States
  let timer = useRef()
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
        await axios.post(`${base_url}brand`, brand, config)
        .then(response => {
          dispatch(getAllData({limit: 10, page: 1}))
        })
        .then(() => {
          setBrand({
            name: '',
            image: null,
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
          let errMessage = "Une erreur s'est produite, merci de réessayer plustard.";
          console.log('Error', error)
          if(error.errors) {
            if(error.errors.name === "ValidationError")
           {
            if(error.errors.label) {
              errMessage = "Une marque existe déjà sous ce libéllé!"
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
        await axios.put(`${base_url}brand/update/${id}`, brand, config)
        .then(response => {
          dispatch(getAllData({limit: 10, page: 1}))
        })
        .then(() => {
          setBrand({
            name: '',
            image: null,
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
          let errMessage = "Une erreur s'est produite, merci de réessayer plustard.";
          console.log('Error', error)
          if(error.errors) {
            if(error.errors.name === "ValidationError")
           {
            if(error.errors.label) {
              errMessage = "Une marque existe déjà sous ce libéllé!"
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
    setBrand({
      label: '',
      image: null,
      isVisible: true
    });

    toggleSidebar()
  }

  useEffect(() => {
    if(editMode && currentData) {
     
      setBrand(currentData)
      setId(currentData?._id)
    }
  }, [editMode, currentData])
  
  return (
    <Sidebar
      size='lg'
      open={open}
      title={editMode ? `Modifier la marque: ${currentData?.label} `: 'Nouvelle marque'}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={close}
    >
      <Form onSubmit={handleSubmit(onSubmit)}  autoComplete="off" role="presentation">
        <FormGroup>
          <Label for='name'>
            Nom de la marque <span className='text-danger'>*</span>
          </Label>
          <Input
            value = {brand.name}
            name='name'
            id='name'
            placeholder=''
            onChange={e => setBrand({...brand, name: e.target.value})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['name'] })}
          />
        </FormGroup>
       
        <FormGroup>
          <Label for='visibility'>Visibilité</Label>
          <Input type='select' id='visibility' name='visibility' value={!brand.isBlocked ? 1 : 0} 
          onChange={e => setBrand({...brand, isBlocked: Number(e.target.value) === 1 ? false : true})}>
            <option value='1'>Visible</option>
            <option value='0'>Non visible</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for='image'>
              Image <span className='text-danger'>*</span>
            </Label>

            {
                brand.image ?
              <div
              style={{
                position: 'relative',
                height: 200
              }}
              >

                <img src={`${file_url}/brands/${brand.image}`} alt="image" style={{borderRadius: 5, width: "100%", height: 200, marginBottom: 20}}/>

                <div
              style={{
                position: 'absolute',
                right: 15,
                top: 15,
                backgroundColor: 'white',
                borderRadius: "100%",
                padding: 5,
                width: 20,
                height: 20,
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center'
              }}
              ><Trash size={14} color='red' style={{cursor: 'pointer'}} 
              onClick = {async () => {

                if(!editMode) {
                  await axios.delete(`${base_url}upload/delete/brands/${brand.image}`).then((res) => {
                    setBrand({...brand, image: null})
                  })
                }else {
                  

                  return MySwal.fire({
                    title: 'Êtes-vous sûr ?',
                    text: "Vous ne pouvez pas annuler cela !",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Oui, supprimer !',
                      cancelButtonText: 'Annuler',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                      cancelButton: 'btn btn-outline-danger ml-1'
                    },
                    buttonsStyling: false
                  }).then(async function (result) {
                    if (result.value) {
                      await axios.delete(`${base_url}brand/delete-image/${currentData?._id}/${brand.image} `).then((res) => {
                        setBrand({...brand, image: null})
                      })
                    }
                  })
                  .catch((error) => {
                    console.log('Error', error)
                  })
                }
              }}
              /></div>
              </div> :
              <FileDropzone editMode = {editMode} onChange = {async (file) => {
                const formData = new FormData();
                formData.append("image", file);
                await axios.post(`${base_url}upload/brand`, formData).then((res) => {
                  setBrand({...brand, image: res.data?.filename})
                })
                
              } } />
            }
          
        </FormGroup>
       
        <Button type='submit' className='mr-1' color='primary'
         disabled={
          loading
          ||
          (
            !brand.name ||
            !brand.image
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
