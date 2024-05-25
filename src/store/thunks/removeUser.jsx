import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeUser = createAsyncThunk('users/remove', async (user) => {
  const response = await axios.delete(`http://localhost:3000/users/${user.id}`) 
  
    //!DEV ONLY:
    await pause(1000);
    
  //return user;
  return response.data;
});

//! DEV ONLY:
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  })
}

export {removeUser}
