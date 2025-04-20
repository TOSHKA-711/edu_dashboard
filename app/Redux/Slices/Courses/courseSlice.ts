// studentsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseDepartmentsType, CourseType } from "../../types";

interface CoursesState {
  allCourses: CourseType[];
  courseDepartments: CourseDepartmentsType | null;
    selectedCourse: CourseType | null;
}

const initialState: CoursesState = {
  allCourses: [],
  courseDepartments: null,
    selectedCourse:
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("selectedUser") || "null")
        : null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setAllCourses: (state, action: PayloadAction<CourseType[]>) => {
      state.allCourses = action.payload;
    },
    setSelectedCourse: (state, action: PayloadAction<CourseType | null>) => {
      state.selectedCourse = action.payload;
      // Sync selectedCourse with localStorage
      if (typeof window !== "undefined" && action.payload !== null) {
        localStorage.setItem("selectedCourse", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("selectedCourse");
      }
    },
  },
});

export const { setAllCourses,setSelectedCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
