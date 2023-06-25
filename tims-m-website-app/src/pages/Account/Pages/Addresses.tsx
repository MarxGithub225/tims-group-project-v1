import { Fragment, useEffect, useState } from "react";
import AddressItem from "../../../components/AddressItem";
import PhoneInput from 'react-phone-input-2'
import { CheckCircle } from "react-feather";
import { useNavigate } from "react-router-dom";
import { getUserData, isUserLoggedIn } from "../../../utils/Utils";

import { Slide, toast } from 'react-toastify'
import axios from 'axios'
import { base_url } from "../../../utils/baseUrl";
import countries from '../../../utils/countries.json'
import { updateUser } from "../../../redux/features/authSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { config } from "../../../utils/axiosconfig";
import FullButton from "../../../components/Buttons/FullButton";
import { confirmAlert } from "react-confirm-alert";

function Addresses({from}: any) {
  const dispatch = useAppDispatch()
  const [userAddresses, setAddresses] = useState<any>([])
  const navigate = useNavigate()
  const [newAddress, setNewAddress] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [country, setValue] = useState({value: 'MA', label: 'Morocco'})
  const [number, setNumber] = useState<string>('')

  const [countryCities, setSities] = useState<any>([])

  const [address, setAddress] = useState<any>({
    isPrincipal: false,
    country: 'Morocco',
    city: '',
    location: ''
  })


  useEffect(() => {

    if(!isUserLoggedIn()) {
        navigate('/login')
        let errMessage = "Aucun compte connecté. Merci de vous connecter";
        toast.error(
        errMessage,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
    }

    setSities(countries?.filter((count: any) => count.name === "Morocco")[0].cities);
    setAddresses(getUserData()?.addresses?.sort((a: any, b: any) => b?.isPrincipal - a?.isPrincipal))
  }, [])

  const updateAdresses = async () => {
    let fullAddresses: any[] = []
    if(address.isPrincipal) {
      await Promise.all(
        getUserData()?.addresses.map((add: any) => {
          add.isPrincipal = false
          fullAddresses.push(add)
        })
      )
    }else fullAddresses = getUserData()?.addresses

    setLoading(true)
    let fullData = {
      ...getUserData(),
      numbers: [...getUserData()?.numbers, number],
      addresses: [...fullAddresses, address]
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
      dispatch(updateUser({data: response?.data}))
      setAddresses(response?.data?.addresses?.sort((a: any, b: any) => b?.isPrincipal - a?.isPrincipal))
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

  const deleteAddress = async (index: number) => {
    confirmAlert({
      title: 'Confirmation',
      message: 'Êtes-vous sûre de vouloir supprimer cette addresse ?',
      buttons: [
      {
          label: 'Oui, supprimer',
          onClick: async () => {
            let newAddress: any[] = userAddresses?.filter((add: any, key: number) => key !== index);
            let fullData = {
              ...getUserData(),
              numbers: [...getUserData()?.numbers, number],
              addresses: newAddress
            }

            try {
              await axios.put(`${base_url}user/update/${getUserData()?._id}`, fullData, config)
            .then((response): any => {
              dispatch(updateUser({data: response.data}))
              setAddresses(response.data?.addresses?.sort((a: any, b: any) => b?.isPrincipal - a?.isPrincipal))
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
      },
      {
          label: 'Non, c\'est une erreur',
          onClick: () => console.log('ok') 
      }
      ]
  });
  }

  return <div className={`${ window.innerWidth <= 768 ? 'px-2 pt-2 pb-32': ''}`}>

  <div className="page-header flex justify-between items-center">Mes adresses 
    <div className="edit-info-button"
      onClick={() => setNewAddress(true)}
      >
          <CheckCircle size={15} className="mr-1"/>Nouvelle adresse
      </div>
    </div>

    {newAddress && <div className="p-2 border rounded mb-4">
    <div className="flex w-full items-center address-form flex-wrap">
      <div className="w-full laptop:w-1/2 laptop:pr-2">
        

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
    
        <div className="w-full laptop:w-1/2 laptop:pl-2">
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

    
    <div className="saving-address">
      <input type="checkbox" name="" id=""  checked={address.isPrincipal}
      onChange={(e: any) => setAddress({...address, isPrincipal: e.target.checked})}
      />
      <div className="label">Adresse principale ?</div>
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

  {
    userAddresses.map((add: any, key: number) => {
      return <AddressItem
      from={`${ window.innerWidth <= 768 ? (from ? from : ''): 'address-list'}`}
      setNewAddress = {setNewAddress}
      deleteAddress={(id: number) => deleteAddress(id)}
      key={key}
      index={key}
      item={add}
      {...add}
      />
    })
  }
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

export default Addresses;
