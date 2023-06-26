import React, { useEffect, useState } from "react";
import FullButton from "../../components/Buttons/FullButton";

import axios from 'axios'
import { base_url, file_url } from "../../utils/baseUrl"
import OnlineLoader from "../../components/Loaders/OnlineLoader";

function HomeProductBanner() {

  const [slide, setSlide] = useState<any>(null)

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    ;(async () => {
      try {
        const [sliders] = await Promise.all([
          await axios.get(`${base_url}banner/published?page=1&$limit=5&type=half-banner`)
        ])
        if(sliders?.data?.data?.length)
        setSlide(sliders.data.data[0])
      } catch (error) {
        console.error(error)
      }

      setLoading(false)

    })()
  }, [])
  return <div className="home-product-banner">
    <div className="w-max-width w-full">
        <div className="home-product-banner-content">
           {loading ? <OnlineLoader width={1095} height={461} />
          : <>{slide ? <div className="flex justify-between items-center">
              <div className="w-1/2">
                <div className="w-full flex justify-center illustration-image pt-6">
                <img src={`${file_url}/banners/${slide?.image}`}  alt="" />
                </div>
              </div>

              <div className="w-1/2">
                <div className="w-full flex flex-col justify-center banner-details">
                  <div className="banner-version">Vente flash</div>
                  <div className="banner-product-title">{slide?.title}</div>
                  <div className="banner-product-small-description">{slide?.description}</div>

                  <div className="flex items-center justify-start">
                          <FullButton
                          background="#f4a609"
                          label={`Acheter à ${slide?.promoPrice ? slide?.promoPrice?.toLocaleString() : slide?.price?.toLocaleString()} Dhs`}
                          color="#FFFFFF"
                          size = {16}
                          weight = {500}
                          func={() =>  window.location.href = slide?.link}
                          radius = {4}
                          />
                        </div>
                </div>
              </div>
            </div> : <></>} </>
          }
        </div>
    </div>
  </div>;
}

export default HomeProductBanner;
