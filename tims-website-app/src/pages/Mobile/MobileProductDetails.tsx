/* eslint-disable array-callback-return */
import React, { Fragment, useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import ReviewItem from "../../components/Details/ReviewsSide/ReviewItem";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, Slide } from "react-toastify";
import { setCart, getCart } from "../../redux/features/cartSlice";
import { useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { base_url, file_url } from "../../utils/baseUrl";
import OptionsSide from "../../components/Details/OptionsSide";
import { X, AlertCircle } from "react-feather";
import { Modal, ModalBody, Spinner } from "reactstrap";
import FullButton from "../../components/Buttons/FullButton";
import DetailsTitle from "../../components/Details/DetailsTitle";
import { isUserLoggedIn } from "../../utils/Utils";
import RelatedProducts from "../../components/Details/RelatedProducts";
function MobileProductDetails() {

    let cart: any[] = useSelector((state: RootState) => state.cart.datas)
  const [seeMore, setSeeMore] = useState<boolean>(false)
  let dispatch = useAppDispatch()
  let [openOptions, setOpenOption] = useState<boolean>(false)
  let search = useLocation().search;
  let navigate = useNavigate()
  let reviewRef: any = useRef(null);
  let {productId} = useParams()

  let [product, setProduct] = useState<any>(null)

  let [loading, setLoading] = useState<boolean>(true)
  let [cartQuantityLoading, setCartQuantityLoading] = useState<boolean>(false)
  let [currentVar, setCurrentVar] = useState<number>(-1)
  let [currentColorId, setColor] = useState(null)
  let [currentVariables, setVariables] = useState<Array<any>>([])
  let [currentColor, setCurrentColor] = useState<any>(null)
  
  const [currentImages, setCurentImages] = useState<Array<string>>([])

  const mobileHeader: any = useRef(null)
  const responsive = {
      mobile: {
          breakpoint: { max: 768, min: 0 },
          items: 1
      }
  };

  let [thisProductInCartLength, setProductInCart] = useState(0)
    useEffect(() => {
    if (mobileHeader) {
        setTimeout(() => {
        mobileHeader?.current?.scrollIntoView({ behavior: "smooth" })
        }, 50);
    }
    ;(async () => {

      if(productId) {
        try {
          const this_product = await axios.get(`${base_url}product/id/${productId}`)
          if(!this_product.data.isBlocked) {
            await Promise.all(
              this_product.data?.colors?.map(async (dataCol: any) => {
                await Promise.all(
                  dataCol?.variables?.map((dataVar: any) => {
                    dataVar.cartQuantity = 0;
                  })
                )
              })
            )

            if(cart && cart?.length && cart.filter((cItem: any) => cItem?._id === productId).length) {
              let defineProduct: any = cart.filter((cItem: any) => cItem?._id === productId)[0]
              setProduct(defineProduct)
              setColor(defineProduct?.colors.filter((col: any) => col.isActivated)[0]?._id)

            let thisImages: any[] = defineProduct?.colors.filter((col: any) => col.isActivated && col?._id === defineProduct?.colors.filter((col: any) => col.isActivated)[0]?._id)[0].images
            let imageData : any[] = []
            await Promise.all(thisImages.map((im: string) => {
            imageData.push(`${file_url}/products/${im}`)
            }))

            setCurentImages(imageData)
            }else {
              setProduct(this_product.data)
              setColor(this_product.data?.colors.filter((col: any) => col.isActivated)[0]?._id)

              let thisImages: any[] = this_product.data?.colors.filter((col: any) => col.isActivated && col?._id === this_product.data?.colors.filter((col: any) => col.isActivated)[0]?._id)[0].images
                let imageData : any[] = []
                await Promise.all(thisImages.map((im: string) => {
                imageData.push(`${file_url}/products/${im}`)
                }))

                setCurentImages(imageData)
            }

            document.title= `${this_product.data?.title} | 6tims.com`

          }
          // else navigate('/')
        } catch (error) {
          // navigate('/')
        }
  
        setLoading(false)
      }

    })()

    if(search) {
      const tag = new URLSearchParams(search).get('tag');

      if (tag && reviewRef) {
        setTimeout(() => {
          reviewRef?.current?.scrollIntoView({ behavior: "smooth" })
        }, 500);
      }
    }

    
  }, [productId])

  useEffect(() => {
    if(currentColorId) {
      const thisVariables: any = product?.colors?.filter((col: any) => col?._id === currentColorId)[0]
      setVariables(thisVariables?.variables)
      setCurrentColor(thisVariables)
    }
  }, [currentColorId])

  const increaseQty = async (varIndex: number, qty: number) => {
    setCurrentVar(varIndex)
    setCartQuantityLoading(true)
    
    let AllProductData: any[] = [];
    
    await Promise.all(
      product?.colors?.map(async (dataCol: any) => {
        if(dataCol?._id === currentColorId) {
          let list = [...dataCol?.variables];
          let currentQty = list[varIndex]['cartQuantity'];
          let thisDATA = {
            ...list[varIndex],
            cartQuantity: currentQty+1
          }

          list[varIndex] = thisDATA;
          AllProductData.push({
            ...dataCol,
            variables: list
          })
        }else AllProductData.push(dataCol)
        
      })
    )
    

    setTimeout(() => {
      setVariables([])
      setProduct({...product, colors: AllProductData})
      const thisVariables: any = AllProductData?.filter((col: any) => col?._id === currentColorId)[0]
      setVariables(thisVariables?.variables)
        dispatch(setCart({product: {...product, colors: AllProductData, allQuantity: 1}, type: 'add'}))
        setProductInCart(thisProductInCartLength + 1)
        setCartQuantityLoading(false)
        toast.success(
          <Fragment>
            <div className='toastify-header'>
              <div className='title-wrapper'>
                <h6 className='toast-title font-weight-bold'>{qty === 0 ? 'Produit ajouté avec succès': 'La quantité du produit a été mise à jour !'}</h6>
              </div>
            </div>
          </Fragment>,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      }, 1500);
  }

  const decreaseQty = async (varIndex: number) => {
    setCurrentVar(varIndex)
    setCartQuantityLoading(true)
    
    let AllProductData: any[] = [];
    
    await Promise.all(
      product?.colors?.map(async (dataCol: any) => {
        if(dataCol?._id === currentColorId) {
          let list = [...dataCol?.variables];
          let currentQty = list[varIndex]['cartQuantity'];
          let thisDATA = {
            ...list[varIndex],
            cartQuantity: currentQty - 1
          }

          list[varIndex] = thisDATA;
          AllProductData.push({
            ...dataCol,
            variables: list
          })
        }else AllProductData.push(dataCol)
        
      })
    )
    

    setTimeout(() => {
      setVariables([])
      setProduct({...product, colors: AllProductData})
      const thisVariables: any = AllProductData?.filter((col: any) => col?._id === currentColorId)[0]
      setVariables(thisVariables?.variables)
      dispatch(setCart({product: {...product, colors: AllProductData}, type: 'minus'}))
      setProductInCart(thisProductInCartLength - 1)
      setCartQuantityLoading(false)
      toast.success(
        <Fragment>
          <div className='toastify-header'>
            <div className='title-wrapper'>
              <h6 className='toast-title font-weight-bold'>La quantité du produit a été mise à jour !</h6>
            </div>
          </div>
        </Fragment>,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
    }, 1500);
  }

  const toogleModal = () => {
    setOpenOption(!openOptions)
    dispatch(getCart())
  }
  return <div className="relative mobile-details pb-32" ref={mobileHeader}>
    <Carousel responsive={responsive} 
    showDots
    swipeable
    autoPlay
    autoPlaySpeed={4000}
    infinite
      >
        {currentImages.map((im: any, key: number) => {
            return <div className="w-full flex justify-center" key={key} ><img src={im} alt=""/></div>
        })}
        
    </Carousel>

    <div className="flex flex-col item-center justify-between p-4">
        <div className="details-title w-full tims-txt-2">{product?.title}</div>
        <div className="details-price">
            {product?.isPromoted && product?.promoType !=='bonus' && <div className="old-price">{product?.cost.toLocaleString()} Dhs</div>}
            <div className="current-price">{product?.isPromoted && product?.promoType !=='bonus' ? product?.promoCost.toLocaleString() : product?.cost.toLocaleString()} Dhs</div>
        </div>
    </div>

    <div className="px-4">
    <OptionsSide loading = {loading} colors={product?.colors} setColor={setColor} currentColorId={currentColorId}
      openOptions={openOptions}
      setOpenOption={(state: boolean) => setOpenOption(state)}
      />
    </div>

    <div className="mt-4 options px-4">
        <div className="option-header">Description:</div>
        <div
        id="decription">
        <div className="texts" >
            <input type="checkbox" id="expanded" />
            <p className="decription-text">
              <div dangerouslySetInnerHTML={{__html: product?.smallDescription}}/>
              {seeMore && <div dangerouslySetInnerHTML={{__html: product?.description}}/>}
            </p>
            <label htmlFor="expanded" role="button" onClick={() => setSeeMore(!seeMore)} >Voir {!seeMore ? 'plus' : 'moins'}</label>
        
            </div>
        </div> 
    </div>

    {product?.ratings?.length ? <div className="mt-4 px-4 rates">
        <div className="header flex items-center justify-between mb-4">
            <div className="title">Avis ({product?.ratings?.length})</div>
            <>
            {
              isUserLoggedIn() ? <div className="more"
              onClick={() => navigate(`/reviews/${product?._id}`)}
              >Laisser un avis</div> : <>
              {product?.ratings?.length > 1 ? <div className="more"
            onClick={() => navigate(`/reviews/${product?._id}`)}
            >Voir tout</div> : <></>}
              </>
            }
            </>
            
        </div>
        <ReviewItem
        {...product?.ratings[0]}
        />
    </div>: <>
    {isUserLoggedIn() && <div className="mt-4 px-4 rates">
        <div className="header flex items-center justify-between mb-4">
            <div className="title">Avis (0) </div>
            <div className="more"
            onClick={() => navigate(`/reviews/${product?._id}`)}
            >Laisser un avis</div> 
        </div>
    </div>}
    </>}

    <div className="mt-8">
    <RelatedProducts categoryId={product?.categoryId?._id} productId={productId} loading={loading}/>
    </div>

    <div className="fixed bottom-14 bg-white left-0  w-full flex justify-center px-4 py-2 shadow-t">{thisProductInCartLength >  0 ? <div className="option-choose-item"><div className="option-choose-buttons flex items-center">
    <div className="option-choose-buttons flex items-center">
      <button className="minu-button"
      style={{
        opacity:  1
      }}
      onClick={() => {
        setOpenOption(!openOptions)
      }}
      > - </button>
      <div className={`quantity-value w-12 text-center`}>{thisProductInCartLength}</div>
      <button className="add-button"
      style={{
        opacity:  1
      }}
      onClick={() => {
        setOpenOption(!openOptions)
      }}
      > + </button>
    </div>
      </div></div>: 
      <div className="flex flex-col w-full bg-white">
        <FullButton
      background="#E73A5D"
      label={<>Ajouter au panier</>}
      color="#FFFFFF"
      size = {14}
      weight = {500}
      func={() =>setOpenOption(!openOptions)}
      radius = {8}
      />
      </div>
        }
    </div>

    <Modal
    
      isOpen={openOptions} toggle={toogleModal} >

      <ModalBody className="w-full h-full flex items-center justify-center">
        <div className="min-w-96 w-full bg-white rounded p-4 relative overflow-y-auto" style={{height: 500}} >
          <div className="no-scrollbar" >
            <div className="flex item-center justify-between">
              <DetailsTitle title="Veuillez sélectionner une option" />
              <X className="cursor-pointer" onClick={toogleModal}/>
            </div>
            <div className="overflow-y-auto no-scrollbar" style={{height: 300}}>
            <div className="flex w-full mb-4">
              {(product?.colors && product?.colors?.length) > 1 ?
                <>
                {
                  product?.colors?.map((currCol: any, key: number) => {
                    return <div  key={key} className={`h-6 cursor-pointer ${currCol?._id === currentColorId ? 'shadow': ''}`} 
                    onClick={() => setColor(currCol?._id)}
                    style={{
                      backgroundColor: currCol?.colorName,
                      border: currCol?._id === currentColorId ? '2px solid #FFF': 0,
                      opacity: currCol?._id === currentColorId ? 1: 0.5,
                      width: `calc(100% / ${product?.colors?.length})`}}></div>
                  })
                }
                </>: <></>
              }
            </div>
          {
            currentVariables.map((currVar: any, inde: number) => {
              return <div className="flex items-center justify-between option-choose-item mb-4" key={inde} >
              <div className="option-choose-item-details">
                {currVar?.label && <div className="label">{currVar?.label}</div>}
                <div className="flex items-center">
                  <div className="current-price">{product?.isPromoted && product?.promoType !=='bonus' ? product?.promoCost.toLocaleString() : product?.cost.toLocaleString()} Dhs</div>
                  {product?.isPromoted && product?.promoType !=='bonus' && <div className="old-price">{ product?.cost.toLocaleString()} Dhs</div>}
                </div>
                {currVar?.quantity <= 10 && <div className="flex items-center" style={{fontSize: 13}}>
                  <AlertCircle size={15} className={currVar?.quantity > 5 ? 'text-greyLightColor': 'text-redColor'} /> {currVar?.quantity > 5 ? <span className="text-greyLightColor ml-1">Quelques articles restants</span>: <span className="text-redColor ml-1">{currVar?.quantity} articles seulement</span>}
                </div>}
              </div>
              <div className="option-choose-buttons flex items-center">
                <button className="minu-button"
                disabled={currVar?.cartQuantity < 1 }
                style={{
                  opacity: currVar?.cartQuantity < 1 ? .5: 1
                }}
                onClick={() => {
                  decreaseQty(inde)
                }}
                > - </button>
                <div className={`quantity-value w-12 text-center`}>{(cartQuantityLoading && currentVar === inde) ? <Spinner color="warning" style={{width: 9.3, height: 9.3}} /> : currVar?.cartQuantity}</div>
                <button className="add-button"
                disabled={currVar?.cartQuantity === currVar?.quantity }
                style={{
                  opacity: currVar?.cartQuantity === currVar?.quantity ? .5: 1
                }}
                onClick={() => {
                  increaseQty(inde, currVar?.cartQuantity)
                }}
                > + </button>
              </div>
            </div>
            })
          }
            </div>
            
          </div>
          <div className="flex flex-col space-y-4 w-full absolute bottom-0 left-0 p-4 bg-white">
          <FullButton
          background="#E73A5D"
          outline
          label={<>POURSUIVRE VOS ACHATS</>}
          color="#E73A5D"
          size = {14}
          weight = {500}
          func={() => toogleModal()}
          radius = {8}
          />

          <FullButton
          disabled={thisProductInCartLength === 0}
          background="#E73A5D"
          label={<>PASSER LA COMMANDE</>}
          color="#FFFFFF"
          size = {14}
          weight = {500}
          func={() =>navigate('/cart')}
          radius = {8}
          />
          </div>

          {cartQuantityLoading && <div className="absolute w-full h-full z-50 bg-white opacity-[.5] bottom-0 left-0"></div>}
        </div>
      </ModalBody>
    </Modal>
  </div>;
}

export default MobileProductDetails;
