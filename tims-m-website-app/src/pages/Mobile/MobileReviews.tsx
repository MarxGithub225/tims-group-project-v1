import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import ReviewComments from "../../components/Details/ReviewsSide/ReviewComments";
import ReviewForm from "../../components/Details/ReviewsSide/ReviewForm";
import ReviewResume from "../../components/Details/ReviewsSide/ReviewResume";
import { useParams } from "react-router-dom";
function MobileReviews() {
    const mobileHeader: any = useRef(null)
    let {productId} = useParams()
    let [product, setProduct] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)

    let descriptionRef: any = useRef(null);
    const goToForm = () => {
      if (descriptionRef) {
        setTimeout(() => {
            descriptionRef?.current?.scrollIntoView({ behavior: "smooth" })
        }, 500);
      }
    }

  useEffect(() => {
    if (mobileHeader) {
        setTimeout(() => {
        mobileHeader?.current?.scrollIntoView({ behavior: "smooth" })
        }, 50);
    }
    ;(async () => {

      if(productId) {
        try {
          const this_product = await axios.get(`${base_url}product/id/${productId}`)
          setProduct(this_product.data)
        } catch (error) {
        }
  
        setLoading(false)
      }

    })()

    
  }, [productId])
  return <div className={`p-4`} ref={mobileHeader}>
    <div className="flex flex-col tablet:flex-row tablet:justify-between">
        <ReviewComments loading={loading} product={product}
        goToForm = {() => goToForm()}
        />
         <div className="" ref={descriptionRef}>
          <ReviewForm loading={loading} 
        setProduct={(data: any) => setProduct(data)}
        />
         </div>
        
    </div>
  </div>;
}

export default MobileReviews;

