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
import { addCategory, getAllData } from './store/action'
import FileDropzone from '../../components/fileDropzone'
import {Check, Trash} from 'react-feather'

import { useDispatch } from 'react-redux'
import ReactQuill from 'react-quill';

import useJwt from '@src/auth/jwt/useJwt'
import { Slide, toast } from 'react-toastify'

import axios from 'axios'
import { base_url, file_url } from "@src/utility/baseUrl"
import { config } from '@src/utility/axiosconfig'

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


const SidebarSubCategory = ({ open, toggleSidebar, 
  editMode,
  currentData, 
  categoryId,
  rowsPerPage,
  currentPage,
  searchTerm
}) => {
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

  const [category, setCategory] = useState({
    icon: '',
    name: '',
    image: null,
    isBlocked: false,
    productCategoryId: '',
    instructions: '',
  });

  // ** States
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(false)

  // ** Store Vars
  const dispatch = useDispatch()
  const [image1Loading, setImage1Loading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  // ** Function to handle form submit
  const onSubmit = async (values) => {
    setLoading(true)
    if (isObjEmpty(errors)) {
      if(!editMode) {
        await axios.post(`${base_url}subcategory`, {...category, productCategoryId: categoryId}, config)
        .then(response => {
          dispatch(getAllData({limit: rowsPerPage, page: currentPage, productCategoryId: categoryId, search: searchTerm}))
        })
        .then(() => {
          setCategory({
            icon: '',
            name: '',
            image: null,
            isBlocked: false,
            productCategoryId: '',
            instructions: '',
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
              errMessage = "Une sous catégorie existe déjà sous ce libéllé!"
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
        await axios.put(`${base_url}subcategory/update/${id}`, category, config)
        .then(response => {
          dispatch(getAllData({limit: rowsPerPage, page: currentPage, productCategoryId: categoryId, search: searchTerm}))
        })
        .then(() => {
          setCategory({
            icon: '',
            name: '',
            image: null,
            isBlocked: false,
            productCategoryId: '',
            instructions: '',
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
              errMessage = "Une sous catégorie existe déjà sous ce libéllé!"
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

  const quillChange = (content, delta, source, editor) => {
    setCategory({...category, instructions: editor.getHTML()})
  }

  const close = () => {
    setCategory({
      icon: '',
      name: '',
      image: null,
      isBlocked: false,
      productCategoryId: '',
      instructions: '',
    });

    toggleSidebar()
  }

  useEffect(() => {
    if(editMode && currentData) {
      setCategory(currentData)
      setId(currentData?._id)
    }
  }, [editMode, currentData])

  return (
    <Sidebar
      size='lg'
      open={open}
      title={editMode ? `Modifier la sous catégorie: ${currentData?.label} `: 'Nouvelle sous catégorie'}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={close}
    >
      <Form onSubmit={handleSubmit(onSubmit)}  autoComplete="off" role="presentation">
        <FormGroup>
          <Label for='name'>
            Libéllé de la sous catégorie <span className='text-danger'>*</span>
          </Label>
          <Input
            value = {category.name}
            name='name'
            id='name'
            placeholder=''
            onChange={e => setCategory({...category, name: e.target.value})}
          />
        </FormGroup>
       

        <FormGroup>
          <Label for='visibility'>Visibilité</Label>
          <Input type='select' id='visibility' name='visibility' value={!category.isBlocked ? 1 : 0} 
          onChange={e => setCategory({...category, isBlocked: Number(e.target.value) === 1 ? false : true})}>
            <option value='1'>Visible</option>
            <option value='0'>Non visible</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for='icon'>
              Icon <span className='text-danger'>*</span>
            </Label>

            {
                category.icon ?
              <div
              style={{
                position: 'relative',
                height: 200
              }}
              >

                <center><img src={`${file_url}/categories/${category.icon}`} alt="icon" style={{borderRadius: 5, width: "auto", height: 172, marginBottom: 20}}/></center>

                <div
              style={{
                position: 'absolute',
                right: 15,
                top: 15
              }}
              >
                {delete1Loading ? <Spinner/>:
                <Trash color='red' style={{cursor: 'pointer'}} 
                onClick = {async () => {
                  setDelete1Loading(true)
                  if(!editMode) {
                    await axios.delete(`${base_url}upload/delete/categories/${category.icon}`, config).then((res) => {
                      setCategory({...category, icon: null})
                      setDelete1Loading(false)
                    }).catch((err) => {
                      console.log(err)
                      setDelete1Loading(false)
                      toast.error(
                        'La suppression a échoué, veuillez réessayer',
                        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                      )
                    })
                  }else {
                    await axios.delete(`${base_url}category/delete-icon/${currentData?._id}/${category.icon} `, config).then((res) => {
                      setCategory({...category, icon: null})
                      setDelete1Loading(false)
                    }).catch((err) => {
                      console.log(err)
                      setDelete1Loading(false)
                      toast.error(
                        'La suppression a échoué, veuillez réessayer',
                        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                      )
                    })
                  }
                }}
                />
                }

              </div>
              </div> :
              <>
              {image1Loading ? <Spinner/> :
              <FileDropzone editMode = {editMode} onChange = {async (file) => {
                const formData = new FormData();
                formData.append("image", file);
                setImage1Loading(true)
                await axios.post(`${base_url}upload/category`, formData, config).then((res) => {
                  setCategory({...category, icon: res.data?.filename})
                  setImage1Loading(false)
                })
                .catch((err) => {
                  console.log(err)
                  setImage1Loading(false)
                  toast.error(
                    'Le téléchargement a échoué, veuillez réessayer',
                     { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                   )
                })
                
              } } />
              }
              </>
            }
          
        </FormGroup>
        <FormGroup>
          <Label for='image'>
              Image <span className='text-danger'>*</span>
            </Label>

            {
                category.image ?
              <div
              style={{
                position: 'relative',
                height: 200
              }}
              >

                <center><img src={`${file_url}/categories/${category.image}`} alt="image" style={{borderRadius: 5, width: "auto", height: 172, marginBottom: 20}}/></center>
                <div
              style={{
                position: 'absolute',
                right: 15,
                top: 15
              }}
              >
                {deleteLoading ? <Spinner/> :
                <Trash color='red' style={{cursor: 'pointer'}} 
                onClick = {async () => {
                  setDeleteLoading(true)
                  if(!editMode) {
                    await axios.delete(`${base_url}upload/delete/categories/${category.image}`, config).then((res) => {
                      setCategory({...category, image: null})
                      setDeleteLoading(false)
                    }).catch((err) => {
                      console.log(err)
                      setDeleteLoading(false)
                      toast.error(
                        'La suppression a échoué, veuillez réessayer',
                        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                      )
                    })
                  }else {
                    await axios.delete(`${base_url}category/delete-image/${currentData?._id}/${category.image} `, config).then((res) => {
                      setCategory({...category, image: null})
                      setDeleteLoading(false)
                    }).catch((err) => {
                      console.log(err)
                      setDeleteLoading(false)
                      toast.error(
                        'La suppression a échoué, veuillez réessayer',
                        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                      )
                    })
                  }
                }}
                />
                }
              </div>
              </div> :
              <>
              {image1Loading ? <Spinner/> :
              <FileDropzone editMode = {editMode} onChange = {async (file) => {
                const formData = new FormData();
                formData.append("image", file);
                setImage1Loading(true)
                await axios.post(`${base_url}upload/category`, formData, config).then((res) => {
                  setCategory({...category, image: res.data?.filename})
                  setImage1Loading(false)
                })
                .catch((err) => {
                  console.log(err)
                  setImage1Loading(false)
                  toast.error(
                    'Le téléchargement a échoué, veuillez réessayer',
                     { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                   )
                })
              } } />}
              </>
            }
          
        </FormGroup>

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
          value={category.instructions}
          onChange={quillChange} />}
         
      </FormGroup>
       
        <Button type='submit' className='mr-1' color='primary'
         disabled={
          loading
          ||
          (
            !category.name ||
            !category.icon ||
            !category.image
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

export default SidebarSubCategory
