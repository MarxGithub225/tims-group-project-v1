import { useEffect, useState } from "react";
import FullButton from "../../components/Buttons/FullButton";
import {ReactComponent as HouseIcon} from '../../assets/icons/HouseIcon.svg'
import { useNavigate } from "react-router-dom";
import SecondProductCard from "../../components/ProductCards/SecondProductCard";
import { isUserLoggedIn, getUserData } from "../../utils/Utils";
import NoData from '../../assets/images/NoData.png'
function Favorites() {
  const navigate = useNavigate();
  const [_products, setProducts] = useState<Array<any>>([])
  const [reload, setReload] = useState<boolean>(false)
  useEffect(() => {
    if(isUserLoggedIn()) {
      setProducts(getUserData()?.wishList ?? [])
    }
  }, [])

  useEffect(() => {
    if(isUserLoggedIn()) {
      setProducts(getUserData()?.wishList ?? [])
    }
  }, [reload])
  return<div className="favories-page">
        <div className="w-full w-max-width">
            <div className="w-full flex items-center justify-between mb-12">
                    <div className="page-header">Mes articles sauvegardés</div>

                    <FullButton
                    background="#E73A5D"
                    outline
                    label={<><HouseIcon className="order-tracking-house-icon-class mr-2"/> Go to Homepage</>}
                    color="#E73A5D"
                    size = {14}
                    weight = {500}
                    func={(e: any) =>navigate('/')}
                    radius = {8}
                    />
            </div>

           {_products.length ? <div className="grid gap-x-2 gap-y-2 grid-cols-4 full-products-list">
            {_products.map((p: any, index: number) => {
              return <SecondProductCard
              setReload={(state: boolean) => setReload(state)}
              relaod={reload}
                {...p}
              />
            })}
          </div>:
          <div className="w-full h-48 flex items-center justify-center">
            <img src={NoData} alt="" className="w-auto h-60" />
          </div>
          }
        </div>
    </div>;
}

export default Favorites;
