import React from 'react'
import { useAddAlbumMutation, useFetchAlbumsQuery } from '../store'
import Skeleton from './Skeleton';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';
import AlbumListItem from './AlbumListItem';

const AlbumList = ({user}) => {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [ addAlbum, results ] = useAddAlbumMutation();
  
  const handleAddAlbum = () => {
    addAlbum(user);  
  }

  let content;
  if( isLoading ) {
    content = <Skeleton times={3} className="h-8 w-full"/>
  } else if( error ) {
    content = <div>Error loading albums!!</div>
  } else {
    content = data.map(album => {
      return (
       <AlbumListItem key={album.id} album={album} user={user}/>
      )
    })
  }

  return (
    <div>
      <div className='flex flex-row items-center justify-between m-2'>
       <h3 className='text-lg font-bold'>Albums for {user.name}</h3>
        <Button loading={results.isLoading} onClick={handleAddAlbum} success>
          +Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  )
}
 
export default AlbumList