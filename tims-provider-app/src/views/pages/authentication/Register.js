import { useState } from 'react'
import { isObjEmpty } from '@utils'
import classnames from 'classnames'
import { useSkin } from '@hooks/useSkin'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { User, Mail, Smartphone , Globe, Lock, Users, Square, Flag, Map, Home, BookOpen, Bookmark, CreditCard, Hash, CheckCircle } from 'react-feather'
import {
  Row, Col, CardTitle, CardText, FormGroup, Label, Button, Form, Input, 
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Spinner
} from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import FileDropzone from '../../components/fileDropzone'

import axios from 'axios'
import { base_url, file_url_file } from "@src/utility/baseUrl"
import { config } from '@src/utility/axiosconfig'
import { Slide, toast } from 'react-toastify'

import countries from '@src/utility/countries.json'
const Register = () => {

  const [skin, setSkin] = useSkin()



  const { register, errors, handleSubmit } = useForm()

  const [email, setEmail] = useState('')
  const [valErrors, setValErrors] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [terms, setTerms] = useState(false)
  const [countryCities, setSities] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingCniFile, setLoadingCniFile] = useState(false)
  const [loadingRibFile, setLoadingRibFile] = useState(false)
  const [registrationSucceed, setSuccess] = useState(false)


  const [registration, setRegistration] = useState({
    email: '',
    password: '',
    confirmation: '',
    personnalInfo : {
      firstName : '',
      lastName : '',
      number : '',
      IDType : 'cni',
      IDNumber: '',
      IDFile: '',
    },
    locationInfo : {
      countryName : '',
      cityName : '',
      countryEmoji : '',
      postalCode : ''
    },
    companyInfo : {
      companyName : '',
      commercialRegister : '',
      taxpayerAccountNumber : ''
    },
    bankInfo : {
      rib : '',
      bankName : '',
      bankCode : '',
      iban : '',
      ownerFullName : '',
      ribFile : ''
    }
  })
  const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default


  const onSubmit = async () => {

    if (isObjEmpty(errors)) {
      setLoading(true)
      await axios.post(`${base_url}partner`, registration)
        .then(() => {
          setRegistration({
            email: '',
            password: '',
            confirmation: '',
            personnalInfo : {
              firstName : '',
              lastName : '',
              number : '',
              IDType : 'cni',
              IDNumber: '',
              IDFile: '',
            },
            locationInfo : {
              countryName : '',
              cityName : '',
              countryEmoji : '',
              postalCode : ''
            },
            companyInfo : {
              companyName : '',
              commercialRegister : '',
              taxpayerAccountNumber : ''
            },
            bankInfo : {
              rib : '',
              bankName : '',
              bankCode : '',
              iban : '',
              ownerFullName : '',
              ribFile : ''
            }
          });
          setLoading(false)
          setSuccess(true)
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


  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'
      >
        
        <Col className='d-none d-lg-flex  p-5' lg='6' sm='12'
        
        >
          <div className='w-50 d-lg-flex align-items-center justify-content-center px-5'
          style={{
            left: 0,
            position: 'fixed',
            height: '100vh',
            overflow: 'hidden'
          }}
          >
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='6' sm='12'
        >
          {!registrationSucceed ? <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
            L'aventure débute ici 🚀
            </CardTitle>
            <CardText className='mb-2'>Enregistrer vous pour une avanture pleine de succès!</CardText>
            
            <Form onSubmit={handleSubmit(onSubmit)}  autoComplete="off" role="presentation">
            <div className='divider my-2'>
                <div className='divider-text font-weight-bold'>Informations de connexion</div>
              </div>

                <FormGroup row>
                  <Label sm='3' for='EmailIcons'>
                    Adresse e-mail
                  </Label>
                  <Col sm='9'>
                    <InputGroup className='input-group-merge'>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                          <Mail size={15} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type='email' name='Email' id='EmailIcons' placeholder='Adresse e-mail' 
                      value={registration.email}
                      onChange={e => setRegistration({...registration, email: e.target.value})}
                      innerRef={register({ required: true })}
                      className={classnames({ 'is-invalid': errors['email'] })}
                      />
                    </InputGroup>
                  </Col>
                </FormGroup>

                

                <FormGroup row>
                  <Label sm='3' for='passwordIcons'>
                    Mot de passe
                  </Label>
                  <Col sm='9'>
                    <InputGroup className='input-group-merge'>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                          <Lock size={15} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type='password' name='password' id='passwordIcons' placeholder='Mot de passe'
                      value={registration.password}
                      onChange={e => setRegistration({...registration, password: e.target.value})}
                      innerRef={register({ required: true })}
                      className={classnames({ 'is-invalid': errors['password'] })}
                      />
                    </InputGroup>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label sm='3' for='confirmIcons'>
                    Confirmation du mot de passe
                  </Label>
                  <Col sm='9'>
                    <InputGroup className='input-group-merge'>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                          <Lock size={15} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type='password' name='confirmation' id='confirmIcons' placeholder='Confirmation' 
                      value={registration.confirmation}
                      onChange={e => setRegistration({...registration, confirmation: e.target.value})}
                      innerRef={register({ required: true })}
                      className={classnames({ 'is-invalid': errors['confirmation'] })}
                      />
                       
                    </InputGroup>
                    {registration.password && (registration.confirmation !== registration.password) && <span style={{color: 'red', fontSize: 12}}>Mot de passe différents</span>}
                  </Col>
                </FormGroup>

              <div className='divider my-2'>
                <div className='divider-text font-weight-bold'>Informations personnelles</div>
              </div>
              <FormGroup row>
                <Label sm='3' for='firstnameIcons'>
                  Prénom(s)
                </Label>
                <Col sm='9'>
                  <InputGroup className='input-group-merge'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <Users size={15} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type='text' name='firstname' id='firstnameIcons' placeholder='Prénom(s)' 
                    value={registration.personnalInfo.firstName}
                    onChange={e => setRegistration({...registration, personnalInfo: {...registration.personnalInfo, firstName: e.target.value}})}
                    innerRef={register({ required: true })}
                    className={classnames({ 'is-invalid': errors['firstname'] })}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm='3' for='nameIcons'>
                  Nom
                </Label>
                <Col sm='9'>
                  <InputGroup className='input-group-merge'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <User size={15} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type='text' name='name' id='nameIcons' placeholder='Nom' 
                    value={registration.personnalInfo.lastName}
                     onChange={e => setRegistration({...registration, personnalInfo: {...registration.personnalInfo, lastName: e.target.value}})}
                     innerRef={register({ required: true })}
                     className={classnames({ 'is-invalid': errors['name'] })}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm='3' for='mobileIcons'>
                  Téléphone
                </Label>
                <Col sm='9'>
                  <InputGroup className='input-group-merge'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <Smartphone size={15} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type='number' name='mobile' id='mobileIcons' placeholder='Ex: +212*********' 
                    value={registration.personnalInfo.number}
                    onChange={e => setRegistration({...registration, personnalInfo: {...registration.personnalInfo, number: e.target.value}})}
                    innerRef={register({ required: true })}
                    className={classnames({ 'is-invalid': errors['mobile'] })}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm='3' for='idTypeIcons'>
                  Pièce d'identité
                </Label>
                <Col sm='9'>
                  <InputGroup className='input-group-merge'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <Square size={15} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type='select' id='idTypeIcons' name='idTypeIcons'
                    value={registration.personnalInfo.IDType}
                    onChange={e => setRegistration({...registration, personnalInfo: {...registration.personnalInfo, IDType: e.target.value}})}
                    innerRef={register({ required: true })}
                    className={classnames({ 'is-invalid': errors['idTypeIcons'] })}
                    >
                    <option value='cni'>CNI</option>
                    <option value='passport'>Passeport</option>
                    <option value='identity-certificate'>Attestation d'identité</option>
                    <option value='resident-card'>Carte de résident</option>
                  </Input>
                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm='3' for='idcardNumber'>
                  N° de Pièce d'identité
                </Label>
                <Col sm='9'>
                  <InputGroup className='input-group-merge'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <Hash size={15} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type='text' id="idcardNumber" name="IDNumber" placeholder="N° de Pièce d'identité" 
                    value={registration.personnalInfo.IDNumber}
                    onChange={e => setRegistration({...registration, personnalInfo: {...registration.personnalInfo, IDNumber: e.target.value}})}
                    innerRef={register({ required: true })}
                    className={classnames({ 'is-invalid': errors['IDNumber'] })}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm='3' for='passwordIcons'>
                  Télécharger la pièce d'identité (Recto et verso sur le même document PDF)
                </Label>
                <Col sm='9'>
                {!registration.personnalInfo.IDFile? 

                  <>
                  {
                    loadingCniFile ? <Spinner/>:
                  <FileDropzone 
                  accept = {
                    {'application/pdf': []}
                  }
                  onChange = {async (file) => {
                    const formData = new FormData();
                    formData.append("file", file);
                    setLoadingCniFile(true)
                    await axios.post(`${base_url}upload/file`, formData, config).then((res) => {
                      setRegistration({...registration, personnalInfo: {...registration.personnalInfo, IDFile:  res.data?.filename}})
                      setLoadingCniFile(false)
                    })
                    .catch((err) => {
                      console.log(err)
                      setLoadingCniFile(false)
                      toast.error(
                        'Le téléchargement a échoué, veuillez réessayer',
                         { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                       )
                    })
                    
                  } } />
                  }
                  </>
                  :
                  <a href={`${file_url_file}/${registration.personnalInfo.IDFile}`}  target='_blank'>
                    <span className='font-weight-bold' >
                      {registration.personnalInfo.IDFile}
                    </span>
                  </a>
                }


                </Col>
              </FormGroup>
              
              
              <div className='divider my-2'>
                <div className='divider-text  font-weight-bold'>Localisation de la boutique</div>
              </div>

              <FormGroup row>
                <Label sm='3' for='countryName'>
                  Pays
                </Label>
                <Col sm='9'>
                  <InputGroup className='input-group-merge'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        {!registration.locationInfo.countryEmoji ?<Globe size={15} /> : registration.locationInfo.countryEmoji}
                      </InputGroupText>
                    </InputGroupAddon>

                    <Input type='select' id='countryName' name='countryName'
                      onChange={e => 
                        {
                          const currentCountry = countries.filter((count) => count.name === e.target.value)[0]
                          setSities(currentCountry.cities)
                          setRegistration({...registration, locationInfo: {...registration.locationInfo, countryName: e.target.value, countryEmoji: currentCountry.emoji}})
                        }
                      }
                      value={registration.locationInfo.countryName}
                      innerRef={register({ required: true })}
                      className={classnames({ 'is-invalid': errors['countryName']})}
                      >
                        <option value={''}>Selectionner</option>
                      {
                        countries.map(({name}, index) => {
                          return <option key={index} value={name}> {name} </option>
                        })
                      }
                    </Input>
                    
                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm='3' for='cityName'>
                  Ville
                </Label>
                <Col sm='9'>
                  <InputGroup className='input-group-merge'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        {!registration.locationInfo.countryEmoji ?<Flag size={15} /> : registration.locationInfo.countryEmoji}
                      </InputGroupText>
                    </InputGroupAddon>
                    
                    {countryCities.length ?
                    <Input type='select' id='cityName' name='cityName'
                    onChange={e => setRegistration({...registration, locationInfo: {...registration.locationInfo, cityName: e.target.value}})}
                    value={registration.locationInfo.cityName}
                    innerRef={register({ required: true })}
                    className={classnames({ 'is-invalid': errors['cityName']})}
                    >
                      <option value={''}>Selectionner</option>
                    {
                      countryCities.map(({name}, index) => {
                        return <option key={index} value={name}> {name} </option>
                      })
                    }
                  </Input> : <Input type='text' name='cityName' id='cityName' placeholder='Ville'
                  onChange={e => setRegistration({...registration, locationInfo: {...registration.locationInfo, cityName: e.target.value}})}
                  value={registration.locationInfo.cityName}
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['cityName']})}
                  />
                    }
                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm='3' for='zip'>
                  Code postal / Zip
                </Label>
                <Col sm='9'>
                  <InputGroup className='input-group-merge'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <Map size={15} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type='text' name='zip' id='zip' placeholder='Code postal / Zip' 
                    onChange={e => setRegistration({...registration, locationInfo: {...registration.locationInfo, postalCode: e.target.value}})}
                    value={registration.locationInfo.postalCode}
                    innerRef={register({ required: true })}
                    className={classnames({ 'is-invalid': errors['zip']})}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>

              <div className='divider my-2'>
                <div className='divider-text  font-weight-bold'>Informations de la boutique</div>
              </div>

              <FormGroup row>
                <Label sm='3' for='companyName'>
                  Nom de l'entreprise / boutique
                </Label>
                <Col sm='9'>
                  <InputGroup className='input-group-merge'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <Home size={15} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type='text' name='companyName' id='companyName' placeholder="Nom de l'entreprise / boutique" 
                    onChange={e => setRegistration({...registration, companyInfo: {...registration.companyInfo, companyName: e.target.value}})}
                    value={registration.companyInfo.companyName}
                    innerRef={register({ required: true })}
                    className={classnames({ 'is-invalid': errors['companyName']})}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm='3' for='commercialRegister'>
                  Registre de commerce
                </Label>
                <Col sm='9'>
                  <InputGroup className='input-group-merge'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <BookOpen size={15} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type='text' name='commercialRegister' id='commercialRegister' placeholder='Registre de commerce' 
                    onChange={e => setRegistration({...registration, companyInfo: {...registration.companyInfo, commercialRegister: e.target.value}})}
                    value={registration.companyInfo.commercialRegister}
                    innerRef={register({ required: true })}
                    className={classnames({ 'is-invalid': errors['commercialRegister']})}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm='3' for='taxpayerAccountNumber'>
                  Numéro de compte contribuable
                </Label>
                <Col sm='9'>
                  <InputGroup className='input-group-merge'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <Bookmark size={15} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type='text' name='taxpayerAccountNumber' id='taxpayerAccountNumber' placeholder='Numéro de compte contribuable' 
                    onChange={e => setRegistration({...registration, companyInfo: {...registration.companyInfo, taxpayerAccountNumber: e.target.value}})}
                    value={registration.companyInfo.taxpayerAccountNumber}
                    innerRef={register({ required: true })}
                    className={classnames({ 'is-invalid': errors['taxpayerAccountNumber']})}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>

              <div className='divider my-2'>
                <div className='divider-text  font-weight-bold'>Informations bancaires</div>
              </div>
              <FormGroup row>
                <Label sm='3' for='rib'>
                  RIB
                </Label>
                <Col sm='9'>
                  <InputGroup className='input-group-merge'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <CreditCard size={15} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type='text' name='rib' id='rib' placeholder='RIB' 
                    onChange={e => setRegistration({...registration, bankInfo: {...registration.bankInfo, rib: e.target.value}})}
                    value={registration.bankInfo.rib}
                    innerRef={register({ required: true })}
                    className={classnames({ 'is-invalid': errors['rib']})}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm='3' for='bankName'>
                  Nom de la banque
                </Label>
                <Col sm='9'>
                  <InputGroup className='input-group-merge'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <Home size={15} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type='text' name='bankName' id='bankName' placeholder='Nom de la banque'
                    onChange={e => setRegistration({...registration, bankInfo: {...registration.bankInfo, bankName: e.target.value}})}
                    value={registration.bankInfo.bankName}
                    innerRef={register({ required: true })}
                    className={classnames({ 'is-invalid': errors['bankName']})}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm='3' for='bankCode'>
                  Code de la banque
                </Label>
                <Col sm='9'>
                  <InputGroup className='input-group-merge'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <Hash size={15} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type='text' name='bankCode' id='bankCode' placeholder='Code de la banque' 
                    onChange={e => setRegistration({...registration, bankInfo: {...registration.bankInfo, bankCode: e.target.value}})}
                    value={registration.bankInfo.bankCode}
                    innerRef={register({ required: true })}
                    className={classnames({ 'is-invalid': errors['bankCode']})}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm='3' for='iban'>
                  IBAN
                </Label>
                <Col sm='9'>
                  <InputGroup className='input-group-merge'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <CreditCard size={15} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type='text' name='iban' id='iban' placeholder='IBAN' 
                    onChange={e => setRegistration({...registration, bankInfo: {...registration.bankInfo, iban: e.target.value}})}
                    value={registration.bankInfo.iban}
                    innerRef={register({ required: true })}
                    className={classnames({ 'is-invalid': errors['iban']})}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm='3' for='ownerFullName'>
                  Nom du detenteur
                </Label>
                <Col sm='9'>
                  <InputGroup className='input-group-merge'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <User size={15} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type='text' name='ownerFullName' id='ownerFullName' placeholder='Nom du detenteur' 
                    onChange={e => setRegistration({...registration, bankInfo: {...registration.bankInfo, ownerFullName: e.target.value}})}
                    value={registration.bankInfo.ownerFullName}
                    innerRef={register({ required: true })}
                    className={classnames({ 'is-invalid': errors['ownerFullName']})}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm='3' for='ribFile'>
                  Télécharger le RIB (PDF, PNG, JPG, JPEG)
                </Label>
                <Col sm='9'>
                {!registration.bankInfo.ribFile ?

                <>
                {loadingRibFile ? <Spinner/> : 
                <FileDropzone 
                accept = {{
                  'image/*': [],
                  'application/pdf': []
                }}
                onChange = {async (file) => {
                  const formData = new FormData();
                  formData.append("file", file);
                  setLoadingRibFile(true)
                  await axios.post(`${base_url}upload/file`, formData, config).then((res) => {
                    setRegistration({...registration, bankInfo: {...registration.bankInfo, ribFile:  res.data?.filename}})

                    setLoadingRibFile(false)
                  })
                  .catch((err) => {
                    console.log(err)
                    setLoadingRibFile(false)
                    toast.error(
                      'Le téléchargement a échoué, veuillez réessayer',
                       { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                     )
                  })
                } } />
                }
                </>
                :
                <a href={`${file_url_file}/${registration.bankInfo.ribFile}`} target='_blank'>
                  <span className='font-weight-bold' >
                    {registration.bankInfo.ribFile}
                  </span>
                </a>
                }
                </Col>
              </FormGroup>

              <FormGroup className='mb-0' row>
                <Col className='d-flex' md={{ size: 9, offset: 3 }}>
                  <Button.Ripple className='mr-1' color='primary' type='submit' 
                  disabled = {
                    !registration.email ||
                    !registration.password ||
                    registration.password !== registration.confirmation ||

                    !registration.personnalInfo.firstName ||
                    !registration.personnalInfo.lastName ||
                    !registration.personnalInfo.number ||
                    !registration.personnalInfo.IDType ||
                    !registration.personnalInfo.IDNumber ||
                    !registration.personnalInfo.IDFile ||

                    !registration.locationInfo.countryName ||
                    !registration.locationInfo.cityName ||
                    !registration.locationInfo.countryEmoji ||
                    !registration.locationInfo.postalCode ||

                    !registration.companyInfo.companyName ||
                    !registration.companyInfo.commercialRegister ||
                    !registration.companyInfo.taxpayerAccountNumber ||

                    !registration.bankInfo.rib ||
                    !registration.bankInfo.bankName ||
                    !registration.bankInfo.bankCode ||
                    !registration.bankInfo.iban ||
                    !registration.bankInfo.ownerFullName ||
                    !registration.bankInfo.ribFile
                  }>
                    S'inscrire {loading && <Spinner/>}
                  </Button.Ripple>
                  
                </Col>
              </FormGroup>
            </Form>
            <p className='text-center mt-2'>
              <span className='mr-25'>Vous avez déjà un compte?</span>
              <Link to='/login'>
                <span>Connectez-vous</span>
              </Link>
            </p>
           
          </Col>
          :
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h1' className='font-weight-bold mb-1'>
            Félicitation <CheckCircle color='green' />
            </CardTitle>
            <CardText className='mb-2'>Votre inscription a été éffectuée avec succès. Nous passons dès à présent à la vérification de vos informations.</CardText>
            <CardText className='mb-2'>Nous vous contacterons sous peu, afin d'activer le plus rapidement possible votre compte.</CardText>
            <CardTitle tag='h6' className='font-weight-bold mb-1'>
            Merci d'avoir fait confiance à TIMS
            </CardTitle>

            <p className='text-center mt-2'>
              <span className='mr-25'>Retour à la page de </span>
              <Link to='/login'>
                <span>connexion</span>
              </Link>
            </p>
            </Col>
          }
        </Col>
      </Row>
    </div>
  )
}

export default Register
