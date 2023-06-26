import React from 'react'
import ContentLoader from 'react-content-loader'
const AllCategoriesLoader = ({
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
      <rect x='26' y='20' width='48' height='48' />
      <rect x='1' y='98' width='100' height='10' />
      <rect x='1' y='115' width='100' height='10' />

      <rect x='206' y='20' width='48' height='48' />
      <rect x='181' y='98' width='100' height='10' />
      <rect x='181' y='115' width='100' height='10' />

      <rect x='406' y='20' width='48' height='48' />
      <rect x='381' y='98' width='100' height='10' />
      <rect x='381' y='115' width='100' height='10' />
    </ContentLoader>
  )
}

export default AllCategoriesLoader
