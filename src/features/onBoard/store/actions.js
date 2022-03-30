import { createAsyncThunk } from '@reduxjs/toolkit';

import { Api } from '@src/api/api';

export const getTracks = createAsyncThunk('tracks/getTracks', async () => {
  return await Api.get('/api/v1/tracks');
});

export const addTracks = createAsyncThunk('tracks/addTracks', async (tracks) => {
  return await Api.post(`/api/v1/add_tracks_to_profile`, { track_ids: tracks });
});

export const searchTracks = createAsyncThunk('tracks/searchTracks', async (value) => {
  return await Api.post(`/api/v1/tracks/search`, { q: value });
});
