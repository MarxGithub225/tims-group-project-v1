import React from "react";
import ReviewPic from '../../../assets/icons/ReviewPic.png'
import {ReactComponent as StarIcon} from '../../../assets/icons/StarIcon.svg'
import OnlineLoader from "../../Loaders/OnlineLoader";
function ReviewItemLoading() {
  return <div className="review-item ">
    <div className="flex justify-between w-full ">
     <div className={`flex items-center review-item-header`}>
       <>
          <OnlineLoader width="48px" height="48px" radius={50} />
        <div className={`user`}>
          <div className="full-name"><OnlineLoader width="89px" height="12px" /></div>
          <div className="date"><OnlineLoader width="89px" height="12px" /></div>
        </div>
        </>

      
        <div className="stars">
          <div className="flex w-full items-center"><OnlineLoader width="150px" height="12px" /></div>
          <span><OnlineLoader width="300px" height="12px" /></span>
        </div>
        
     </div>

     <div className="review-item-actions flex items-center">
        <div className="action transform rotate-180">
        <OnlineLoader width="30px" height="30px" />
        </div>
        <div className="action un-like">
        <OnlineLoader width="30px" height="30px" />
        </div>
      </div>
    </div>

    <div className={`review-item-content`}>
    <OnlineLoader width="100%" height="12px" />
    <OnlineLoader width="100%" height="12px" />
    </div>
  </div>;
}

export default ReviewItemLoading;
