import React, { useEffect, useState } from "react";
import CategoryWithIcon from "../../components/CategoryItems/CategoryWithIcon";

import { base_url } from "../../utils/baseUrl"
import axios from 'axios'
import AllCategoriesLoader from "../../components/Loaders/AllCategoriesLoader";

function AllCategories() {

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
     <div className="w-max-width w-full">
        {loading ? <div className="flex justify-center w-full">
        <AllCategoriesLoader width={"43%"} height={158} />
        </div> :
      <div className="home-category-content">
          <div className="home-category-list flex justify-center items-center">
            {_categories
            .filter((c: any) => c.count > 0)
            .map((c: any, index: number) => {
              return <CategoryWithIcon key={index} {...c?.categoryId} count={c?.count} />
            })}
          </div>
      </div>}
     </div>
  </div>;
}

export default AllCategories;
