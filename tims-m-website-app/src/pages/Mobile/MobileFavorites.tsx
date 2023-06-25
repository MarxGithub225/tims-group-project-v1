import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn, getUserData } from "../../utils/Utils";
import NoData from '../../assets/images/NoData.png'
import { X } from "react-feather";
import PriceFilter from "../../components/Filters/PriceFilter";
import {ReactComponent as HeartIcon} from '../../assets/icons/HeartIcon.svg'
import { file_url } from "../../utils/baseUrl";
import MobileProductCard from "../../components/ProductCards/MobileProductCard";
function MobileFavorites() {
  const [filter, setFilter] = useState<boolean>(false)
  const [rateFilter, setRateFilter] = useState<number>(-1)
  const [priceFilter, setPriceFilter] = useState<Array<number>>([0, 0])
  const [isItPossibleToLoadMore, setIsItPossibleToLoadMore] =
  useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate();
  const [_products, setProducts] = useState<Array<any>>([])
  const [reload, setReload] = useState<boolean>(false)
  useEffect(() => {
    if(isUserLoggedIn()) {
      setProducts(getUserData()?.wishList ?? [])
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if(isUserLoggedIn()) {
      setProducts(getUserData()?.wishList ?? [])
    }
  }, [reload])
  return <div className="relative mobile-favorie">
    <div className="header-2 px-4">
        <div className="title">{_products?.length} Articles</div>
        {/* <div className="sub-title"
        onClick={() => setFilter(!filter)}
        ><Filter/></div> */}
    </div>


    
    { _products.length ?
        <>

        <div className="w-full mobile-best-seller px-4 mb-12"
        >

        <div className="w-full grid grid-cols-2 gap-x-2 ">
        {_products.map((pdt: any, index: number) => {
        return <MobileProductCard
        {...pdt}
        />
        })}
        </div>

        {/* {isItPossibleToLoadMore && (<div
        className="cursor-pointer flex justify-center items-center load-more-review"
        onClick={loadMore}
        >{!loadingButton? <SpinIcon/>: <Spinner style={{width: 17, height: 17}} color="#f4a609" />} Charger plus</div>)} */}
        </div>
        </>
        : <div className="w-full h-96 flex items-center justify-center">
        <img src={NoData} alt="" className="w-auto h-60" />
      </div>
        }

    <div className="fixed bottom-14 h-60 shadow w-full bg-white p-4"
    style={{
      visibility : filter ? 'visible': 'hidden',
      opacity: filter ? "1" : "0",
      transition: "all .8s",
    }}
    >
      <div className="w-full flex justify-between">
      <X color="#E73A5D"
      onClick={() => setFilter(!filter)}
      />
      <div className="filter-title">Filtrer</div>
      </div>

      <PriceFilter
      loading={loading}
      priceFilter={priceFilter}
      setPriceFilter={setPriceFilter}
      />

      <div className="w-full flex justify-center">
        <div className="w-full px-3 py-2 rounded-full text-lg text-center"
        onClick={() => setFilter(!filter)}
        style={{
            background: "#E73A5D",
            color: "#FFF"
        }}
        >Appliquer</div>
    </div>
    </div>

  </div>;
}

export default MobileFavorites;
