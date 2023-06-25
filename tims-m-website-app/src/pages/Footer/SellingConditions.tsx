import React from "react";
import { Link } from "react-router-dom";
import breadcrumb from '../../assets/images/breadcrumb_bg.jpg'
function SellingConditionsView() {
  return <>
  {/* breadcrumb-area */}
  <section className="breadcrumb-area breadcrumb-bg w-full" style={{
    backgroundImage : `url('${breadcrumb}')`
  }}>
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="breadcrumb-content text-center">
            <h2>Conditions générales de vente</h2>
            
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
            <h5>Conditions générales du Programme Fournisseur Marketplace Tim’s.</h5>
            <p>1. Reconnaissez être lié par les présentes Conditions du contrat </p>
            <p>2. Certifiez que vous avez le pouvoir d'accepter les Conditions pour votre compte ou le compte de l'entreprise que vous représentez. Ces Conditions du contrat s’ajoutent et doivent être interprétées conjointement au Contrat fournisseur Tim’s Maroc. Les termes en majuscules sont définis dans le Contrat, sauf stipulation contraire. En cas de conflit entre les présentes Conditions et le Contrat, les présentes Conditions prévaudront. La version des présentes Conditions en Français est la version définitive qui fait foi.</p>
          </div>

          <div className="terms-and-conditions-wrap">
            <h5>Achat et vente de Vos Produits</h5>
            <p>1. En vertu du nos conditions, vous pouvez proposer la vente auprès des clients finaux vos produits acceptés par notre entreprise sur notre Marketplace et/ou toutes nos plateformes. Tim’s vous émettra les factures correspondantes concernant la vente de vos produits en application du contrat qui vous relis. Votre inscription au ou votre utilisation de votre compte vendeur vous donne le droit de vendre vos Produits acceptés et continuer à le faire à tout moment ou en toute quantité tant que vous respectez les conditions de vente de Tim’s. </p>
            <p>2. Tim’s réglera chaque facture passée par lui pour la vente de vos produits émise en votre nom en application du présent article dans un délai de 30 jours à compter de la fin du mois d’émission de la facture.</p>
          </div>

          <div className="terms-and-conditions-wrap">
            <h5>Exécution, remboursements et retours</h5>
            <p>1. Vous devez expédier et livrer tous Vos Produits Vendus directement au Client Final en notre nom pour lesquels vous n’utilisez pas le service d’expédition par Tim’s ou ses partenaires logistiques. Vous ne devez pas expédier Vos Produits en dehors des pays non autorisés par l’entreprise. Vous nous informerez rapidement de l’envoi de Vos Produits au Client Final et la propriété de Vos Produits seront transférés à Tim’s dès que nous aurons reçu cette notification. En cas de retour par le Client Final en application de nos politiques de « Retour Produit », nous indiquerons au Client Final d’envoyer le Produit Restitué directement à votre attention. Vous accepterez le Produit Restitué par le Client Final et vous procédez au remboursement ou vous nous autorisez à procéder au remboursement correspondant au client selon le type de paiement effectué par le client. Vous pouvez contester le retour ou le remboursement de tout ou partie du Produit Restitué comme indiqué dans cette page d'aide. Le paiement d’une facture ne limite pas les recours de Tim’s. En cas de retour d’un Produit Restitué sur lequel des données personnelles («Données») peuvent être stockées, vous devrez nettoyer le Produit Restitué en toute sécurité afin de vous assurer que les Données stockées sur le Produit Restitué ont bien été effacées et qu’aucune de ces Données ne peut être restaurée ou récupérée.</p>
            <p>2. Si vous utilisez le service d’expédition de nos partenaires logistiques, la propriété de Vos Produits sera transférée à Tim’s dès l’envoi de Vos Produits au Client Final. En cas de retour, nous replacerons tous les Produits Restitués dans l’inventaire de Vos Produits dans le Programme Expédition Partenaires Logistiques Tim’s et traiterons les retours et remboursements en application des conditions du Contrat.</p>
            <p>3. Vous serez responsable de toutes vos obligations de déclaration TVA et Intrastat découlant de vos ventes et retours de Tim’s.</p>
          </div>

          <div className="terms-and-conditions-wrap">
            <h5>Garanties</h5>
            <p>Outre les déclarations et garanties énoncées dans le Contrat, vous déclarez et certifiez que : (a) Vos Produits peuvent être légalement commercialisés, vendus et distribués sans restriction et ne sont pas soumis à des contrôles à l’exportation ; (b) Vos Produits sont sûrs, conformes à l’usage qui en est attendu et exempts de tous défauts; (c) Vos Éléments sont précis et complets et comportent toute la documentation technique ou de conformité que vous êtes tenu de présenter en vertu de la loi ou qui peut être demandée par Tim’s ; tous les emballages, étiquetages et documents d’importation sont conformes à toutes les lois et règles marocaine et de votre pays et/ou toute autre règle ou loi en vigueur; lorsque Vos Produits sont soumis à une réglementation relative à des matières dangereuses, vous devrez fournir à Tim’s, avant et au moment de la livraison, toutes les informations nécessaires relatives aux Produits, notamment la fiche de données de sécurité, le numéro ONU, la catégorie réglementaire de transport, le groupe d’emballage, le code de nomenclature et le point d’éclair, tels qu’applicables; (d) ni l’exercice par Tim’s de ses droits de licence, ni la vente, la commercialisation ou la distribution de Vos Produits ne portent atteinte aux droits d’un tiers, notamment des droits d'auteur, droits sur les marques, droits sur les dessins et modèles ou droits sur des bases de données ; (e) vous possédez toutes les licences, permissions, autorisations, consentements et permis requis pour fournir Vos Produits en vertu du Programme ; vous utiliserez la fonctionnalité que nous mettons à votre disposition pour exclure du Programme tous Vos Produits que vous n’êtes pas autorisé (en vertu d’un accord avec le fabricant ou le propriétaire d’une marque, ou par tout autre biais) à vendre sur nos plateformes.</p>
          </div>

          <div className="terms-and-conditions-wrap">
            <h5>Indemnisation</h5>
            <p>Outre les obligations d’indemnisation énoncées dans le Contrat, vous défendrez, indemniserez et dégagerez Tim’s, ainsi que nos dirigeants, administrateurs, employés et mandataires, partenaires, prestataires, de toute responsabilité en cas de Plainte découlant de ou associée à un manquement aux garanties énoncées à l’Article 3, y compris (mais sans s’y limiter) les Plaintes fondées sur un préjudice causé par des produits défectueux, dangereux ou non-conformes et tout retrait, tout rappel de produits ou toute autre mesure corrective requise en conséquence.</p>
          </div>

          <div className="terms-and-conditions-wrap">
            <h5>Clients de Tim’s s.a.r.l</h5>
            <p>En vertu du Programme, les Clients Finaux sont des clients de Tim’s. Nous pourrons continuer à mettre à votre disposition une Messagerie ou autre moyen de communication  Acheteur-Vendeur pour vous permettre de répondre aux questions des Clients Finaux uniquement. Hormis les réponses aux questions via ses services de communication acheteurs-vendeurs, vous ne traiterez, ni n'aurez aucun contact avec les Clients Finaux et, dans le cas où un Client Final vous contacterez, vous inviterez ces clients à suivre les indications fournies sur les plateformes de Tim’s sur lequel l'achat a été effectué  pour la résolution des problèmes de service client ; étant précisé que le présent article 5 ne vous impose aucune restriction quant aux personnes ou entités qui constituent des Clients Finaux et vous contactent à propos de sujets sans lien avec Tim’s, le Programme ou la distribution et le traitement des bons de garantie des produits.</p>
          </div>

          <div className="terms-and-conditions-wrap">
            <h5>Rémunération</h5>
            <p>Votre rémunération pour la vente de Vos Produits en vertu du Programme est incluse dans le prix facturé par Tim’s pour la vente de Vos Produits en application de l’Article 1 des présentes Conditions et (sauf en vertu des Politiques du Programme applicables)vous ne pourrez prétendre à, et Tim’s ne paiera, aucun honoraire, coût, dépense, frais, supplément, taxe, droit ou autre rémunération ou remboursement en lien avec le Programme. Tim’s se réserve le droit, à sa seule discrétion, de facturer ou déduire, de temps à autre, les frais de commission ou suppléments administratifs dans les conditions exposées dans le Contrat ou les Politiques du Programme, ou autrement stipulées par Tim’s.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* terms-and-conditions-area-end */}
</>

}

export default SellingConditionsView;
