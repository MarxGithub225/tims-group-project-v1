import React, { Fragment, useEffect, useState } from "react";
import {ReactComponent as TrashIcon} from '../../assets/icons/TrashIcon.svg'

import {ReactComponent as EditIcon} from '../../assets/icons/EditIcon.svg'
import { AlertCircle } from "react-feather";
import { useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import { setCart, updateCart } from "../../redux/features/cartSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useSelector } from "react-redux/es/exports";
import { RootState } from "../../redux/store";
import { Spinner } from "reactstrap";
import { confirmAlert } from "react-confirm-alert";
function CartItemCard(props: any) {
  let cart: any[] = useSelector((state: RootState) => state.cart.datas)
  const navigate = useNavigate()
  let [cartQuantityLoading, setCartQuantityLoading] = useState<boolean>(false)
  let [currentProduct, setCurrenProduct] = useState<any>(null)
  let [currentStateQty, setCurrenQty] = useState<any>(null)
  let [carPoduct, setCarProduct] = useState<any>(null)
  let dispatch = useAppDispatch()
  
  useEffect(() => {
    setCurrenProduct(props)
    let this_Product: any = cart.find((ct) => ct?._id === props?.product?._id);
    setCarProduct(this_Product)
    setCurrenQty(props?.cartQuantity)
  }, [props])

  const increaseQty = async (qty: number) => {
    setCartQuantityLoading(true)
    let AllProductData: any[] = [];
    await Promise.all(
      carPoduct?.colors?.map(async (dataCol: any) => {
        if(dataCol?._id === currentProduct?.color?._id) {
          let list = [...dataCol?.variables];
          let varIndex = list.findIndex((l: any) => l?._id === currentProduct?._id)
          let currentVar = list.find((l: any) => l?._id === currentProduct?._id);

          let currentQty = currentVar?.cartQuantity;
          let thisDATA = {
            ...currentVar,
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
        setCarProduct({...carPoduct, colors: AllProductData})
        dispatch(setCart({product: {...carPoduct, colors: AllProductData, allQuantity: 1}, type: 'add'}))
        setCartQuantityLoading(false)
        setCurrenQty(currentStateQty + 1)
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

  const decreaseQty = async () => {
    setCartQuantityLoading(true)
    let AllProductData: any[] = [];
    await Promise.all(
      carPoduct?.colors?.map(async (dataCol: any) => {
        if(dataCol?._id === currentProduct?.color?._id) {
          let list = [...dataCol?.variables];
          let varIndex = list.findIndex((l: any) => l?._id === currentProduct?._id)
          let currentVar = list.find((l: any) => l?._id === currentProduct?._id);

          let currentQty = currentVar?.cartQuantity;
          let thisDATA = {
            ...currentVar,
            cartQuantity: currentQty-1
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
      setCarProduct({...carPoduct, colors: AllProductData})
      dispatch(setCart({product: {...carPoduct, colors: AllProductData}, type: 'minus'}))
      setCartQuantityLoading(false)
      setCurrenQty(currentStateQty - 1)
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
  
  const deleteFromCart = () => {
    confirmAlert({
      title: 'Confirmation',
      message: 'Êtes-vous sûre de vouloir supprimer ce produit du panier ?',
      buttons: [
      {
          label: 'Oui, supprimer',
          onClick: async () => {
            let AllProductData: any[] = [];
            await Promise.all(
              carPoduct?.colors?.map(async (dataCol: any) => {
                if(dataCol?._id === currentProduct?.color?._id) {
                  let list = [...dataCol?.variables];
                  let varIndex = list.findIndex((l: any) => l?._id === currentProduct?._id)
                  let currentVar = list.find((l: any) => l?._id === currentProduct?._id);

                  let thisDATA = {
                    ...currentVar,
                    cartQuantity: 0
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
              setCarProduct({...carPoduct, colors: AllProductData})
              dispatch(setCart({product: {...carPoduct, colors: AllProductData}, type: 'minus'}))
              setCartQuantityLoading(false)
              setCurrenQty(currentStateQty - 1)
              toast.info(
                <Fragment>
                  <div className='toastify-header'>
                    <div className='title-wrapper'>
                      <h6 className='toast-title font-weight-bold'>Produit supprimé du panier</h6>
                    </div>
                  </div>
                </Fragment>,
                { transition: Slide, hideProgressBar: true, autoClose: 2000 }
              )
            }, 500);
          }
      },
      {
          label: 'Non, c\'est une erreur',
          onClick: () => console.log('ok') 
      }
      ]
  });
  }
  return <div className="cart-item-product">
    <div className="cart-item-product-header flex items-center">
      <div className="cart-item-product-image rounded cursor-pointer" onClick={() => {
          navigate(`/details/${currentProduct?.product?._id}`)
        }} style={{backgroundImage: `url('${currentProduct?.image}')`}}/>
     
       <div className="">
        <div className="cart-item-product-title tims-txt cursor-pointer"
        onClick={() => {
          navigate(`/details/${currentProduct?.product?._id}`)
        }}
        >{currentProduct?.product?.title}</div>
        <div className="cart-item-product-category cursor-pointer" onClick={() => {
          navigate(`/details/${currentProduct?.product?._id}`)
        }}>SKU: {currentProduct?.sku} {currentProduct?.label ? `| Taille: ${currentProduct?.label}`: ''}  </div>
        {currentProduct?.quantity <= 10 && <div className="flex items-center" style={{fontSize: 13}}>
          <AlertCircle size={15} className={currentProduct?.quantity > 5 ? 'text-yellowLightColor': 'text-redColor'} /> {currentProduct?.quantity > 5 ? <span className="text-yellowLightColor ml-1">Quelques articles restants</span>: <span className="text-redColor ml-1">{currentProduct?.quantity} articles seulement</span>}
        </div>}
      </div>
    </div>
   
   {!currentProduct?.from && <div className="cart-item-product-options flex items-center">
      <div className="cart-item-product-price">{(Number(currentStateQty) * (currentProduct?.product?.isPromoted && currentProduct?.product?.promoType !=='bonus' ? Number(currentProduct?.product?.promoCost) : Number(currentProduct?.product?.cost))).toLocaleString()} Dhs</div>
      <div className="count-input flex item-center">
        <div className="button minus-button"
        onClick={() => {
          decreaseQty()
        }}
        style={{
          pointerEvents : (cartQuantityLoading || currentStateQty === 1)? 'none': 'initial',
          opacity : (cartQuantityLoading || currentStateQty === 1)? .5: 1
        }}
        > - </div>
        <div className="value"> 
        
        <div className={`quantity-value w-12 text-center`}>{cartQuantityLoading ? <Spinner color="warning" style={{width: 9.3, height: 9.3}} /> : currentStateQty}</div>
        </div>
        <div className="button plus-button"
        style={{
          pointerEvents : (cartQuantityLoading || currentStateQty === currentProduct?.quantity)? 'none': 'initial',
          opacity : (cartQuantityLoading || currentStateQty === currentProduct?.quantity)? .5: 1
        }}
        onClick={() => {
          increaseQty(currentStateQty)
        }}
        > + </div>
      </div>

      <div className="delete"
      onClick={deleteFromCart}
      >
      <TrashIcon className="trash-class"/>
      </div>
    </div>}

    {currentProduct?.from && <div className="cart-item-product-options flex items-center">

      <div className="count-input-resume flex item-center">
      {currentStateQty} x {currentProduct?.product?.isPromoted && currentProduct?.product?.promoType !=='bonus' ? currentProduct?.product?.promoCost.toLocaleString() : currentProduct?.product?.cost.toLocaleString()} Dhs
      </div>
      <div className="cart-item-product-price">{(Number(currentStateQty) * (currentProduct?.product?.isPromoted && currentProduct?.product?.promoType !=='bonus' ? Number(currentProduct?.product?.promoCost) : Number(currentProduct?.product?.cost))).toString()} Dhs</div>
      <div className="delete"
      onClick={() => {
        navigate(`/details/${currentProduct?.product?._id}`)
      }}
      >
      <EditIcon className="trash-class"/>
      </div>
    </div>}
  </div>;
}

export default CartItemCard;
