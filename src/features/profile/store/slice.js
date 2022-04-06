import { createSlice } from '@reduxjs/toolkit';
import { deleteAccount } from './actions';

export const profileSlice = createSlice({
  name: 'profileNew',
  initialState: {
    deleteStatus: 'idle',
  },
  reducers: {},
  extraReducers: {
    [deleteAccount.fulfilled]: (state, action) => {
      state.deleteStatus = 'success';
    },
    [deleteAccount.rejected]: (state, action) => {
      state.deleteStatus = 'failure';
    },
  },
});
