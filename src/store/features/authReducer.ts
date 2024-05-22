import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE = {
  user: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});
export const AuthActions = authSlice.actions;
export const AuthReducer = authSlice.reducer;
