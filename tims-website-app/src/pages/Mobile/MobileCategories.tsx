/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";

import { Slide, toast } from 'react-toastify'
import axios from 'axios'
import { base_url, file_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";
import { useNavigate } from "react-router-dom";


function MobileCategories() {
  const [_categories, setCategories] = useState<Array<any>>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
  
      ;(async () => {
      try {
          setLoading(true)
          await axios.get(`${base_url}category/?page=1&limit=100`, config)
          .then(async (response) => {
              if(response.data) {
                setCategories(response.data.data)
              }

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
      } catch (error) {
          
      }

      })()

      
  }, [])

  return <div className="px-2 pt-2 mobile-categories pb-32">
{
             _categories.map((cat, index) => (
               <div
               key={index}
               className="bg-white"
               style = {{
                  padding: 15,
                  borderRadius: 10,
                  width : '100%',
                  marginBottom : 25
               }}
               >
                  <div
                  className="flex items-center justify-between mb-2"
                  > 

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" 
                    style={{backgroundColor: 'rgba(231, 58, 93, .1)'}}>
                        <img
                        src={`${file_url}/categories/${cat?.icon}`}
                        style = {{
                          width : '80%',
                          height : "auto",
                        }}
                        />
                    </div>
                    <div
                    className="uppercase"
                    style = {{
                        fontSize: 17,
                        fontWeight: 'bold'
                    }}
                    >{cat.name}</div>
                  </div>

                  <div  onClick={() => {navigate(`/product-list/${cat?._id}`)}} >
                    <div
                    style = {{
                      color : "#E73A5D",
                    }}
                    >Voir tout</div>

                  </div>

                  </div>

                
                  <div
                   className="w-full flex items-center justify-start flex-wrap"
                   >
                     {cat.subCategories.map((sub: any, key: number) => (
                        <div
                        key={key}
                        className="w-1/3 mb-3 px-1"
                        onClick={() => {navigate(`/product-sub-category/${sub?._id}`)}} >
                          <div className="bg-white flex flex-col pb-2 items-center">
                            <img
                            src={`${file_url}/categories/${sub?.image}`}
                            style = {{
                              width : '80%',
                              height : "auto",
                            }}
                            />
                          
                            <div
                            className="text-center font-bold tims-txt-2"
                              style = {{
                                fontSize : 11,
                                letterSpacing: .5
                              }}
                              >{sub.name}</div>
                          </div>
                        </div>
                      ))}
                   </div>
                 
               </div>
             ))
           }
  </div>;
}

export default MobileCategories;
