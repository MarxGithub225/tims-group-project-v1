import React from "react";
import ill from '../../assets/images/404-illustration.png'
import FullButton from "../../components/Buttons/FullButton";
import { useNavigate } from "react-router-dom";

function NotFoundView() {
  const navigate = useNavigate();
  return <>
  <section className="error-area pt-20 pb-24">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <img src={ill} alt="" />
          <div className="error-content text-center mt-4">
          <FullButton
          background="#E73A5D"
          label={<>Retour à l'accueil</>}
          color="#FFFFFF"
          size = {14}
          weight = {500}
          func={(e: any) => {
             navigate('/')}
          }
          radius = {8}
        />
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* 404-area-end */}
</>

}

export default NotFoundView;
