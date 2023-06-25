import React, { Fragment, useState } from "react";
import FullButton from "../../Buttons/FullButton";
import DetailsTitle from "../DetailsTitle";
import OnlineLoader from "../../Loaders/OnlineLoader";
import { isUserLoggedIn } from "../../../utils/Utils";
import { Link, useParams } from "react-router-dom";

import { Slide, toast } from 'react-toastify'

import axios from 'axios'
import { base_url } from "../../../utils/baseUrl";
import { Spinner } from "reactstrap";
import { config } from "../../../utils/axiosconfig";

function ReviewForm({loading, setProduct}: any) {
  const {productId} = useParams()
  const [loadingForm, setLoading] = useState(false)
  
  const [rating, setRating] = useState({
    star : 1, 
    prodId: productId, 
    comment: ''
  });
  const onSubmit = async () => {
    setLoading(true)
    await axios.put(`${base_url}product/rating`, {...rating, prodId: productId}, config)
    .then((response): any => {
      if(setProduct) {
        setProduct(response.data)
      }
      setRating({
        star : 1, 
        prodId: productId, 
        comment: ''
      });
      setLoading(false)
       
      toast.success(
        <Fragment>
          <div className='toastify-header'>
            <div className='title-wrapper'>
              <h6 className='toast-title font-weight-bold'>Avis enregistré avec succès!</h6>
            </div>
          </div>
        </Fragment>,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
    })

    .catch((error) => {
      let errMessage = "Une erreur s'est produite, merci de réessayer plustard.";
      console.log('Error', error)
      toast.error(
        errMessage,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      setLoading(false)
    })
  }
  return <div className="review-form mb-4 tablet:mb-0">
      <div className="content">
        <DetailsTitle title = "Laisser un commentaire" loading={loading}/>


        <div className="form-group">
          <label htmlFor=""></label>
          <label htmlFor="">{loading? <OnlineLoader width="100px" height="12px" /> : `Choisir votre note *`}</label>
          {loading? <OnlineLoader width="100%" height="48px" /> : 
          <select name="" id=""
          value={rating.star}
          onChange={e => setRating({...rating, star: Number(e.target.value)})}
          >
          <option value="5">5 étoiles</option>
          <option value="4">4 étoiles</option>
          <option value="3">3 étoiles</option>
          <option value="2">2 étoiles</option>
          <option value="1" selected>1 étoile</option>
        </select>
          }
          
        </div>

        <div className="form-group">
          <label htmlFor="">{loading? <OnlineLoader width="100px" height="12px" /> : `Votre commentaire *`}</label>
          {loading? <OnlineLoader width="100%" height="190px" /> : <textarea name="" id="" 
          value={rating.comment}
          onChange={e => setRating({...rating, comment: e.target.value})}
          />}
        </div>
        {loading? <OnlineLoader width="100%" height="48px" /> : 
        <>
        {isUserLoggedIn() ? <FullButton
        disabled={
          !rating.comment
        }
        background="#e73a5d"
        label={<>{loadingForm ?  <Spinner animation="grow" style={{width: 17, height: 17}}/> : 'Envoyer'}</>}
        color="#FFFFFF"
        size = {16}
        weight = {500}
        func={(e: any) => onSubmit()}
        radius = {4}
        />: <p className="cant-connect-message text-center w-80">Vous ne pouvez donner votre avis pour le moment, veullez d'abord <Link to={`/login?redirect=true&urlRequest=/details/${productId}&tag=reviewform`}>vous connecter</Link>.</p>}
        </>

        }
      </div>
      
  </div>;
}

export default ReviewForm;
