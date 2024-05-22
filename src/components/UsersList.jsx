import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../store/thunks/fetchUsers';
import Skeleton from './Skeleton';
import { render } from 'react-dom';

const UsersList = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchUsers())
  },[])

  if(isLoading) {
    return <Skeleton times={4} className="h-10 w-full"/>
  }

  if(error) {
    return <div>Veri getirmede bir hata oluştu</div>
  }

  const renderedUsers = data.map(user => {
    return(
      <div 
        key={user.id}
        className='mb-2 border rounded'  
      >
        <div className='flex p-2 justify-between items-center cursor-pointer'>
          {user.name}
        </div>
      </div>
    )
  })

  return (
    <>
      {renderedUsers}
    </>
  )
}

export default UsersList