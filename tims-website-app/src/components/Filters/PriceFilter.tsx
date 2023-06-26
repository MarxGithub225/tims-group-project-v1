import {ReactComponent as MoneyIcon} from '../../assets/icons/MoneyIcon.svg'
import OnlineLoader from "../Loaders/OnlineLoader";
let timer: any = null
function PriceFilter({loading,
  priceFilter,
  setPriceFilter
}: any) {
  return <div className="popular-filter tablet:p-4">
    {window.innerWidth > 768 && <div className="label"> <div className="label">{loading ? <OnlineLoader width="200px" height="12px" />: 'Intervalle de prix'}</div></div>}

    {loading ? <div className="mt-6"><OnlineLoader width="240px" height="42px" /></div>: 
    <div className="flex items-center mt-6 laptop:mt-2 price-filter">
      <div className="icon" style={{fontSize: 12, fontWeight: 'bold'}}>
      Dhs
      </div>
      <input className="mr-2" placeholder="Set Min. Price"
      value={priceFilter? priceFilter[0]: ''}
      onChange={(e: any) => {
        if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            setPriceFilter([Number(e.target.value), priceFilter[1]])
          }, 1000)
        }}
      />
    </div>}
    {loading ? <OnlineLoader width="240px" height="42px" />: 
    <div className="flex items-center mt-2 price-filter">
      <div className="icon" style={{fontSize: 12, fontWeight: 'bold'}}>
      Dhs
      </div>
      <input className="mr-2" placeholder="Set Max. Price" 
      value={priceFilter? priceFilter[1]: ''}
      onChange={(e: any) => {
          if (timer) clearTimeout(timer)

          timer = setTimeout(() => {
            setPriceFilter([priceFilter[0], Number(e.target.value)])
          }, 1000)
        }}
      />
    </div>}
  </div>;
}

export default PriceFilter;
