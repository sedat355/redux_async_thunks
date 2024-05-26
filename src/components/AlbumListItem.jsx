import React from 'react'
import ExpandablePanel from './ExpandablePanel'
import Button from './Button'
import { GoTrashcan } from 'react-icons/go'

const AlbumListItem = ({album}) => {
  const header = (
    <div className='flex '>
      <Button><GoTrashcan/></Button>
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