import { Fragment, useState } from "react";

import { Slide, toast } from 'react-toastify'
import axios from 'axios'
import { base_url } from "../../../utils/baseUrl";
import { config } from "../../../utils/axiosconfig";
import FullButton from "../../../components/Buttons/FullButton";
import { useNavigate } from "react-router-dom";

function UpdatePass() {
  const navigate = useNavigate()
  let [newPassword, setPassword] = useState<string>('');
  let [confirm, setConfirm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)
  const updatePassword = async () => {
    setLoading(true)
    let fullData = {
      password: newPassword
    }
  
    try {
      await axios.put(`${base_url}user/password`, fullData, config)
    .then((response): any => {
      setPassword('')
      setConfirm('')
      setLoading(false)
      navigate('/account/profile')
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
  return <div>
  <div className="page-header">Réinitialiser mon mot de passe</div>
       <div className="flex w-full items-center address-form flex-wrap mt-4">
       <div className="w-full">
         <div className="label">Mouveau mot de passe</div>
         <input type="password" placeholder="Mot de passe"
         onChange={(e: any) => setPassword(e.target.value)}
         className="address-form-input"/>
         </div>
       </div>

       <div className="flex w-full items-center address-form flex-wrap mt-4">
       <div className="w-full">
         <div className="label">Confirmer le mot de passe</div>
         <input type="password" placeholder="Confirmation" 
         onChange={(e: any) => setConfirm(e.target.value)}
         className="address-form-input"/>
         </div>
       </div>

       <div className="inline-flex mt-4">
        <FullButton
        background="#E73A5D"
        disabled={
          loading ||
          !newPassword||
          confirm !== newPassword
        }
        label={<> Sauvegarder</>}
        color="#FFFFFF"
        size = {14}
        weight = {500}
        func={(e: any) =>updatePassword()}
        radius = {8}
        />
        </div>
  </div>;
}

export default UpdatePass;
