import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../store/thunks/fetchUsers';
import { addUser } from '../store/thunks/addUser';
import Skeleton from './Skeleton';
import Button from './Button'

const UsersList = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(state => state.users);

  console.log(data)

  useEffect(() => {
    dispatch(fetchUsers())
  },[])

  const handleUserAdd = () => {
    dispatch(addUser())
  }

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
    <div>
      <div className='flex flex-row justify-between m-3'>
        <h1 className='m-2 text-xl'>Users</h1>
        <Button onClick={handleUserAdd}>+Add User</Button>
      </div>

      {renderedUsers}
    </div>
  )
}

export default UsersList