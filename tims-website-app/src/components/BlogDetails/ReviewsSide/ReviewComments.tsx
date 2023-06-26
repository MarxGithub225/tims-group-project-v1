import React, { useState } from "react";
import DetailsTitle from "../../Details/DetailsTitle";
import ReviewItem from "./ReviewItem";
import {ReactComponent as SpinIcon} from '../../../assets/icons/SpinIcon.svg'
import ReviewItemLoading from "./ReviewItemLoading";
import OnlineLoader from "../../Loaders/OnlineLoader";
import { kFormatter } from "../../../utils/Utils";

function ReviewComments({loading, blog}: any) {
  const [limit, setLimit] = useState<number>(4);

  return <div className="review-comments">
    <DetailsTitle title = {`Tous les commentaires (${kFormatter(blog?.comments?.length)})`} loading={loading} />

    <div className="mt-6">
      {loading? <>{[1, 2, 3, 4].map((rate: number, index: number) => {
        return <ReviewItemLoading/>
      })}</>:
      <>{blog?.comments?.slice(0, limit)?.map((blog: any, index: number) => {
        return <ReviewItem  {...blog}/>
      })}</>}
    </div>

    {(loading || (blog?.comments?.length && blog?.comments?.length> 4 && limit < blog?.comments?.length ) ) ? <div className="cursor-pointer flex justify-center items-center load-more-review"
    onClick={() => setLimit(limit + 1)}
    >
    {loading? <OnlineLoader width="30%" height="12px" /> : <><SpinIcon/> Charger plus d'avis</>}
    </div>: <></>}
  </div>;
}

export default ReviewComments;
