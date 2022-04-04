import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { env } from '@src/app/config/index.ts';

const baseQuery = fetchBaseQuery({
  baseUrl: `${env.api.platform}/api/v1/`,
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

export const certificateApi = createApi({
  reducerPath: 'certificateApi',
  baseQuery,
  tagTypes: ['Certificate'],
  endpoints: (build) => ({
    getCertificates: build.query({
      query: () => ({
        url: 'certificates',
      }),
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Certificate', id })), 'Certificate']
          : ['Certificate'],
    }),
    getCertificate: build.query({
      query: (id) => ({
        url: `certificates/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: 'Certificate', id }],
    }),
    takeCertificateWithFio: build.mutation({
      query: ({ courseId, name }) => ({
        url: `courses/${courseId}/certificates`,
        method: 'POST',
        body: {
          profile: { name },
        },
      }),
      invalidatesTags: ['Certificate'],
    }),
    takeCertificate: build.mutation({
      query: ({ courseId }) => ({
        url: `courses/${courseId}/certificates`,
        method: 'POST',
      }),
      invalidatesTags: ['Certificate'],
    }),
  }),
});

export const {
  useGetCertificatesQuery,
  useGetCertificateQuery,
  useTakeCertificateMutation,
  useTakeCertificateWithFioMutation,
} = certificateApi;
