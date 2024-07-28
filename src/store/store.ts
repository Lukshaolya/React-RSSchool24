import { configureStore } from '@reduxjs/toolkit';
import savedReducer from './slice';
import { dataApi } from './apiSlice';

export const store = configureStore({
  reducer: {
    saved: savedReducer,
    [dataApi.reducerPath]: dataApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dataApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
