import PriceTrackingAnonymousRequest from '../payload/request/PriceTrackingAnonymousRequest';
import PriceTrackingRequest from '../payload/request/PriceTrackingRequest';
import PriceTrackingResponse from '../payload/response/PriceTrackingResponse';
import ServiceResponse from '../payload/response/ServiceResponse';
import {baseApi} from '../store/api/BaseApi';

export const trackingApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    trackPrice: builder.mutation<
      ServiceResponse<PriceTrackingResponse>,
      PriceTrackingRequest
    >({
      query: entity => ({
        url: '/api/v1/price-tracking',
        method: 'POST',
        body: entity,
      }),
    }),
    anonymusPriceTracking: builder.mutation<
      ServiceResponse<PriceTrackingResponse>,
      PriceTrackingAnonymousRequest
    >({
      query: entity => ({
        url: '/api/v1/price-tracking/anonymous',
        method: 'POST',
        body: entity,
      }),
    }),
    deletePriceTracking: builder.mutation<
      ServiceResponse<PriceTrackingResponse>,
      number
    >({
      query: id => ({
        url: `/api/v1/price-tracking/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});
export const {
  useTrackPriceMutation,
  useAnonymusPriceTrackingMutation,
  useDeletePriceTrackingMutation,
} = trackingApi;
