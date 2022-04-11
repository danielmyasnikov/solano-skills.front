import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@src/http/axios';

const baseQuery = axiosBaseQuery({
  baseUrl: `/api/v1/`,
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
