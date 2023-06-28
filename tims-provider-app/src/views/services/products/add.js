import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Card, CardBody, Row, Col, Form, FormGroup, Label, Input, Button, Spinner, Modal, ModalBody} from 'reactstrap'


import ReactQuill, {Quill} from 'react-quill';
import { CheckCircle, Edit, PlusCircle, PlusSquare, Trash2, X } from 'react-feather';
import Select from 'react-select';
import { useForm } from 'react-hook-form';

import Avatar from '@components/avatar'
import {Check} from 'react-feather'
import { Slide, toast } from 'react-toastify'
import { useHistory, useParams } from 'react-router-dom';

import ImageResize from 'quill-image-resize-module-react';
import BlotFormatter from 'quill-blot-formatter';
import $ from 'jquery'

import axios from 'axios'
import { base_url, file_url } from "@src/utility/baseUrl"
import { config } from '@src/utility/axiosconfig'
import FileDropzone from '../../components/fileDropzone';
import { HexColorPicker } from "react-colorful";
import AsyncSelect from "react-select/async";
import moment from 'moment';
import dateToLocalString from '../../../utility/dateToLocalString';
import { randomChar } from '../../../utility/helper';
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

  let timer = useRef()
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


  const modulesDescription = useMemo(() => ({
    imageResize: {
      displayStyles: {
        backgroundColor: "black",
        border: "none",
        color: "white"
      },
      modules: ["Resize", "DisplaySize", "Toolbar"]
    },
    toolbar: {
          container: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, false] }],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ direction: 'rtl' }], // text direction
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['link', 'image'],
            ['clean'],
          ],
          handlers: {
            image: () => {
                imageHandler();
            }
          }
        },
  }), [])

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

  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [subCategories, setSubcategories] = useState([])

  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSubCategory, setCurrentSubCategory] = useState(null);

  const [brand, setbrand] = useState(null)
  const [charCount, setCharCount] = useState(0)
  const [promoModal, setPromoModal] = useState(false)
  const tooglePromoModal = () => {
    setPromoModal(!promoModal)
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


  const smallDescriptionChange = (content, delta, source, editor) => {
    setCharCount(editor.getLength() - 1)
    if(editor.getLength() < 501) {
      
      setForm({
        ...form, smallDescription: editor.getHTML()
      })
    }else {
      setForm({
        ...form, smallDescription: editor.getHTML().substring(0, 500)
      })
    }
  }

  const descriptionChange = (value) => {
    
    setForm({
      ...form, description: value
    })
  }
  useEffect(() => {
    ;(async () => {
      try {
        const queryString = new URLSearchParams({page: 1, limit: 1000000000, search:''}).toString();
        const [categories, brands] = await Promise.all([
          await axios.get(`${base_url}category?${queryString}`),
          await axios.get(`${base_url}brand?${queryString}`),
        ])

        setCategories(categories.data.data)
        setBrands(brands.data.data)
      } catch (error) {
        console.error(error)
      }

      setLoading(false)

    })()
  }, [])

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
 

  const loadOptions = (array) => {
    const tab = []

    for (let i = 0; i < array.length; i++) {
      tab.push({ value: array[i]._id, label: array[i].name })
    }
    return tab
  }

  const handleImage = async () => {
    await axios.post(`${base_url}upload/product`, formData, config).then((res) => {
      console.log(res)
    })
  };

  const removeImage = async (image, index) => {

    await axios.delete(`${base_url}upload/delete/products/${image}`).then(() => {
      const list = [...form.colors];
      const imageIndex = list[index]['images'].indexOf(image);

      const listImage = [...list[index]['images']];
      listImage.splice(imageIndex, 1);
      list[index]['images'] = listImage
      setForm({...form, colors: list})
    })

    
  }

  const removeColor= async (index) => {
    const list = [...form.colors];
    list.splice(index, 1);
    setForm({...form, colors: list})
    
  }

  const removeVariable = async (index, variableIndex) => {
    const list = [...form.colors];
    const listVariable = [...list[index]['variables']];
    listVariable.splice(variableIndex, 1);
    list[index]['variables'] = listVariable
    setForm({...form, colors: list})
    
  }

  
  const onSubmit = async () => {
    setLoading(true)

    let error = false;

    await Promise.all(
      form.colors.map((pdtColor) => {
        if(pdtColor.images.length === 0) {
          error = true;
        }
      })
    )

    if(error) {
      setLoading(false)
      toast.error(
        'Une couleur manque d\'image!',
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
      return;
    }

    try {
      await axios.post(`${base_url}product`, {...form}, config)
      .then( async () => {
        setLoading(false)
          history.push('/service/products')
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

  const onUpdate = async () => {
    setLoading(true)

    try {
      await axios.put(`${base_url}product/update/${id}`, {...form}, config)
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
      
    }
  }


  const  imageHandler = async () => {  
    
    const input = document.createElement('input');  
    input.setAttribute('type', 'file');  
    input.setAttribute('accept', 'image/*');  
    input.click();  
  
    input.onchange = async () => { 
      const [file] = input.files; 
      const formData = new FormData();
      formData.append("image", file);
     try {
      await axios.post(`${base_url}upload`, formData, config).then((res) => {
        uploadFiles(res.data.filename)
      })
      
      
    } catch (e) {
        console.log(e)
    }
  
    };  
  } 
  
  const uploadFiles = async (filename) => { 
           const editor = quillRef.current.getEditor();
          const res = file_url +  filename;  
          editor.insertEmbed(editor.getSelection(), "image", res);
  } 

  const handleInputChange = (e, key, index) => {
    const { name, value } = e.target;
    const _newVariable = []
    form.colors.forEach((vari, indexItem) => {
      if(indexItem === key) {
        const list = [...vari.variables];
        list[index][name] = value;
        vari.variables = list;
      }
      _newVariable.push(vari)
    })

    setForm ({...form, colors: _newVariable});
    
  };

  const handleInputChangeColor = (e, index) => {
    const { name, value } = e.target;
    const list = [...form.colors];
    list[index][name] = value;
    setForm({...form, colors: list})
  };

  const ADDColor = () => {
    const _newColor = [...form.colors, {
      colorName: '',
      isActivated: true,
      purchaseCount: 0,
      images : [],
      variables: [
        {
          sku: randomChar(15).toLocaleUpperCase(),
          label: '',
          quantity: 0,
          isActivated: true
        }
      ],
    }]
    setForm ({...form, colors: _newColor});
  };

  const ADDVariable = (index) => {
    const list = [...form.colors]
    
    const _newVariables = [...list[index]['variables'], {
      sku: randomChar(15).toLocaleUpperCase(),
      label: '',
      quantity: 0,
      isActivated: true
    }]

    if(_newVariables[_newVariables?.length - 2]['label']) {
      list[index]['variables'] = _newVariables
      setForm ({...form, colors: list});
    }else {
      toast.warning(
        'La variable ne doit pas être vide',
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
    }
    
  };

  const handleInputBlurColor = async (e, index) => {
    const { name, value } = e.target;

    const list = [...form.colors];
    const valueArr = form.colors.map(function(item){ return item.colorName });
    const isDuplicate = valueArr.some(function(item, idx){ 
        return valueArr.indexOf(item) !== idx 
    });

    if(isDuplicate && list[index][name]) {
        
        const _newVariable = []
        form.colors.forEach((vari, indexItem) => {
          if(indexItem === index) {
            list[index][name] = '';
          }
          _newVariable.push(vari)
        })
        setForm({...form, colors: _newVariable})
        toast.warning(
          'Couleur dupliquée',
          { transition: Slide, hideProgressBar: true, autoClose: 3000 }
        )
        return;
    }
  };

  const handleInputBlur= (e, key, index) => {
    const { name, value } = e.target;
    let currentColor = form.colors[key]
    const list = [...currentColor.variables];
    if(name === 'label') {
      const valueArr = currentColor.variables.map(function(item){ return item.label });
      const isDuplicate = valueArr.some(function(item, idx){ 
          return valueArr.indexOf(item) !== idx 
      });
  
      if(isDuplicate && list[index][name]) {
        const _newVariable = []
        form.colors.forEach((vari, indexItem) => {
          if(indexItem === key) {
            list[index][name] = '';
            vari.variables = list;
          }
          _newVariable.push(vari)
        })
    
        setForm ({...form, colors: _newVariable});
        toast.warning(
          'SKU ou Variable duppliquée',
          { transition: Slide, hideProgressBar: true, autoClose: 3000 }
        )
          return;
      }
    }

  };


  const onChangeDate = (type, e) => {
    let dt = new Date(e.target.value).getTime();
    let current_timestamp = dt
    let seconds = 0
    if (type === 'start') {
      return e.target.value;
    } else {
      if (form.promostartAt) {
        seconds = (current_timestamp - form.promostartAt)
        if (seconds < 0) {
          alert('Impossible de choisir une date arrière')
        } else {
          return e.target.value;
        }
      }
    }
  }



  const defaultValue = () => {

    if(form?.brandId) {
      return {label: form.brandId?.name, value: form?.brandId?._id}
    }else {
      return { value: 0 , label: 'Choisir' }
    }

  }
  return (
    <>
    <Card>
      <CardBody>
       {id && loadingData ? <Spinner/> :  <Form onSubmit={handleSubmit(!id ? onSubmit : onUpdate)}  autoComplete="off" role="presentation">
        <FormGroup>
          <Label for='title'>
            Titre du produit <span className='text-danger'>*</span>
          </Label>
          <Input
            name='title'
            id='title'
            placeholder=''
            value = {form.title}
            onChange={(e) => setForm({...form, title: e.target.value})}
          />
        </FormGroup>

        <Row>
          

          <Col sm = '2'>
            <FormGroup>
              <Label for='model'>
                Marque <span className='text-danger'>*</span>
              </Label>

              <Select
                  className='react-select'
                  classNamePrefix='select'
                  defaultValue={[defaultValue()]}
                  options={loadOptions(brands)}
                  isDisabled={loading}
                  isLoading={loading}
                  isClearable={false}
                  onChange={(options) => {setbrand(options); setForm({...form, brandId: options.value})}}
              />
            </FormGroup>
          </Col>
          <Col sm = '2'>
            <FormGroup>
              <Label for='model'>
                Modèle
              </Label>

              <Input
            name='model'
            id='model'
            placeholder=''
            value = {form.model}
            onChange={(e) => setForm({...form, model: e.target.value})}
          />
              
            </FormGroup>
          </Col>
          <Col sm = '2'>
            <FormGroup>
              <Label for='weight'>
                Taille/Poids 
              </Label>

              <Input
            name='weight'
            id='weight'
            placeholder=''
            value = {form.weight}
            onChange={(e) => setForm({...form, weight: e.target.value})}
          />
              
            </FormGroup>
          </Col>

          <Col sm = '3'>
          <FormGroup>
              <Label for='subcategory'>
                Catégorie <span className='text-danger'>*</span>
              </Label>

              <Select
                  className='react-select'
                  classNamePrefix='select'
                  defaultValue={id ? currentCategory :{ value: 0 , label: 'Choisir' }}
                  options={loadOptions(categories)}
                  isDisabled={loading}
                  isLoading={loading}
                  isClearable={false}
                  onChange={(options) => {
                    setForm({...form, categoryId: options.value})
                    setSubcategories(categories.filter(item => item?._id === options.value)[0]?.subCategories)
                    setCurrentSubCategory({ value: 0 , label: 'Choisir' })
                  }}
              />
              
            </FormGroup>
          </Col>

          <Col sm = '3'>
          <FormGroup>
              <Label for='subcategory'>
                Sous catégorie <span className='text-danger'>*</span>
              </Label>

              <Select
                  className='react-select'
                  classNamePrefix='select'
                  defaultValue={id ? currentSubCategory :{ value: 0 , label: 'Choisir' }}
                  options={loadOptions(subCategories)}
                  isDisabled={loading}
                  isLoading={loading}
                  isClearable={false}
                  onChange={(options) => {
                    setForm({...form, subcategoryId: options.value})
                  }}
              />
              
            </FormGroup>
          </Col>

        </Row>

        <Row>
          <Col sm="2">
           <FormGroup>
              <Label for='subcategory'>
                Coût <span className='text-danger'>*</span>
              </Label>

              <Input
                name='cost'
                id='cost'
                value={form.cost}
                onChange={(e) => {
                  if(rx_live.test(e.target.value)) 
                  setForm({...form, cost: e.target.value})
                }
                }
              />
            </FormGroup>
          </Col>

          <Col sm="2">
           <FormGroup>
              <Label for='subcategory'>
                Activer la promotion
              </Label>

              <div className='relative'>
                <Input
                type='select'
                  name='isPromoted'
                  id='isPromoted'
                  value={form.isPromoted ? 1 : 0}
                  onChange={(e) => 
                    {
                    setForm({...form, isPromoted:  Number(e.target.value) === 1 ? true: false})
                    if(Number(e.target.value) === 1)
                    {tooglePromoModal(); }
                  }
                  }
                >
                  <option value={1} >Oui</option>
                  <option value={0} >Non</option>
                </Input>

                {form.promoType &&  <div style={{position: 'absolute', right: 10, top: 10}} >
                  <Edit
                  onClick={() => {
                    tooglePromoModal(); 
                  }}
                  style={{cursor: 'pointer'}}
                  size={13} />
                </div>}
              </div>

            </FormGroup>
          </Col>

          <Col sm="2">
          <FormGroup>
              <Label for='subcategory'>
                Visibilité
              </Label>
              <Input
                type='select'
                  name='isBlocked'
                  id='isBlocked'
                  value={form.isBlocked ? 1 : 0}
                  onChange={(e) => 
                    {
                    setForm({...form, isBlocked:  Number(e.target.value) === 1 ? true: false})
                    }
                  }
                >
                  <option value={0} >Visible</option>
                  <option value={1} >Non Visible</option>
                </Input>
             

            </FormGroup>
          
          </Col>
        </Row>

       
        <FormGroup>
          <Label for='promo'>
            Description brève
          </Label>
          
          <ReactQuill
            maxLength = {500}
            modules={modules}
            formats={formats}
            defaultValue={form.smallDescription}
            onChange={smallDescriptionChange} />  
            <p style={{marginTop: 5, color : '#ea5455'}}>{500 - charCount} caractères restants</p>
          </FormGroup>
        
        <FormGroup>
            <Label for='fullDescription'>
              Description complète <span className='text-danger'>*</span>
            </Label>
            <ReactQuill
              ref={quillRef}
              modules={modulesDescription}
              formats={formats}
              onChange={descriptionChange} 
              value = {form.description}
              />  
          
        </FormGroup>
        
        <FormGroup>
          <h3 for='fullDescription'>
            Variantes et couleurs <span className='text-danger'>*</span>
          </h3>

          <div style={{width: "100%", marginBottom: 25, marginTop: 20}} >

                  {form.colors.map((pdtColor, index) => {
                    return <div style={{width: "100%", marginBottom: 25}} ><Row key={index} >
                      <Col md="2">
                        
                      <HexColorPicker color={pdtColor.colorName} 
                      onBlur={() => handleInputBlurColor({target: {name: 'colorName', value: ''}}, index)}
                      onChange={(color) => 
                        handleInputChangeColor({target: {name: 'colorName', value: color}}, index)} />

                      {form.colors.length > 1 && 
                        <div className='mt-1 text-danger cursor-pointer'
                        onClick={() => removeColor(index)}
                        >Supprimer la couleur</div>
                        }
                      </Col>

                      <Col md="10">
                        <div style={{width: '100%', display: 'flex', alignItems: 'center',}}>
                        
                          <div style={{display: 'flex', alignItems: 'center'}}>
                          {pdtColor.images.map((m, key) => {
                            return <div style={{position: 'relative',  marginRight: 20}}>
                              <img src={`${file_url}/products/${m}`} al="" 
                              style={{
                                borderRadius : 8,
                                width: 200,
                                height: 200,
                              }}
                              />
                              {!id && <div
                              style={{
                                width: 20,
                                height: 20,
                                border : `5px solid ${pdtColor.colorName}`,
                                background : '#eaecec',
                                borderRadius : '50%',
                                position : 'absolute',
                                cursor : 'pointer',
                                top: 10,
                                right: 15
                              }}

                              onClick = {() => 
                                {
                                  removeImage(m, index)
                                  if(pdtColor.images.length > 0) {
                                    handleInputChangeColor({target: {name: 'primaryImage', value: pdtColor.images[0]}}, index)
                                  }
                                }

                                  
                                }
                              />}

                              <div
                              style={{
                                border : `5px solid ${pdtColor.primaryImage === m ? '#00ff21': '#393b40'}`,
                                borderRadius : '50%',
                                position : 'absolute',
                                cursor : 'pointer',
                                padding: 3,
                                top: 10,
                                left: 15
                              }}

                              onClick = {() => 
                                handleInputChangeColor({target: {name: 'primaryImage', value: m}}, index)
                              }
                              >
                                <CheckCircle color={pdtColor.primaryImage === m ? '#00ff21': '#393b40'} />
                              </div>
                            </div>})}
                          </div>

                          {pdtColor.images.length < 5 && <FileDropzone 
                          borderColor={pdtColor.colorName}
                          multiple editMode = {id} onChange = {async (files) => {
                            const formData = new FormData();
                            files.forEach((file) => {
                              formData.append("images", file);
                            })
                            await axios.post(`${base_url}upload/product`, formData, config).then((res) => {
                              const list = [...pdtColor.images];
                              list.push(res.data[0]?.filename)
                              if(pdtColor.images.length === 0) {
                                handleInputChangeColor({target: {name: 'primaryImage', value: res.data[0]?.filename}}, index)
                              }
                              handleInputChangeColor({target: {name: 'images', value: list}}, index)
                            })
                            
                          } } />}
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
                        {pdtColor.variables.map((variable, key) => {
                          return <tr>
                            
                            <td>
                            <Input
                              name='label'
                              id='label'
                              value={variable.label}
                              onChange={(e) => handleInputChange(e, index, key)}
                              onBlur={(e) => handleInputBlur(e, index, key)}
                              placeholder={`${pdtColor.variables.length === 1 ? 'Facultatif': ''}`}
                            />
                            </td>
                            <td>
                            <Input
                              name='sku'
                              id='sku'
                              disabled
                              value={variable.sku}
                              onChange={(e) => handleInputChange(e, index, key)}
                              onBlur={(e) => handleInputBlur(e, index, key)}
                            />
                            </td>
                            <td>
                              <Input
                              name='quantity'
                              id='quantity'
                              value={variable.quantity}
                              onChange={(e) => {
                                if(rx_live.test(e.target.value)) 
                                handleInputChange(e, index, key)}
                              }
                            />
                            </td>
                            
                            <td>
                            <Input
                            type='select'
                              name='isActivated'
                              id='isActivated'
                              value={variable.isActivated ? 1 : 0}
                              onChange={(e) => handleInputChange({target: {name:'isActivated', value: Number(e.target.value) === 1 ? true: false}}, index, key)}
                            >
                              <option value={1} >Oui</option>
                              <option value={0} >Non</option>
                            </Input>
                            </td>
                            
                            {pdtColor.variables.length > 1 && <td>
                              <span style={{padding: '0px 5px', cursor: 'pointer'}}>
                              <Trash2
                              onClick={() => {
                                removeVariable(index, key)
                              }}
                              />
                              </span>
                            </td>}

                            {(pdtColor.variables.length - 1) === key && <td>
                              <span style={{padding: '0px 5px', cursor: 'pointer'}}>
                              <PlusSquare
                              onClick={() => ADDVariable(index)}
                              />
                              </span>
                            </td>}
                          </tr>
                        })
                          
                        }
                      </tbody>
                    </table>

                    </div>
                  })}

          </div>
          <PlusCircle
          style={{cursor: 'pointer'}}
          onClick={ADDColor}
          />
        </FormGroup>

          {(!id || (id && !form?.cancelled) )&& <Button type='submit' className='mr-1' color='primary'
         disabled={
          loading
          ||
          (
            !form.categoryId ||
            !form.subcategoryId ||
            !form.brandId ||
            !form.title ||
            !form.cost ||
            form.cost === 0 ||
            !form.description
          )
        }
        >
          {loading ?  <Spinner animation="grow" /> : 'Enregistrer'}
        </Button>}
        </Form>}
      </CardBody>
    </Card>
    <input type="file" accept="image/*" multiple  onChange={(e) => {handleImage(e)}} id="imageInput" style = {{display : 'none'}} />  
    
    

<Modal
      isOpen={promoModal}
      toggle={tooglePromoModal}
      size='xl'
    >
      <ModalBody
       
      >
        <table style={{width: '100%', marginBottom: 25}}>
          <thead>
            <th>Type de promotion</th>
            <th>Coût promotion</th>
            <th>Nombre achété</th>
            <th>Nombre offert</th>
            <th>Début promotion</th>
            <th>Fin promotion</th>
          </thead>

          <tbody>
          <tr>
                  
            <td>
            <Input
            type='select'
              name='promoType'
              id='promoType'
              value={form.promoType}
              onChange={(e) => {
                if(!e.target.value) {
                  setForm({...form, promoCost: 0, boughtNumber: 0, bonusNumber: 0, promostartAt: null, promoendAt: null, promoType: e.target.value})
                } else if(e.target.value === 'bonus') {
                  setForm({...form, promoCost: 0, promoType: e.target.value, promostartAt: new Date(), promoendAt: new Date().setDate(new Date().getDate() + 7)})
                }else {
                  setForm({...form, boughtNumber: 0, promoType: e.target.value, bonusNumber: 0, promostartAt: new Date(), promoendAt: new Date().setDate(new Date().getDate() + 7)})
                }
              }}
            >
              <option value={''} >Choisir</option>
              <option value={'sold'} >Solde</option>
              <option value={'discount'} >Rémise</option>
              <option value={'bonus'} >Bonus</option>
            </Input>
            </td>
            <td>
            <Input
              disabled={
                !form.promoType ||
                form.promoType === 'bonus'
              }
              name='promoCost'
              id='promoCost'
              value={form.promoCost}
              onChange={(e) => {
                if(rx_live.test(e.target.value)) 
                setForm({...form, promoCost: e.target.value})
                }
              }
              onBlur={(e) => {
                if(Number(form.cost) < Number(form.promoCost)) {
                  setForm({...form, promoCost: 0})
                  toast.warning(
                    'Prix promo supèrieur au prix',
                    { transition: Slide, hideProgressBar: true, autoClose: 3000 }
                  )
                }
              }}
            />
            </td>
            <td>
            <Input
            disabled={
              !form.promoType ||
              form.promoType !== 'bonus'
            }
              name='boughtNumber'
              id='boughtNumber'
              value={form.boughtNumber}
              onChange={(e) => {
                if(rx_live.test(e.target.value)) 
                setForm({...form, boughtNumber: e.target.value})
                }
              }
            />
            </td>
            <td>
            <Input
            disabled={
              !form.promoType ||
              form.promoType !== 'bonus'
            }
              name='bonusNumber'
              id='bonusNumber'
              value={form.bonusNumber}
              onChange={(e) => {
                if(rx_live.test(e.target.value)) 
                setForm({...form, bonusNumber: e.target.value})
                }
              }
            />
            </td>
            <td>
            <Input
              disabled={!form.promoType}
              name='promostartAt'
              id='promostartAt'
              type="datetime-local"
              value = {moment(dateToLocalString(form.promostartAt), 'DD/MM/YYYY hh:mm').format("YYYY-MM-DD[T]HH:mm")}
              onChange={(e) =>setForm({...form, promostartAt: onChangeDate('start', e)})}
            />
            </td>
            <td>
            <Input
            disabled={!form.promoType}
              name='promoendAt'
              id='promoendAt'
              type="datetime-local"
              value = {moment(dateToLocalString(form.promoendAt), 'DD/MM/YYYY hh:mm').format("YYYY-MM-DD[T]HH:mm")}
              onChange={(e) => setForm({...form, promoendAt: onChangeDate('end', e)})}
            />
            </td>
          </tr>
          </tbody>
        </table>
        <Button type='button' className='mr-1' color='primary'
            disabled={
              !form.promoType ||
              (form.promoType === 'sold' && 
              form.promoCost === 0
              ) ||

              (form.promoType === 'discount' && 
              form.promoCost === 0
              )||

              (form.promoType === 'bonus' && 
              (form.boughtNumber === 0)
              )
              ||
              (form.promoType === 'bonus' && 
              (form.bonusNumber === 0)
              )
            }

            onClick={() => {
              tooglePromoModal()
            }}
        >
          Enregistrer
        </Button>
        <Button type='reset' color='secondary' outline onClick={() => {
          if(!form.promoType){
            setForm({...form, isPromoted: false})
          }
          tooglePromoModal()
        }}>
          Annuler
        </Button>
      </ModalBody>
    </Modal>
    </>
  )
}

export default ProductForm