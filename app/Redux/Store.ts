import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./Slices/Auth/authApi";
import { studentsApi } from "./Slices/Students/studentsApi";
import { parentsApi } from "./Slices/Parents/parentsApi";
import { instructorsApi } from "./Slices/Instructors/InstructorsApi";
import authReducer from "./Slices/Auth/authSlice";
import studentsReducer from "./Slices/Students/studentsSlice";
import parentsReducer from "./Slices/Parents/ParentsSlice";
import InstructorsReducer from "./Slices/Instructors/InstructorsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    students: studentsReducer,
    [studentsApi.reducerPath]: studentsApi.reducer,
    Parents: parentsReducer,
    [parentsApi.reducerPath]: parentsApi.reducer,
    Instructors: InstructorsReducer,
    [instructorsApi.reducerPath]: instructorsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      studentsApi.middleware,
      parentsApi.middleware,
      instructorsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
