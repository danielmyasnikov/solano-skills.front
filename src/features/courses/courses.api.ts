import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@src/http/axios';

const baseQuery = axiosBaseQuery({
  baseUrl: `/api/v1/courses`,
});

export const coursesApi = createApi({
  reducerPath: 'coursesApi',
  baseQuery,
  tagTypes: ['Course'],
  endpoints: (build) => ({
    getCourses: build.query({
      query: () => ({ url: '' }),
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }: { id: number }) => ({ type: 'Course', id })), 'Course']
          : ['Course'],
    }),
    getCourse: build.query({
      query: (id) => ({ url: `/${id}` }),
      providesTags: (result, error, id) => [{ type: 'Course', id }],
    }),
    refetchCourses: build.mutation<null, void>({
      queryFn: () => ({ data: null }),
      invalidatesTags: ['Course'],
    }),
  }),
});

export const { useGetCoursesQuery, useGetCourseQuery, useRefetchCoursesMutation } = coursesApi;
