import { createSlice } from '@reduxjs/toolkit';
import { changePassword, deleteAccount } from './actions';

export const profileSlice = createSlice({
  name: 'profileNew',
  initialState: {
    deleteStatus: 'idle',
    changePasswordStatus: 'idle',
  },
  reducers: {},
  extraReducers: {
    [deleteAccount.fulfilled]: (state, action) => {
      state.deleteStatus = 'success';
    },
    [deleteAccount.rejected]: (state, action) => {
      state.deleteStatus = 'failure';
    },
    [changePassword.fulfilled]: (state, action) => {
      state.changePasswordStatus = 'success';
    },
    [changePassword.rejected]: (state, action) => {
      state.changePasswordStatus = 'failure';
    },
  },
});
