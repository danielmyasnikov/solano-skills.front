import { createSlice } from '@reduxjs/toolkit';

import {
  checkAnswer,
  compileCode,
  compileShell,
  startKernel,
} from '@src/features/exercises/store/actions/terminal.actions';

const initialState = {
  status: 'ide',
  outputs: [],
  message: {
    status: '',
  },
  kernelId: '',
  bytePayload: [],
};

export const terminalSlice = createSlice({
  name: 'terminal',
  initialState,
  reducers: {
    clear: (state, action) => {
      state.outputs = [];
      state.message = {
        status: '',
      };
      state.kernelId = '';
      state.bytePayload = [];
    },
  },
  extraReducers: {
    [compileCode.pending.type]: (state) => {
      state.status = 'loading';
    },
    [compileCode.rejected.type]: (state) => {
      state.status = 'fail';
    },
    [compileShell.pending.type]: (state) => {
      state.status = 'loading';
    },
    [compileShell.rejected.type]: (state) => {
      state.status = 'fail';
    },
    [startKernel.pending.type]: (state) => {
      state.status = 'loading';
    },
    [startKernel.rejected.type]: (state) => {
      state.status = 'fail';
    },
    [checkAnswer.pending.type]: (state) => {
      state.status = 'loading';
    },
    [checkAnswer.rejected.type]: (state) => {
      state.status = 'fail';
    },

    [compileCode.fulfilled.type]: (state, action) => {
      state.status = 'success';
      state.outputs = [...state.outputs, action.payload] as any;
      state.message = {
        status: '',
      };
      if (action.payload.bytePayload) {
        state.bytePayload = [...state.bytePayload, action.payload.bytePayload] as any;
      }
    },
    [startKernel.fulfilled.type]: (state, action) => {
      state.status = 'success';
      state.message = {
        status: '',
      };
      state.kernelId = action.payload.output;
    },
    [compileShell.fulfilled.type]: (state, action) => {
      state.status = 'success';
      if (action.payload.type === 'compileExercise') {
        state.outputs = [...state.outputs, { ...action.payload.data }] as any;
        if (action.payload.data.bytePayload) {
          state.bytePayload = [...state.bytePayload, action.payload.data.bytePayload] as any;
        }
      } else {
        state.outputs = [
          ...state.outputs,
          {
            bytePayload: null,
            error: '',
            output: `In [${action.payload.lineNumber}]: ${action.payload.code}`,
            status: 'shell',
          },
          { ...action.payload.data },
        ] as any;
      }
      state.message = {
        status: '',
      };
    },
    [checkAnswer.fulfilled.type]: (state, action) => {
      state.status = 'success';
      state.message = action.payload;
    },
  },
});
