// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'user',
  initialState: {
    name: null,
    email: null,
    isAuthenticated: false
  },
  reducers: {
    setUser: (state, action) => {
    console.log(action.payload)
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.name = null;
      state.email = null;
      state.isAuthenticated = false;
    }
  }
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
