import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeUser = createAsyncThunk('users/remove', async (user) => {
  const response = await axios.delete(`http://localhost:3000/users/${user.id}`) 
  //return user;
  return response.data;
});

export {removeUser}
