import React from "react";
import ReviewPic from '../../../assets/icons/ReviewPic.png'
import {ReactComponent as StarIcon} from '../../../assets/icons/StarIcon.svg'
import OnlineLoader from "../../Loaders/OnlineLoader";
function ReviewItemLoading() {
  return <div className="review-item ">
    <div className="flex justify-between w-full ">
     <div className={`flex items-center review-item-header ${window.innerWidth <= 768 && 'w-full justify-between'}`}>
        {window.innerWidth > 768 && <>
          <OnlineLoader width="48px" height="48px" radius={50} />
        <div className={`user ${window.innerWidth <= 768 && 'ml-3'}`}>
          <div className="full-name"><OnlineLoader width="89px" height="12px" /></div>
          <div className="date"><OnlineLoader width="89px" height="12px" /></div>
        </div>
        </>}

        {window.innerWidth <= 768 && <div className="flex items-center">
        <img src={ReviewPic} alt=""/>
        <div className={`user ${window.innerWidth <= 768 && 'ml-3'}`}>
          <div className="full-name">Daisy Murphy</div>
          <div className="date">July, 23 2020</div>
        </div>
        </div>}
        {window.innerWidth > 768 && <div className="stars">
          <div className="flex w-full items-center"><OnlineLoader width="150px" height="12px" /></div>
          <span><OnlineLoader width="300px" height="12px" /></span>
        </div>}

        {window.innerWidth <= 768 && <div className="stars">
          <span>4.8 Avis</span>
          <div className="flex w-full items-center"><StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/></div>
          
        </div>}
     </div>

     {window.innerWidth > 768 &&<div className="review-item-actions flex items-center">
        <div className="action transform rotate-180">
        <OnlineLoader width="30px" height="30px" />
        </div>
        <div className="action un-like">
        <OnlineLoader width="30px" height="30px" />
        </div>
      </div>}
    </div>

    <div className={`review-item-content ${window.innerWidth <= 768 && 'mt-3'}`}>
    <OnlineLoader width="100%" height="12px" />
    <OnlineLoader width="100%" height="12px" />
    </div>
  </div>;
}

export default ReviewItemLoading;
