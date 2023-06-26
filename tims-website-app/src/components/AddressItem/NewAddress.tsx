import React from "react";
function NewAddress({setNewAddress, newAddress, ...props}: any) {
  return <div className={`shipping-item ${newAddress ? 'shipping-item-active': ''}`}
  onClick={() => {
    setNewAddress(true)
    if(props.setAddressSelected)
    props.setAddressSelected(null)
  }}
  >
    <div className="shipping-item-left-side">
      <div className="round-cover">
        <div className="round"></div>
      </div>

      <div className="shipping-item-header">
        <div className="shipping-item-header-desc">Nouvelle adresse</div>
      </div>
    </div>
  </div>;
}

export default NewAddress;
