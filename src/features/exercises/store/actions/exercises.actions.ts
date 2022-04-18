import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@src/http/api';

export const getExerciseById = createAsyncThunk(
  'exercises/getExerciseById',
  async ({
    courseId,
    exerciseId,
    tab,
  }: {
    courseId: string | number;
    exerciseId: string | number;
    tab?: number;
  }) => {
    return api.get(`/api/v1/courses/${courseId}/exercises/${exerciseId}`).then((e) => e.data);
  },
);

export const sendAnswer = createAsyncThunk(
  'exercises/sendAnswer',
  async ({
    courseId,
    exerciseId,
    xp,
  }: {
    courseId: string | number;
    exerciseId: string | number;
    xp: number;
  }) => {
    return api
      .post(`/api/v1/courses/${courseId}/exercises/${exerciseId}/answers`, { xp })
      .then((e) => e.data);
  },
);
