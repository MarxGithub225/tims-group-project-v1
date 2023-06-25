import { Fragment, useEffect, useState } from "react";
import FullButton from "../../../components/Buttons/FullButton";
import DetailsTitle from "../../../components/Details/DetailsTitle";
import {ReactComponent as CarIcon} from '../../../assets/icons/CarIcon.svg'
import {ReactComponent as ArrowHorizontalIcon} from '../../../assets/icons/ArrowHorizontalIcon.svg'
import PhoneInput from 'react-phone-input-2'
import AddressItem from "../../../components/AddressItem";
import NewAddress from "../../../components/AddressItem/NewAddress";
import SummaryProductCard from "../../../components/ProductCards/SummaryProductCard";
import { getUserData } from "../../../utils/Utils";
import countries from '../../../utils/countries.json'

import { Slide, toast } from 'react-toastify'
import axios from 'axios'
import { base_url } from "../../../utils/baseUrl";
import { useAppDispatch } from "../../../redux/hooks";
import { updateUser } from "../../../redux/features/authSlice";
import { config } from "../../../utils/axiosconfig";

function Step2({setActive = () => {}, cartItems, addressSelected, setAddressSelected, setAddressKey}: any) {
  const total = () =>
  {
    let total = 0;
    for (let c of cartItems) {
     total += (c?.product?.isPromoted && c?.product?.promoType !=='bonus') ? Number(c?.product?.promoCost) * Number (c.cartQuantity) : Number(c?.product?.cost) * Number (c.cartQuantity)
    }

    return total;
  }
  
  const [userAddresses, setAddresses] = useState<any>([])
  const [countryCities, setSities] = useState<any>([])
  const [newAddress, setNewAddress] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [country, setValue] = useState({value: 'MA', label: 'Morocco'})
  const [number, setNumber] = useState<string>('')
  const dispatch = useAppDispatch()
  const [address, setAddress] = useState<any>({
      isPrincipal: false,
      country: 'Morocco',
      city: '',
      location: ''
  })

  useEffect(() => {
    setSities(countries?.filter((count: any) => count.name === "Morocco")[0].cities);
    setAddresses(getUserData()?.addresses)
  }, [])

  const updateAdresses = async () => {
    setLoading(true)
    let fullData = {
      ...getUserData(),
      numbers: [...getUserData()?.numbers, number],
      addresses: [...getUserData()?.addresses, address]
    }
    try {
      await axios.put(`${base_url}user/update/${getUserData()?._id}`, fullData, config)
    .then((response): any => {
      setAddress({
        isPrincipal: false,
        country: 'Morocco',
        city: '',
        location: ''
      });
      setNumber('')
      setLoading(false)
      dispatch(updateUser({data: response.data}))
      setAddresses(response.data?.addresses)
      setAddressSelected(response.data?.addresses[response.data?.addresses?.length - 1])
      setNewAddress(false)
      setValue({value: 'MA', label: 'Morocco'})
      toast.success(
        <Fragment>
          <div className='toastify-header'>
            <div className='title-wrapper'>
              <h6 className='toast-title font-weight-bold'>Enregistrement réussi!</h6>
            </div>
          </div>
        </Fragment>,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
    })

    .catch((error) => {
      let errMessage = "Une erreur s'est produite, merci de réessayer plustard.";
      console.log('Error', error)
      toast.error(
        errMessage,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      setLoading(false)
    })
    } catch (error) {
      
    }
  }

  return <>
            <div className="products-list shadow">
              <DetailsTitle title = "Adresse de livraison" />
              <p>Indiquez le lieu où vous souhaitez être livré.</p>

              {
                userAddresses.map((add: any, key: number) => {
                  return <AddressItem
                  setNewAddress = {setNewAddress}
                  addressSelected={addressSelected}
                  setAddressKey = {(data: any) => setAddressKey(data)}
                  setAddressSelected={(data: any) => setAddressSelected(data)}
                  key={key}
                  index={key}
                  item={add}
                  {...add}
                  from="cart"
                  />
                })
              }
              <NewAddress setNewAddress = {setNewAddress} newAddress = {newAddress}
              addressSelected={addressSelected}
              setAddressSelected={(data: any) => setAddressSelected(data)}
              />

             {newAddress && <div className="px-3">
                <div className="flex w-full items-center address-form flex-wrap">
                  <div className="w-1/2 pr-2">
                    

                    <div className="label">Phone number</div>
                    <PhoneInput
                    country={country.value.toLowerCase()}
                    enableLongNumbers
                    enableSearch
                    searchPlaceholder="Rechercher le pays"
                    autocompleteSearch
                    onChange={(value: any, country: any, e: any, formattedValue: string) => { 
                      setAddress({...address, country: country?.name})
                      setNumber(formattedValue)
                      let currentCountry = countries?.filter((count: any) => count.name === country?.name)[0]
                      setSities(currentCountry ? currentCountry?.cities : [])
                    }}
                  />
                  </div>
                
                    <div className="w-1/2 pl-2">
                    <div className="label">Ville</div>
                        <select name="" id="" value={address?.city} className="address-form-input"
                        onChange={(e: any) => {
                          setAddress({...address, city: e.target.value})
                        }}
                        >
                          <option value="">Selectionner</option>
                        {
                          countryCities.map(({name}: any, index: number) => {
                            return <option key={index} value={name}> {name} </option>
                          })
                        }
                        </select>
                  </div>
                </div>


                <div className="flex w-full items-center address-form flex-wrap mt-4">
                  <div className="w-full">
                    <div className="label">Adresse</div>
                    <input type="text" placeholder="Adresse" className="address-form-input"
                    value={address?.location}
                    onChange={(e: any) => {
                      setAddress({...address, location: e.target.value})
                    }}
                    />
                  </div>
                
                </div>

                <div className="inline-flex mt-4">
                <FullButton
                background="#E73A5D"
                disabled={
                  loading ||
                  !address.country||
                  !number||
                  !address.city ||
                  !address.location
                }
                label={<> Enregistrer et utiliser</>}
                color="#FFFFFF"
                size = {14}
                weight = {500}
                func={(e: any) =>updateAdresses()}
                radius = {8}
                />
                </div>
              </div>}
              
             
             
            </div>

            <div className="right-side">
              <div className="order-resume shadow">
              <DetailsTitle title = "Résumé" />
              {cartItems?.map((item: any, index: number) => {
                  return <SummaryProductCard {...item} />
                })}

              <div className="flex items-center justify-between mb-4">
              <span>Sous total</span>
                <span className="value">{total().toString()} Dhs</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span>Coût de livraison</span>
                <span className="value">0</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span>Rémise (0%)</span>
                <span className="value text-redColor" style={{color: "#DE3618"}}>-0</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span>Total</span>
                <span className="value">{total().toString()} Dhs</span>
              </div>
              <FullButton
                background="#E73A5D"
                disabled={!addressSelected}
                label={<><CarIcon className="mr-2"/> Continuer vers la livraison</>}
                color="#FFFFFF"
                size = {14}
                weight = {500}
                func={(e: any) =>setActive(2)}
                radius = {8}
                />
                <div className="mt-3"></div>
                <FullButton
                background="#F4F6F8"
                label={<><span className="transform rotate-180"><ArrowHorizontalIcon className="ml-2"/></span> Retourner au panier</>}
                color="#919EAB"
                size = {14}
                weight = {500}
                func={(e: any) =>setActive(0)}
                radius = {8}
                />
                
              
              </div>
            </div>
  </>
}

export default Step2;
