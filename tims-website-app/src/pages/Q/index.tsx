import React from "react";

function QView() {
  return <section className="testimonial-area pt-24 pb-24">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="section-title text-center mb-4">
          <h2 className="title">Foire aux questions</h2>
        </div>
      </div>
    </div>
    <div className="row testimonial-active">
      <div className="col-xl-4">
        <div className="testimonial-item text-center">
          
          <div className="testi-avatar-info">
            <span><strong>PAIEMENT</strong></span>
            <h5>Quels sont les moyens de paiement  acceptés ?</h5>
            
          </div>
          <div className="testi-content text-left">
            <p>
                <ol>
                    <li>Paiement par carte bancaire (visa, MasterCard)</li>

                    <li>Prélèvement à l’expédition</li>
                </ol>
            </p>
            <p>Le prélèvement à l’expédition (Abidjan), c’est lorsque vous êtes encaissé lors de la réception de votre colis.</p>
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="testimonial-item text-center">
          
          <div className="testi-avatar-info">
            <span><strong>RETOUR ET ECHANGE</strong></span>
          </div>
          <div className="testi-content">

            <p className="my-4">
                <ol>
                    <li>
                    <h5>Comment retourner ma commande ?</h5>
                    <p>Pour toute erreur constatée sur l’un de nos produits, vous pouvez nous le faire savoir depuis notre adresse email</p>
                    </li>

                    <li className="mt-3">
                    <h5>Délai de remboursement </h5>
                    <p>Lorsqu’un article ne satisfait pas à votre commande soit pour défaut de fabrication ou erreur d’article, un autre article de la même catégorie vous est proposé.</p>
                    </li>

                </ol>
            </p>
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="testimonial-item text-center">
          
          <div className="testi-avatar-info">
            <span><strong>LIVRAISON</strong></span>
            
          </div>
          <div className="testi-content text-left">
                <p className="my-4">
                    <ol>
                        <li>
                        <h5>En combien de temps s’effectue la livraison ?</h5>
                        <p>24H à 72H00.</p>
                        </li>

                    </ol>
                </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

}

export default QView;
