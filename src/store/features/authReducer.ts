import {createSlice} from '@reduxjs/toolkit';
import LoginResponse from '../../payload/response/LoginResponse';

interface AuthState {
  user?: LoginResponse | null;
}
const INITIAL_STATE: AuthState = {
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
