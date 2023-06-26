import React from "react";
function BankCradItem({title, desc, image, ...props}: any) {
  return <div className={`bank-card-item ${props?.paymentSelected === props?.value ? 'bank-card-item-active': ''}`}
  onClick={() => {
    if(props.setSelectPayment) {
      props.setSelectPayment(props?.value)
    }
  }}
  >
    <div className="round-cover">
      <div className="round"></div>
    </div>
    <div className="bank-card-item-header flex items-center">
      <div className="bank-card-item-header-title mr-4">{title}</div>
      <img src={image} alt="" />
    </div>

    <p className="mt-3">{desc}</p>
  
  </div>;
}

export default BankCradItem;
