import React from "react";
import OnlineLoader from "../../components/Loaders/OnlineLoader";
interface CategoryHeaderProps {
  bgColor: string
  color: string
  title: string
  subHeader?: string
  loading?:boolean
}
function CategoryHeader({bgColor, color="#fff", title, subHeader, loading}: CategoryHeaderProps) {
  return <div className="category-header" style={{background: bgColor}} >
        <div className="w-max-width w-full">
            <div className="flex justify-beween items-center">
              <div className="header">
                <div className="title" style={{color: color}}>
                  {loading ? <OnlineLoader width="200px" height="20px" /> : `${title}`}
                </div>
                {subHeader && <div className="sub-header" style={{color: color}}>
                {loading ? <OnlineLoader width="400px" height="12px" /> : `${subHeader}`}</div>}
              </div>

              <div className="breadcrumbs">

              </div>
            </div>
        </div>
  </div>;
}

export default CategoryHeader;
