import React from 'react'
import { useAddPhotoMutation, useFetchPhotosQuery } from '../store'
import Button from './Button';
import Skeleton from './Skeleton';
import PhotoListItem from './PhotoListItem';

const PhotoList = ({album}) => {
  const {data, error, isFetching } = useFetchPhotosQuery(album);
  const [ addPhoto, results ] = useAddPhotoMutation();

  console.log(data)
  
  const handleAddPhoto = () => {
    addPhoto(album)
  }

  let content;
  if( isFetching ) {
    content = <Skeleton className="h-8 w-8" times={4}/>
  } else if(error) {
    content = <div>Error fetching photos...</div>
  } else {
    content = data.map(photo => {
      return <PhotoListItem key={photo.id} photo={photo}/>
    })
  }

  return (
    <div>
      <div className='m-2 flex flex-row items-center justify-between'>
        <h3 className='text-lg font-bold'>Photos in {album.title}</h3>
        <Button onClick={handleAddPhoto} loading={results.isLoading}>
          +Add Photo
        </Button>
      </div>
      <div className='flex gap-2 flex-wrap'>
        {content}
      </div>
    </div>
  )
}

export default PhotoList