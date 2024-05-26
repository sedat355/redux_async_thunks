import React from 'react'
import { GoTrashcan } from 'react-icons/go'
import { useRemovePhotoMutation } from '../store'

const PhotoListItem = ({photo}) => {
  const [ removePhoto, results ] = useRemovePhotoMutation();

  const handleRemovePhoto = () => {
    removePhoto(photo)
  }
  
  return (
    <div onClick={handleRemovePhoto} className='relative cursor-pointer'>
      <img className='h-20 w-20 object-cover' src={photo.url} alt={photo.title} />
      <div className='absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80'>
        <GoTrashcan className='text-3xl'/>
      </div>
    </div>
  )
}

export default PhotoListItem