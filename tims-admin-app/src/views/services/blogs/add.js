import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Card, CardBody, Row, Col, Form, FormGroup, Label, Input, Button, Spinner} from 'reactstrap'


import ReactQuill from 'react-quill';
import { Trash } from 'react-feather';
import { useForm } from 'react-hook-form';

import Avatar from '@components/avatar'
import {Check} from 'react-feather'
import { Slide, toast } from 'react-toastify'
import { useHistory, useParams } from 'react-router-dom';


import axios from 'axios'
import { base_url, file_url } from "@src/utility/baseUrl"
import { config } from '@src/utility/axiosconfig'
import FileDropzone from '../../components/fileDropzone';
import ReactPlayer from "react-player";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { formatDuration } from '../../../utility/Utils';

const MySwal = withReactContent(Swal)
const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
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
  const [image1Loading, setImage1Loading] = useState(false)
  // ** Vars
  const { handleSubmit } = useForm()

  const [form, setForm] = useState(
    {
      title: '',
      backgroundImage: '',
      videoUrl: '',
      description: '',
      isBlocked: false,
      isVideo: false,
      videoDuration: 0,
      readDuration: 0
    }
  )


  const descriptionChange = (content, delta, source, editor) => {
    setForm({ ...form, description: editor.getHTML() });
}

  useEffect(() => {
   if(id) {
    ;(async () => {
      try {
        const [product] = await Promise.all([
          await axios.get(`${base_url}blog/id/${id}`),
        ])

        setForm(product.data)

      } catch (error) {
        console.error(error)
      }
      setLoadingData(false)
    })()
   }
  }, [id])
 



  const handleImage = async () => {
    await axios.post(`${base_url}upload/product`, formData, config).then((res) => {
      console.log(res)
    })
  };

  

  const onSubmit = async () => {
    setLoading(true)
    try {
      await axios.post(`${base_url}blog`, {...form, readDuration: calcReadingDuration(form.description)}, config)
      .then( async () => {
        setLoading(false)
          history.push('/service/blogs')
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
      await axios.put(`${base_url}blog/update/${id}`, {...form, readDuration: calcReadingDuration(form.description)}, config)
      .then( async () => {
        setLoading(false)
          history.push('/service/blogs')
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

  const onDuration = (duration) => {
    setForm({ ...form, videoDuration: duration })
  }

  function calcReadingDuration(content) {
    let reading_duration = 0;
    const average_seconds_per_word = 0.266 * 2;
    let parser = new DOMParser();
    let doc = parser.parseFromString(content, "text/html");
    let words = doc.body.textContent || "";

    reading_duration += words.split(" ").length * average_seconds_per_word;
    return (reading_duration / 60 + 1).toFixed(0);
}
  return (
    <>
    <Card>
      <CardBody>
       {id && loadingData ? <Spinner/> :  <Form onSubmit={handleSubmit(!id ? onSubmit : onUpdate)}  autoComplete="off" role="presentation">
       
       {form.videoUrl && (
            <div className="mb-4" style={{ display: "flex", justifyContent: "center" }}>
                <ReactPlayer
                    controls
                    url={form.videoUrl}
                    width="100%"
                    onDuration={onDuration}
                />
            </div>
        )}
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
        
        <FormGroup>
            <Label for='fullDescription'>
              Description  <span className='text-danger'>*</span>
            </Label>
            <ReactQuill
              ref={quillRef}
              modules={modules}
              formats={formats}
              onChange={descriptionChange} 
              value = {form.description}
              />  
          
        </FormGroup>

          <Row>
            <Col sm="4" >
             <FormGroup>
                <Label for='image'>
                  Image <span className='text-danger'>*</span>
                </Label>

                {
                form.backgroundImage ?
                    <div
                    style={{
                      position: 'relative',
                      height: 200
                    }}
                    >

                      <center><img src={`${file_url}/blogs/${form.backgroundImage}`} alt="image" style={{borderRadius: 5, width: "auto", height: 172, marginBottom: 20}}/></center>

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

                      if(!id) {
                        await axios.delete(`${base_url}upload/delete/blogs/${form.backgroundImage}`).then((res) => {
                          setForm({...form, backgroundImage: null})
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
                            await axios.delete(`${base_url}blog/delete-image/${id}/${form.backgroundImage} `).then((res) => {
                              setForm({...form, backgroundImage: null})
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
                    <>
                    {image1Loading ? <Spinner/> :<FileDropzone editMode = {false} onChange = {async (file) => {
                      const formData = new FormData();
                      formData.append("image", file);
                      setImage1Loading(true)
                      await axios.post(`${base_url}upload/blog`, formData).then((res) => {
                        setForm({...form, backgroundImage: res.data?.filename})
                        setImage1Loading(false)
                      }).catch((err) => {
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
            </Col>
            <Col sm="2">
              <FormGroup>
                <Label for='visibility'>Visibilité</Label>
                <Input type='select' id='visibility' name='visibility' value={!form.isBlocked ? 1 : 0} 
                onChange={e => setForm({...form, isBlocked: Number(e.target.value) === 1 ? false : true})}>
                  <option value='1'>Visible</option>
                  <option value='0'>Non visible</option>
                </Input>
              </FormGroup>
            </Col>
            <Col sm="2">
              <FormGroup>
                <Label for='video'>Vidéo ?</Label>
                <Input type='select' id='video' name='video' value={form.isVideo ? 1 : 0} 
                onChange={e => setForm({...form, isVideo: Number(e.target.value) === 0 ? false : true})}>
                  <option value='1'>Oui, avec vidéo</option>
                  <option value='0'>Non, sans vidéo</option>
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for='video'>Durée de lecture</Label>
                <Input 
                id='duration'
                placeholder=''
                value = {form.isVideo ? formatDuration(form.videoDuration) : (calcReadingDuration(form.description) || form.readDuration)}
                disabled
                />
              </FormGroup>
            </Col>

            {form.isVideo && <Col sm="4">
            <FormGroup>
              <Label for='videoUrl'>
                Lien de la vidéo <span className='text-danger'>*</span>
              </Label>
              <Input
                name='videoUrl'
                id='videoUrl'
                placeholder=''
                value = {form.videoUrl}
                onChange={async (e) => {
                  if (!e.target.value) {
                    setForm({...form, videoDuration: 0, videoUrl: ''})
                  } else {
                      const canPlayVideo = ReactPlayer.canPlay(e.target.value)

                      if (!canPlayVideo) {
                          setForm({...form, videoDuration: 0, videoUrl: e.target.value });
                      } else {
                          setForm({ ...form, videoUrl: e.target.value });
                      }
                  }
              }}
              />
            </FormGroup>
            </Col>}
          </Row>
       
        
          {(!id || (id && !form?.cancelled) )&& <Button type='submit' className='mr-1' color='primary'
         disabled={
          loading
          ||
          (
            !form.title ||
            !form.backgroundImage ||
            (form.isVideo && !form.videoUrl)||
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
    
    </>
  )
}

export default ProductForm