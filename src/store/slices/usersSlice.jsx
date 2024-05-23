import { createSlice } from "@reduxjs/toolkit"
import { fetchUsers } from "../thunks/fetchUsers"
import { addUser } from "../thunks/addUser"
import { removeUser } from "../thunks/removeUser"

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
      //isteğin başarılı olması durumunda getirilen veri action.payload' a otomatik olarak yüklenir. Bu yüzden burada action.payload api' den gelen veriyi temsil eder.
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
      //Bu satırdan anlıyoruz ki, veri getirmede bir hata durumunda  error nesnesi action' ın error özelliğine atanıyor, payload' a değil.
    })

    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.data.push(action.payload)
    })
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })

    builder.addCase(removeUser.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(removeUser.fulfilled, (state, action) => {
      state.isLoading = false

      //çıktıdan görüldüğü gibi removeUser' dan return edilen response.data değeri silinmek için tıklanan user. 
      console.log(action.payload)//{id: '3399', name: 'Vivian Emmerich'}
      state.data = state.data.filter(user => user.id !== action.payload.id)

      //bu yöntem çalışmıyor:
      // return {...state, data: state.data.filter(user => user.id !== action.payload.id)}
    })
    builder.addCase(removeUser.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
  },
})

export const usersReducer = usersSlice.reducer
