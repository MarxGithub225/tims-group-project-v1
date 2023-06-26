import React from "react";
import {ReactComponent as TrashIcon} from '../../assets/icons/TrashIcon.svg'
import { useNavigate } from "react-router-dom";

function SummaryProductCardTracking({from, ...props}: any) {
  const navigate = useNavigate()
  
  return <div className="summary-product">
  <div className="summary-product-header flex items-center">
    <div className="summary-product-image" style={{backgroundImage: `url('${props?.image}')`}}/>
   
    <div className="ml-3">
      <div className="summary-product-title tims-txt cursor-pointer"
      onClick={() => {
        navigate(`/details/${props?.productId}`)
      }}
      >{props?.productTitle}</div>
      <div className="flex items-center">
        <div className="summary-product-price">{props?.cost.toLocaleString()} Dhs</div>
        <div className="summary-product-separator"/>
        <div className="summary-product-category">{props?.quantity} produits</div>
      </div>
    </div>
  </div>
 
  
</div>;
}

export default SummaryProductCardTracking;
