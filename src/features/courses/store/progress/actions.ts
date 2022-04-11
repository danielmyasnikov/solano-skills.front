import { createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '@src/api/api';

export const dropProgress = createAsyncThunk(
  'newProgress/dropProgress',
  async (courseId: string) => {
    return await Api.delete(`/api/v1/drop_progress/${courseId}`);
  },
);
