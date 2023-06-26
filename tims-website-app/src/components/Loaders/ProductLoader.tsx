import React from 'react'
import ContentLoader from 'react-content-loader'
const ProductLoader = ({
  width,
  height,
  ...props
}: Record<string, any>) => {
  return (
    <ContentLoader
      width={width}
      height={height}
      {...props}
    >
      {/* Tag */}
      <rect x='1' y='1' width='100%' rx='8' ry='8' height='100%' />
    </ContentLoader>
  )
}

export default ProductLoader
