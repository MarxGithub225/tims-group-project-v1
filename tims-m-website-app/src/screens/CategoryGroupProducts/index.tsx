
import { Link } from "react-router-dom";
import MainProductCard from "../../components/ProductCards/MainProductCard";
interface CategoryGroupProductsProps {
  background: string
  categoryTitle: string
  id: string
  _products: Array<any>
}
function CategoryGroupProducts({id, background, categoryTitle, _products}: CategoryGroupProductsProps) {
  
  return <div className="category-group-products mb-10" style={{backgroundColor: '#FFFFFF'}} >
    <div className="w-max-width w-full" >
      <div className="header w-full px-4 rounded-t-xl" style={{backgroundColor: "#f7a700"}}>
        <div className="title" >{categoryTitle}</div>
        {_products?.length > 20? <div className="view-all">
          <Link 
          style={{textDecoration: 'none', color: 'inherit'}}
          to={`product-list/${id}`}
          className="uppercase cursor-pointer ">Voir plus de {_products?.length} produits</Link>
          </div>: <></>}
      </div>
      <div className="grid grid-cols-4 products-list gap-x-6" style={{borderBottom: '1px dashed #f4a609'}}>
      {_products
      .slice(0, 20)
      .map((p: any, index: number) => {
        return<MainProductCard
          {...p}
        />
      })}
      </div>

      
    </div>
  </div>;
}

export default CategoryGroupProducts;
