import { useMemo, useState } from "react";
import countryList from 'react-select-country-list'
import { CheckCircle } from "react-feather";
import { useNavigate } from "react-router-dom";
import BankUpdateItem from "../../../components/BankCardItem/BankUpdate";
function BankCards({from}: any) {
  const navigate = useNavigate()
  const [newAddress, setNewAddress] = useState<boolean>(false)
  
  return <div className={`${ window.innerWidth <= 768 ? 'p-4': ''}`}>

  <div className="page-header flex justify-between items-center">Mes cartes 
    <div className="edit-info-button"
      onClick={() => setNewAddress(true)}
      >
          <CheckCircle size={15} className="mr-1"/>Nouvelle carte
      </div>
    </div>

    {newAddress && <div className="p-2 border rounded mb-4">

    <div className="flex w-full items-center address-form flex-wrap mt-4">
      <div className="w-full tablet:w-1/2 tablet:pr-2">
      <div className="label">Card name</div>
      <input type="text" placeholder="Eg. Alex Iwobi" className="address-form-input"/>
      </div>
    
    <div className="w-full tablet:w-1/2 tablet:pl-2 mt-4 tablet:mt-0">
    <div className="label">Card number</div>
    <input type="text" placeholder="1234 1234 1234 1234" className="address-form-input"/>
      </div>
    </div>

    <div className="flex w-full items-center address-form flex-wrap mt-4">
      <div className="w-full tablet:w-1/3 tablet:pr-2">
        <div className="label">Year</div>
        <select name="" id="" className="address-form-input">
          <option value="">Jan</option>
          <option value="">Fev</option>
          <option value="">Mar</option>
        </select>
      </div>
    
      <div className="w-1/2 tablet:w-1/3 pr-2 pl-0 tablet:pr-0 tablet:pl-2">
        <div className="label">Year</div>
        <input type="text" placeholder="2025" className="address-form-input"/>
      </div>

      <div className="w-1/2 tablet:w-1/3 pl-2">
        <div className="label">CVV</div>
        <input type="text" placeholder="000/0000" className="address-form-input"/>
      </div>
    </div>

    <div className="saving-address">
                  <input type="checkbox" name="" id="" />
                  <div className="label">Is principal</div>
                </div>

                <div className="inline-flex mt-4">
                <div className="edit-info-button"
                onClick={() => setNewAddress(false)}
                >
                    <CheckCircle size={15} className="mr-1"/>Enregistrer
                </div>
                </div>
  </div>}
  <BankUpdateItem from={`${ window.innerWidth <= 768 ? (from ? from : ''): 'address-list'}`} isPrincipal/>
  <BankUpdateItem from={`${ window.innerWidth <= 768 ? (from ? from : ''): 'address-list'}`} />
  <BankUpdateItem from={`${ window.innerWidth <= 768 ? (from ? from : ''): 'address-list'}`} />
  <BankUpdateItem from={`${ window.innerWidth <= 768 ? (from ? from : ''): 'address-list'}`} />
  <BankUpdateItem from={`${ window.innerWidth <= 768 ? (from ? from : ''): 'address-list'}`} />

  {window.innerWidth <= 768 && <div className="w-full flex justify-center"
  onClick={() => navigate(-1)}
  >
        <div className="w-full px-3 py-2 rounded-full text-lg text-center"
        style={{
            background: "#E73A5D",
            color: "#FFF"
        }}
        >Enregistrer</div>
    </div>}
</div>;
}

export default BankCards;
