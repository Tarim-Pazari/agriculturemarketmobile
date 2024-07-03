import {createSlice} from '@reduxjs/toolkit';
import CityResponse from '../../payload/response/CityResponse';
export interface AppLocation {
  cityId: number;
  districtId: number;
  city?: CityResponse;
  district?: DistrictResponse;
}

export interface AppState {
  firebaseToken: string | null;
  location: AppLocation | null;
}

const INITIAL_STATE: AppState = {
  firebaseToken: null,
  location: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    setFirebaseToken(state, action) {
      state.firebaseToken = action.payload;
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
    setUserLocation(state, action) {
      state.location =
        state.location === null
          ? action.payload
          : {
              ...state.location,
              ...action.payload,
            };
    },
  },
});
export const AppActions = appSlice.actions;
export const AppReducer = appSlice.reducer;
