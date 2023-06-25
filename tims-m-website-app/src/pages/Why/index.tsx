/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import FeaturesScreen from "../../screens/Features";
import breadcrumb from '../../assets/images/breadcrumb_bg.jpg'
function WhyView() {
    return <div>
  {/* breadcrumb-area */}
  <section className="breadcrumb-area breadcrumb-bg w-full" style={{
    backgroundImage : `url('${breadcrumb}')`
  }}>
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="breadcrumb-content text-center">
            <h2>POURQUOI VENDRE SUR YEPIA ?</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/yepia-seller">Vendre sur YEPIA</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Pourquoi vendre sur Yépia</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* breadcrumb-area-end */}
  {/* terms-and-conditions-area */}
  <section className="terms-and-conditions-area pt-24 pb-24">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="terms-and-conditions-wrap">
            <h5 className="uppercase">TRANSPARENCE- HONNETETé- SATISFACTION</h5>
            <p>Ce sont ces valeurs qui fondent depuis dix ans la <span className="font-bold">notoriété</span> de <span className="font-bold">TIM'S CI</span>.</p>
            <p>Le sens du service client, cœur des activités au sein de TIM'S, a permis de la forger.</p>
            <p>S’étant donnée pour mission de mettre à portée de toutes les bourses, les nouvelles technologies de l’information au travers de matériels informatique de haute performance et de qualité supérieur, elle a su gagner le marché porteur des NTIC en Côte d’Ivoire et ainsi s’imposer dans le secteur des NTIC avec 5 showroom dans les communes stratégiques de la capitale.</p>
            <p>Son ambition pour la prochaine décennie, est de conquérir tous les territoires de la République et ceux d’ailleurs.</p>
            <p>Mais <span className="text-blue font-bold">TIM'S</span>, c’est aussi la main tendue vers les autres.</p>

            <p className="font-bold mt-4">Consciente des effets néfastes que la pandémie du COVID laisse dans les petites et grandes économies, elle ouvre un service permettant à ces économies affectées, de conquérir une part de marché et ainsi écouler leurs stocks.</p>
            <p className="font-bold">En effet, devenir partenaire avec TIM'S via son site marchand YEPIA, c’est vous donner la possibilité d’avoir un retour sur investissement et faire vivre vos activités.</p>
            <p>Nous mettons à votre disposition notre clientèle et ainsi écoulons vos stocks le plus rapidement.</p>

            <p className="text-blue mt-4">Les avantages d’une telle offre:</p>

            <ul>
              <li className="text-red">Plus de souci à trouver des clients, nous mettons les nôtres à votre disposition.</li>
              <li className="text-red">Le partenariat vous octroie l’exclusivité de nos services.</li>
              <li className="text-red">Notre service après-vente offert</li>
              <li className="text-red">Livraison offerte</li>
 
              <li className="text-red">SAV : Les pannes mineures sont prises en charge par notre service après-vente.</li>
              <li className="text-red">Livraison gratuite seulement à Abidjan.</li>
            </ul>
          </div>
          
        </div>
      </div>
    </div>
  </section>
  <FeaturesScreen/>
</div>

}

export default WhyView;
