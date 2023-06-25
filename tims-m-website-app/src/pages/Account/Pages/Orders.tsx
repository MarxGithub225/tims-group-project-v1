import React, { useEffect, useState } from "react";
import { Eye } from "react-feather";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from 'react-toastify'
import axios from 'axios'
import { base_url } from "../../../utils/baseUrl";
import { getUserData } from "../../../utils/Utils";
import { config } from "../../../utils/axiosconfig";
import moment from 'moment'
function Orders() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState<Array<any>>([])
 const [loading, setLoading] = useState(true)

    useEffect(() => {
    
        ;(async () => {
        try {
            setLoading(true)
            await axios.get(`${base_url}order/user/${getUserData()?._id}?page=1&limit=100`, config)
            .then(async (response) => {
                if(response.data) {
                    setOrders(response.data.data)
                }

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

        })()

        
    }, [])
  return <div>
  <div className="page-header">Mes commandes ({orders?.length}) </div>
  <div className="flex w-full justify-between flex-wrap items-center mt-6">
    {orders?.map((order: any, key: number) => {
        return <div className="w-full laptop:w-1/2 pb-1 px-1" key={key} >
        <div className="border h-auto laptop:h-36 rounded flex flex-col justify-between p-2">
            <div className="user-details flex items-center">
                <div>ID: </div>
                <span className="ml-2 uppercase">{order?._id}</span>
            </div>
            <div className="user-details flex items-center">
                <div>Date: </div>
                <span className="ml-2">{moment(order?.createdAt).format('DD-MM-YYYY')}</span>
            </div>

            <div className="user-details flex items-center">
                <div className="">Montant: </div>
                <span className="ml-2">{order?.cost?.toLocaleString()} Dh</span>
                <span className="mx-4">-</span>
                <div className="">Etat: </div>
                <span className="ml-2">En attente</span>
            </div>

            <div className="user-details flex items-center">
                <div>Livraison à: </div>
                <span className="ml-2">{`${order?.shippingAddress?.location} ${order?.shippingAddress?.city} - ${order?.shippingAddress?.country}`}</span>
            </div>

            <div className="inline-flex mt-1">
                <div className="edit-info-button"
                onClick={() => navigate(`/order-tracking/${order?._id}`)}
                >
                    <Eye className="mr-1"/>Détails
                </div>
            </div>
        </div>
    </div>
    })}
  </div>
  </div>;
}

export default Orders;
