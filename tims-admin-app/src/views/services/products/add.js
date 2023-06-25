import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Card, CardBody, Row, Col, Form, FormGroup, Input, Button, Spinner, Modal, ModalBody, Label} from 'reactstrap'


import ReactQuill, {Quill} from 'react-quill';
import { useForm } from 'react-hook-form';

import Avatar from '@components/avatar'
import {Check} from 'react-feather'
import { Slide, toast } from 'react-toastify'
import { useHistory, useParams } from 'react-router-dom';

import ImageResize from 'quill-image-resize-module-react';
import BlotFormatter from 'quill-blot-formatter';

import axios from 'axios'
import { base_url, file_url } from "@src/utility/baseUrl"
import { config } from '@src/utility/axiosconfig'
import moment from 'moment';
import dateToLocalString from '../../../utility/dateToLocalString';
import { randomChar } from '../../../utility/helper';

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
const Video = Quill.import('formats/video');
const Link = Quill.import('formats/link'); 

class CoustomVideo extends Video {
    static create(value) {
      const node = super.create(value);
      
      const video = document.createElement('video')
      video.setAttribute('controls', true);
      video.setAttribute('type', "video/mp4");
      video.setAttribute('style', "height: 100%; width: 100%");
      video.setAttribute('src', this.sanitize(value));
      node.appendChild(video);
  
      return node;
    }
  
    static sanitize(url) {
      return Link.sanitize(url);
    }
};

CoustomVideo.blotName = 'video';
CoustomVideo.className = 'ql-video';
CoustomVideo.tagName = 'iframe';

Quill.register('formats/video', CoustomVideo);
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/blotFormatter', BlotFormatter);

function ProductForm() {

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

  const {id} = useParams()
  const history = useHistory()


  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)

  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSubCategory, setCurrentSubCategory] = useState(null);

  const [cancelModal, setCancelModal] = useState(false)
  const toogleCancelModal = () => {
    setCancelModal(!cancelModal)
  }
  // ** Vars
  const { handleSubmit } = useForm()

  const [form, setForm] = useState(
    {
      categoryId: '',
      subcategoryId: '',
      brandId: '',
      model: '',
      weight: '',
      title: '',
      cost: 0,
      promoCost: 0,
      boughtNumber: 0,
      bonusNumber: 0,
      promostartAt: null,
      promoType: '',
      promoendAt: null,
      isPromoted: false,
      isBlocked: false,
      colors: [
        {
          colorName: '',
          isActivated: true,
          purchaseCount: 0,
          primaryImage: '',
          images : [],
          variables: [
            {
              sku: randomChar(15).toLocaleUpperCase(),
              label: '',
              quantity: 0,
              isActivated: true
            }
          ],
        }
      ],
      smallDescription: '',
      description: ''
    }
  )

  const [refuseForm, setRefuseForm] = useState({
    reason: [],
    notes: ''
  })

 
  const notesChange = (content, delta, source, editor) => {
    setRefuseForm({
      ...refuseForm, notes: editor.getHTML()
    })
  }
  
  useEffect(() => {
   if(id) {
    ;(async () => {
      try {
        const queryString = new URLSearchParams({page: 1, limit: 1000000000, search:''}).toString();
        const [categories, product] = await Promise.all([
          await axios.get(`${base_url}category?${queryString}`),
          await axios.get(`${base_url}product/id/${id}`),
        ])

        setForm(product.data)

        setCurrentCategory({value: product.data?.categoryId._id, label: product.data?.categoryId?.name})
        
        setCurrentSubCategory({value: product.data?.subcategoryId._id,  label: product.data?.subcategoryId.name})
      } catch (error) {
        console.error(error)
      }

      setLoadingData(false)

    })()
   }
  }, [id])

  const refuseProduct = async () => {
    setLoading(true)

    try {

      await axios.post(`${base_url}product-refuse`, {...refuseForm, productId: id}, config)
      .then( async (refuse) => {
        await axios.put(`${base_url}product/update/${id}`, {...form, refuseId: refuse?.data?._id, isNew: false, cancelled: true, isBlocked: false, isUpdated: false, approved: false}, config)
        .then( async () => {
          setLoading(false)
          history.push('/service/products')
          toast.success(
            <Fragment>
              <div className='toastify-header'>
                <div className='title-wrapper'>
                  <Avatar size='sm' color='success' icon={<Check size={12} />} />
                  <h6 className='toast-title font-weight-bold'>Modification réussie!</h6>
                </div>
              </div>
            </Fragment>,
            { transition: Slide, hideProgressBar: true, autoClose: 5000 }
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
      })
        .catch((error) => {
          toast.error(
            'Erreur!',
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
          console.log('Error', error)
          setLoading(false)
        })
      
    } catch (error) {
      
    }
  }

  const acceptProduct = async () => {
    return MySwal.fire({
      title: 'Accepter le produit',
      text: "Ce produit respecte t-il toutes les conditions ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, valider !',
        cancelButtonText: 'Annuler',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ml-1'
      },
      buttonsStyling: false
    }).then(async function (result) {
      setLoading(true)
      if (result.value) {
       
        try {
          await axios.put(`${base_url}product/update/${id}`, {...form, isNew: false, approved: true, isBlocked: false, isUpdated: false, cancelled: false}, config)
          .then( async () => {
            setLoading(false)
            history.push('/service/products')
            toast.success(
              <Fragment>
                <div className='toastify-header'>
                  <div className='title-wrapper'>
                    <Avatar size='sm' color='success' icon={<Check size={12} />} />
                    <h6 className='toast-title font-weight-bold'>Modification réussie!</h6>
                  </div>
                </div>
              </Fragment>,
              { transition: Slide, hideProgressBar: true, autoClose: 5000 }
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
        } catch (error) {
          setLoading(false)
        }
      }else setLoading(false)
    })
    .catch((error) => {
      console.log('Error', error)
      setLoading(false)
    })

    
  }

  return (
    <>
    <Card>
      <CardBody>
       {id && loadingData ? <Spinner/> :  <Form autoComplete="off" role="presentation">
        <FormGroup >
          <h5 for='title' className="font-weight-bold">
            Titre du produit:
          </h5>
          {form.title}
        </FormGroup>

        <Row>
          

          <Col sm = '2'>
            <FormGroup>
              <h5 for='title' className="font-weight-bold">
                Marque:
              </h5>

              {form.brandId?.name}
              
            </FormGroup>
          </Col>
          <Col sm = '2'>
            <FormGroup>
              <h5 for='title' className="font-weight-bold">
                Modèle:
              </h5>

              {form.model}
              
            </FormGroup>
          </Col>
          <Col sm = '2'>
            <FormGroup>
              <h5 for='title' className="font-weight-bold">
                Taille/Poids: 
              </h5>

              {form.weight}
              
            </FormGroup>
          </Col>

          <Col sm = '3'>
          <FormGroup>
              <h5 for='title' className="font-weight-bold">
                Catégorie:
              </h5>

              {currentCategory?.label}
              
            </FormGroup>
          </Col>

          <Col sm = '3'>
          <FormGroup>
              <h5 for='title' className="font-weight-bold">
                Sous catégorie:
              </h5>

              {currentSubCategory?.label}
              
            </FormGroup>
          </Col>

        </Row>

        <Row>
          <Col sm="2">
           <FormGroup>
              <h5 for='title' className="font-weight-bold">
                Coût:
              </h5>
              {form.cost}
              
            </FormGroup>
          </Col>

          <Col sm="3">
           <FormGroup>
              <h5 for='title' className="font-weight-bold">
                Promotion active:
              </h5>
              {form.isPromoted ? 'Oui' : 'Non'}


            </FormGroup>
          </Col>

          <Col sm="2">
          <FormGroup>
              <h5 for='title' className="font-weight-bold">
                Visibilité:
              </h5>
              {form.isBlocked ? 'Non visible' : 'Visible'}

            </FormGroup>
          
          </Col>
        </Row>

        {form.isPromoted && <table style={{width: '100%', marginBottom: 25}}>
          <thead>
            <th>Type de promotion</th>
            <th>Coût promotion</th>
            {form.promoType === 'bonus' && <th>Nombre achété</th>}
            {form.promoType === 'bonus' && <th>Nombre offert</th>}
            <th>Début promotion</th>
            <th>Fin promotion</th>
          </thead>

          <tbody>
          <tr>
                  
            <td>
            {form.promoType === 'discount' ? 'Rémise': form.promoType === 'sold' ? 'Solde': 'Bonus'}
            </td>
            <td>
            {form.promoCost}
            </td>
            {form.promoType === 'bonus' && <td>
            {form.boughtNumber}
            </td>}
            {form.promoType === 'bonus' && <td>
            {form.bonusNumber}
            </td>}
            <td>
            {moment(dateToLocalString(form.promostartAt), 'DD/MM/YYYY hh:mm').format("YYYY-MM-DD[T]HH:mm")}
            </td>
            <td>
            {moment(dateToLocalString(form.promoendAt), 'DD/MM/YYYY hh:mm').format("YYYY-MM-DD[T]HH:mm")}
            </td>
          </tr>
          </tbody>
        </table>}

       
        <FormGroup>
          <h5 for='title' className="font-weight-bold">
            Description brève:
          </h5>
          
          <p dangerouslySetInnerHTML={{__html: form.smallDescription}}/>
          </FormGroup>
        
        <FormGroup>
            <h5 for='title' className="font-weight-bold">
              Description complète:
            </h5>
            <p dangerouslySetInnerHTML={{__html: form.description}}/>
          
        </FormGroup>
        
        <FormGroup>
          <h3 for='fullDescription'>
            Variantes et couleurs:
          </h3>

          <div style={{width: "100%", marginBottom: 25, marginTop: 20}} >

                  {form.colors.map((pdtColor, index) => {
                    return <div style={{width: "100%", marginBottom: 25}} ><Row key={index} >
                      {pdtColor.colorName && <Col md="2">
                        <div style={{width: '100%', height: 200, backgroundColor: pdtColor.colorName, border: "1px solid #eeeeee"}}/>
                      </Col>}

                      <Col md="10">
                        <div style={{width: '100%', display: 'flex', alignItems: 'center',}}>
                        
                          <div style={{display: 'flex', alignItems: 'center'}}>
                          {pdtColor.images.map((m) => {
                            return <div style={{position: 'relative',  marginRight: 20}}>
                              <Zoom><img src={`${file_url}/products/${m}`} al="" 
                              style={{
                                borderRadius : 8,
                                width: 200,
                                height: 200,
                              }}
                              /></Zoom>
                            </div>})}
                          </div>
                        </div>
                      </Col>
                      
                    </Row>
                    
                    <hr/>

                    <table style={{width: '100%'}}>
                      <thead>
                        <th> Variable</th>
                        <th> SKU</th>
                        <th style={{width: '15%'}}>Quantité</th>
                        <th style={{width: '15%'}}>Variable activée</th>
                        <th />
                        <th />
                      </thead>

                      <tbody>
                        {pdtColor.variables.map((variable) => {
                          return <tr>
                            
                            <td>
                            {variable.label ?? '-'}
                            </td>
                            <td>
                            {variable.sku}
                            </td>
                            <td>
                            {variable.quantity}
                            </td>
                            
                            <td>
                            {variable.isActivated ? 'Oui' : 'Non'}
                            </td>
                          </tr>
                        })
                          
                        }
                      </tbody>
                    </table>
                    </div>
                  })}

          </div>
          
        </FormGroup>

          {!form?.approved && <Button type='button' className='mr-1' color='danger'
          onClick={toogleCancelModal}
          >
          Réfuser
          </Button>}
          {!form?.approved && <Button type='button' className='mr-1' color='success'
          disabled={
            loading
          }

          onClick={acceptProduct}
          >
            {loading ?  <Spinner animation="grow" /> : 'Valider'}
          </Button>}

          {/* <Button type='reset' color='secondary' outline onClick={() => {
          window.open(`http://localhost:3004/login?email=${row.email}&from=administration`, '_blank');
        }}>
          Accéder au produit depuis le fournisseur
        </Button> */}
        </Form>}
      </CardBody>
    </Card>
    
    

<Modal
      isOpen={cancelModal}
      toggle={toogleCancelModal}
    >
      <ModalBody
       
      >
            <FormGroup>
              <Label for='subcategory'>
                Raison <span className='text-danger'>*</span>
              </Label>

              <table>
                <tr>
                  <td>
                    <input type='checkbox' 
                    checked={refuseForm.reason.includes('wrong-content')}
                    onChange={() => {
                      if(refuseForm.reason.includes('wrong-content')) {
                        const remaindReason = refuseForm.reason.filter(r => r !== 'wrong-content')
                        setRefuseForm({...refuseForm, reason: remaindReason})
                      }else {
                        setRefuseForm({...refuseForm, reason: [...refuseForm.reason, 'wrong-content']})
                      }
                    }}
                    />
                  </td>
                  <td>
                    Mauvais contenu
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type='checkbox' 
                    checked={refuseForm.reason.includes('pornographic-images')}
                    onChange={() => {
                      if(refuseForm.reason.includes('pornographic-images')) {
                        const remaindReason = refuseForm.reason.filter(r => r !== 'pornographic-images')
                        setRefuseForm({...refuseForm, reason: remaindReason})
                      }else {
                        setRefuseForm({...refuseForm, reason: [...refuseForm.reason, 'pornographic-images']})
                      }
                    }}
                    />
                  </td>
                  <td>
                  Images pornographiques
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type='checkbox' 
                    checked={refuseForm.reason.includes('poor-quality-images')}
                    onChange={() => {
                      if(refuseForm.reason.includes('poor-quality-images')) {
                        const remaindReason = refuseForm.reason.filter(r => r !== 'poor-quality-images')
                        setRefuseForm({...refuseForm, reason: remaindReason})
                      }else {
                        setRefuseForm({...refuseForm, reason: [...refuseForm.reason, 'poor-quality-images']})
                      }
                    }}
                    />
                  </td>
                  <td>
                  Mauvaise qualité d'image
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type='checkbox' 
                    checked={refuseForm.reason.includes('misspellings')}
                    onChange={() => {
                      if(refuseForm.reason.includes('misspellings')) {
                        const remaindReason = refuseForm.reason.filter(r => r !== 'misspellings')
                        setRefuseForm({...refuseForm, reason: remaindReason})
                      }else {
                        setRefuseForm({...refuseForm, reason: [...refuseForm.reason, 'misspellings']})
                      }
                    }}
                    />
                  </td>
                  <td>
                  Graves fautes d'orthographe
                  </td>
                </tr>
              </table>
              
            </FormGroup>
          <FormGroup>
            <Label for='promo'>
              Commentaire
            </Label>
          
          <ReactQuill
            maxLength = {500}
            modules={modules}
            formats={formats}
            defaultValue={refuseForm.notes}
            onChange={notesChange} />  
          </FormGroup>
        <Button type='button' className='mr-1' color='primary'
            disabled={loading || refuseForm.reason.length === 0}

            onClick={() => {
              refuseProduct()
            }}
        >
          Enregistrer
        </Button>
        <Button type='reset' color='secondary' outline onClick={() => {
          toogleCancelModal()
        }}>
          Annuler
        </Button>

        
        
      </ModalBody>
    </Modal>
    </>
  )
}

export default ProductForm