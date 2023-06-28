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
    <DetailsTitle title = {`Tous les commentaires (${kFormatter(product?.ratings?.length)})`} loading={loading} />
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
