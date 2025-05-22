import React from 'react'

const ImageHelper = ({
  url,
  className,
  pictureClasses,
}: {
  url: string
  className?: string
  pictureClasses?: string
}) => {
  return (
    <picture className={`block ${pictureClasses}`}>
      <source srcSet="" type="image/webp" />
      <source srcSet={url} type="image/jpeg" />
      <img
        src={url}
        className={`d-block w-100 object-fill vertical-center box-border ${className}`}
        loading="lazy"
        width="100%"
        height="100%"
      />
    </picture>
  )
}

export default ImageHelper
