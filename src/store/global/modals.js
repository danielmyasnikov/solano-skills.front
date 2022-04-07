import { createSlice } from '@reduxjs/toolkit';

export const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    feedbackModal: false,
    signUpModal: false,
    tariffsModal: false,
    courseContentModal: false,
    pleasePayModal: false,
    unsubscribeModal: false,
    resetProgresseModal: false,
  },
  reducers: {
    openFeedbackModal: (state) => {
      state.feedbackModal = true;
    },
    closeFeedbackModal: (state) => {
      state.feedbackModal = false;
    },

    openResetProgresseModal: (state) => {
      state.resetProgresseModal = true;
    },
    closeResetProgresseModal: (state) => {
      state.resetProgresseModal = false;
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

    openUnsubscribeModal: (state) => {
      state.unsubscribeModal = true;
    },
    closeUnsubscribeModal: (state) => {
      state.unsubscribeModal = false;
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
  openUnsubscribeModal,
  closeUnsubscribeModal,
  openResetProgresseModal,
  closeResetProgresseModal,
} = modalsSlice.actions;
