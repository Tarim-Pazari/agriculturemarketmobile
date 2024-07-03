import DailyPriceRequest from '../payload/request/DailyPriceRequest';
import DailyPriceResponse from '../payload/response/DailyPriceResponse';
import ServiceResponse from '../payload/response/ServiceResponse';
import {baseApi} from '../store/api/BaseApi';

export const dailyApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getDailyPrice: builder.mutation<
      ServiceResponse<DailyPriceResponse>,
      DailyPriceRequest
    >({
      query: entity => ({
        url: '/api/v1/daily-price',
        method: 'POST',
        body: entity,
      }),
    }),
    getDailyPriceByIds: builder.mutation<
      ServiceResponse<DailyPriceResponse>,
      DailyPriceByIdRequest
    >({
      query: entity => ({
        url: '/api/v1/daily-price',
        method: 'POST',
        body: entity,
      }),
    }),
  }),
});
export const {useGetDailyPriceMutation, useGetDailyPriceByIdsMutation} =
  dailyApi;
