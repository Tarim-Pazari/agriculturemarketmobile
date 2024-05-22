import RoleResponse from '../payload/response/RoleResponse';
import ServiceResponse from '../payload/response/ServiceResponse';
import {baseApi} from '../store/api/BaseApi';

const roleApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getRoles: builder.mutation<ServiceResponse<RoleResponse>, void>({
      query: () => ({
        url: '/v1/role/all',
        method: 'GET',
      }),
    }),
  }),
});
export const {useGetRolesMutation} = roleApi;
