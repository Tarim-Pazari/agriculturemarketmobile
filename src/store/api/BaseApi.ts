import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
export const BaseUrl = 'http://92.205.224.111:8080';
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
