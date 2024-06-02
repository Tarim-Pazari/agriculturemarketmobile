import FirebaseTokenRequest from '../payload/request/FirebaseTokenRequest';
import FirebaseTokenResponse from '../payload/response/FirebaseTokenResponse';
import ServiceResponse from '../payload/response/ServiceResponse';
import {baseApi} from '../store/api/BaseApi';

export const firebaseTokenApi = baseApi.injectEndpoints({
  endpoints: build => ({
    addFirebaseToken: build.mutation<
      ServiceResponse<FirebaseTokenResponse>,
      FirebaseTokenRequest
    >({
      query: fcmRequest => ({
        url: '/api/v1/firebase-token',
        method: 'POST',
        body: fcmRequest,
      }),
    }),
  }),
});
export const {useAddFirebaseTokenMutation} = firebaseTokenApi;
