import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoaded:false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    // setLoaded: (state) => {
    //   state.isLoaded = true;
    // }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;