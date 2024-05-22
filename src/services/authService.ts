import LoginRequest from '../payload/request/LoginRequest';
import SignUpRequest from '../payload/request/SignUpRequest';
import LoginResponse from '../payload/response/LoginResponse';
import ServiceResponse from '../payload/response/ServiceResponse';
import {baseApi} from '../store/api/BaseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<ServiceResponse<LoginResponse>, LoginRequest>({
      query: (body: LoginRequest) => ({
        url: '/v1/auth/login',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation<ServiceResponse<LoginResponse>, SignUpRequest>({
      query: (body: SignUpRequest) => ({
        url: '/v1/auth/register',
        method: 'POST',
        body,
      }),
    }),
  }),
});
export const {useLoginMutation, useRegisterMutation} = authApi;
