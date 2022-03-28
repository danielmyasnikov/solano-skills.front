import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
	baseUrl: `${process.env.REACT_APP_API_COURSE}/api/v1/`,
	prepareHeaders: (headers) => {
		// @ts-ignore
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
})

export const certificateApi = createApi({
	reducerPath: 'certificateApi',
	baseQuery,
	endpoints: (build) => ({
		getCertificates: build.query({
			query: () => ({
				url: 'certificates',
				headers
			})
		}),
		getCertificate: build.query({
			query: (cid) => ({
				url: `certificates/${cid}`,
			})
		}),
		takeCertificate: build.mutation({
			query: (courseId) => ({
				url: `courses/${courseId}/certificates`,
				method: 'POST',
				headers
			})
		}) 
	})
})