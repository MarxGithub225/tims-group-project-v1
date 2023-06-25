import React from "react";
import {ReactComponent as StarIcon} from '../../assets/icons/StarIcon.svg'
import { base_url, file_url } from "../../utils/baseUrl"
interface SmallProductCardProp {
  _id: string
  title: string
  subcategoryId: any
  cost: number
  promoCost: number
  image: string
  from?: string
  colors: Array<any>
  isPromoted: boolean
}
function SmallProductCard({_id, title, subcategoryId, cost, image, colors, from=undefined, isPromoted, promoCost}: SmallProductCardProp) {
  return <div className="flex small-product-card">
    <div className="small-product-image  mr-4">
    <img src={`${file_url}/products/${colors[0]?.images[0]}`} alt={title} />
    </div>

    <div className="small-product-infos">
      <div className="small-product-title tims-txt">
      {title}
      </div>

      <div className="flex space-x-2 ">
          <div className="product-infos-price"> 
          {isPromoted ? promoCost.toLocaleString() : cost.toLocaleString()} Dhs
          </div>
          <div className="flex items-center space-x-1 product-infos-rate"> 
          5 <StarIcon/>
          </div>
        </div>
    </div>
  </div>;
}

export default SmallProductCard;
