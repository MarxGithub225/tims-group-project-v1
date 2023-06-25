import { useEffect, useState } from "react";
import FullButton from "../../components/Buttons/FullButton";
import DetailsTitle from "../../components/Details/DetailsTitle";
import {ReactComponent as ArrowIcon} from '../../assets/icons/ArrowIcon.svg'
import {ReactComponent as HouseIcon} from '../../assets/icons/HouseIcon.svg'
import SummaryProductCardTracking from "../../components/ProductCards/SummaryProductCardTracking";
import {ReactComponent as CopyIcon} from '../../assets/icons/CopyIcon.svg'
import {ReactComponent as PackedIcon} from '../../assets/icons/tracking/PackedIcon.svg'
import {ReactComponent as OnShippingIcon} from '../../assets/icons/tracking/OnShippingIcon.svg'
import {ReactComponent as ReceivedIcon} from '../../assets/icons/tracking/ReceivedIcon.svg'
import {ReactComponent as CheckIcon} from '../../assets/icons/CheckIcon.svg'
import {ReactComponent as EyeIcon} from '../../assets/icons/EyeIcon.svg'
import { ReactComponent as BackIcon } from "../../assets/icons/BackIcon.svg";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import { isUserLoggedIn } from "../../utils/Utils";

import axios from 'axios'
import { base_url, file_url } from "../../utils/baseUrl";
import moment from "moment";

const stepData = [
  {
    icon: <CheckIcon className="tracking-step-icon-class"/>,
    label: "Effectuée",
    status: "pending"
  },
  {
    icon: <EyeIcon className="tracking-step-icon-class"/>,
    label: "Validée",
    status: "accepting"
  },
  {
    icon: <PackedIcon className="tracking-step-icon-class"/>,
    label: "Emballée",
    status: "processing"
  },
  {
    icon: <OnShippingIcon className="tracking-step-icon-class"/>,
    label: "Expédiée",
    status: "shipped"
  },
  {
    icon: <ReceivedIcon className="tracking-step-icon-class"/>,
    label: "Reçue",
    status: "delivered"
  }
];
function OrderTracking({setActive = () => {}}: any) {
  const [isOpened, setOpen] = useState<boolean>(false)
  const [_products, setProducts] = useState<Array<any>>([])
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  let {orderId} = useParams()
  let [order, setOrder] = useState<any>(null)
  useEffect(() => {
    if(!isUserLoggedIn()) {
        navigate('/')
        let errMessage = "Aucun compte connecté. Merci de vous connecter";
        toast.error(
        errMessage,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
    }

    ;(async () => {
      try {
        setLoading(true)
        await axios.get(`${base_url}order/id/${orderId}`)
        .then(async (response) => {
            if(response.data) {
              setOrder(response.data)
              let finalPdts: any[] = [];
              await Promise.all(
                response.data?.products.map(async (c: any) => {
                  await Promise.all(
                    c?.items?.map(async (cc: any) => {
                      await Promise.all(
                        cc?.items?.map((l: any) => {
                          finalPdts.push(
                            {
                            ...cc,
                            color: {
                              _id: l?.colorId,
                              colorName: l?.colorName
                            },
                            ...l,
                            }
                          )
                        })
                      )
                    })
                  )
                })
              )
              setProducts(finalPdts)
            }

          })

        .catch((error) => {
          let errMessage = "Une erreur s'est produite, merci de réessayer plustard.";
          console.log('Error', error)
          toast.error(
            errMessage,
              { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
          setLoading(false)
        })
      } catch (error) {
        
      }

    })()

    
  }, [orderId])


  const orderStatus = (step: any, ) => {
    if(order?.orderStatus === step.status)
    return '-active'
    
    else if(order?.orderStatus === 'accepting') {
      if(step.status === 'pending')
      return '-done'
      else return ''
    }
    else if(order?.orderStatus === 'processing') {
      if(step.status === 'pending'|| step.status === 'accepting')
      return '-done'
      else return ''
    }
    else if(order?.orderStatus === 'shipped') {
      if(step.status === 'pending' || step.status === 'accepting' || step.status === 'processing')
      return '-done'
      else return ''
    }
    else if(order?.orderStatus === 'delivered') {
      if(step.status === 'pending' || step.status === 'accepting' || step.status === 'processing'|| step.status === 'shipped')
      return '-done'
      else return ''
    }
    
    else return ''
  }
  return <div className="order-tracking">
    <div className="w-max-width pb-32">
    <div className="mobile-menu-item ml-4 mb-4 flex laptop:hidden flex-col items-center"
      onClick={() => {navigate(-1)}}
      style = {{
      width : 40,
      height: 40,
      borderRadius: 100,
      backgroundColor : '#F5F5F5',
      flexDirection: 'row',
      justifyContent : 'center',
      alignItems : 'center'
      }}
      >
          <BackIcon/>
      </div>
      <div className="w-full px-3 laptop:px-0">
      <div className="w-full flex items-center justify-between mb-12">
          <div className="page-header">Suivi de commande</div>

          <div className="hidden laptop:block">
          <FullButton
          background="#E73A5D"
          outline
          label={<><HouseIcon className="order-tracking-house-icon-class mr-2"/> Aller à l'accueil</>}
          color="#E73A5D"
          size = {14}
          weight = {500}
          func={(e: any) =>navigate('/')}
          radius = {8}
          />
          </div>
        </div>
        <div className="w-full flex flex-col laptop:flex-row laptop:justify-between">
              <div className="order-details border">
                
                <div className="flex laptop:items-center flex flex-col laptop:flex-row laptop:justify-between">
                  <div className="">
                  <DetailsTitle title = "Votre commande..." />
                  <p>Sera envoyé à {`${order?.shippingAddress?.location} ${order?.shippingAddress?.city} - ${order?.shippingAddress?.country}`}.</p>
                  </div>
                  <div className="edit-info-button">
                  <div className="w-full">
                    <div className="order-id">ID de la commande :</div>
                    <div className="order-id-value flex items-center uppercase">{orderId} <CopyIcon className="ml-1" /></div>
                  </div>
                  </div>
                </div>

                <div className="tracking-stepper flex items-center justify-between">
                  {stepData.map((sd: any, index: number) => {
                    return <div className={`tracking-step-cover tracking-step-cover${orderStatus(sd)}`}>
                            <div className="flex items-center">
                              <div className="flex flex-col items-center">
                                <div className="tracking-step">
                                  {sd.icon}
                                </div>
                              </div>
                              {index!== (stepData.length - 1) && <div className="tracking-step-line"/>}
                            </div>

                            <div className="tracking-step-label"  style={{marginLeft: index > 0 ? 5 : 0}}>{sd.label}</div>
                    </div>
                  })}
                </div>
                <div className="border-separator my-4"></div>
                <div className="track-details hidden laptop:block">
                  <div className="flex items-center justify-between">
                    <div className="track-detail-title">Traçabilité</div>
                    {!isOpened &&<ArrowIcon onClick={() => setOpen(!isOpened)} className="cursor-pointer" />}
                    {isOpened &&<ArrowIcon onClick={() => setOpen(!isOpened)} className="cursor-pointer transform rotate-180" />}

                    
                  </div>
                {isOpened && <table>

                  {order?.tracking?.map((trck: any, index: number) => {
                    return <tr key={index}>
                    <td><input type="radio" disabled /></td>
                    <td>{trck?.message}</td>
                    <td className="text-end">{moment(trck?.date).format('DD MMM YYYY - HH:MM')}</td>
                  </tr>
                  })}
                </table>}
                </div>

                <div className="block laptop:hidden">
                    <div className="border-separator my-4"></div>

                    <div className="order-resume ">
                    <DetailsTitle title = "Dans votre commande" />
                    {_products?.map((pdt: any, index: number) => {
                      return <SummaryProductCardTracking key={index} {...pdt} from="tracking"/>
                    })}


                    <div className="flex items-center justify-between mb-4">
                      <span>Sous total</span>
                      <span className="value">{order?.cost?.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span>Coût de livraison</span>
                      <span className="value">{order?.fees?.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span>Rémise (0%)</span>
                      <span className="value text-redColor" style={{color: "#DE3618"}}>-0</span>
                    </div>

                    <div className="border-separator my-3"/>

                    <div className="tracking-text-area-side">
                      <div className="label mb-3">Notes</div>

                      <p></p>
                    </div>

                    <div className="border-separator my-3"/>
                    <div className="flex items-center justify-between mb-4 font-medium" >
                      <span style={{color: "#161D25"}}>Total</span>
                      <span className="value text-redColor" style={{color: "#161D25"}}>{order?.cost?.toLocaleString()} Dhs</span>
                    </div>

                    </div>
                </div>
                <div className="border-separator my-4"></div>
                <div className="help-number">
                  <div className="flex flex-col laptop:flex-row laptop:justify-between laptop:items-center">
                  <div className="mb-4 laptop:mb-0">
                    <div className="help-number-title">Vous avez eu des problèmes avec votre colis ?</div>
                    <div className="help-number-message">Vous pouvez nous appeler. Nous pouvons vous aider à résoudre votre problème</div>
                  </div>

                  <FullButton
                  background="#E73A5D"
                  label={<>Contactez-nous</>}
                  color="#FFFFFF"
                  size = {14}
                  weight = {500}
                  func={(e: any) => navigate('/contact-us')}
                  radius = {8}
                  />
                  
                  </div>
                </div>
              
              </div>

              <div className="hidden laptop:block right-side">
                <div className="order-resume border">
                <DetailsTitle title = "Dans votre commande" />
                {_products?.map((pdt: any, index: number) => {
                  return <SummaryProductCardTracking key={index} {...pdt} from="tracking"/>
                })}
                

                <div className="flex items-center justify-between mb-4">
                  <span>Sous total</span>
                  <span className="value">{order?.cost?.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span>Coût de livraison</span>
                  <span className="value">{order?.fees?.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span>Rémise (0%)</span>
                  <span className="value text-redColor" style={{color: "#DE3618"}}>-0</span>
                </div>

                <div className="border-separator my-3"/>

                <div className="tracking-text-area-side">
                  <div className="label mb-3">Notes</div>

                  <p></p>
                </div>

                <div className="border-separator my-3"/>
                <div className="flex items-center justify-between mb-4 font-medium" >
                  <span style={{color: "#161D25"}}>Total</span>
                  <span className="value text-redColor" style={{color: "#161D25"}}>{order?.cost?.toLocaleString()} Dhs</span>
                </div>
                
                </div>
              </div>
        </div>  
      </div>    
    </div>
  </div>
}

export default OrderTracking;

