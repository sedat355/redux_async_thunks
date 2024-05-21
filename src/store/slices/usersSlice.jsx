import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";

const usersSlice = createSlice({
  name: 'users',
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
      state.error = action.error
      //Bu satırdan anlıyoruz ki, veri getirmede bir hata durumunda  error nesnesi action' ın error özelliğine atanıyor, payload' a değil. 
    })
  }
});

export const usersReducer = usersSlice.reducer;
