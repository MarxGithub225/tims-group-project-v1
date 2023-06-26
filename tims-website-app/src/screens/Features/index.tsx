import React from "react";
import {ReactComponent as CarIcon} from '../../assets/icons/features/CarIcon.svg'
import {ReactComponent as HeadPhone} from '../../assets/icons/features/HeadPhone.svg'
import {ReactComponent as MoneyIcon} from '../../assets/icons/features/MoneyIcon.svg'
import {ReactComponent as CartIcon} from '../../assets/icons/features/CartIcon.svg'

const _features = [
  {
    icon: <CarIcon/>,
    label: 'Livraison rapide',
    descirption: 'Livraison à moindre côut'
  },
  {
    icon: <MoneyIcon/>,
    label: 'Garantie monétaire',
    descirption: '30 jours de remboursement'
  },
  {
    icon: <HeadPhone/>,
    label: 'Support 24/7',
    descirption: 'Assistance amicale 24/7'
  },
  {
    icon: <CartIcon/>,
    label: 'Paiement sécurisé',
    descirption: 'Toutes les cartes sont acceptées'
  }
]
function Features() {
  return <div className="features">
    <div className="w-max-width w-full">
      <div className="flex flex-row justify-between">
        {_features.map((f: any, index: number) => {
          return <div key={index} className="feature-item flex flex-col laptop:flex-row items-center">
            {f.icon}
            <div className="infos"> 
              <div className="label text-center laptop:text-start">
                {f.label}
              </div>
              <div className="descirption text-center laptop:text-start">
                {f.descirption}
              </div>
            </div>
          </div>
        })}
      </div>
    </div>
  </div>;
}

export default Features;
