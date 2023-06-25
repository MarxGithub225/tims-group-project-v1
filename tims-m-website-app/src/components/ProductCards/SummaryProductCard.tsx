import React from "react";
import {ReactComponent as TrashIcon} from '../../assets/icons/TrashIcon.svg'
import { confirmAlert } from "react-confirm-alert";
import { updateCart } from "../../redux/features/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";

function SummaryProductCard({from, ...props}: any) {
  const navigate = useNavigate()
  let cart: any[] = useSelector((state: RootState) => state.cart.datas)
  let dispatch = useAppDispatch()
  const deleteFromCart = (product: any) => {
    confirmAlert({
      title: 'Confirmation',
      message: 'Êtes-vous sûre de vouloir supprimer ce produit du panier ?',
      buttons: [
      {
          label: 'Oui, supprimer',
          onClick: async () => {
            let this_Product: any = cart.filter((ct) => ct?._id === props?.product?._id)[0];
            await Promise.all(
              this_Product?.colors?.map(async (cc: any) => {
                let list: any[] = cc?.variables?.filter((cv: any) => Number(cv?.cartQuantity) !== 0)
                if(list.length) {
                  await Promise.all(
                    list?.map((l: any) => {
                      if(l?._id === props?._id) {
                        l.cartQuantity = 0
                      }
                    })
                  )
                  
                }
              })
            )
            dispatch(updateCart(this_Product))
          }
      },
      {
          label: 'Non, c\'est une erreur',
          onClick: () => console.log('ok') 
      }
      ]
  });
  }
  return <div className="summary-product">
  <div className="summary-product-header flex items-center">
    <div className="summary-product-image" style={{backgroundImage: `url('${props?.image}')`}}/>
   
     <div className="ml-3">
      <div className="summary-product-title tims-txt cursor-pointer"
      onClick={() => {
        navigate(`/details/${props?.product?._id}`)
      }}
      >{props?.product?.title}</div>
      <div className="flex items-center">
        <div className="summary-product-price">{props?.product?.isPromoted && props?.product?.promoType !=='bonus' ? props?.product?.promoCost.toLocaleString() : props?.product?.cost.toLocaleString()} Dhs</div>
        <div className="summary-product-separator"/>
        <div className="summary-product-category">{props?.cartQuantity} produits</div>
      </div>
    </div>
  </div>
 
  {!from && <div className="delete" onClick={deleteFromCart}>
    <TrashIcon className="trash-class"/>
  </div>}
</div>;
}

export default SummaryProductCard;
