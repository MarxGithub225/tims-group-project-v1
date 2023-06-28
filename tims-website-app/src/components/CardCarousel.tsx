import React, { useState } from 'react'
import './cardcarousel.css'
import {ReactComponent as Arrow} from '../assets/icons/ArrowLeftIcon.svg'
interface Props {
  show?: number
  children: any
  withGrow?: boolean
  customNextIconPosition?: boolean
  showIndex?: boolean
  academyArrows?: boolean
}

const CardCarousel = ({
  show = 4,
  children = undefined,
  academyArrows=false
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchPosition, setTouchPosition] = useState(null)

  const next = () => {
    if (currentIndex < children?.length - show) {
      setCurrentIndex((prevState) => prevState + 1)
    }
  }

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1)
    }
  }

  const handleTouchStart = (e: any) => {
    const touchDown = e.touches[0].clientX
    setTouchPosition(touchDown)
  }

  const handleTouchMove = (e: any) => {
    const touchDown = touchPosition

    if (touchDown === null) {
      return
    }

    const currentTouch = e.touches[0].clientX
    const diff = touchDown - currentTouch

    if (diff > 5) {
      next()
    }

    if (diff < -5) {
      prev()
    }

    setTouchPosition(null)
  }

  const items = []
  for (let i = 0; i < Math.ceil(children?.length - show + 1); i++) {
    items.push(i)
  }
  const intervalle = show === 5 ? 190: 110;
  return (
    <div className='relative flex flex-row w-full'>
      <div className='carousel-wrapper'>
      {academyArrows && children?.length > show && currentIndex > 0 && (
          <div
            className='flex'
            style={{
              position: 'absolute',
              zIndex: 1,
              top: '50%',
              transform: 'translateY(-50%)',
              left: 20
            }}
          >

            <div onClick={prev} className={'flex items-center cursor-pointer h-6 w-6 flex items-center justify-center rounded-full'}
            style={{background: "rgba(0, 0, 0, .5)"}}
            >
              <Arrow/>
            </div>
            
          </div>
        )}
        <div
          className='carousel-content-wrapper'
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className={`show-${show} carousel-content`}
            style={{
              transform: `translateX(${`-${currentIndex * intervalle}px` } )`
            }}
          >
            {children}
          </div>
        </div>
        {academyArrows && children?.length > show && (currentIndex < children?.length - show) &&(
          <div
            className='flex'
            style={{
              position: 'absolute',
              zIndex: 1,
              top: '50%',
              transform: 'translateY(-50%)',
              right: 20
            }}
          >
            <div onClick={next} className={'flex items-center transform -rotate-180 cursor-pointer h-6 w-6 flex items-center justify-center rounded-full'}
            style={{background: "rgba(0, 0, 0, .5)"}}
            >
            <Arrow/>
          </div>
          </div>
        )}
      </div>
      {children?.length > show  && <div
        className='hidden laptop:flex justify-center items-center space-x-16'
        style={{
          position: 'absolute',
          zIndex: 1,
          top: -60,
          right: 4,
          marginTop: 15
        }}
      >

        {<div onClick={prev} className={'flex items-center cursor-pointer'}>
          <Arrow/>
        </div>
        }

        {(
          <div onClick={next} className={'flex items-center transform -rotate-180 cursor-pointer'}>
            <Arrow/>
          </div>
        )}
      </div>}
    </div>
  )
}

export default CardCarousel
