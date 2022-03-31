import { createSlice } from '@reduxjs/toolkit';

export const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    feedbackModal: false,
    signUpModal: false,
    tariffsModal: false,
    courseContentModal: false,
  },
  reducers: {
    openFeedbackModal: (state) => {
      state.feedbackModal = true;
    },
    closeFeedbackModal: (state) => {
      state.feedbackModal = false;
    },

    openSignUpModal: (state) => {
      state.signUpModal = true;
    },
    closeSignUpModal: (state) => {
      state.signUpModal = false;
    },

    openTariffsModal: (state) => {
      state.tariffsModal = true;
    },
    closeTariffsModal: (state) => {
      state.tariffsModal = false;
    },

    openCourseContentModal: (state) => {
      state.courseContentModal = true;
    },
    closeCourseContentModal: (state) => {
      state.courseContentModal = false;
    },
  },
});

export const {
  openFeedbackModal,
  closeFeedbackModal,
  openSignUpModal,
  closeSignUpModal,
  openTariffsModal,
  closeTariffsModal,
  openCourseContentModal,
  closeCourseContentModal,
} = modalsSlice.actions;