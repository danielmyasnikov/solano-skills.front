import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API_COURSE}/api/v1/tariffs`,
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
