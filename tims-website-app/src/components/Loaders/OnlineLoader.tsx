import React from 'react'
import ContentLoader from 'react-content-loader'
const OnlineLoader = ({
  width,
  height,
  radius=2,
  ...props
}: Record<string, any>) => {
  return (
    <ContentLoader
      width={width}
      height={height}
      {...props}
    >
      {/* Tag */}
      <rect x='1' y='1' width='100%' rx={radius} ry={radius} height='100%' />
    </ContentLoader>
  )
}

export default OnlineLoader
