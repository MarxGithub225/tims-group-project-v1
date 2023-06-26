import { useEffect, useState } from "react";
import PopularFilter from "../../components/Filters/PopularFilter";
import PriceFilter from "../../components/Filters/PriceFilter";
import PageBanner from "../../components/PageBanner";
import SecondProductCard from "../../components/ProductCards/SecondProductCard";
import { useLocation, useParams } from "react-router-dom";
import {ReactComponent as SpinIcon} from '../../assets/icons/SpinIcon.svg'
import NoData from '../../assets/images/NoData.png'


import axios from 'axios'
import { base_url } from "../../utils/baseUrl";
import { Spinner } from "reactstrap";
import OnlineLoader from "../../components/Loaders/OnlineLoader";
import ProductLoader from "../../components/Loaders/ProductLoader";

interface LoadDatasParam {
  append: boolean
  offsetCustom?: number
}

function FullProductList2() {
  const {subCategory} = useParams();
  const LIMIT = 12
  const [page, setPage] = useState(1)
  const [_products, setProducts] = useState<Array<any>>([])
  const [loadingButton, setLoadingButton] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [itemCount, setCount] = useState<number>(0)
  const [categorie, setCategorie] = useState<any>(null)

  const [rateFilter, setRateFilter] = useState<number>(-1)
  const [priceFilter, setPriceFilter] = useState<Array<number>>([0, 0])

  const [isItPossibleToLoadMore, setIsItPossibleToLoadMore] =
    useState<boolean>(false)

    const [filterLoading, setFilterLoading] =
    useState<boolean>(false)

    const [alphabeticFilter, setAlphabeticFilter] =
    useState<string>('')

    useEffect(() => {
      ;(async () => {
        try {
          loadDatas({ append: false})
        } catch (error) {
          
        }

      })()
    }, [])

    useEffect(() => {
      setFilterLoading(true)
        ;(async () => {
          try {
            loadDatas({ append: false})
          } catch (error) {
            
          }
  
        })()
    }, [rateFilter, alphabeticFilter])

    useEffect(() => {
      if(priceFilter.length && priceFilter[1] > priceFilter[0]) {
      setFilterLoading(true)
        ;(async () => {
          try {
            loadDatas({ append: false})
          } catch (error) {
            
          }
  
        })()}
    }, [priceFilter])

    async function loadDatas(
      { append, offsetCustom}: LoadDatasParam = {
        append: false
      }
    ) {
      const currentLimit= typeof offsetCustom === 'number' ? offsetCustom : page;
      let rating = '';
      if(rateFilter !== - 1) {
        rating=`&rating=${rateFilter}`
      }

      let price= '';

      if(priceFilter.length && priceFilter[1] > priceFilter[0]) {
        price=`&min=${priceFilter[0]}&max=${priceFilter[1]}`
      }

      let sort=''
      if(alphabeticFilter) {
        sort= alphabeticFilter === 'z_a' ? `&sort=-title`: `&sort=title`
      }
      try {
        if(subCategory){
          try {
            let thisCategoryId = subCategory
            const [sliders, thisCategory] = await Promise.all([
              await axios.get(`${base_url}product/search?subcategoryId=${thisCategoryId}${rating}${price}${sort}&page=${currentLimit}&limit=${LIMIT}`),
              await axios.get(`${base_url}category/subcategory/${thisCategoryId}`)
            ])
            
            if (!append) {
              setProducts(sliders.data.data)
            } else {
              setProducts([..._products, ...sliders.data.data])
            }
            setCategorie(thisCategory.data)
            setIsItPossibleToLoadMore(currentLimit < sliders.data.pageCount ? true : false)
            setCount(sliders.data.itemCount)

          setLoading(false)
          setFilterLoading(false)
          } catch (error) {
            console.error(error)
          }
        }
        
      } catch (error) {
        console.log(error)
      }
    }

    const loadMore = async (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      setPage(page + 1)
      setLoadingButton(true)
      try {
        await loadDatas({ append: true, offsetCustom: page + 1})
      } catch (error) {
        console.log(error)
      }
      setLoadingButton(false)
    }
  
  return <div className="product-full-list">
    <div className="w-max-width w-full">
      <PageBanner label={`${categorie?.name}`} loading={loading} />

      <div className="flex justify-between mt-10">
        <div className="w-1/4 filters">
          <div className="label px-4 mb-3">{loading ? <OnlineLoader width="150px" height="16px" />: 'Options de filtre'}</div>

          <PopularFilter 
          rateFilter={rateFilter}
          setRateFilter={setRateFilter}
          loading={loading}/>
          <PriceFilter loading={loading}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          />
          {/* <ColorFilter loading={loading}/> */}
        </div>

        <div className="w-3/4 pl-30 right-side">
          <div className="flex items-center justify-between intro">
          {loading ? <OnlineLoader width="400px" height="12px" />: <p>{_products.length} produits sur {itemCount} au total  pour ‘{`${categorie?.name}`}‘</p>}
            <div className="sort">
              <div className="label mr-1">{loading ? <OnlineLoader width="90px" height="12px" />: 'Trier par :'}</div>
              {loading ? <OnlineLoader width="146px" height="52px" />:
              <div className="sort-area">
                <select name="" id="" value={alphabeticFilter} onChange={(e: any) => setAlphabeticFilter(e.target.value)}  >
                  <option value="" >Options</option>
                  <option value="a_z" >A - Z</option>
                  <option value="z_a">Z - A</option>
                </select>
              </div>}
            </div>
          </div>
          {(loading || filterLoading) ? 
        <>
        <div className="grid gap-x-8 gap-y-2 grid-cols-3 full-products-list">
        {[0, 1, 2, 3, 4, 7, 6,7, 8, 9, 10, 11].map((p: any, index: number) => {
          return <ProductLoader
            width={255}
            height={380}
          />
        })}
        </div>
        </> :
        <>
          {_products.length ? 
          
        <>
        <div className="grid gap-x-8 gap-y-2 grid-cols-3 full-products-list">
            {_products.map((p: any, index: number) => {
              return <SecondProductCard
                {...p}
              />
            })}
          </div>
          {isItPossibleToLoadMore && (<div
          className="cursor-pointer flex justify-center items-center load-more-review"
          onClick={loadMore}
          >{!loadingButton? <SpinIcon/>: <Spinner style={{width: 17, height: 17}} color="#f4a609" />} Charger plus</div>)}
        </>

        : <div className="w-full h-96 flex items-center justify-center">
          <img src={NoData} alt="" className="w-auto h-60" />
        </div>
          }
          
        </>}
        </div>
      </div>
    </div>
  </div>;
}

export default FullProductList2;
