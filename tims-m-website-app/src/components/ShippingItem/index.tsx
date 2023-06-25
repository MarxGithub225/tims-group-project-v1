import React from "react";
import dhl from '../../assets/images/brands/dhl.png'
import {ReactComponent as MoneyIcon} from '../../assets/icons/MoneyIcon.svg'
function ShippingItem() {
  return <div className="shipping-item">

    <div className="shipping-item-left-side">
      <div className="round-cover">
        <div className="round"></div>
      </div>

      <div className="shipping-item-header">
        <div className="shipping-item-header-title">DHL Express</div>
        <div className="shipping-item-header-desc">Estimated delivery time: Jul 20 - Aug 03</div>
      </div>
    </div>

    <div className="shipping-item-price flex items-center">
      <MoneyIcon className="money-class mr-2"/>
      <div className="free-shipping">Free Shipping</div>
      {/* <div className="shipping-item-cost flex items-center">
        <div className="shipping-item-current-price mr-2">$25.00</div>
        <div className="shipping-item-old-price">$45.00</div>
      </div> */}
    </div>
    
    <div className="shipping-item-logo">
      <img src={dhl} alt="" />
    </div>
  
  </div>;
}

export default ShippingItem;
