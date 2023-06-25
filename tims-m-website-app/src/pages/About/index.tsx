import React from "react";
import CountUp from 'react-countup';
import breadcrumb from '../../assets/images/breadcrumb_bg.jpg'
import about from '../../assets/images/about_img.jpg'
import { Box, Home, Users } from "react-feather";

import {ReactComponent as CarIcon} from '../../assets/icons/features/CarIcon.svg'
import {ReactComponent as HeadPhone} from '../../assets/icons/features/HeadPhone.svg'
import {ReactComponent as MoneyIcon} from '../../assets/icons/features/MoneyIcon.svg'
function AboutView() {
    
  return  <>
  {/* breadcrumb-area */}
  <section className="breadcrumb-area breadcrumb-bg w-full" style={{
    backgroundImage : `url('${breadcrumb}')`
  }}>
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="breadcrumb-content text-center">
            <h2>à Propos de nous</h2>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* breadcrumb-area-end */}
  {/* about-area */}
  <section className="about-area pt-24 pb-24">
    <div className="container">
      <div className="row align-items-xl-center">
        <div className="col-lg-6">
          <div className="about-img">
            <img src={about} alt ='' />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="about-content">
            <h4 className="title">Bienvenue à TIM'S</h4>
            <p className="font-bold text-lg mb-6">Nous connectons des millions d'acheteurs aux matériels informatiques tout en créant des opportunités économiques pour tous.</p>
            <p>Nous proposons également une large gamme de services et d’outils aidant les entrepreneurs créatifs à démarrer, gérer et faire évoluer leur entreprise. Notre mission est de rendre accessible l’informatique à tous et ce grâce à notre market place.</p>
            <div className="our-mission-wrap">
              <h4 className="title">Nos statistiques</h4>
              <div className="our-mission-list">
                <div className="mission-box">
                  <div className="mission-icon">
                    <Box/>
                  </div>
                  <div className="mission-count">
                    <h2><CountUp className="odometer" start={0} 
                    duration={2.75}
                    separator=" "
                    prefix="+"
                    suffix="M"
                    end={45} /></h2>
                    <span>Produits vendus</span>
                  </div>
                </div>
                <div className="mission-box">
                  <div className="mission-icon">
                    <Home/>
                  </div>
                  <div className="mission-count">
                    <h2><CountUp className="odometer" start={0} 
                    end={5} /></h2>
                    <span>Show-rooms</span>
                  </div>
                </div>
                <div className="mission-box">
                  <div className="mission-icon">
                    <Users/>
                  </div>
                  <div className="mission-count">
                    <h2><CountUp className="odometer" start={0} 
                    duration={2.75}
                    separator=" "
                    prefix="+"
                    suffix="K"
                    end={3} /></h2>
                    <span>Utilisateurs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* about-area-end */}
  {/* features-area */}
  <section className="features-area theme-bg pt-24 pb-16 w-full">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="section-title text-center mb-16">
            <span className="sub-title">Pourquoi nous choisir</span>
            <h2 className="title">expérience dans la mise en place</h2>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6">
          <div className="features-wrap-item mb-8">
            <div className="features-icon">
              <CarIcon className="flaticon-shuttle" />
            </div>
            <div className="features-content">
              <h5>Livraison rapide à domicile</h5>
             
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="features-wrap-item mb-8">
            <div className="features-icon">
              <MoneyIcon className="flaticon-secure-payment" />
            </div>
            <div className="features-content">
              <h5>Paiement sécurisé</h5>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="features-wrap-item mb-8">
            <div className="features-icon">
              <HeadPhone className="flaticon-24-hours-support" />
            </div>
            <div className="features-content">
              <h5>Assistance 24/7</h5>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* features-area-end */}
</>

}

export default AboutView;
