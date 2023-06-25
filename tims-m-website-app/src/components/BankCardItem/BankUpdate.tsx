import React, { useMemo, useState } from "react";
import PhoneInput from 'react-phone-input-2'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { Check, CheckCircle, Edit } from "react-feather";
function BankUpdateItem({from, isPrincipal}: any) {
  const [editMode, setEditMode] = useState<boolean>(false)

  const [country, setValue] = useState({value: 'MA', label: 'Morocco'})
  const options: any[] = useMemo(() => countryList().getData(), [])

  const changeHandler = (value: any) => {
    setValue(value)
  }
  return <><div className="shipping-item">

    <div className="shipping-item-left-side">
      {!from && <div className="round-cover">
        <div className="round"></div>
      </div>}

      <div className="shipping-item-header">
        <div className="shipping-item-header-title">Alex Iwobi</div>
        <div className="shipping-item-header-desc">**** **** **** 4444</div>
      </div>
    </div>

    <div className="shipping-item-price flex items-center">
      {isPrincipal && <div className="is-principal mr-2"><Check/></div>}
      <div className="free-shipping">04 JAN 2024</div>
    </div>

    {from && <Edit size={15} color="#959EAD" onClick={() => setEditMode(!editMode)} />}
    
  </div>
  
  {editMode && <div className="p-2 border rounded">
                <div className="flex w-full items-center address-form flex-wrap">
                  <div className="w-full tablet:w-1/2 pr-2">
                    <div className="label">County</div>
                    <Select options={options} value={country} onChange={changeHandler} />
                  </div>
                
                <div className="w-full tablet:w-1/2 pl-2">
                  <div className="label">Phone number</div>
                  <PhoneInput
                  country={country.value.toLowerCase()}
                  enableLongNumbers
                  enableSearch
                  searchPlaceholder="Rechercher le pays"
                  autocompleteSearch
                  onChange={(value: any, country: any, e: any, formattedValue: any) => { console.log(value, formattedValue, country)}}
                />
              </div>
                </div>

                <div className="flex w-full items-center address-form flex-wrap mt-4">
                  <div className="w-full tablet:w-1/2 pr-2">
                    <div className="label">City</div>
                  <input type="text" placeholder="City" className="address-form-input"/>
                  </div>
                
                <div className="w-full tablet:w-1/2 pl-2">
                  <div className="label">Zip code</div>
                  <input type="text" placeholder="Zip code" className="address-form-input"/>
                  </div>
                </div>

                <div className="flex w-full items-center address-form flex-wrap mt-4">
                  <div className="w-full">
                    <div className="label">Address details</div>
                  <input type="text" placeholder="Address details" className="address-form-input"/>
                  </div>
                
                </div>

                <div className="saving-address">
                  <input type="checkbox" name="" id="" />
                  <div className="label">Is principal</div>
                </div>

                <div className="inline-flex mt-4">
                <div className="edit-info-button"
                onClick={() => setEditMode(false)}
                >
                    <CheckCircle size={15} className="mr-1"/>Enregistrer
                </div>
                </div>
              </div>}
  </>;
}

export default BankUpdateItem;
