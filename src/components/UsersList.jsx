import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchUsers } from '../store/thunks/fetchUsers';
import { addUser } from '../store/thunks/addUser';
import Skeleton from './Skeleton';
import Button from './Button'
import useThunk from '../hooks/use-thunk';
import UserListItem from './UserListItem';

const UsersList = () => {
  const [ doFetchUsers, isLoadingUsers, loadingUsersError ] = useThunk(fetchUsers);
  //const [ isLoadingUsers, setIsLoadingUsers ] = useState(false);
  //const [ loadingUsersError, setLoadingUsersError ] = useState(null);
  
  const [ doCreateUser, isCreatingUser, creatingUserError ] = useThunk(addUser)
  //const [ isCreatingUser, setIsCreatingUser ] = useState(false)
  //const [ creatingUserError, setCreatingUserError ] = useState(null)

  const { data } = useSelector(state => state.users);

  useEffect(() => {
    doFetchUsers();
  },[])

  const handleUserAdd = () => {
    doCreateUser();
  }

  let content;
  if( isLoadingUsers ) {
    content = <Skeleton times={4} className="h-10 w-full"/>
  } else if( loadingUsersError ) {
    content = <div>Veri getirmede bir hata oluştu</div>
  } else {
    content = data.map(user => {
      return(
        <UserListItem key={user.id} user={user}/>
      )
    })
  }

  return (
    <div>
      <div className='flex flex-row justify-between items-center m-3'>
        <h1 className='m-2 text-xl'>Users</h1>
        <Button loading={isCreatingUser} onClick={handleUserAdd}>+Add User</Button>
        { creatingUserError && 'Error creating user!!'}
      </div>

      {content}
    </div>
  )
}

export default UsersList