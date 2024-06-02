import CityResponse from '../payload/response/CityResponse';
import ServiceResponse from '../payload/response/ServiceResponse';
import {baseApi} from '../store/api/BaseApi';

export const citiesApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getCities: build.mutation<ServiceResponse<CityResponse>, void>({
      query: () => {
        return {
          url: '/api/v1/cities',
          method: 'GET',
        };
      },
    }),
  }),
  overrideExisting: false,
});
export const {useGetCitiesMutation} = citiesApi;
