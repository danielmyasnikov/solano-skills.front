import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@src/http/axios';

const baseQuery = axiosBaseQuery({
  baseUrl: `/api/v1/tariffs`,
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
