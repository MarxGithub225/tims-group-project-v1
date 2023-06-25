import React, { useEffect, useState } from "react";
import { Search } from "react-feather";

import {ReactComponent as HeartIcon} from '../../assets/icons/HeartIcon.svg'
import { Link, useNavigate } from "react-router-dom";
import { isUserLoggedIn, getUserData } from "../../utils/Utils";
import axios from 'axios'
import { base_url, file_url } from "../../utils/baseUrl"
import CardCarousel from "../../components/CardCarousel";
import MobileProductCard from '../../components/ProductCards/MobileProductCard'
function MobileHome() {
  const [q, setSearch] = useState<string>('')
  const navigate = useNavigate();

  const [_brands, setBrands] = useState<Array<any>>([])
  const [_products, setProducts] = useState<Array<any>>([])
  const [_categories, setCategories] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    ;(async () => {
      try {
        const [sliders, products, categories] = await Promise.all([
          await axios.get(`${base_url}brand?page=1&$limit=15`),
          await axios.get(`${base_url}product/best-seller`),
          await axios.get(`${base_url}product/all-categories-products`)
        ])
        setBrands(sliders.data.data.filter((bd: any) => !bd?.isBlocked && bd?.isPartner))
        setProducts(products.data.data)
        setCategories(categories.data.data)

      } catch (error) {
        console.error(error)
      }

      setLoading(false)

    })()
  }, [])

  
  return <div className="mobile-home">
    <div className="hello px-4">
        {isUserLoggedIn() && <h3>Salut {getUserData()?.firstName}</h3>}
        <span>Bienvenue chez 6tim's</span>
    </div>

    <div className="mobile-search px-4">
        <input type="text" placeholder="Rechercher quelque chose ici…" 
        onChange={(e: any) => setSearch(e.target.value)}
        />
        <div className="validate-input"
        onClick={() => 
          {
            navigate(`/search/?q=${q}`)
          }
        }
        >
            <Search/>
        </div>
    </div>

    <div className="w-full mobile-partners px-4">
      <div className="header">Nos partenaires</div>

      <CardCarousel show={4} >
      {_brands.map((b: any, index: number) => {
        return  <div key={index} className="mobile-partner-item flex justify-center items-center space-x-2" >
          <img src={`${file_url}/brands/${b?.image}`} className="h-5 w-auto"/>
          <span>{b?.name}</span>
          </div>
       })}
      </CardCarousel>
      
    </div>
    <div className="w-full mobile-best-seller px-3 mb-12" style={{background: '#FFF4CF'}}>

      <div className="header flex flex-col items-center">
        <div className="title font-bold">Produits les plus vendus</div>
        <div className="sub-title">Consultez dès maintenant nos produits les plus vendus</div>
      </div>

    <div className="w-full grid grid-cols-2 gap-x-2">
      {_products.slice(0, 8).map((pdt: any, index: number) => {
        return <MobileProductCard
        {...pdt}
        />
      })}
    </div>
    </div>

    <div className="w-full mobile-best-seller px-4 mb-12">
      <div className="flex items-center justify-beween flex-wrap ">
              {_categories
              .filter((c: any) => c.count > 0)
              .map((c: any, index: number) => {
          return <div className="mb-4">
            <div className="header w-full px-4 rounded-t-xl" style={{backgroundColor: "#f7a700"}}>
              <div className="title" >{c?.categoryId?.name}</div>
              {c.data?.length > 20? <div className="view-all">
                <Link
                style={{textDecoration: 'none', color: 'inherit'}}
                to={`product-list/${c?.categoryId?._id}`}
                className="uppercase cursor-pointer ">Voir plus</Link>
                </div>: <></>}
            </div>

            <div className="w-full grid grid-cols-2 gap-x-2 " style={{borderBottom: '1px dashed #f4a609'}}>
              {c.data.map((pdt: any, index: number) => {
                return <MobileProductCard
                {...pdt}
                />
              })}
            </div>
          </div>
        })}
      </div>
    </div>

  </div>;
}

export default MobileHome;
