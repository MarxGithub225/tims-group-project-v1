import React from "react";
import ReviewComments from "./ReviewComments";
import ReviewForm from "./ReviewForm";
import ReviewResume from "./ReviewResume";

function ReviewComponent({loading, product, setProduct}: any) {
  return <div id="reviews">
    <ReviewResume loading={loading} product={product} />

    <div className="flex flex-col-reverse tablet:flex-row tablet:justify-between mt-12">
        <ReviewComments loading={loading} product={product}/>
        <ReviewForm loading={loading} 
        setProduct={(data: any) => setProduct(data)}
        />
    </div>
  </div>;
}

export default ReviewComponent;
