import React from "react";
import { useNavigate } from "react-router-dom";
import { file_url } from "../../utils/baseUrl";
interface CategoryWithIconProps {
  icon: string,
  name: string,
  _id: string,
  count: number
}
function CategoryWithIcon({icon, name, count, _id}:CategoryWithIconProps) {
  const navigate = useNavigate()
  return <div className="w-1/6 flex flex-col items-center category-w-icon cursor-pointer"
  onClick={() => {
    navigate(`product-list/${_id}`)
  }}
  >
    <div className="illustration">
      <img src={`${file_url}/categories/${icon}`} width={48} height={48} alt={name}/>
    </div>

    <div className="details">
      <div className="title text-center">
      {name}
      </div>
      <div className="count text-center">
      {count} Produits
      </div>
    </div>
  </div>;
}

export default CategoryWithIcon;
