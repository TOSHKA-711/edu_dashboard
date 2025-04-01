// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './Slices/Auth/authApi';
import authReducer from "./Slices/Auth/authSlice"
console.log("Auth API Middleware:", authApi.middleware);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
