import React from "react";
import OnlineLoader from "../Loaders/OnlineLoader";

function TitleSide({loading, title}: any) {
  return <div className="product-details-title">
      {loading ?<> <OnlineLoader width="100%" height="18px" /> 
        <div className="my-2"><OnlineLoader width="100%" height="18px" /></div> <OnlineLoader width="40%" height="18px" /> </>
      : `${title}`}
  </div>;
}

export default TitleSide;
