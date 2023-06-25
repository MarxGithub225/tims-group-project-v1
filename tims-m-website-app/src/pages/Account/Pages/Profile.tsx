import React from "react";
import { Eye } from "react-feather";
import { useNavigate } from "react-router-dom";
import {ReactComponent as EditIcon} from '../../../assets/icons/EditIcon.svg'
import { getUserData } from "../../../utils/Utils";

function Profile() {
    const navigate = useNavigate()
  return <div>

    <div className="page-header">Bienvenue, {getUserData()?.firstName}</div>
  <div className="flex flex-col laprop:flex-row w-full justify-center laptop:justify-between flex-wrap items-center mt-6">
    <div className="w-full laprop:w-1/2 pb-1 laprop:pr-1 mb-6 laptop:mb-0">
        <div className="border h-32 rounded flex flex-col justify-between p-2">
            <div className="user-details flex items-center">
                <div>Nom complet: </div>
                <span className="ml-2">{getUserData()?.fullName}</span>
            </div>

            <div className="user-details flex items-center">
                <div>Adresse e-mail: </div>
                <span className="ml-2">{getUserData()?.email}</span>
            </div>

            <div className="user-details flex items-center">
                <div>Téléphone: </div>
                <span className="ml-2">{getUserData()?.numbers[0]}</span>
            </div>

            <div className="inline-flex">
                <div className="edit-info-button"
                onClick={() => navigate('/account/data/update')}
                >
                    <EditIcon className="mr-1"/> Modifier mes informations
                </div>
            </div>
        </div>
    </div>

    <div className="w-full laprop:w-1/2 pb-1 laprop:pl-1">
        <div className="border h-32 rounded flex flex-col justify-between p-2">
            <div className="user-details flex items-center">
                <div>Pays: </div>
                <span className="ml-2">{getUserData()?.addresses?.filter((add: any) => add?.isPrincipal)[0]?.country}</span>
            </div>

            <div className="user-details flex items-center">
                <div>Ville: </div>
                <span className="ml-2">{getUserData()?.addresses?.filter((add: any) => add?.isPrincipal)[0]?.city}</span>
            </div>

            <div className="user-details flex items-center">
                <div>Adresse: </div>
                <span className="ml-2 tims-txt">{getUserData()?.addresses?.filter((add: any) => add?.isPrincipal)[0]?.location}</span>
            </div>

            <div className="inline-flex">
                <div className="edit-info-button"
                onClick={() => navigate('/account/addresses')}>
                <EditIcon className="mr-1"/> Modifier mes adresses
                </div>
            </div>
        </div>
    </div>

    {/* <div className="w-1/2 pt-1  pr-1">
        <div className="border h-32 rounded flex flex-col justify-between p-2">
            <div className="user-details flex justify-between items-center">
                <div>Total commandes: </div>
                <span className="ml-2">4</span>

                <div className="see-orders" onClick={() => navigate('/account/orders')}>
                    <Eye size={13} className="mr-1"/> Voir mes commandes
                </div>
            </div>

            <div className="user-details flex items-center justify-center  border-bottom pb-1">
                <div>Dernière commande: </div>
                <span className="ml-2">12/01/2021</span>
            </div>

            <div className="user-details justify-center  flex items-center">
                <div>ID: </div>
                <span className="ml-2 cursor-pointer" onClick={() => navigate('/order-tracking/CD3620912')}>#CD3620912</span>
                <div className="ml-6">Etat: </div>
                <span className="ml-2">En attente</span>
            </div>

            
        </div>
    </div> */}

   
  </div>
  </div>;
}

export default Profile;
