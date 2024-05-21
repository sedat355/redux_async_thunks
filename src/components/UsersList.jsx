import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../store/thunks/fetchUsers';
import Skeleton from './Skeleton';

const UsersList = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchUsers())
  },[])

  if(isLoading) {
    return <Skeleton times={4}/>
  }

  if(error) {
    return <div>Veri getirmede bir hata oluştu</div>
  }

  return (
    <ul>
      userlist
    </ul>
  )
}

export default UsersList