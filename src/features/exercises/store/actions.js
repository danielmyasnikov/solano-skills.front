import { createAsyncThunk } from '@reduxjs/toolkit';

import { Api } from '@src/api/Api';

export const getExerciseById = createAsyncThunk(
  'exercises/getExerciseById',
  async ({ courseId, exerciseId }) => {
    return await Api.get(`/api/v1/courses/${courseId}/exercises/${exerciseId}`);
  },
);

export const sendAnswer = createAsyncThunk(
  'exercises/sendAnswer',
  async ({ courseId, exerciseId, xp }) => {
    return await Api.post(`/api/v1/courses/${courseId}/exercises/${exerciseId}/answers`, { xp });
  },
);
