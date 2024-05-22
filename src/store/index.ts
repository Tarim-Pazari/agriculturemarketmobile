import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import {baseApi} from './api/BaseApi';
import {AppReducer} from './features/appReducer';
import {AuthReducer} from './features/authReducer';

const appPersistConfig = {
  key: 'app',
  storage: AsyncStorage,
  whitelist: ['firebaseToken'],
};
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const rootReducers = combineReducers({
  app: persistReducer(appPersistConfig, AppReducer),
  auth: persistReducer(authPersistConfig, AuthReducer),
  [baseApi.reducerPath]: baseApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducers,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(baseApi.middleware),
  });
};

export const store = setupStore();
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
