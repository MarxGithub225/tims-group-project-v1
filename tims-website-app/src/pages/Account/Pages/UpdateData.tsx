import React, { Fragment, useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { getUserData } from "../../../utils/Utils";
import FullButton from "../../../components/Buttons/FullButton";

import { Slide, toast } from 'react-toastify'
import axios from 'axios'
import { base_url } from "../../../utils/baseUrl";
import { updateUser } from "../../../redux/features/authSlice";
import { config } from "../../../utils/axiosconfig";
import { useAppDispatch } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";

function UpdateData() {

  const [user, setUser] = useState<any>(getUserData())
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const updateData = async () => {
    setLoading(true)
    try {
      await axios.put(`${base_url}user/update/${getUserData()?._id}`, user, config)
    .then((response): any => {
      setUser(response.data);
      setLoading(false)
      dispatch(updateUser({data: response.data}))
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
  <div className="page-header">Modifier mes informations</div>
        <div className="flex w-full items-center address-form flex-wrap mt-4">
          <div className="w-full laptop:w-1/2 laptop:pr-2 mb-4 laptop:mb-0">
            <div className="label">Prénom(s)</div>
            <input type="text" placeholder="First name" className="address-form-input"
            value={user.firstName}
            onChange={e => setUser({...user, firstName: e.target.value})}
            />
          </div>
        
          <div className="w-full laptop:w-1/2 laptop:pl-2">
          <div className="label">Nom</div>
          <input type="text" placeholder="Last name" className="address-form-input"
          value={user.lastName}
          onChange={e => setUser({...user, lastName: e.target.value})}
          />
          </div>
        </div>
        <div className="inline-flex mt-4">
                <FullButton
                background="#E73A5D"
                disabled={
                  loading ||
                  !user?.lastName||
                  !user?.firstName
                }
                label={<> Sauvegarder</>}
                color="#FFFFFF"
                size = {14}
                weight = {500}
                func={(e: any) =>updateData()}
                radius = {8}
                />
                </div>
  </div>;
}

export default UpdateData;
