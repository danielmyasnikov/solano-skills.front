import { createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '@src/api/api';

export const dropProgress = createAsyncThunk('newProgress/dropProgress', async (courseId) => {
  return await Api.get('/api/v1/drop_progress', { courseId_id: courseId });
});
