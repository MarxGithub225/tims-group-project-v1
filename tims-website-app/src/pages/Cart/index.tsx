import { useEffect, useState } from "react";
import CategoryHeader from "../../screens/Headers/CategoryHeader";
import {ReactComponent as ArrowHorizontalIcon} from '../../assets/icons/ArrowHorizontalIcon.svg'
import DetailsTitle from "../../components/Details/DetailsTitle";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import NoData from '../../assets/images/NoData.png'
import { base_url, file_url } from "../../utils/baseUrl";
import axios from "axios";
import ProductLoader from "../../components/Loaders/ProductLoader";
import MainProductCard from "../../components/ProductCards/MainProductCard";
import MainFooter from "../../screens/Footers/MainFooter";
import { useAppDispatch } from "../../redux/hooks";
import { updateCart } from "../../redux/features/cartSlice";


const steps = [
  {
    id: 0,
    label: 'Panier'
  },
  {
    id: 0,
    label: 'Informations du client'
  },
  {
    id: 0,
    label: 'Livraison et paiement'
  },
  {
    id: 0,
    label: 'Résumé'
  }
]
function Cart() {
  let cart: any[] = useSelector((state: RootState) => state.cart.datas)
  const [pageHeight, setPageHeight] = useState<number>(0)
  const [activeStep, setActive] = useState<number>(0)
  const [addressSelected, setAddressSelected] = useState<any>(null)
  const [cartLength, setCartLenght] = useState<number>(0)
  const [cartItems, setCartItems] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(true)

  const [_products, setProducts] = useState<Array<any>>([])

  const [loadingMore, setLoadingMore] = useState<boolean>(true)
  const [selectedAddressKey, setAddressKey] = useState<number>(-1)
  const dispatch = useAppDispatch()

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
    }
    })()
}, [cart])

  
  return <>

  {cart && cart?.length ? 
    <div className="cart-page"
    >
      <CategoryHeader
      subHeader="Ceci est votre panier basé sur les articles que vous voulez acheter."
      title={`Panier (${cartLength})`}
      bgColor="#F9FAFB" 
      loading= {loading}
      color="#161D25" />
      

        <div className="-mt-20 w-full flex flex-col items-center categories-lists">
          <div className="w-max-width">
            <div className="flex items-center stepper">
              {steps.map((st: any, key: number) => {
                return <div className="step-item flex items-center">
                  <div className={`step-number${activeStep === key ? '-active': ''}`}>
                    {key+1}
                  </div>
                  <div className={`step-label${activeStep === key ? '-active': ''}`}>
                    {st.label}
                  </div>

                  {key !== (steps.length - 1) && 
                  <div className="step-separator"><ArrowHorizontalIcon/></div>
                  }
                </div>
              })}
            </div>
            <div className="w-full flex justify-between">
              {activeStep === 0 && <Step1 setActive = {setActive} cartItems = {cartItems}/>}
              {activeStep === 1 && <Step2 setActive = {setActive} cartItems = {cartItems}
              addressSelected={addressSelected}
              setAddressSelected={(data: any) => setAddressSelected(data)}
              setAddressKey={(key: any) => setAddressKey(key)}
              />}
              {activeStep === 2 && <Step3 setActive = {setActive} cartItems = {cartItems}/>}
              {activeStep === 3 && <Step4 setActive = {setActive} 
              addressSelected={addressSelected}
              cartItems = {cartItems}
              selectedAddressKey={selectedAddressKey}
              />}
            </div>

            {activeStep < 2 && <div className="w-full mt-20">
            <DetailsTitle title = "Vous pourriez aussi aimer..." />
              <div className="flex justify-between flex-wrap">

              {loadingMore ? 
              <>
              {[0, 1, 2, 3, 4].map((p: any, index: number) => {
                return <ProductLoader
                  width={255}
                  height={380}
                />
              })}
              </> : 
              <>
              {_products.slice(0,4).map((p: any, index: number) => {
                  return <MainProductCard
                    {...p}
                  />
                })}
              </>}
              
                
              </div>
            </div>}

            
          </div>
        </div>

        
      </div>  :<div className="w-full h-96 flex items-center justify-center">
          <img src={NoData} alt="" className="w-auto h-60" />
        </div>
  }

<MainFooter/>
  </>
  
}

export default Cart;
