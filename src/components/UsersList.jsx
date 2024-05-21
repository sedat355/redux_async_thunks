import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../store/thunks/fetchUsers';

const UsersList = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchUsers())
  },[])

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(error) {
    return <div>Veri getirmede bir hata oluştu</div>
  }

  return (
    <ul>
      {data.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  )
}

export default UsersList