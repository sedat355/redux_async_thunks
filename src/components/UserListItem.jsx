import React from "react"
import { GoTrashcan } from "react-icons/go"
import Button from "./Button"
import { removeUser } from "../store/thunks/removeUser"
import useThunk from "../hooks/use-thunk"
import ExpandablePanel from "./ExpandablePanel"

const UserListItem = ({ user }) => {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser)

  const header = (
    <>
      <Button loading={isLoading} onClick={() => doRemoveUser(user)}>
          <GoTrashcan />
      </Button>
      {error && <div>Error deleting user!!</div>}
      <span className="mr-auto">{user.name}</span>
    </>
  )

  return (
    <>
      <ExpandablePanel header={header}>
        Content!!!  
      </ExpandablePanel>
    </>
  )
}

export default UserListItem
