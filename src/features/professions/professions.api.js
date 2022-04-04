import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { env } from '@src/app/config/index.ts';

export const professionApi = createApi({
  reducerPath: 'professionApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${env.api.platform}/api/v1/` }),
  tagTypes: ['Profession'],
  endpoints: (build) => ({
    getProfessions: build.query({
      query: () => ({
        url: 'professions',
      }),
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Profession', id })), 'Profession']
          : ['Profession'],
    }),
    getProfession: build.query({
      query: (id) => ({
        url: `professions/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: 'Profession', id }],
    }),
    takeProfession: build.mutation({
      query: (courseId) => ({
        url: `add_professions_to_profile`,
        method: 'POST',
      }),
      invalidatesTags: ['Profession'],
    }),
  }),
});

export const { useGetProfessionsQuery, useGetProfessionQuery, useTakeProfessionMutation } =
  professionApi;
