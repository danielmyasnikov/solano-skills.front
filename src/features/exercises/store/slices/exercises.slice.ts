import { createSlice } from '@reduxjs/toolkit';

import { getExerciseById } from '../actions/exercises.actions';

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState: {
    status: 'idle',

    exercise: {
      id: NaN,
      type: '',
    },

    certificateStatus: 'idle',

    steps: {
      active: 1,
      total: 0,
      totalDone: 0,
      totalXp: 0,
      code: {},
    },

    sidebar: {
      open: true,
      headerFolded: false,
      instructionFolded: false,
    },
  },
  reducers: {
    setStep: (state, action) => {
      const { step, code } = action.payload;
      state.steps.active = step;
      // @ts-ignore
      state.steps.code[code.id] = code.code;
    },
    onStepComplete: (state, action) => {
      state.steps.totalDone += 1;
      state.steps.totalXp += action.payload.xp;
    },

    toggleSidebar: (state) => {
      state.sidebar.open = !state.sidebar.open;
    },
    toggleSidebarHeader: (state) => {
      state.sidebar.headerFolded = !state.sidebar.headerFolded;
    },
    toggleInstructionHeader: (state) => {
      state.sidebar.instructionFolded = !state.sidebar.instructionFolded;
    },
  },
  extraReducers: {
    [getExerciseById.pending.type]: (state) => {
      state.status = 'pending';
    },
    [getExerciseById.fulfilled.type]: (state, action) => {
      state.status = 'success';
      state.exercise = action.payload;

      state.certificateStatus = action.payload.certificate_status;

      if (action.payload.type === 'bullet_point_exercise') {
        if (action.meta.arg.tab) {
          const tab = action.meta.arg.tab - 1;
          const len = action.payload.nested_exercises.length;
          state.steps = {
            active: tab <= len ? tab : len,
            total: len,
            totalDone: tab <= len ? tab : len,
            totalXp: 0,
            code: {},
          };
        } else {
          state.steps = {
            active: 1,
            total: action.payload.nested_exercises.length,
            totalDone: 0,
            totalXp: 0,
            code: {},
          };
        }
      }
    },
    [getExerciseById.rejected.type]: (state, action) => {
      state.status = 'error';
      console.error(action.error);
    },
  },
});
