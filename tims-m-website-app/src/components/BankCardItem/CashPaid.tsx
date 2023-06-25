import React from "react";
import DevileryPaid from '../../assets/icons/DeliveryPaid.png'
function CashPaid(props: any) {
  return  <div className={`cash-paid ${props?.paymentSelected === props?.value ? 'cash-paid-active': ''}`}
  onClick={() => {
    if(props.setSelectPayment) {
      props.setSelectPayment(props?.value)
    }
  }}
  style={{ padding: 10}}>
     
    <div className="relative " style = {{
        border : '2px solid #E7E8EA',
        width : "100%",
        height: 146,
        borderRadius : 10,
        padding: 15,
    }}>
    <div className="round-cover abosulte top-3">
    <div className="round"></div>
    </div>
    <div className="w-full flex flex-col justify-center items-center"
    style={{
        height: 80,
    }}
    >
        <img
        src={DevileryPaid}
        style = {{
        width : 100,
        height : "auto",
        }}
        alt=""
        />
        <span >Payement à la livraison</span>
    </div>
    
  </div>
  </div>
  
}

export default CashPaid;
