import React, { Fragment, useEffect, useState } from "react";

import {ReactComponent as HeartIcon} from '../../assets/icons/HeartIcon.svg'
import {ReactComponent as StarIcon} from '../../assets/icons/StarIcon.svg'
import {ReactComponent as EyeIcon} from '../../assets/icons/EyeIcon.svg'
import {ReactComponent as CartIconWhite} from '../../assets/icons/CartIconWhite.svg'
import {ReactComponent as CartIcon} from '../../assets/icons/CartIcon.svg'
import axios from 'axios'
import { base_url, file_url } from "../../utils/baseUrl"
import FullButton from "../Buttons/FullButton";
import { useNavigate } from "react-router-dom";
import { Heart } from "react-feather";
import { Slide, toast } from 'react-toastify'
import { config } from "../../utils/axiosconfig";
import { useAppDispatch } from "../../redux/hooks";
import { updateData } from "../../redux/features/authSlice";
import { getUserData, isUserLoggedIn } from "../../utils/Utils";
interface MainProductCardProps {
  _id: string
  title: string
  subcategoryId: any
  cost: number
  promoCost: number
  image: string
  from?: string
  colors: Array<any>
  isPromoted: boolean
  promoType: string
  totalrating: number
}
function MainProductCard({_id, title, subcategoryId, cost, image, totalrating, colors, from=undefined, isPromoted, promoCost, promoType}: MainProductCardProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [liked, setLiked] = useState<boolean>(false)
  const onSubmit = async () => {
    if(isUserLoggedIn()) {
    await axios.put(`${base_url}product/wishlist`, {prodId: _id}, config)
    .then((response): any => {
      dispatch(updateData({data: response.data}))
      setLiked(!liked)
    })

    .catch((error) => {
      let errMessage = "Une erreur s'est produite, merci de réessayer plustard.";
      console.log('Error', error)
      toast.error(
        errMessage,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
    })}
    else toast.error(
      'Veuillez vous connecter',
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
  }
  useEffect(() => {
    if(isUserLoggedIn()) {
      const isLiked: boolean =  getUserData()?.wishList?.filter((w: any) => w?._id === _id).length ?? false
      setLiked(isLiked)
    }
  }, [])
  return <div className="relative main-product-card">

    
    <div className="relative main-product-card-content" onClick={() => {navigate(`/details/${_id}`)}}>
      <div className="absolute top-4 right-4 z-50" onClick={() => onSubmit()}>
        {liked ? <HeartIcon/>: <Heart color="#e73a5d" size={17} />}
      </div>
      <div className="absolute top-0 left-0 product-image">
          <img src={`${file_url}/products/${colors[0]?.primaryImage}`} alt={title} height={150} width={150}/>
      </div>
      <div className="product-infos">
          <div className="product-infos-subcategory">
            {subcategoryId?.name}
          </div>
          <div className="product-infos-title tims-txt-3">
            {title}
          </div>
          <div className="flex justify-between">
            <div className="product-infos-price"> 
            {isPromoted && promoType !=='bonus' ? promoCost.toLocaleString() : cost.toLocaleString()} Dhs
            </div>
            <div className="flex space-x-1 product-infos-rate"> 
            {[0, 1, 2, 3, 4].slice(0, totalrating).map(() => {
              return<StarIcon/>
            })}
            </div>
          </div>
      </div>
    </div>

    {!from && <div className="product-hover-options">
      <FullButton
      background="#e73a5d"
      label={<><CartIconWhite className="mr-1" />Ajouter au panier</>}
      color="#FFFFFF"
      size = {16}
      weight = {500}
      func={() => {navigate(`/details/${_id}`)}}
      radius = {4}
      />

    </div>}

    {from && <div className="product-hover-overlay">
        <div className="tool eye-tool" onClick={() => {navigate(`/details/${_id}`)}}>
          <EyeIcon/>
        </div>
        <div className="tool cart-tool" onClick={() => {navigate(`/details/${_id}`)}}>
          <CartIcon/>
        </div>
    </div>}
  </div>;
}

export default MainProductCard;
