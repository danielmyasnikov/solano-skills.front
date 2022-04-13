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
    bytePayload: null,
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
        bytePayload: null,
        status: '',
      };
      state.kernelId = '';
      state.bytePayload = [];
    },
    clearMessage: (state, action) => {
      state.message = {
        bytePayload: null,
        status: '',
      };
    },
  },
  extraReducers: {
    [compileCode.pending.type]: (state) => {
      state.status = 'loading';
      state.message = {
        bytePayload: null,
        status: '',
      };
    },
    [compileCode.rejected.type]: (state) => {
      state.status = 'fail';
      state.message = {
        bytePayload: null,
        status: '',
      };
    },
    [compileShell.pending.type]: (state) => {
      state.status = 'loading';
      state.message = {
        bytePayload: null,
        status: '',
      };
    },
    [compileShell.rejected.type]: (state) => {
      state.status = 'fail';
      state.message = {
        bytePayload: null,
        status: '',
      };
    },
    [startKernel.pending.type]: (state) => {
      state.status = 'loading';
      state.message = {
        bytePayload: null,
        status: '',
      };
    },
    [startKernel.rejected.type]: (state) => {
      state.status = 'fail';
      state.message = {
        bytePayload: null,
        status: '',
      };
    },
    [checkAnswer.pending.type]: (state) => {
      state.status = 'loading';
      state.message = {
        bytePayload: null,
        status: '',
      };
    },
    [checkAnswer.rejected.type]: (state) => {
      state.status = 'fail';
      state.message = {
        bytePayload: null,
        status: '',
      };
    },

    [compileCode.fulfilled.type]: (state, action) => {
      state.status = 'success';
      state.outputs = [...state.outputs, action.payload] as any;
      state.message = {
        bytePayload: null,
        status: '',
      };
      if (action.payload.bytePayload) {
        state.bytePayload = [...state.bytePayload, action.payload.bytePayload] as any;
      }
    },
    [startKernel.fulfilled.type]: (state, action) => {
      state.status = 'success';
      state.message = {
        bytePayload: null,
        status: '',
      };
      state.kernelId = action.payload.output;
    },
    [compileShell.fulfilled.type]: (state, action) => {
      state.status = 'success';
      state.message = {
        bytePayload: null,
        status: '',
      };
      if (action.payload.type === 'compileExercise') {
        state.outputs = [...state.outputs, { ...action.payload.data }] as any;
        if (action.payload.data.bytePayload) {
          state.bytePayload = [...state.bytePayload, action.payload.data.bytePayload] as any;
          state.message = {
            bytePayload: action.payload.data.bytePayload,
            status: state.message.status,
          };
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
    },
    [checkAnswer.fulfilled.type]: (state, action) => {
      state.status = 'success';
      state.message = action.payload;
    },
  },
});
