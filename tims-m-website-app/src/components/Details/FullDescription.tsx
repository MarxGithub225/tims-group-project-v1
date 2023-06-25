import React from "react";
import OnlineLoader from "../Loaders/OnlineLoader";

function FullDescription({loading, description}: any) {
  return <div id="full-description" className="full-description mb-6">
    {loading ? <> <OnlineLoader width="100%" height="10px" /> 
        <div className="my-2"><OnlineLoader width="100%" height="10px" /></div> 
        <div className="my-2"><OnlineLoader width="100%" height="10px" /></div> 
        <div className="my-2"><OnlineLoader width="100%" height="10px" /></div> 
        <div className="my-2"><OnlineLoader width="100%" height="10px" /></div> 
        <div className="my-2"><OnlineLoader width="100%" height="10px" /></div> 
        <div className="my-2"><OnlineLoader width="100%" height="10px" /></div> 
        <div className="my-2"><OnlineLoader width="100%" height="10px" /></div> 
        <div className="my-2"><OnlineLoader width="100%" height="10px" /></div> 
        <div className="my-2"><OnlineLoader width="100%" height="10px" /></div> 
        <div className="my-2"><OnlineLoader width="100%" height="10px" /></div> 
        <div className="my-2"><OnlineLoader width="100%" height="10px" /></div> 
        <div className="my-2"><OnlineLoader width="100%" height="10px" /></div> 
        <div className="my-2"><OnlineLoader width="100%" height="10px" /></div> 
        <div className="my-2"><OnlineLoader width="100%" height="10px" /></div> 
        <div className="my-2"><OnlineLoader width="100%" height="10px" /></div> 
        <div className="my-2"><OnlineLoader width="100%" height="10px" /></div> 
        <OnlineLoader width="40%" height="10px" /> 
        </>
    
    : 
      <p dangerouslySetInnerHTML={{__html: description}} />}
  </div>;
}

export default FullDescription;
