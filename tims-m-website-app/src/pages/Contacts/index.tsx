import React from "react";
import { MessageSquare, Navigation2, Phone } from "react-feather";
import breadcrumb from '../../assets/images/breadcrumb_bg.jpg'
function ContactsView() {
  return  <>
  <section className="breadcrumb-area breadcrumb-bg w-full" style={{
    backgroundImage : `url('${breadcrumb}')`
  }}>
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="breadcrumb-content text-center">
            <h2>Contactez-nous</h2>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* contact-area */}
  <section className="contact-area primary-bg pt-24 pb-16">
    <div className="container">
      <div className="contact-wrap-padding">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 col-sm-8">
            <div className="contact-info-box text-center mb-8">
              <div className="contact-box-icon flex items-center justify-center">
                <Navigation2 className="flaticon-placeholder" />
              </div>
              <div className="contact-info-content">
                <h5>Notre siège</h5>
                <p>Cite Gauche, 151 Rue Oussama Ibnou Zaid, Casablanca 2000</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-8">
            <div className="contact-info-box text-center mb-8">
              <div className="contact-box-icon flex items-center justify-center">
                <MessageSquare className="flaticon-mail" />
              </div>
              <div className="contact-info-content">
                <h5>Notre e-mail</h5>
                <p>Ecrivez-nous: suport@tims-group.com</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-8">
            <div className="contact-info-box text-center mb-8">
              <div className="contact-box-icon flex items-center justify-center">
                <Phone className="flaticon-telephone" />
              </div>
              <div className="contact-info-content">
                <h5>Téléphone</h5>
                <p>Appelez-nous: 00212688424563</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* contact-area-end */}
  {/* contact-area */}
  {/* <section className="contact-area pt-100 pb-100">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-5 col-lg-7 col-md-9">
          <div className="contact-title text-center mb-60">
            <div className="section-title text-center">
              <span className="sub-title">DISCUTONS</span>
              <h2 className="title">Envoyez-nous un message</h2>
            </div>
            <p>Nous sommes toujours heureux de discuter avec vous. Assurez-vous de nous écrire si vous avez des questions ou si vous avez besoin d'aide et d'assistance.</p>
          </div>
        </div>
      </div>
      <div className="contact-wrap-padding">
        <div className="row">
          <div className="col-lg-6">
            <div className="contact-form">
              <form action="#">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-grp">
                      <input type="text" placeholder="Nom*" />
                      <i className="far fa-user" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-grp">
                      <input type="text" placeholder="Prénom*" />
                      <i className="far fa-user" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-grp">
                      <input type="email" required placeholder="Votre e-mail*" />
                      <i className="far fa-envelope" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-grp">
                      <input type="text" placeholder="Téléphone*" />
                      <i className="fas fa-mobile-alt" />
                    </div>
                  </div>
                </div>
                <textarea name="message" id="message" placeholder="Veuillez entrer votre message" defaultValue={""} />
                <button type="submit" className="btn">Envoyer</button>
              </form>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="contact-map">
              <img src="/assets/img/images/map.jpg" alt = '' />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> */}
  {/* contact-area-end */}
</>

}

export default ContactsView;
