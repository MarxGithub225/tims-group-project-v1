import { useEffect, useState } from "react";

import SmallProductCard from "../../components/ProductCards/SmallProductCard";
import {ReactComponent as ArrowIcon} from '../../assets/icons/ArrowIcon.svg'

import axios from 'axios'
import { base_url } from "../../utils/baseUrl"


function ProductLists() {
const [_products_list, setProducts] = useState<Array<any>>([])

  useEffect(() => {
    ;(async () => {
      try {
        const [products] = await Promise.all([
          await axios.get(`${base_url}product/all-categories-products`)
        ])
        setProducts(products.data.data)
      } catch (error) {
        console.error(error)
      }


    })()
  }, [])
  return <div className="product-list">
    <div className="w-max-width w-full">
        <div className="product-list-content w-full flex justify-between">
        {_products_list.slice(0,3).map((pl: any, index: number) => {
          return <div key={index} className="product-list-item w-1/3 pr-4">
            <div className="product-list-item title mb-12">
              {pl?.categoryId?.name}
            </div>

            {pl?.data?.map((pdt: any, index2: number) => {
              return <SmallProductCard key={index2} {...pdt} />
            })}

            {pl?.count > 3 && <div className="view-more flex items-center justify-between">
              <span>View More Products</span>
              <div style={{transform: 'rotate(-90deg)'}} ><ArrowIcon stroke="#5C6AC4" /></div>
            </div>}
          </div>
        })}
        </div>
    </div>
  </div>;
}

export default ProductLists;
