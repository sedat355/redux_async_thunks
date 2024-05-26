import React from 'react'

const PhotoListItem = ({photo}) => {
  return (
    <div>
      <img className='h-20 w-20 object-cover' src={photo.url} alt={photo.title} />
    </div>
  )
}

export default PhotoListItem