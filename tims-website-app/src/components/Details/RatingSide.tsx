import React from "react";
import {ReactComponent as StarIcon} from '../../assets/icons/WhiteStar.svg'
import OnlineLoader from "../Loaders/OnlineLoader";
function RatingSide({loading, viewsCount, purchaseCount, totalrating}: any) {
  return <div className="product-details-rate flex space-x-3 items-center">
    {loading ? <>
    <OnlineLoader width="61px" height="28px" />
    <OnlineLoader width="150px" height="15px" />
    <OnlineLoader width="150px" height="15px" />
    </> : 
    <>
    <div className="rate flex space-x-1 items-center">
      <StarIcon fill="#fff" stroke="#fff"  />
      <span>{totalrating}</span>
    </div>
    <div className="sold-count">{purchaseCount} unité(s) vendue(s)</div>
    <div className="view-count">{viewsCount} vue(s)</div>
    </>
    }
  </div>;
}

export default RatingSide;
