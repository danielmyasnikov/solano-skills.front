import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const headers = {
	uid: window.localStorage.getItem('uid'),
	'access-token': window.localStorage.getItem('access-token'),
	client: window.localStorage.getItem('client'),
	expiry: window.localStorage.getItem('expiry'),
}

export const certificateApi = createApi({
	reducerPath: 'certificateApi',
	baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_COURSE}/api/v1/`}),
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