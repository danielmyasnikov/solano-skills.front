import { createApi } from '@reduxjs/toolkit/query/react';
import { env } from '@src/app/config/index.ts';
import { axiosBaseQuery } from '@src/http/axios';

export const skillApi = createApi({
  reducerPath: 'skillsApi',
  baseQuery: axiosBaseQuery({ baseUrl: `/api/v1/` }),
  tagTypes: ['Skills'],
  endpoints: (build) => ({
    getSkills: build.query({
      query: () => ({
        url: 'skills',
      }),
      providesTags: (result, error, arg) =>
        result ? [...result.map(({ id }) => ({ type: 'Skill', id })), 'Skill'] : ['Skill'],
    }),
    getSkill: build.query({
      query: (id) => ({
        url: `skills/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: 'Skill', id }],
    }),
  }),
});

export const { useGetSkillsQuery, useGetSkillQuery } = skillApi;
