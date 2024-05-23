import React from "react"
import { GoTrashcan } from "react-icons/go"
import Button from "./Button"
import { removeUser } from "../store/thunks/removeUser"
import useThunk from "../hooks/use-thunk"

const UserListItem = ({ user }) => {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser)

  return (
    <div className="mb-2 border rounded">
      <div className="flex gap-x-2 p-2 justify-between items-center cursor-pointer">
        <Button loading={isLoading} onClick={() => doRemoveUser(user)}>
          <GoTrashcan />
        </Button>
        {error && <div>Error deleting user!!</div>}
        <span className="mr-auto">{user.name}</span>
      </div>
    </div>
  )
}

export default UserListItem
