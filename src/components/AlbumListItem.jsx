import React from 'react'
import ExpandablePanel from './ExpandablePanel'
import Button from './Button'
import { GoTrashcan } from 'react-icons/go'
import { useRemoveAlbumMutation } from '../store'

const AlbumListItem = ({album}) => {
  const [removeAlbum, results] = useRemoveAlbumMutation();

  const deleteAlbum = () => {
    removeAlbum(album)
  }

  const header = (
    <div className='flex '>
      <Button loading={results.isLoading} onClick={deleteAlbum}>
        <GoTrashcan/>
      </Button>
      <span className='ml-2'>{album.title}</span>
    </div>
  )

  return (
    <ExpandablePanel header={header}>
      List of photos in the album
    </ExpandablePanel>
  )
}

export default AlbumListItem