import React, { Fragment, useEffect, useState } from "react";
import { AlertCircle, Trash2 } from "react-feather";
import { useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import { setCart } from "../../redux/features/cartSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useSelector } from "react-redux/es/exports";
import { RootState } from "../../redux/store";
import { Spinner } from "reactstrap";
import { confirmAlert } from "react-confirm-alert";
function MobileCardItem(props: any) {
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
              window.location.reload()
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
  return <div className="cart-product-item space-x-2 flex shadow bg-white justify-between rounded mb-4">
  <div className="image-side w-1/4 rounded">
      <img src = {`${currentProduct?.image}`} alt="" />
  </div>

  <div className="product-infos-side" style={{width: 'calc(100% - 100px)'}}>
      <div className="product-title tims-txt"
      onClick={() => {
          navigate(`/details/${currentProduct?.product?._id}`)
        }}
      >
      {currentProduct?.product?.title}
      </div>
      <div className="product-price">
      {(Number(currentStateQty) * (currentProduct?.product?.isPromoted && currentProduct?.product?.promoType !=='bonus' ? Number(currentProduct?.product?.promoCost) : Number(currentProduct?.product?.cost))).toLocaleString()} Dhs
      </div>
      <div className="cart-product-item-category">SKU: {currentProduct?.sku} {currentProduct?.label ? `| Taille: ${currentProduct?.label}`: ''}  </div>
      {currentProduct?.quantity <= 10 && <div className="flex items-center" style={{fontSize: 13}}>
        <AlertCircle size={15} className={currentProduct?.quantity > 5 ? 'text-yellowLightColor': 'text-redColor'} /> {currentProduct?.quantity > 5 ? <span className="text-yellowLightColor ml-1">Quelques articles restants</span>: <span className="text-redColor ml-1">{currentProduct?.quantity} articles seulement</span>}
      </div>}
      <div className="flex items-center justify-between mt-2">
          <div className="count flex items-center">
              <div className="flex items-center justify-center" style={{
                pointerEvents : (cartQuantityLoading || currentStateQty === 1)? 'none': 'initial',
                opacity : (cartQuantityLoading || currentStateQty === 1)? .5: 1,
                transform: 'rotate(-180deg)'}} 
              onClick={() => {
                  decreaseQty()
                }}
              > - </div>
                  <div className="value-count mx-3"> {cartQuantityLoading ? <Spinner color="warning" style={{width: 9.3, height: 9.3}} /> : currentStateQty} </div>
              <div className="flex items-center justify-center"  
              style={{
                pointerEvents : (cartQuantityLoading || currentStateQty === currentProduct?.quantity)? 'none': 'initial',
                opacity : (cartQuantityLoading || currentStateQty === currentProduct?.quantity)? .5: 1
              }}
              onClick={() => increaseQty(currentStateQty)}
              > + </div>
          </div>

          <div className="delete flex items-center justify-center"
          onClick={() => deleteFromCart()}
          >
              <Trash2 size={15} color="#8F959E" />
          </div>
      </div>
  </div>
</div>;
}

export default MobileCardItem;
