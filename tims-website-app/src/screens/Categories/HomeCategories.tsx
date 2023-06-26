import React, { useEffect, useState } from "react";

import { base_url } from "../../utils/baseUrl"
import axios from 'axios'
import CategoryGroupProducts from "../CategoryGroupProducts";
import ProductLoader from "../../components/Loaders/ProductLoader";
import OnlineLoader from "../../components/Loaders/OnlineLoader";

function HomeCategories() {

  const [_categories, setCategories] = useState<Array<any>>([])

  const [loading, setLoading] = useState<boolean>(true)
  
  useEffect(() => {
    ;(async () => {
      try {
        const [categories] = await Promise.all([
          await axios.get(`${base_url}product/all-categories-products`)
        ])
        setCategories(categories.data.data)
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
    })()
  }, [])
  return <div className="home-category">
          {loading && <div className="w-full flex flex-col justify-center items-center">
            {[0, 1, 2].map(() => {
              return <div className="category-group-products mb-10" >
              <div className="w-max-width w-full" >
                <div className="header w-full rounded-t-xl">
                <OnlineLoader width="100%" height="42px" radius={2}/>
                </div>
                <div className="grid grid-cols-4 products-list gap-x-6 gap-y-6" style={{borderBottom: '1px dashed #f4a609'}}>
                {[0, 1, 2, 3, 4, 7, 6,7].map((p: any, index: number) => {
                  return <ProductLoader
                    width={255}
                    height={380}
                  />
                })}
                </div>
  
                
              </div>
            </div>
            })}
            
            </div>}
          {!loading && <div className="w-full flex flex-col justify-center items-center">
            {_categories
            .filter((c: any) => c.count > 0)
            .map((c: any, index: number) => {
              return <CategoryGroupProducts key={index} 
              id={c?.categoryId?._id}
              background={c?.categoryId?.bgColor}
              categoryTitle={c?.categoryId?.name}
              _products={c.data}
              />
            })}
          </div>}
  </div>;
}

export default HomeCategories;
