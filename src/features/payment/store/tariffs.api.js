import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { env } from '@src/app/config/index.ts';

const baseQuery = fetchBaseQuery({
  baseUrl: `${env.api.platform}/api/v1/tariffs`,
});

export const tariffsApi = createApi({
  reducerPath: 'tariffsApi',
  baseQuery,
  tagTypes: ['Tariff'],
  endpoints: (build) => ({
    getTariffs: build.query({
      query: () => '',
      providesTags: (result, error, arg) =>
        result ? [...result.map(({ id }) => ({ type: 'Tariff', id })), 'Tariff'] : ['Tariff'],
    }),
  }),
});

export const { useGetTariffsQuery } = tariffsApi;
