/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { Link } from "react-router-dom";
import {ReactComponent as LogoIcon} from '../../assets/icons/LogoIcon.svg'

function MainFooter() {
  return <div className="main-footer">
    <div className="w-max-width w-full">

      <div className="w-full flex justify-between">
          <div className="w-2/6">
            <div className="w-full flex flex-col items-center">
                  <div className="footer-logo">
                  <LogoIcon/>
                  </div>
                  <div className="footer-text mb-35">
                    <p>Tim's est le leader panafricain du e-commerce.
                    Notre mission est d’améliorer le quotidien du continent africain en proposant aux consommateurs des services en ligne innovants, pratiques et abordables.
                    </p>
                  </div>
                <div className="footer-social">
                
                </div>
            </div>
          </div>
          <div className="w-1/6">
            <div className="footer-widget">
                <div className="fw-title">
                <h5>Service Client</h5>
                </div>
                <div className="fw-link">
                <ul>
                  <li><Link to={'/terms-and-privacy'}>Termes et confidentialités</Link></li>
                  <li><Link to={'/selling-conditions'} >Conditions de vente</Link></li>
                  <li><Link to={'/q'} >Foire aux questions</Link></li>
                    
                </ul>
                </div>
            </div>
          </div>
          <div className="w-1/6">
            <div className="footer-widget">
                <div className="fw-title mb-35">
                <h5>Quelques liens</h5>
                </div>
                <div className="fw-link">
                <ul>
                    <li><a href={'https://partner.6tims.com'} target="_blank" >Vendre sur TIM'S</a></li>
                    {/* <li><Link to={'/about-us'} >A propos de nous</ Link></li> */}
                    <li><Link to={'/contact-us'} >Contactez-nous</Link></li>
                </ul>
                </div>
            </div>
          </div>
          <div className="w-2/6">
            <div className="footer-widget">
                <div className="fw-title mb-35">
                <h5>Service clientèle</h5>
                </div>
                <div className="footer-contact">
                  <ul>
                      <li><i className="fas fa-map-marker-alt" /> Cite Gauche, 151 Rue Oussama Ibnou Zaid, Casablanca 20000 - Maroc</li>
                      <li><i className="fas fa-headphones" />00212688424563</li>
                      <li><i className="fas fa-envelope-open" />suport@tims-group.com</li>
                  </ul>
                </div>
            </div>
          </div>
      </div>
    </div>
  </div>;
}

export default MainFooter;
