import React, { useEffect, useState } from "react";

import {ReactComponent as HeartIcon} from '../../assets/icons/HeartIcon.svg'
import {ReactComponent as StarIcon} from '../../assets/icons/StarIcon.svg'
import {ReactComponent as EyeIcon} from '../../assets/icons/EyeIcon.svg'
import {ReactComponent as CartIcon} from '../../assets/icons/CartIconWhite.svg'
import FullButton from "../Buttons/FullButton";
import axios from 'axios'
import { base_url, file_url } from "../../utils/baseUrl"
import { useNavigate } from "react-router-dom";
import { Heart } from "react-feather";
import { Slide, toast } from 'react-toastify'
import { config } from "../../utils/axiosconfig";
import { isUserLoggedIn, getUserData } from "../../utils/Utils";
import { useAppDispatch } from "../../redux/hooks";
import { updateData } from "../../redux/features/authSlice";

interface MobileProductCardProps {
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
  setReload?: Function
  relaod?: boolean
}

function MobileProductCard({_id, title, subcategoryId, cost, setReload, relaod, colors, from=undefined, isPromoted, promoCost, promoType, totalrating}: MobileProductCardProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [liked, setLiked] = useState<boolean>(false)
  const onSubmit = async () => {
    if(isUserLoggedIn()) {
    await axios.put(`${base_url}product/wishlist`, {prodId: _id}, config)
    .then((response): any => {
      dispatch(updateData({data: response.data}))
      setLiked(!liked)
      if(setReload) {
        setReload(!relaod)
      }
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
  return <div className="relative w-full mobile-product-item px-2 mb-4 bg-white rounded-t-lg"
  onClick={() => navigate(`/details/${_id}`)}
  >
     <div className="absolute top-4 right-4 z-50"
     onClick={(e: any) => {
      e.stopPropagation()
      onSubmit()
    }}
     >
     {liked ? <HeartIcon/>: <Heart color="#e73a5d" size={17} />}
    </div>
    <div className="absolute rounded-t-lg top-0 left-0 product-image bg-cover bg-center bg-no-repeat w-full" style={{backgroundImage: `url(${file_url}/products/${colors[0]?.primaryImage})`}}></div>

    <div className="title tims-txt-2">
      {title}
    </div>

    <div className="price mb-2">
      {isPromoted && promoType !=='bonus' ? promoCost.toLocaleString() : cost.toLocaleString()} Dhs
    </div>
  </div>;
}

export default MobileProductCard;
