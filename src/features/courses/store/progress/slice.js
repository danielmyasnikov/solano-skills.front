import { createSlice } from '@reduxjs/toolkit';
import { dropProgress } from './actions.ts';

export const newProgressSlice = createSlice({
  name: 'newProgress',
  initialState: { progressStatus: 'idle' },
  extraReducers: {
    [dropProgress.fulfilled]: (state, action) => {
      state.progressStatus = 'success';
    },
    [dropProgress.rejected]: (state, action) => {
      state.progressStatus = 'failure';
    },
  },
});
