import { createSlice } from '@reduxjs/toolkit';
import { addTracks, getTracks, searchTracks } from './actions';

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState: { trackList: [], isShowWelcomeModal: false, error: '' },
  reducers: {
    showTracksModal(state, action) {
      state.isShowWelcomeModal = true;
    },
    hideTracksModal(state, action) {
      state.isShowWelcomeModal = false;
    },
  },
  extraReducers: {
    [getTracks.fulfilled]: (state, action) => {
      state.trackList = action.payload;
      state.isShowWelcomeModal = false;
      state.error = '';
    },
    [getTracks.rejected]: (state, action) => {
      state.trackList = [];
      state.isShowWelcomeModal = false;
      state.error = action.payload;
    },
    [addTracks.fulfilled]: (state, action) => {
      state.isShowWelcomeModal = true;
    },
    [addTracks.rejected]: (state, action) => {
      state.isShowWelcomeModal = false;
    },
    [searchTracks.fulfilled]: (state, action) => {
      state.trackList = action.payload;
    },
  },
});

export const { showTracksModal, hideTracksModal } = tracksSlice.actions;
