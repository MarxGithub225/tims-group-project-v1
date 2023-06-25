/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FeaturesScreen from "../../screens/Features";
import breadcrumb from '../../assets/images/breadcrumb_bg.jpg'
function ReportSavView() {

    const [images, setImages] = useState<Array<any>>([])
    const uploadFile = () =>{
      let element = document.getElementById('imageInput');
      element?.click();
    }

    const handleImage = async (event: any) => {
      let data = images;
      data.push()
      setImages([...images, {show: URL.createObjectURL(event.target.files[0]), file: event.target.files[0]}])
    };

    const removeImage = (image: string) => {
      const index = images.indexOf(image);
      const list = [...images];
      list.splice(index, 1);
      setImages(list)
    }

    return <div> 
  <section className="breadcrumb-area breadcrumb-bg w-full" style={{
    backgroundImage : `url('${breadcrumb}')`
  }}>
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="breadcrumb-content text-center">
            <h2>REPORTER UN SAV</h2>
           
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="terms-and-conditions-area pt-24 pb-24">
   
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-8 col-lg-10">
         
          <div className="my-account-bg" 
          style={{
              backgroundImage : `url('assets/images/my_account_bg.png')`
            }}
          >
            <div className="my-account-content">
              <p>Pour pemettre à notre équipe SAV, de bien traiter correctement vos demandes, veuillez s'il vous remplir ce formulaire ci-dessous avec soin.</p>
              
              <form action="#" className="login-form">
                <div className="row">
                    <div className="col-sm-12 ">
                        <div className="form-grp">
                            <label htmlFor="uea">NOM DE L'APPAREIL <span>*</span></label>
                            <input type="text" id="uea" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-grp">
                            <label htmlFor="uea" className="uppercase">Numéro de série <span>*</span></label>
                            <input type="text" id="uea" />
                        </div>
                    </div>
                </div>

               

                <div className="form-grp">
                  <label htmlFor="address" className="uppercase">décrivez la panne <span>*</span></label>
                  <textarea name="message" className="border-none" id="message"  defaultValue={""} />
                </div>
                
                <div className="form- flex items-center">
                  <label htmlFor="address" className="uppercase w-1/2">Ajouter les images (facultatif) - 4 max.</label>
                  <div
                  className="w-1/2 flex items-center justify-center"
                  style={{
                    height: 100,
                    border : '1px solid #ccc',
                    background : '#ffffff',
                    borderRadius : 5,
                    cursor : 'pointer'
                  }}
                  onClick = {uploadFile}
                  >
                    <i className="flaticon-plus"></i>

                  </div>
                </div>

                <div className="row">
                {images.map((m, key) => {
                  return <div className="col-sm-6 col-md-2" key={key}>
                    <div
                    className="w-full"
                    style={{
                      height: 100,
                      border : '1px solid #ccc',
                      background : '#eaecec',
                      borderRadius : 5,
                      position : 'relative',
                      backgroundImage : `url(${m?.show})`,
                      backgroundPosition : 'center',
                      backgroundSize : 'cover',
                      backgroundRepeat : 'no-repeat'
                    }}

                    
                    >
                      <div
                      style={{
                        width: 20,
                        height: 20,
                        border : '5px solid #ea5455',
                        background : '#eaecec',
                        borderRadius : '50%',
                        position : 'absolute',
                        cursor : 'pointer',
                        top: 5,
                        right: 5
                      }}

                      onClick = {() => removeImage(m)}
                     />
                      </div>
                </div>
                })
                }
                </div>

                
                <div className="form-grp-btn">
                  <a href="#" className="btn">Valider</a>
                  <Link to={'/'} className="btn">Annuler</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <FeaturesScreen/>
  <input type="file" accept="image/*"  onChange={(e) => {handleImage(e)}} id="imageInput" style = {{display : 'none'}} />  
</div>

}

export default ReportSavView;
