import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { env } from '@src/app/config/index.ts';

const baseQuery = fetchBaseQuery({
  baseUrl: `${env.api.platform}/api/v1/courses`,
  prepareHeaders: (headers) => {
    const authHeaders = {
      uid: window.localStorage.getItem('uid'),
      'access-token': window.localStorage.getItem('access-token'),
      client: window.localStorage.getItem('client'),
      expiry: window.localStorage.getItem('expiry'),
    };
    if (authHeaders.uid) {
      headers.set('uid', authHeaders.uid);
    }
    if (authHeaders.client) {
      headers.set('client', authHeaders.client);
    }
    if (authHeaders['access-token']) {
      headers.set('access-token', authHeaders['access-token']);
    }
    return headers;
  },
});

export const coursesApi = createApi({
  reducerPath: 'coursesApi',
  baseQuery,
  tagTypes: ['Course'],
  endpoints: (build) => ({
    getCourses: build.query({
      query: () => '',
      providesTags: (result, error, arg) =>
        result ? [...result.map(({ id }) => ({ type: 'Course', id })), 'Course'] : ['Course'],
    }),
    getCourse: build.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Course', id }],
    }),
  }),
});

export const { useGetCoursesQuery, useGetCourseQuery } = coursesApi;
