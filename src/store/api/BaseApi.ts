import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
export const BaseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://192.168.1.140:8080'
    : 'http://92.205.224.111:8080';
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    prepareHeaders: (headers, {getState}: any) => {
      // const token = getState().auth.user?.token;
      // if (token) {
      //   headers.set('authorization', `Bearer ${token}`);
      // }
      return headers;
    },
  }),

  endpoints: builder => ({}),
});
