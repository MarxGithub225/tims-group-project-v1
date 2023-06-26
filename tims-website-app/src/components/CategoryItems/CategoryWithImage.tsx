import React from "react";
import { useNavigate } from "react-router-dom";
import {ReactComponent as ArrowIcon} from '../../assets/icons/ArrowIcon.svg';
interface SUBCategoryProps {
  label: string
  items_total: number
}
interface CategoryWithImageProps {
  image: string
  bgColor: string
  category_name: string
  items_total: number,
  subCategories: Array<SUBCategoryProps>
}
function CategoryWithImage({image, bgColor, category_name, items_total, subCategories}: CategoryWithImageProps) {
  const navigate = useNavigate()
  return <div className="category-w-image cursor-pointer">
    <div className="image-feature" style={{background: bgColor+'20'}}>
          <img src={image} alt="" />
    </div>

    <div className="product-title">
      <div className="label" onClick={() => navigate('/product-list/categoryId')}> {category_name} </div>
      <div className="count" onClick={() => navigate('/product-list/categoryId')} style={{color: bgColor}} > {items_total} items</div>
    </div>

    <div className="sub-items">
      {subCategories.map((sub: SUBCategoryProps, key: number) => {
        return <div key={key} className="sub-item">
          <div className="label" onClick={() => navigate('/product-list/subCategory')}> <div className="" style={{transform: 'rotate(-90deg)'}} > <ArrowIcon/></div> {sub.label} </div>
          <div className="count" onClick={() => navigate('/product-list/subCategory')}> {sub.items_total} </div>
        </div>
      })}
    </div>
  </div>;
}

export default CategoryWithImage;
