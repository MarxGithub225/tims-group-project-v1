import React, { Fragment, useEffect, useRef, useState } from "react";
import ImageSide from "../../components/Details/ImageSide";
import OptionsSide from "../../components/Details/OptionsSide";
import PriceSide from "../../components/Details/PriceSide";
import RatingSide from "../../components/Details/RatingSide";
import SmallDescription from "../../components/Details/SmallDescription";
import TitleSide from "../../components/Details/TitleSide";
import {ReactComponent as FileIcon} from '../../assets/icons/FileIcon.svg';
import {ReactComponent as ShareIcon} from '../../assets/icons/ShareIcon.svg';
import FullDescription from "../../components/Details/FullDescription";
import ReviewComponent from "../../components/Details/ReviewsSide";
import RelatedProducts from "../../components/Details/RelatedProducts";

import axios from 'axios'
import { base_url, file_url } from "../../utils/baseUrl"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import OnlineLoader from "../../components/Loaders/OnlineLoader";
import { Modal, ModalBody, Spinner } from "reactstrap";
import DetailsTitle from "../../components/Details/DetailsTitle";
import { AlertCircle, X } from "react-feather";
import FullButton from "../../components/Buttons/FullButton";
import { getCart, setCart } from "../../redux/features/cartSlice";
import { useAppDispatch } from "../../redux/hooks";
import { Slide, toast } from 'react-toastify'
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { kFormatter } from "../../utils/Utils";
function Details() {
  let cart: any[] = useSelector((state: RootState) => state.cart.datas)

  let dispatch = useAppDispatch()
  let [openOptions, setOpenOption] = useState<boolean>(false)
  let search = useLocation().search;
  let navigate = useNavigate()
  let descriptionRef: any = useRef(null);
  let reviewRef: any = useRef(null);
  let relatedRef: any = useRef(null);
  let {productId} = useParams()

  let [product, setProduct] = useState<any>(null)

  let [loading, setLoading] = useState<boolean>(true)
  let [cartQuantityLoading, setCartQuantityLoading] = useState<boolean>(false)
  let [currentVar, setCurrentVar] = useState<number>(-1)
  let [currentColorId, setColor] = useState(null)
  let [currentVariables, setVariables] = useState<Array<any>>([])
  let [currentColor, setCurrentColor] = useState<any>(null)

  let [thisProductInCartLength, setProductInCart] = useState(0)
  useEffect(() => {
    
    ;(async () => {

      if(productId) {
        try {
          const [this_product, updateView] = await Promise.all(
            [
              await axios.get(`${base_url}product/id/${productId}`),
              await axios.put(`${base_url}product/update-view/${productId}`)
            ]
          )

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
              setProductInCart(defineProduct?.allQuantity)
            }else {
              setProduct(this_product.data)
              setColor(this_product.data?.colors.filter((col: any) => col.isActivated)[0]?._id)
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
  return <div className="details-page">
    <div className="w-max-width w-full">
      <div className="top-side flex justify-between">
        <ImageSide loading = {loading} colors={product?.colors} currentColorId={currentColorId}/>
        <div className="infos-description-side">
          <TitleSide loading = {loading} title={product?.title} />
          <RatingSide loading = {loading} viewsCount={product?.viewsCount} purchaseCount={product?.purchaseCount} totalrating={product?.totalrating}/>
          <SmallDescription loading = {loading} smallDescription={product?.smallDescription}/>
          <OptionsSide loading = {loading} colors={product?.colors} setColor={setColor} currentColorId={currentColorId}
          openOptions={openOptions}
          setOpenOption={(state: boolean) => setOpenOption(state)}
          />
          <PriceSide loading = {loading} 
          thisProductInCartLength = {thisProductInCartLength}
          cost={product?.cost}
          promoCost={product?.promoCost}
          isPromoted={product?.isPromoted}
          promoType={product?.promoType}
          _id={product?._id}
          openOptions={openOptions}
          setOpenOption={(state: boolean) => setOpenOption(state)}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="tab-side flex items-center space-x-10">
          <div className={`tab-item`} 
          onClick={() => {
            if (descriptionRef) {
                setTimeout(() => {
                    descriptionRef?.current?.scrollIntoView({ behavior: "smooth" })
                }, 500);
            }
          }}
          >{loading? <OnlineLoader width="80px" height="12px" /> : 'Description'}</div>
          <div className={`tab-item`} 
          onClick={() => {
            if (reviewRef) {
                setTimeout(() => {
                  reviewRef?.current?.scrollIntoView({ behavior: "smooth" })
                }, 500);
            }
          }}
          >{loading? <OnlineLoader width="80px" height="12px" /> : `Avis (${kFormatter(product?.ratings?.length)})`}</div>
          <div className={`tab-item`} 
          onClick={() => {
            if (relatedRef) {
                setTimeout(() => {
                    relatedRef?.current?.scrollIntoView({ behavior: "smooth" })
                }, 500);
            }
          }}
          >{loading? <OnlineLoader width="100px" height="12px" /> : 'Produits similaires'}</div>
        </div>

        <div className="options-side flex items-center space-x-10">
          <div className="options-item flex items-center space-x-1">
            {loading? <OnlineLoader width="18px" height="18px" /> : <FileIcon/>}
            <span>{loading? <OnlineLoader width="100px" height="12px" /> : 'Signaler'}</span>
          </div>
          <div className="options-item flex items-center space-x-1">
            
            {loading? <OnlineLoader width="18px" height="18px" /> : <ShareIcon/>}
            <span>{loading? <OnlineLoader width="50px" height="12px" /> : 'Partaget'}</span>
          </div>
        </div>
      </div>

      <div className="tab-content">
        <div className="tab-description" ref = {descriptionRef}>
          <FullDescription loading={loading} description={product?.description}/>
        </div>

        <div className="tab-review" ref = {reviewRef}>
          <ReviewComponent product={product} setProduct={(data: any) => setProduct(data)} loading={loading}/>
        </div>

        <div className="tab-review" ref = {relatedRef}>
          <RelatedProducts categoryId={product?.categoryId?._id} productId={productId} loading={loading}/>
        </div>
      </div>
    </div>

    <Modal
    
      isOpen={openOptions} toggle={toogleModal} >

      <ModalBody className="w-full h-full flex items-center justify-center">
        <div className="min-w-96 w-full bg-white h-auto rounded p-4 relative overflow-y-auto">
          <div className="mb-20">
          <div className="flex item-center justify-between mb-6">
            <DetailsTitle title="Veuillez sélectionner une option" />
            <X className="cursor-pointer" onClick={toogleModal}/>
          </div>

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
          <div className="flex space-x-4 justify-between w-full absolute bottom-0 left-0 p-4">
          <FullButton
          background="#E73A5D"
          outline
          label={<>POURSUIVRE VOS ACHATS</>}
          color="#E73A5D"
          size = {14}
          weight = {500}
          func={(e: any) => toogleModal()}
          radius = {8}
          />

          <FullButton
          disabled={thisProductInCartLength === 0}
          background="#E73A5D"
          label={<>PASSER LA COMMANDE</>}
          color="#FFFFFF"
          size = {14}
          weight = {500}
          func={(e: any) =>navigate('/cart')}
          radius = {8}
          />
          </div>

          {cartQuantityLoading && <div className="absolute w-full h-full z-50 bg-white opacity-[.5] bottom-0 left-0"></div>}
        </div>
      </ModalBody>
    </Modal>
  </div>;
}

export default Details;
