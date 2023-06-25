import React, { useState } from "react";
import FullButton from "../../../components/Buttons/FullButton";
import DetailsTitle from "../../../components/Details/DetailsTitle";
import {ReactComponent as FileWhiteIcon} from '../../../assets/icons/FileWhiteIcon.svg'
import SummaryProductCard from "../../../components/ProductCards/SummaryProductCard";
import {ReactComponent as ArrowHorizontalIcon} from '../../../assets/icons/ArrowHorizontalIcon.svg'
import BankCradItem from "../../../components/BankCardItem";
import visa from '../../../assets/images/visa.png'
import paypal from '../../../assets/images/paypal-icon.png'
import CashPaid from "../../../components/BankCardItem/CashPaid";
function Step3({setActive = () => {}, cartItems}: any) {
  const total = () =>
  {
    let total = 0;
    for (let c of cartItems) {
     total += (c?.product?.isPromoted && c?.product?.promoType !=='bonus') ? Number(c?.product?.promoCost) * Number (c.cartQuantity) : Number(c?.product?.cost) * Number (c.cartQuantity)
    }

    return total;
  }

  const [paymentSelected, setSelectPayment] = useState<any>(3)
  return <>
            <div className="products-list shadow">
              <DetailsTitle title = "Choisir le service d'expédition" />
              {/* <p>Vous pouvez choisir le meilleur service d'expédition en fonction de vos besoins.</p>

              <ShippingItem/>
              <ShippingItem/>
              <ShippingItem/>
              <ShippingItem/>
              <ShippingItem/> */}

              <div className="border-separator mb-4"></div>
              <DetailsTitle title = "Payer avec..." />
              <p>Choisissez le service que vous souhaitez pour votre transaction.</p>
              <div className="flex w-full items-center justify-beween flex-wrap">
                <div className="w-1/2 pr-2">
                  <BankCradItem
                  setSelectPayment={(value: any) => setSelectPayment(value)}
                  paymentSelected={paymentSelected}
                  title="Carte de crédit"
                  desc="Vous pouvez utiliser tous les services de cartes de crédit. Nous acceptons les cartes Visa et Master Card."
                  image={visa}
                  value={1}
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <BankCradItem
                  setSelectPayment={(value: any) => setSelectPayment(value)}
                  paymentSelected={paymentSelected}
                  title="Paypal"
                  desc="Insérez l'email de votre compte Paypal. Nous traiterons votre paiement."
                  image={paypal}
                  value={2}
                  />
                </div>

                <div className="w-1/2 mr-2">
                  <CashPaid
                  setSelectPayment={(value: any) => setSelectPayment(value)}
                  paymentSelected={paymentSelected}
                  value={3}
                  />
                </div>
              </div>

              {/* <div className="flex w-full items-center address-form flex-wrap mt-4">
                <div className="w-1/2 pr-2">
                  <div className="label">Card name</div>
                  <input type="text" placeholder="Eg. Alex Iwobi" className="address-form-input"/>
                </div>
              
              <div className="w-1/2 pl-2">
                <div className="label">Card number</div>
                <input type="text" placeholder="1234 1234 1234 1234" className="address-form-input"/>
                </div>
              </div>

              <div className="flex w-full items-center address-form flex-wrap mt-4">
                <div className="w-1/3 pr-2">
                  <div className="label">Month</div>
                <select name="" id="" className="address-form-input">
                  <option value="">Jan</option>
                  <option value="">Fev</option>
                  <option value="">Mar</option>
                </select>
                </div>
              
              <div className="w-1/3 pl-2">
                <div className="label">Year</div>
                <input type="text" placeholder="2025" className="address-form-input"/>
                </div>

                <div className="w-1/3 pl-2">
                <div className="label">CVV</div>
                <input type="text" placeholder="000/0000" className="address-form-input"/>
                </div>
              </div>

              <div className="inline-flex mt-4">
              <FullButton
                background="#454F5B"
                label={<>Submit Card Info</>}
                color="#FFFFFF"
                size = {14}
                weight = {500}
                func={(e: any) => console.log('e', e)}
                radius = {8}
                />
              </div> */}
                
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
                label={<><FileWhiteIcon className="mr-2"/> Résumé de la commande</>}
                color="#FFFFFF"
                size = {14}
                weight = {500}
                func={(e: any) =>setActive(3)}
                radius = {8}
                />

                <div className="mt-3"></div>
                <FullButton
                background="#F4F6F8"
                label={<><span className="transform rotate-180"><ArrowHorizontalIcon className="ml-2"/></span> Retour à vos informations</>}
                color="#919EAB"
                size = {14}
                weight = {500}
                func={(e: any) =>setActive(1)}
                radius = {8}
                />
              
              </div>
            </div>
  </>
}

export default Step3;
