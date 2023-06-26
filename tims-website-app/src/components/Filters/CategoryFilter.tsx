import React from "react";
import {ReactComponent as BlackHeadSet} from '../../assets/icons/BlackHeadSet.svg'
import {ReactComponent as ArrowIcon} from '../../assets/icons/ArrowIcon.svg'
import OnlineLoader from "../Loaders/OnlineLoader";
import { useNavigate } from "react-router-dom";
function CategoryFilter({loading, categorie}: any) {
  const navigate = useNavigate()
  return <div className="popular-filter p-4">
    <div className="label">{loading ? <OnlineLoader width="200px" height="12px" />: 'Sous catégories'}</div>

    
    {loading ?<>
    {
      [0, 1, 2, 3, 4].map(() => {
        return <div className="flex items-center justify-between mt-2">
        <div className="flex items-center"><OnlineLoader width="150px" height="12px" /></div>
        <ArrowIcon/>
      </div>
      })
    }
      </> : <>
      {
      categorie?.subCategories?.map((cate: any, key:number) => {
        return <div key={key} className="flex items-center justify-between mt-2 "
        onClick={() => navigate(`/product-sub-category/${cate?._id}`)}
        >
        <div className="flex items-center cursor-pointer"><label style={{color: "#5A7184"}} className="cursor-pointer" >{cate?.name}</label></div>
        <ArrowIcon/>
      </div>
      })
    }
      </>
    }

    
  </div>;
}

export default CategoryFilter;
