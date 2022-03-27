import { createSlice } from '@reduxjs/toolkit';

import { getExerciseById } from '../actions';

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState: {
    status: 'idle',

    exercise: null,

    steps: {
      active: 1,
      total: 0,
      totalDone: 0,
      totalXp: 0,
    },

    modals: {
      feedback: false,
      signup: false,
    },

    sidebar: {
      open: true,
      headerFolded: false,
      instructionFolded: false,
    },
  },
  reducers: {
    openFeedbackModal: (state) => {
      state.modals.feedback = true;
    },
    closeFeedbackModal: (state) => {
      state.modals.feedback = false;
    },

    setStep: (state, action) => {
      state.steps.active = action.payload;
    },
    onStepComplete: (state, action) => {
      state.steps.totalDone += 1;
      state.steps.totalXp += action.payload.xp;
    },

    openSignupModal: (state) => {
      state.modals.signup = true;
    },
    closeSignupModal: (state) => {
      state.modals.signup = false;
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
    [getExerciseById.pending]: (state) => {
      state.status = 'pending';
    },
    [getExerciseById.fulfilled]: (state, action) => {
      state.status = 'success';
      state.exercise = action.payload;

      if (action.payload.type === 'bullet_point_exercise') {
        state.steps = {
          active: 1,
          total: action.payload.nested_exercises.length,
          totalDone: 0,
          totalXp: 0,
        };
      }
    },
    [getExerciseById.rejected]: (state, action) => {
      state.status = 'error';
      console.error(action.error);
    },
  },
});
