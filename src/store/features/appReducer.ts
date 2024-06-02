import {createSlice} from '@reduxjs/toolkit';
import {AppLocation} from '../../types/type';

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
              userSelection: {
                ...state.location.userSelection,
                ...action.payload,
              },
            };
    },
  },
});
export const AppActions = appSlice.actions;
export const AppReducer = appSlice.reducer;
