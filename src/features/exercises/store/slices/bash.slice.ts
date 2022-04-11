import { createSlice } from '@reduxjs/toolkit';
import {
  checkExerciseBashShell,
  executeBashShell,
  startEnvironment,
} from '@src/features/exercises/store/actions/bash.actions';

const initialState = {
  status: 'ide',
  outputs: [],
  message: {
    status: '',
  },
  environmentId: '',
};

export const bashSlice = createSlice({
  name: 'bash',
  initialState,
  reducers: {
    clear: (state, action) => {
      state.outputs = [];
      state.message = {
        status: '',
      };
      state.environmentId = '';
    },
  },
  extraReducers: {
    [executeBashShell.pending.type]: (state) => {
      state.status = 'loading';
    },
    [startEnvironment.pending.type]: (state) => {
      state.status = 'loading';
    },
    [checkExerciseBashShell.pending.type]: (state) => {
      state.status = 'loading';
    },
    [executeBashShell.rejected.type]: (state) => {
      state.status = 'fail';
    },
    [startEnvironment.rejected.type]: (state) => {
      state.status = 'fail';
    },
    [checkExerciseBashShell.rejected.type]: (state) => {
      state.status = 'fail';
    },
    [startEnvironment.fulfilled.type]: (state, action) => {
      state.status = 'success';
      state.message = {
        status: '',
      };
      state.environmentId = action.payload.output;
    },
    [checkExerciseBashShell.fulfilled.type]: (state, action) => {
      state.status = 'success';
      state.message = action.payload.data;
    },
    [executeBashShell.fulfilled.type]: (state, action) => {
      state.status = 'success';
      state.outputs = [
        ...state.outputs,
        { status: '', output: `$ ${action.payload.command}`, error: '' },
        { ...action.payload.data },
      ] as any;
      state.message = {
        status: '',
      };
    },
  },
});
