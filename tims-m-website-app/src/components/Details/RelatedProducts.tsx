import MainProductCard from "../../components/ProductCards/MainProductCard";
import DetailsTitle from './DetailsTitle';
import Carousel from "react-multi-carousel";

import axios from 'axios'
import { base_url } from "../../utils/baseUrl"
import ProductLoader from "../../components/Loaders/ProductLoader";
import { useEffect, useState } from 'react';
import MobileProductCard from "../ProductCards/MobileProductCard";
import CardCarousel from "../CardCarousel";

function RelatedProducts({categoryId, productId}: any) {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
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
      {window.innerWidth > 768 ? <DetailsTitle title = "Produits similaires" />:  <div className="px-4 option-header">Produits similaires</div>}
      {loading ? 
      <>
        <div className="grid grid-cols-4 gap-6 products-list">
        {[0, 1, 2, 3].map((p: any, index: number) => {
          return <ProductLoader
            width={255}
            height={380}
          />
        })}
        </div>
      </> :
      <>
      {window.innerWidth > 768 ? <Carousel responsive={responsive} 
      >
        {_products.map((p: any, index: number) => {
          return <MainProductCard
            {...p}
            from= 'related-product'
          />
        })}
        
      </Carousel>:  <CardCarousel show={2} academyArrows>
        {_products.map((p: any, index: number) => {
          return <MobileProductCard
            {...p}
            from= 'related-product'
          />
        })}
        
      </CardCarousel>}
      </>}
  </div>: <></>}</>;
}

export default RelatedProducts;
