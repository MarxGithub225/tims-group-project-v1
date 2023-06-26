import React, { useEffect, useState } from "react";
import classNames from 'classnames';
import FullButton from "../../components/Buttons/FullButton";

import axios from 'axios'
import { base_url, file_url } from "../../utils/baseUrl"
import OnlineLoader from "../../components/Loaders/OnlineLoader";
function MainBanner() {

  const AUTOCHANGE_TIME = 4000;

  const [activeSlide, setActiveSlide] = useState<number>(-1);
  const [prevSlide, setPrevSlide] = useState<number>(-1);
  const [sliderReady, setSliderReady] = useState<boolean>(false);


  const changeSlides = (change: number) => {
    const { length } = slides;
    const _prevSlide: number = activeSlide;
    let _activeSlide = _prevSlide + change;
    if (_activeSlide < 0) _activeSlide = length - 1;
    if (_activeSlide >= length) _activeSlide = 0;
    setActiveSlide(_activeSlide);
    setPrevSlide(_prevSlide);
  }

  const [slides, setSlides] = useState<Array<any>>([])

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    ;(async () => {
      try {
        const [sliders] = await Promise.all([
          await axios.get(`${base_url}banner/published?page=1&$limit=5&type=main-banner`)
        ])
        setSlides(sliders.data.data)
      } catch (error) {
        console.error(error)
      }

      setLoading(false)

    })()
  }, [])

  useEffect(()=>{
      setTimeout(() => {
          setActiveSlide(0);
          setSliderReady(true);
      }, 0);

  },[])

  useEffect(()=>{
      setTimeout(() => {
          changeSlides(1)
      }, AUTOCHANGE_TIME);

  },[activeSlide])
  
  return <div className="main-banner w-full">
   
      {loading ?
      <OnlineLoader width="100%" height={`calc(100vh - 390px)`}  />
      : <div className="w-max-width w-full">
        <div className={classNames('slider', { 's--ready': sliderReady })}>
        <div className="slider__slides">
            {slides.map((slide: any, index: number) => (
            <div
            className={classNames('slider__slide', { 's--active': activeSlide === index, 's--prev': prevSlide === index  })}
            key={index}
            >
            <div className="slider__slide-content">
              <div className="w-full h-full flex justify-start items-center">
                <div className="w-3/6">
                  <h3 className={`${index === 0 ? 'animate-fade-in': ''} slider__slide-subheading`}>{slide.title}</h3>

                  <h2 className={`${index === 0 ? 'animate-fade-in': ''} slider__slide-heading`}>
                  {slide.description}
                  </h2>

                  <div className="flex items-center justify-start">
                    {/* <FullButton  
                    background="#E73A5D"
                    label={`Buy Now for $${slide.price}`}
                    color="#FFFFFF"
                    func={() => {}}
                    radius = {4}
                    size = {16}
                    weight = {500}
                    /> className="ml-6"*/}

                    <div >
                      <FullButton  
                      background="#E73A5D"
                      label={`Découvrir`}
                      color="#E73A5D"
                      func={() =>  window.location.href = slide?.link}
                      radius = {4}
                      outline = {true}
                      size = {16}
                      weight = {500}
                      />
                    </div>

                    
                  </div>
                </div>
                <div className={`w-2/6 flex ${index === 0 ? 'animate-ping': ''} justify-end slider__slide-image`}>
                  <img src={`${file_url}/banners/${slide.image}`}  alt="" />
                </div>
              </div>
            </div>

            </div>
            ))}
        </div>
        <div className="slider__control slider__control--left" onClick={() => changeSlides(-1)} />
        {slides.length ?  <div className="slider__control slider__control--right" onClick={() => changeSlides(1)} /> : <></>}
        </div></div>
      }
      
  </div>;
}

export default MainBanner;
