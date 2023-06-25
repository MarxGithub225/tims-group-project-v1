import { Fragment, useState } from "react";
import FullButton from "../../../components/Buttons/FullButton";
import DetailsTitle from "../../../components/Details/DetailsTitle";
import {ReactComponent as CartonIcon} from '../../../assets/icons/CartonIcon.svg'
import {ReactComponent as PhoneIcon} from '../../../assets/icons/PhoneIcon.svg'
import {ReactComponent as ArrowHorizontalIcon} from '../../../assets/icons/ArrowHorizontalIcon.svg'
import {ReactComponent as HouseIcon} from '../../../assets/icons/HouseIcon.svg'
import { User } from "react-feather";
import {ReactComponent as EditIcon} from '../../../assets/icons/EditIcon.svg'
import DevileryPaid from '../../../assets/icons/DeliveryPaid.png'
import CartItemCard from "../../../components/ProductCards/CartItemCard";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { base_url, file_url } from "../../../utils/baseUrl";

import { Slide, toast } from 'react-toastify'

import axios from 'axios'
import { Spinner } from "reactstrap";
import { config } from "../../../utils/axiosconfig";
import { deleteCart } from "../../../redux/features/cartSlice";

function Step4({setActive = () => {}, addressSelected, cartItems, selectedAddressKey}: any) {
  let cart: any[] = useSelector((state: RootState) => state.cart.datas)
  let dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const total = () =>
  {
    let total = 0;
    for (let c of cartItems) {
     total += (c?.product?.isPromoted && c?.product?.promoType !=='bonus') ? Number(c?.product?.promoCost) * Number (c.cartQuantity) : Number(c?.product?.cost) * Number (c.cartQuantity)
    }

    return total;
  }

  const makeOrder = async () => {
    setLoading(true)

    let item: any[] = [];

    let finalCart: any[] = [];
    await Promise.all(
      cart.map(async (c: any) => {
        let finalVariables: any[] = [];
        await Promise.all(
          c?.colors?.map(async (cc: any) => {
            let list: any[] = cc?.variables?.filter((cv: any) => Number(cv?.cartQuantity) !== 0)
            if(list.length) {
              await Promise.all(
                list?.map((l: any) => {
                  finalVariables.push(
                    {
                      colorId: cc?._id,
                      colorName: cc?.colorName,
                      quantity: l?.cartQuantity,
                      image : `${file_url}/products/${cc?.primaryImage}`,
                      sku: l?.sku,
                      label: l?.label,
                    }
                  )
                })
              )
              
            }
          })
        )
        
        finalCart.push({...c, variables : finalVariables})
      })
    )
    
    await Promise.all(
      finalCart.map((element: any) => {
        item.push({
          partnerId: element?.partnerId?._id,
  
          productId: element?._id,
          productTitle: element?.title,
          cost: element?.isPromoted && element?.promoType !=='bonus' ? element?.promoCost : element?.cost,
          bonusNumber: element?.promoType !=='bonus' 
          && (Number(element?.allQuantity) >= Number(element?.boughtNumber)) ? element?.bonusNumber : 0,
          quantity: element?.allQuantity,
          items : element.variables
          
        })
      })
    )

        
    const result = item.reduce(function (r: any, a: any) {
        r[a?.partnerId] = r[a?.partnerId] || [];
        r[a?.partnerId].push(a);
        return r;
    }, Object.create(null));
    

     const orderData = {
      cost: total(),
      fees: 0,
      voucher: false,
      voucherType: '',
      voucherPercent: 0,
      voucherBonus: 0,
      voucherNumberBought: 0,
      paidmethod: 'cash',
      products: Object.entries(result).map((e) => ( { providerId: [e[0]], items: e[1] } )),
      shippingAddress: addressSelected
     }

     setLoading(true)
    await axios.post(`${base_url}order`, orderData, config)
    .then((response): any => {
      dispatch(deleteCart())
      setLoading(false)
      navigate(`/order-state/${response?.data?._id}`)
      toast.success(
        <Fragment>
          <div className='toastify-header'>
            <div className='title-wrapper'>
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
      toast.error(
        errMessage,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      setLoading(false)
    })
  }
  return <>
            <div className="products-list shadow">
              <DetailsTitle title = "Livraison à…" />
              <p>Veuillez vérifier avant de finaliser votre commande.</p>
  
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User size={60} color="#5A7184" /> 
                  <div className="ml-2">
                    <div className="shipping-user-infos flex items-center">
                      <div className="user-full-name flex">{
                        getUserData()?.fullName
                      }</div>
                      <div className="user-phone">{getUserData()?.numbers[selectedAddressKey]}  <PhoneIcon className="ml-1" /></div>
                    </div>
                    <div className="shipping-full-address flex items-center"><HouseIcon className="mr-1"/> {addressSelected?.location}, {addressSelected?.city}, {addressSelected?.country}</div>
                    
                  </div>
                </div>

                <div className="edit-info-button" onClick={() => setActive(1)}>
                <EditIcon className="mr-1"/> Modifier
                </div>
              </div>
              {/* <div className="border-separator my-3"/>
              
              <div className="flex items-center ml-16 w-full">
                  <div className="shipping-company flex items-center justify-between">
                    <div className="user-full-name">
                      DHL Express
                      <p className="mt-2">Estimated delivery time: Jul 20 - Aug 03</p>
                    </div>
                    <div className="shipping-item-price flex items-center mx-6">
                      <MoneyIcon className="money-class mr-2"/>
                      <div className="free-shipping">Free Shipping</div>
                    </div>
                    <div className="shipping-item-logo">
                      <img src={dhl} alt="" />
                    </div>
                  </div>
              </div> */}

              <div className="border-separator my-3"/>
              <div className="flex justify-between items-center">
                <DetailsTitle title = "Méthode de payement" />
                <p className="change-method" onClick={() => setActive(2)}>Changer</p>

              </div>

              <div className="paid-resume flex justify-between items-center">
                 <div className="flex items-center">
                  <img src={DevileryPaid} 
                  style = {{
                    width : 100,
                    height : "auto",
                    }}
                  alt=""  className="mr-4"/>
                  <div className="card-infos">
                    <div className="name">Cash à la livraison</div>
                    {/* <div className="details"> **** 7282 - Expired 8/2022</div> */}
                  </div>
                 </div>

                  <div className="edit-info-button" onClick={() => setActive(2)}>
                  <EditIcon className="mr-1"/> Modifier
                  </div>
              </div>
              <div className="border-separator my-3"/>
              <DetailsTitle title = "Panier" />
              <p>Résumé de vos articles</p>

              {cartItems?.map((item: any, index: number) => {
                  return <CartItemCard  from="resume" {...item} />
                })}
            </div>

            <div className="right-side">
              <div className="voucher shadow">
              <DetailsTitle title = "Bon d'achat?" />
              <div className="inputGroup">
                <input type="text" placeholder="Entrez le code"/>
               <div className="absolute top-0 right-0">
               <FullButton
                background="#E73A5D"
                label={<>Appliquer</>}
                color="#FFFFFF"
                size = {14}
                weight = {500}
                func={(e: any) => console.log('e', e)}
                radius = {8}
                />
               </div>
              </div>
              </div>

              <div className="order-resume shadow">
              <DetailsTitle title = "Order Summary" />

              <div className="flex items-center justify-between mb-4">
                <span>Sous total</span>
                <span className="value">{total().toString()} Dhs</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span>Coût de livraison</span>
                <span className="value">0</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span>Rémise (0%)</span>
                <span className="value text-redColor" style={{color: "#DE3618"}}>-0</span>
              </div>

              <div className="border-separator my-3"/>

              <div className="text-area-side">
                <div className="label mb-3">Rédiger une note</div>

                <textarea className="address-form-input" name="" id="" placeholder="Ecrire ici..."/>
              </div>

              <div className="border-separator my-3"/>
              <div className="flex items-center justify-between mb-4 font-medium" >
                <span style={{color: "#161D25"}}>Total de la commande</span>
                <span className="value text-redColor" style={{color: "#161D25"}}>{total()} Dhs</span>
              </div>
             
              <FullButton
                background="#E73A5D"
                disabled={loading}
                label={<>{loading ?  <Spinner animation="grow" style={{width: 17, height: 17}}/> :<><CartonIcon className="mr-2"/> Finaliser la commande</>}</>}
                color="#FFFFFF"
                size = {14}
                weight = {500}
                func={(e: any) => {
                  makeOrder()
                }}
                radius = {8}
                />

                <div className="mt-3"></div>
                <FullButton
                background="#F4F6F8"
                label={<><span className="transform rotate-180"><ArrowHorizontalIcon className="ml-2"/></span>Rétour à Livraison et paiement</>}
                color="#919EAB"
                size = {14}
                weight = {500}
                func={(e: any) =>setActive(2)}
                radius = {8}
                />
              
              </div>
            </div>
  </>
}

export default Step4;
