import React from "react";
import OnlineLoader from "../Loaders/OnlineLoader";
function SmallDescription({loading, smallDescription}: any) {
  return <p className="details-small-decription" style={{fontSize: 16}}>
    {loading ? <> <OnlineLoader width="100%" height="10px" /> 
        <div className="my-2"><OnlineLoader width="100%" height="10px" /></div> 
        <div className="my-2"><OnlineLoader width="100%" height="10px" /></div> 
        <OnlineLoader width="40%" height="10px" /> 
        </>
    
    : <p dangerouslySetInnerHTML={{__html: smallDescription}} />}
  </p>;
}

export default SmallDescription;
