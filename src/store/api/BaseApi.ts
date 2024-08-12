import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
export const BaseUrl = 'https://api.tarimpazari.app';
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
