import React from "react";
import OnlineLoader from "../Loaders/OnlineLoader";

function PopularFilter({loading,
  rateFilter,
  setRateFilter
}: any) {

  return <div className="popular-filter p-4">
    <div className="label">{loading ? <OnlineLoader width="200px" height="12px" />: 'Filtre populaire'}</div>
    {loading ?<>
    {
      [0, 1, 2].map(() => {
        return <div className="flex items-center mt-2">
        <OnlineLoader width="10px" height="10px" radius={50} /> <OnlineLoader width="150px" height="12px" />
      </div>
      })
    }
      </> : <>
    <div className="flex items-center mt-2">
      <input type={'radio'} className="mr-2" name="rateFilter" value={5} onChange={(e: any) => setRateFilter(e.target.value)} /> <label style={{color: "#5A7184"}} >5 étoiles</label>
    </div>

    <div className="flex items-center mt-2">
      <input type={'radio'} className="mr-2" name="rateFilter" value={4} onChange={(e: any) => setRateFilter(e.target.value)} /> <label style={{color: "#5A7184"}} >4 étoiles et plus</label>
    </div>

    <div className="flex items-center mt-2">
      <input type={'radio'} className="mr-2" name="rateFilter" value={3} onChange={(e: any) => setRateFilter(e.target.value)} /> <label style={{color: "#5A7184"}} >3 étoiles et plus</label>
    </div></>}
  </div>;
}

export default PopularFilter;
