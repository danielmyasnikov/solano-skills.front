import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@src/http/axios';

const baseQuery = axiosBaseQuery({
  baseUrl: `/api/v1/`,
});

export const paymentsApi = createApi({
  reducerPath: 'paymentsApi',
  baseQuery,
  tagTypes: ['Payment'],
  endpoints: (build) => ({
    changeSubscriptionType: build.mutation({
      query: ({ id }) => ({
        url: 'change_subscription_type',
        method: 'POST',
        data: {
          id,
        },
      }),
      invalidatesTags: ['Payment'],
    }),
  }),
});

export const { useChangeSubscriptionTypeMutation } = paymentsApi;
