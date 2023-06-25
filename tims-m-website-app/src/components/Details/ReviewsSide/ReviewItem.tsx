import { useState } from "react";
import ReviewPic from '../../../assets/images/UserIcon.png'
import {ReactComponent as StarIcon} from '../../../assets/icons/StarIcon.svg'
import moment from "moment";
import 'moment/locale/fr'  // without this line it didn't work
moment.locale('fr')
function ReviewItem(props: any) {
  const [readMore, setReadMore] = useState<boolean>(false)
  return <div className="review-item ">
    <div className="flex justify-between w-full ">
     <div className={`flex items-center review-item-header ${window.innerWidth <= 768 && 'w-full justify-between'}`}>
        {window.innerWidth > 768 && <>
        <img src={ReviewPic} alt=""/>
        <div className={`user ${window.innerWidth <= 768 && 'ml-3'}`}>
          <div className="full-name">{props?.userData?.fullName}</div>
          <div className="date">{moment(props?.postedAt).format('DD MMMM YYYY')}</div>
        </div>
        </>}

        {window.innerWidth <= 768 && <div className="flex items-center">
        <img src={ReviewPic} alt=""/>
        <div className={`user ${window.innerWidth <= 768 && 'ml-3'}`}>
        <div className="full-name">{props?.userData?.fullName}</div>
        <div className="date">{moment(props?.postedAt).format('DD MMMM YYYY')}</div>
        </div>
        </div>}
        {window.innerWidth > 768 && <div className="stars">
          <div className="flex w-full items-center">
            {[1, 2, 3, 4, 4].slice(0, props?.star).map(() => {
              return <StarIcon/>
            })}
          </div>
        </div>}

        {window.innerWidth <= 768 && <div className="stars">
          <span>{props?.star} étoiles</span>
          <div className="flex w-full items-center">
          {[1, 2, 3, 4, 4].slice(0, props?.star).map(() => {
              return <StarIcon/>
            })}
          </div>
          
        </div>}
     </div>
    </div>

    <div className={`review-item-content ${window.innerWidth <= 768 && 'mt-3'}`}>
    <div className={`${!readMore ? 'tims-txt-2': ''} `}>{props?.comment}</div> 
    {props?.comment?.length > 174 && <span
    onClick={() =>setReadMore(!readMore)}
    >
      {!readMore ? 'Lire plus': 'Lire moins'}
    </span>}
    </div>
  </div>;
}

export default ReviewItem;
