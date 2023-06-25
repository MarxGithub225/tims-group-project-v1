import React, { useEffect, useState } from "react";
import DetailsTitle from "../DetailsTitle";
import {ReactComponent as StarIcon} from '../../../assets/icons/StarIcon.svg'
import ReviewBar from "./ReviewBar";
import OnlineLoader from "../../Loaders/OnlineLoader";
import { kFormatter } from "../../../utils/Utils";

function ReviewResume({loading, product}: any) {

  const [rateStats, setStats] = useState<Array<any>>([0, 0, 0, 0, 0])
  useEffect(() => {
    if(product) {
      const Rates1 = product?.ratings?.filter((r: any) => r.star === 1)?.length;
      const Rates2 = product?.ratings?.filter((r: any) => r.star === 2)?.length;
      const Rates3 = product?.ratings?.filter((r: any) => r.star === 3)?.length;
      const Rates4 = product?.ratings?.filter((r: any) => r.star === 4)?.length;
      const Rates5 = product?.ratings?.filter((r: any) => r.star === 5)?.length;

      setStats([
        Rates5,
        Rates4,
        Rates3,
        Rates2,
        Rates1
      ])
    }
  }, [product])
  return <div className="review-resume">
   <div className="flex flex-col tablet:flex-row tablet:justify-between tablet:items-end">
    <div className="w-full tablet:w-1/3">
      <DetailsTitle title = "Notes" loading={loading}/>
      <p className="review-resume-title tims-txt">
      {loading? <OnlineLoader width="100%" height="12px" /> : `Pour ${product?.title}`}
      </p>

      <div className="flex items-center rate">
        
        {loading? <OnlineLoader width="28px" height="28px" /> : <StarIcon width={28} height={28} />}
        <div className="rate-score ml-6 flex items-center">
          <span className="value">{loading? <OnlineLoader width="28px" height="28px" /> : `${product?.totalrating}`}</span>
          <span className="label flex items-center">/{loading? <OnlineLoader width="28px" height="28px" /> : '5.0'}</span>
        </div>
      </div>

      {product?.totalrating > 0 && <div className="recommandation mb-4 tablet:mb-0">
        <div className="title">
        
        {loading? <OnlineLoader width="100px" height="12px" /> : `Recommandation`}
        </div>

        <span>{loading? <OnlineLoader width="100%" height="12px" /> : `Ce produit vous est récommandé à ${(product?.totalrating * 100) / 5}%.`}</span>
      </div>}
    </div>

    <div className="w-full tablet:w-2/3 review-caracteristics">
      <div className="flex flex-col items-end w-full">

      {loading? 
      <>
      <div className="mb-3"><OnlineLoader width="600px" height="12px" /></div>
      <div className="mb-3"><OnlineLoader width="600px" height="12px" /></div>
      <div className="mb-3"><OnlineLoader width="600px" height="12px" /></div>
      <div className="mb-3"><OnlineLoader width="600px" height="12px" /></div>
      <div className="mb-3"><OnlineLoader width="600px" height="12px" /></div>
      </>
      : 
      <>
        <div className="flex w-full items-center justify-end mb-3">
          <div className="score flex items-center">5 <StarIcon className="ml-0.5"/></div>
          <ReviewBar value = {100} />
          <div className="count">{kFormatter(rateStats[0])}</div>
        </div>

        <div className="flex w-full items-center justify-end mb-3">
          <div className="score flex items-center">4 <StarIcon className="ml-0.5"/></div>
          <ReviewBar value = {80} />
          <div className="count">{kFormatter(rateStats[1])}</div>
        </div>

        <div className="flex w-full items-center justify-end mb-3">
          <div className="score flex items-center">3 <StarIcon className="ml-0.5"/></div>
          <ReviewBar value = {60} />
          <div className="count">{kFormatter(rateStats[2])}</div>
        </div>

        <div className="flex w-full items-center justify-end mb-3">
          <div className="score flex items-center">2 <StarIcon className="ml-0.5"/></div>
          <ReviewBar value = {40} />
          <div className="count">{kFormatter(rateStats[3])}</div>
        </div>

        <div className="flex w-full items-center justify-end mb-3">
          <div className="score flex items-center">1 <StarIcon className="ml-0.5"/></div>
          <ReviewBar value = {20} />
          <div className="count">{kFormatter(rateStats[4])}</div>
        </div>
      </>
      }
        
      </div>
    </div>
   </div>
  </div>;
}

export default ReviewResume;
