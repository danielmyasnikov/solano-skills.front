import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@src/http/axios';

const baseQuery = axiosBaseQuery({
  baseUrl: `/api/v1/courses`,
});

export const exercisesApi = createApi({
  reducerPath: 'exercisesApi',
  baseQuery,
  tagTypes: ['Exercise'],
  endpoints: (build) => ({
    getExercise: build.query({
      query: ({ courseId, exerciseId }) => ({ url: `/${courseId}/exercises/${exerciseId}` }),
      providesTags: (result, error, id) => [{ type: 'Exercise', id }],
    }),
  }),
});

export const { useGetExerciseQuery } = exercisesApi;
