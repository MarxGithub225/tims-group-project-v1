import { useEffect, useState } from "react";

import MainProductCard from "../../components/ProductCards/MainProductCard";
import axios from 'axios'
import { base_url } from "../../utils/baseUrl"
import ProductLoader from "../../components/Loaders/ProductLoader";

function BestProduct() {

  const [_products, setProducts] = useState<Array<any>>([])

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    ;(async () => {
      try {
        const [sliders] = await Promise.all([
          await axios.get(`${base_url}product/best-seller`)
        ])
        setProducts(sliders.data.data)
      } catch (error) {
        console.error(error)
      }

      setLoading(false)

    })()
  }, [])
  return <div className="best-products">
    <div className="w-max-width w-full">
      <div className="header">
        <div className="title">Produits les plus vendus</div>
        <div className="sub-title">Consultez dès maintenant nos produits les plus vendus</div>
      </div>
      {loading ? 
      <>
      <div className="grid grid-cols-5 gap-6 products-list">
      {[0, 1, 2, 3, 4, 7, 6,7, 0, 9].map((p: any, index: number) => {
        return <ProductLoader
          width={255}
          height={380}
        />
      })}
      </div>
      </> : 

      <div className="grid grid-cols-5  products-list gap-x-6">
      {_products.map((p: any, index: number) => {
        return<MainProductCard
          {...p}
        />
      })}
      </div>
    
      }

      
    </div>
  </div>;
}

export default BestProduct;
