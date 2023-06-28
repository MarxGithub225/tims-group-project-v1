import {ReactComponent as SuccessIcon} from '../../assets/icons/SuccessIcon.svg'
import {ReactComponent as ArrowIcon} from '../../assets/icons/ArrowIcon.svg'
import FullButton from "../../components/Buttons/FullButton";
import {ReactComponent as CarIcon} from '../../assets/icons/CarIcon.svg'
import { useNavigate, useParams } from "react-router-dom";
function OrderStatus() {
  const navigate = useNavigate()
  let {orderId} = useParams()
  return <div className={`order-status `}>
    <div className="w-max-width">
      <div className="flex flex-col items-center">
        <SuccessIcon />
        <div className="state-header">Commande passée avec succès !</div>
        <div className="state-message">
        Merci pour votre commande. Elle sera traitée dans les plus brefs délais. N'oubliez pas de noter votre numéro de commande, qui est <span className="uppercase">{orderId}</span>.
        Vous recevrez sous peu un e-mail avec la facture de votre commande.</div>

        <div className="flex flex-col laptop:flex-row space-y-4 laptop:space-y-0 items-center mt-8">
          <div className="back flex items-center mr-12 cursor-pointer" onClick={() => navigate('/')}>
          <ArrowIcon className="transform rotate-90 mr-3 back-icon-class"/> Retour aux achats
          </div>

          <FullButton
                background="#E73A5D"
                label={<><CarIcon className="mr-2"/> Suivez votre commande</>}
                color="#FFFFFF"
                size = {14}
                weight = {500}
                func={(e: any) =>{navigate(`/order-tracking/${orderId}`)}}
                radius = {8}
                />
        </div>
      </div>
    </div>
  </div>;
}

export default OrderStatus;
