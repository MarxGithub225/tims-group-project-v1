import React, { useEffect, useState } from "react";
import FullButton from "../../../components/Buttons/FullButton";
import DetailsTitle from "../../../components/Details/DetailsTitle";
import CartItemCard from "../../../components/ProductCards/CartItemCard";
import {ReactComponent as BankIconWhite} from '../../../assets/icons/BankIconWhite.svg'
import { isUserLoggedIn } from "../../../utils/Utils";
import { useNavigate } from "react-router-dom";

function Step1({setActive = () => {}, cartItems}: any) {
  const navigate = useNavigate()
  const [thisCart, setCart] = useState<Array<any>>([])
  const [totalState, setTotal] = useState<number>(0)

  useEffect(() => {
    setCart(cartItems)
    let total = 0;
    for (let c of cartItems) {
     total += (c?.product?.isPromoted && c?.product?.promoType !=='bonus') ? Number(c?.product?.promoCost) * Number (c.cartQuantity) : Number(c?.product?.cost) * Number (c.cartQuantity)
    }
    setTotal(total)
  }, [cartItems])
  return <>
            <div className="products-list shadow">
                {thisCart?.map((item: any, index: number) => {
                  return <CartItemCard {...item}/>
                })}
            </div>

            <div className="right-side">
              <div className="order-resume shadow">
              <DetailsTitle title = "Résumé" />

              <div className="flex items-center justify-between mb-4">
                <span>Total</span>
                <span className="value">{totalState.toString()} Dhs</span>
              </div>
              <FullButton
                background="#E73A5D"
                label={<><BankIconWhite className="mr-2"/> Procéder à l'achat</>}
                color="#FFFFFF"
                size = {14}
                weight = {500}
                func={(e: any) => {
                  if(isUserLoggedIn()) {
                    setActive(1)
                  }
                  else {
                    navigate(`/login?redirect=true&urlRequest=/cart`)
                  }
                }}
                radius = {8}
                />
              
              </div>
            </div>
  </>
}

export default Step1;
