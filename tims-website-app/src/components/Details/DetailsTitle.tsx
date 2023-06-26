import React from "react";
import OnlineLoader from "../Loaders/OnlineLoader";

function DetailsTitle({title, loading}: any) {
  return <div className="details-title">{loading? <OnlineLoader width="80px" height="12px" /> : `${title}`} </div>;
}

export default DetailsTitle;
