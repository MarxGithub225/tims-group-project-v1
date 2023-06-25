import { useEffect, useState } from "react";
import PriceFilter from "../../components/Filters/PriceFilter";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {ReactComponent as SpinIcon} from '../../assets/icons/SpinIcon.svg'
import NoData from '../../assets/images/NoData.png'
import {ReactComponent as HeartIcon} from '../../assets/icons/HeartIcon.svg'

import axios from 'axios'
import { base_url, file_url } from "../../utils/baseUrl";
import { Spinner } from "reactstrap";
import { Filter, X } from "react-feather";
import MobileProductCard from "../../components/ProductCards/MobileProductCard";

interface LoadDatasParam {
  append: boolean
  offsetCustom?: number
}

function MobileFullProductList2() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<boolean>(false)
  const search = useLocation().search;
  const {subCategory} = useParams();
  const LIMIT = 12
  const [page, setPage] = useState(1)
  const [_products, setProducts] = useState<Array<any>>([])
  const [_bestproducts, setBestProducts] = useState<Array<any>>([])
  const [loadingButton, setLoadingButton] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const q = new URLSearchParams(search).get('q');
  const category_id = new URLSearchParams(search).get('category_id');
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
            const [sliders, thisCategory, bests] = await Promise.all([
              await axios.get(`${base_url}product/search?subcategoryId=${thisCategoryId}${rating}${price}${sort}&page=${currentLimit}&limit=${LIMIT}`),
              await axios.get(`${base_url}category/subcategory/${thisCategoryId}`),
              await axios.get(`${base_url}product/best-subcategory?categoryId=${thisCategoryId}${rating}${price}`)
            ])
            setBestProducts(bests.data.data)
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
    return <div className="mobile-favorie">
      <div className="header-2 px-4">
          <div className="title">{_products?.length} Articles</div>
          <div className="sub-title"
          onClick={() => setFilter(!filter)}
          ><Filter/></div>
      </div>

        {_products.length ?
        <>
        {_bestproducts.length ? <div className="w-full mobile-best-seller px-3 my-6" style={{background: '#FFF4CF'}}>

            <div className="header flex flex-col items-center">
                <div className="title font-bold">Produits les plus vendus</div>
                <div className="sub-title">Consultez dès maintenant nos produits les plus vendus de notre catégorie <span className="uppercase">{categorie?.name}</span> </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-x-2">
            {_bestproducts.slice(0, 8).map((pdt: any, index: number) => {
                return <div className="relative w-full mobile-product-item px-2 mb-4 bg-white rounded-t-lg"
                onClick={() => navigate(`/details/${pdt?._id}`)}
                >
                <div className="absolute top-4 right-4 z-50">
                    <HeartIcon/>
                </div>
                <div className="absolute rounded-t-lg top-0 left-0 product-image bg-cover bg-center bg-no-repeat w-full" style={{backgroundImage: `url(${file_url}/products/${pdt?.colors[0]?.primaryImage})`}}></div>

                <div className="title tims-txt-2">
                    {pdt.title}
                </div>

                <div className="price mb-2">
                    ${pdt.price}{pdt?.isPromoted && pdt?.promoType !=='bonus' ? pdt?.promoCost.toLocaleString() : pdt?.cost.toLocaleString()} Dhs
                </div>
                </div>
            })}
            </div>
        </div>: <></>}

        <div className="w-full mobile-best-seller px-4 mb-12"
        >

<div className="w-full grid grid-cols-2 gap-x-2">
        {_products.map((pdt: any, index: number) => {
        return <MobileProductCard
        {...pdt}
        />
        })}
        </div>

        {isItPossibleToLoadMore && (<div
        className="cursor-pointer flex justify-center items-center load-more-review"
        onClick={loadMore}
        >{!loadingButton? <SpinIcon/>: <Spinner style={{width: 17, height: 17}} color="#f4a609" />} Charger plus</div>)}
        </div>
        </>
        : <div className="w-full h-96 flex items-center justify-center">
        <img src={NoData} alt="" className="w-auto h-60" />
      </div>
        }
      


        
      
  
      <div className="fixed bottom-14 h-72 shadow w-full bg-white p-4"
      style={{
        visibility : filter ? 'visible': 'hidden',
        opacity: filter ? "1" : "0",
        transition: "all .8s",
        zIndex: 1000,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50
      }}
      >
        <div className="w-full flex justify-between">
        <X color="#E73A5D"
        onClick={() => setFilter(!filter)}
        />
        <div className="filter-title">Filtrer</div>
        </div>

        <div className='mt-3 flex  pl-5 pr-3 space-x-4'
            style={{
            width: '100%',
            whiteSpace: 'nowrap',
            position: 'relative',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            }}
        >
            <div className="flex items-center mt-2">
                <input type={'radio'} className="mr-2" name="rateFilter" value={5} onChange={(e: any) => setRateFilter(e.target.value)} /> <label style={{color: "#5A7184"}} >5 étoiles</label>
            </div>

            <div className="flex items-center mt-2">
            <input type={'radio'} className="mr-2" name="rateFilter" value={4} onChange={(e: any) => setRateFilter(e.target.value)} /> <label style={{color: "#5A7184"}} >4 étoiles et plus</label>
            </div>

            <div className="flex items-center mt-2">
            <input type={'radio'} className="mr-2" name="rateFilter" value={3} onChange={(e: any) => setRateFilter(e.target.value)} /> <label style={{color: "#5A7184"}} >3 étoiles et plus</label>
            </div>
        </div>
  
        <PriceFilter loading={loading}
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

export default MobileFullProductList2;
