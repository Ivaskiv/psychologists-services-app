import { createSlice } from '@reduxjs/toolkit';
import { login, logout, register } from './authOperation';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: state => {
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(login.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(logout.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.status = 'idle';
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});
export const { setUser, clearUser } = authSlice.actions;
export const selectUser = state => state.auth.user;
export const selectAuthStatus = state => state.auth.status;

export default authSlice.reducer;
