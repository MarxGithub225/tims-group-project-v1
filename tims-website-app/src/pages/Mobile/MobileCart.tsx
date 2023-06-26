/* eslint-disable array-callback-return */
import { Fragment, useEffect, useState } from "react";
import { CheckCircle } from "react-feather";
import Location from '../../assets/images/Location.png';
import Visa_sm from '../../assets/images/Visa_sm.png';
import {ReactComponent as ArrowIcon} from '../../assets/icons/ArrowIcon.svg';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { file_url, base_url } from "../../utils/baseUrl";
import NoData from '../../assets/images/NoData.png'
import { confirmAlert } from "react-confirm-alert";
import { toast, Slide } from "react-toastify";
import { deleteCart, setCart, updateCart } from "../../redux/features/cartSlice";
import { useAppDispatch } from "../../redux/hooks";
import { config } from "../../utils/axiosconfig";
import MobileCardItem from "../../components/ProductCards/MobileCardItem";
function MobileCart() {
    const navigate = useNavigate()
    let [cartQuantityLoading, setCartQuantityLoading] = useState<boolean>(false)
    let cart: any[] = useSelector((state: RootState) => state.cart.datas)
    let addressSelected: any = useSelector((state: RootState) => state.address.selectedAddress)
  const [cartLength, setCartLenght] = useState<number>(0)
  const [cartItems, setCartItems] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(true)

  const [_products, setProducts] = useState<Array<any>>([])

  const [loadingMore, setLoadingMore] = useState<boolean>(true)
  let dispatch = useAppDispatch()

  useEffect(() => {
    
    
      ;(async () => {
        if(cart && cart?.length) {
        let length = 0;
        let finalVariables: any[] = [];

        await Promise.all(
          cart.map(async (c: any) => {
            await Promise.all(
              c?.colors?.map(async (cc: any) => {
                let list: any[] = cc?.variables?.filter((cv: any) => Number(cv?.cartQuantity) !== 0)
                if(list.length) {
                  await Promise.all(
                    list?.map((l: any) => {
                      finalVariables.push(
                        {
                         product: c,
                         color: {
                          _id: cc?._id,
                          purchaseCount: cc?.purchaseCount,
                          colorName: cc?.colorName
                         },
                         image : `${file_url}/products/${cc?.primaryImage}`,
                         ...l,
                        }
                      )
                    })
                  )
                  
                }
              })
            )
            length = length + c.allQuantity
          })
        )
        if(finalVariables.length === 0) {
          dispatch(updateCart())
        }
        setCartLenght(length) 
        setCartItems(finalVariables)
        setLoading(false)

        try {
          const [sliders] = await Promise.all([
            await axios.get(`${base_url}product/best-seller`)
          ])
          let otherPdcts : any[] = [];

          await Promise.all(
            otherPdcts = sliders.data.data.filter((sld: any) => cart.some((cpdt: any) => cpdt?._id !== sld?._id))
          )
          setProducts(otherPdcts)
        } catch (error) {
          console.log(error)
        }
        setLoadingMore(false)    
      }else {
        try {
          const [sliders] = await Promise.all([
            await axios.get(`${base_url}product/best-seller`)
          ])
          setProducts(sliders.data.data)
        } catch (error) {
          console.log(error)
        }
        setLoadingMore(false)
      }
      })()
      

  }, [cart])


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
  {cart && cart?.length ? 
  <div className="relative mobile-cart px-2 pt-2 pb-32">
    <div className="cart-product-list">
        

        {cartItems?.map((item: any) => {
            return <MobileCardItem {...item} />
        })}
    </div>

    <div className="p-2">
      <div className="address-details">
          <div className="cart-feature-header flex items-center justify-between" onClick={() => navigate('/addresses')}>
              <span>Adresse de livraison</span>
              <div style={{transform: 'rotate(-90deg)'}} 
              
              > <ArrowIcon className="cart-feature-header-icon"/></div>
          </div>

          {addressSelected ? <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center">
                  <img src={Location} className="rounded" alt="" />
                  <div className="address">
                  <span className="title">{addressSelected?.city}, {addressSelected?.location}</span>
                      <span>{addressSelected?.country}</span>
                  </div>
              </div>

              <CheckCircle color="#4AC76D"/>
          </div>: <span className="address-error" style={{fontSize: 12, color: 'red'}} >Veuillez renseigner une adresse de livraison</span>}
      </div>

      <div className="paid-details mt-6">
          <div className="cart-feature-header flex items-center justify-between"
          onClick={() => navigate('/bank-cards')}
          >
              <span>Mode de paiement</span>
              <div style={{transform: 'rotate(-90deg)'}} > <ArrowIcon className="cart-feature-header-icon"/></div>
          </div>

          <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center">
                  <img src={Visa_sm} className="rounded" alt="" />
                  <div className="address">
                      <span className="title">Visa card</span>
                      <span>**** **** **** 7690</span>
                  </div>
              </div>

              <CheckCircle color="#4AC76D"/>
          </div>
      </div>

      <div className="order-details mt-6">
          <div className="cart-feature-header flex items-center justify-between">
              <span>Détails de la commande:</span>
          </div>

          <div className="mt-3 ">
              <div className="flex items-center justify-between mb-3">
                  <div className="order-label">Sous total</div>
                  <div className="order-value">{total().toString()} Dhs</div>
              </div>

              <div className="flex items-center justify-between mb-3">
                  <div className="order-label">Coût de la livraison</div>
                  <div className="order-value">0</div>
              </div>

              <div className="flex items-center justify-between mb-3">
                  <div className="order-label">Total</div>
                  <div className="order-value">{total().toString()} Dhs</div>
              </div>
              
          </div>
      </div>

      
    </div>

    <div className="fixed bottom-14 bg-white left-0 w-full flex justify-center px-4 py-2 shadow-t">
          <div className="w-full px-3 py-2 rounded-full text-lg text-center"
          onClick={() => makeOrder()}
          style={{
              background: "#E73A5D",
              color: "#FFF",
              pointerEvents : !addressSelected? 'none': 'initial',
              opacity : !addressSelected? .5: 1
          }}
          
          >Acheter</div>
      </div>
  </div>:<div className="w-full h-96 flex items-center justify-center">
          <img src={NoData} alt="" className="w-auto h-60" />
        </div>
  }
  
  </>;
}

export default MobileCart;
