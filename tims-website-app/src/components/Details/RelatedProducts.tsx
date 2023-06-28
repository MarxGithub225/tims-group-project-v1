import MainProductCard from "../../components/ProductCards/MainProductCard";
import DetailsTitle from './DetailsTitle';
import Carousel from "react-multi-carousel";

import axios from 'axios'
import { base_url } from "../../utils/baseUrl"
import ProductLoader from "../../components/Loaders/ProductLoader";
import { useEffect, useState } from 'react';

function RelatedProducts({categoryId, productId}: any) {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    }
  };

  const [_products, setProducts] = useState<Array<any>>([])

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {

    if(categoryId) {
      ;(async () => {
        try {
          const [sliders] = await Promise.all([
            await axios.get(`${base_url}product/category/${categoryId}`)
          ])
          setProducts(sliders.data.data?.filter((pdt: any) => pdt?._id !== productId))
        } catch (error) {
          console.error(error)
        }
  
        setLoading(false)
  
      })()
    }
   
  }, [categoryId])
  return <>{(loading || _products.length)? <div className="related-products">
      <DetailsTitle title = "Produits similaires" />
      {loading ? 
      <>
        <div className="grid grid-cols-5 gap-6 products-list">
        {[0, 1, 2, 3, 4].map((p: any, index: number) => {
          return <ProductLoader
            width={255}
            height={380}
          />
        })}
        </div>
      </> :
      <>
      <Carousel responsive={responsive} 
      >
        {_products.map((p: any, index: number) => {
          return <MainProductCard
            {...p}
            from= 'related-product'
          />
        })}
        
      </Carousel>
      </>}
  </div>: <></>}</>;
}

export default RelatedProducts;
