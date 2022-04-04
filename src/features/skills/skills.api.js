import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { env } from '@src/app/config/index.ts';

export const skillApi = createApi({
  reducerPath: 'skillsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${env.api.platform}/api/v1/` }),
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
