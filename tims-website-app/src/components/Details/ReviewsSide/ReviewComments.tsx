import React, { useState } from "react";
import DetailsTitle from "../DetailsTitle";
import ReviewItem from "./ReviewItem";
import {ReactComponent as SpinIcon} from '../../../assets/icons/SpinIcon.svg'
import ReviewItemLoading from "./ReviewItemLoading";
import OnlineLoader from "../../Loaders/OnlineLoader";
import { kFormatter } from "../../../utils/Utils";
import {ReactComponent as StarIcon} from '../../../assets/icons/StarIcon.svg'
import { Star } from "react-feather";
import FullButton from "../../Buttons/FullButton";

function ReviewComments({loading, product, goToForm}: any) {
  const [limit, setLimit] = useState<number>(4);

  return <div className="review-comments">
    <>
    {window.innerWidth > 768 && <DetailsTitle title = {`Tous les commentaires (${kFormatter(product?.ratings?.length)})`} loading={loading} />}
    </>

    <>
    {window.innerWidth <= 768 && 
    <div className="flex justify-between w-full">
      <div className="">
        <DetailsTitle title = {`${kFormatter(product?.ratings?.length)} commentaires`} loading={loading} />
        <div className="flex items-center -mt-2" style={{fontSize: 13}}>
          <span className="mr-1">{product?.totalrating}</span> {[1, 2, 3, 4, 4].slice(0, product?.totalrating).map(() => {
              return <StarIcon width="12" />
            })}
            {[1, 2, 3, 4, 4].slice(0, 5 - Number(product?.totalrating)).map(() => {
              return <Star width="12" />
            })}
        </div>
      </div>

      <div className="flex items-center justify-center"
      style={{
        background: 'rgb(231, 58, 93)',
        padding:'0px 15px',
        borderRadius: 5,
        color: 'rgb(255, 255, 255)',
        fontSize: 12,
        fontWeight: 500,
        height: 35
      }}
      onClick={() => {
        console.log(goToForm)
        if(goToForm)
        goToForm()
      }}
      >Votre avis</div>
      
    </div>
    }
    </>
    
    <div className="mt-6">
      {loading? <>{[1, 2, 3, 4].map((rate: number, index: number) => {
        return <ReviewItemLoading/>
      })}</>:
      <>{product?.ratings?.slice(0, limit)?.map((rate: any, index: number) => {
        return <ReviewItem  {...rate}/>
      })}</>}
    </div>

    {(loading || (product?.ratings?.length && product?.ratings?.length> 4 && limit < product?.ratings?.length ) ) ? <div className="cursor-pointer flex justify-center items-center load-more-review"
    onClick={() => setLimit(limit + 1)}
    >
    {loading? <OnlineLoader width="30%" height="12px" /> : <><SpinIcon/> Charger plus d'avis</>}
    </div>: <></>}
  </div>;
}

export default ReviewComments;
