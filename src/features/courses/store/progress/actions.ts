import { createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '@src/api/api';
import { getProfile } from '@store/profile/actions';

export const dropProgress = createAsyncThunk(
  'newProgress/dropProgress',
  async (courseId: string, thunkAPI) => {
    return await Api.delete(`/api/v1/drop_progress/${courseId}`).then(() => {
      thunkAPI.dispatch(getProfile());
    });
  },
);
