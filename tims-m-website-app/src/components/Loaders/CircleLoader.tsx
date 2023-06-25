import React from 'react'
import ContentLoader from 'react-content-loader'
const CirleLoader = ({
  width,
  height,
  radius = 30,
  ...props
}: Record<string, any>) => {
  return (
    <ContentLoader
      width={width}
      height={height}
      {...props}
    >
      {/* Tag */}
      <circle cx="1" cy="1" r={radius} />
    </ContentLoader>
  )
}

export default CirleLoader
