import React from "react";
import ReviewComments from "./ReviewComments";
import ReviewForm from "./ReviewForm";

function ReviewComponent({loading, blog, setBlog}: any) {
  return <div id="reviews">
    <div className="flex flex-col-reverse tablet:flex-row tablet:justify-between mt-12">
        <ReviewComments loading={loading} blog={blog}/>
        <ReviewForm loading={loading} 
        setBlog={(data: any) => setBlog(data)}
        />
    </div>
  </div>;
}

export default ReviewComponent;
