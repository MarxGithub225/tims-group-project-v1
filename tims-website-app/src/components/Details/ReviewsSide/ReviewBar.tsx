import React from "react";

function ReviewBar({value = 20}: any) {
  return <div className="review-bar w-full">
    <div className="review-bar-value"
    style={{width: value + '%'}}
    />
  </div>;
}

export default ReviewBar;
