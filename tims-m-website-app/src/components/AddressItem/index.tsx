import { Check, Trash2 } from "react-feather";
import { getUserData } from "../../utils/Utils";
import { useAppDispatch } from "../../redux/hooks";
import { setAddress } from "../../redux/features/addressSlice";
import { useNavigate } from "react-router-dom";
function AddressItem({from, isPrincipal, deleteAddress, ...props}: any) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  return <><div className={`shipping-item ${props?.addressSelected?.country === props?.country ? 'shipping-item-active': ''}`}
  onClick={() => {
    props.setNewAddress(false)
    if(props.setAddressSelected && props.setAddressKey){
      props.setAddressSelected(props?.item)
      props.setAddressKey(props.index)
    }
    if(!from) {
      dispatch(setAddress(props))
      navigate('/cart')
    }
  }}
  >

    <div className="shipping-item-left-side">
      {(!from || (from && from === "cart") ) && <div className="round-cover"
      onClick={() =>  {
        dispatch(setAddress(props))
        navigate('/cart')
      }}
      >
        <div className="round"></div>
      </div>}

      <div className="shipping-item-header">
        <div className="shipping-item-header-title">{props?.country}</div>
        <div className="shipping-item-header-desc">{props?.city}, {props?.location}</div>
      </div>
    </div>

    <div className="shipping-item-price flex items-center">
      {isPrincipal && <div className="is-principal mr-2"><Check/></div>}
      <div className="free-shipping">{getUserData()?.numbers[props.index]}</div>
    </div>

    {from && from !=='cart' && !isPrincipal && <Trash2 size={15} color="#959EAD" onClick={() => deleteAddress(props.index)} />}

  </div>
  
  </>;
}

export default AddressItem;
