import React, { useEffect, useState } from "react";
import FullButton from "../Buttons/FullButton";
import {ReactComponent as CartIcon} from '../../assets/icons/CartIconWhite.svg'
import {ReactComponent as HeartIcon} from '../../assets/icons/HeartIcon.svg'
import OnlineLoader from "../Loaders/OnlineLoader";
import { Heart } from "react-feather";
import axios from 'axios'
import { base_url } from "../../utils/baseUrl"
import { Slide, toast } from 'react-toastify'
import { config } from "../../utils/axiosconfig";
import { isUserLoggedIn, getUserData } from "../../utils/Utils";
import { useAppDispatch } from "../../redux/hooks";
import { updateData } from "../../redux/features/authSlice";
import { Spinner } from "reactstrap";

function PriceSide({loading, cost, promoCost, isPromoted, promoType, _id,
  openOptions,
  setOpenOption,
  thisProductInCartLength
}: any) {
  const dispatch = useAppDispatch()
  const [liked, setLiked] = useState<boolean>(false)
  const [likeLoading, setLikeLoading] = useState<boolean>(false)
  const onSubmit = async () => {
    if(isUserLoggedIn()) {
      setLikeLoading(true)
    await axios.put(`${base_url}product/wishlist`, {prodId: _id}, config)
    .then((response): any => {
      dispatch(updateData({data: response.data}))
      setLiked(!liked)
      setLikeLoading(false)
    })

    .catch((error) => {
      let errMessage = "Une erreur s'est produite, merci de réessayer plustard.";
      setLikeLoading(false)
      toast.error(
        errMessage,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
    })}else toast.error(
      'Veuillez vous connecter',
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
  }
  useEffect(() => {
    if(isUserLoggedIn()) {
      const isLiked: boolean =  getUserData()?.wishList?.filter((w: any) => w?._id === _id).length ?? false
      setLiked(isLiked)
    }
  }, [_id])
  return <div className="product-details-price-side flex justify-between items-center">
    <div className="price">
    {loading? <OnlineLoader width="150px" height="32px" /> : <>{isPromoted && promoType !=='bonus' ? promoCost.toLocaleString() : cost.toLocaleString()} Dhs</>}
    </div>
    <div className="flex items-center buttons space-x-3">

      {loading? <OnlineLoader width="128px" height="48px" /> :
      <>
      
      {thisProductInCartLength >  0 ? <div className="option-choose-buttons flex items-center">
      <FullButton
      background="#e73a5d"
      label={<> - </>}
      color="#FFFFFF"
      size = {16}
      weight = {500}
      func={() => setOpenOption(!openOptions)}
      radius = {4}
      />
        <div className={`quantity-value w-12 text-center`}>{thisProductInCartLength}</div>
        <FullButton
        background="#e73a5d"
        label={<> + </>}
        color="#FFFFFF"
        size = {16}
        weight = {500}
        func={() => setOpenOption(!openOptions)}
        radius = {4}
        />
      </div>: 
      <FullButton
      background="#e73a5d"
      label={<><CartIcon className="mr-1" /> ACHETER</>}
      color="#FFFFFF"
      size = {16}
      weight = {500}
      func={() => setOpenOption(!openOptions)}
      radius = {4}
      />}</>
      }

      {loading? <OnlineLoader width="50px" height="48px" /> :<div className="heart cursor-pointer"
      onClick={(e: any) => {
        e.stopPropagation()
        onSubmit()
      }}
      >
      {liked ? <HeartIcon/>: <>{likeLoading ? <Spinner style={{width: 17, height: 17}} /> : <Heart color="#e73a5d" size={17} />}</>}
      </div>}
                        
    </div>
  </div>;
}

export default PriceSide;
