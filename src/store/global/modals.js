import { createSlice } from '@reduxjs/toolkit';

export const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    feedbackModal: false,
    signUpModal: false,
    tariffsModal: false,
    courseContentModal: false,
    pleasePayModal: false,
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

    openPleasePayModal: (state) => {
      state.pleasePayModal = true;
    },
    closePleasePayModal: (state) => {
      state.pleasePayModal = false;
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
  openPleasePayModal,
  closePleasePayModal,
} = modalsSlice.actions;
