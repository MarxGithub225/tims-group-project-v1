import React, { useCallback, useEffect, useState } from "react";
import ContentLoader from 'react-content-loader'
import { file_url } from "../../utils/baseUrl";

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import ImageViewer from 'react-simple-image-viewer';
const BigImageLoader = () => {
  return <ContentLoader
      width={"446px"}
      height={"304px"}
    >
      {/* Tag */}
      <rect x='1' y='1' width='100%' rx='8' ry='8' height='100%' />
    </ContentLoader>
}

const SmallImageLoader = () => {
  return <ContentLoader
      width={"100%"}
      height={"100px"}
    >
      {/* Tag */}
      <rect x='1' y='24' width='30%' rx='8' ry='8' height='74' />
      <rect x='35%' y='24' width='30%' rx='8' ry='8' height='100%' />
      <rect x='70%' y='24' width='30%' rx='8' ry='8' height='100%' />
    </ContentLoader>
}

function ImageSide({loading, colors, currentColorId}: any) {
  const [currentImages, setCurentImages] = useState<Array<string>>([])
  const [selectedImages, setSelectedImage] = useState('')

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    if(colors) {
      ;(async () => {
      if(currentColorId) {
        let thisImages: any[] = colors.filter((col: any) => col.isActivated && col?._id === currentColorId)[0].images
        let imageData : any[] = []
        await Promise.all(thisImages.map((im: string) => {
          imageData.push(`${file_url}/products/${im}`)
        }))

        setCurentImages(imageData)
        setSelectedImage(imageData[0])
      }})()
    }
  }, [colors, currentColorId])
  
  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(currentImage);
    setIsViewerOpen(false);
  };

  return <div className="details-image-side">
    {loading ? <BigImageLoader />
    : <div className="details-big-image" onClick={ () => openImageViewer(currentImage) }>
        <img src={selectedImages} alt="" />
      </div>
    }

    {loading ? <SmallImageLoader/>:
    <div className="image-thumbs grid gap-x-3 gap-y-2 grid-cols-6 mt-6">
      {currentImages.map((im: any, key: number) => {
        return <Zoom><img src={im} alt="" key={key} className="cursor-pointer" 
        onClick={ () => {setSelectedImage(im); setCurrentImage(key)} }
        /></Zoom>
      })}
    
    </div>
    }

      {isViewerOpen && (
        <ImageViewer
          src={ currentImages }
          currentIndex={ currentImage }
          disableScroll={ false }
          closeOnClickOutside={ true }
          onClose={ closeImageViewer }
        />
      )}
  </div>;
}

export default ImageSide;
