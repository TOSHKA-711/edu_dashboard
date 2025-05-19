import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./Slices/Auth/authApi";
import { studentsApi } from "./Slices/Students/studentsApi";
import { parentsApi } from "./Slices/Parents/parentsApi";
import { instructorsApi } from "./Slices/Instructors/InstructorsApi";
import { coursesApi } from "./Slices/Courses/courseApi";
import { categoriesApi } from "./Slices/Categories/categoryApi";
import { OverViewApi } from "./Slices/OverView/overViewApi";
import { settingsApi } from "./Slices/Settings/settingsApi";
import authReducer from "./Slices/Auth/authSlice";
import studentsReducer from "./Slices/Students/studentsSlice";
import parentsReducer from "./Slices/Parents/ParentsSlice";
import InstructorsReducer from "./Slices/Instructors/InstructorsSlice";
import CoursesReducer from "./Slices/Courses/courseSlice";

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
    Courses: CoursesReducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [OverViewApi.reducerPath]: OverViewApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      studentsApi.middleware,
      parentsApi.middleware,
      instructorsApi.middleware,
      coursesApi.middleware,
      categoriesApi.middleware,
      OverViewApi.middleware,
      settingsApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
