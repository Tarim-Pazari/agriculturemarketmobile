import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE = {
  firebaseToken: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    setFirebaseToken(state, action) {
      state.firebaseToken = action.payload;
    },
  },
});
export const AppActions = appSlice.actions;
export const AppReducer = appSlice.reducer;
