// studentsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  AllInstructorCoursesType, InstructorType } from "../../types";

interface InstructorState {
  allInstructors: InstructorType[];
  instructorCourses: AllInstructorCoursesType | null;
  selectedUser: InstructorType | null;
}

const initialState: InstructorState = {
  allInstructors: [],
  instructorCourses: null,
  selectedUser:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("selectedUser") || "null")
      : null,
};

const instructorSlice = createSlice({
  name: "instructors",
  initialState,
  reducers: {
    setAllInstructors: (state, action: PayloadAction<InstructorType[]>) => {
      state.allInstructors = action.payload;
    },
    setInstructorCourses: (state, action: PayloadAction<AllInstructorCoursesType>) => {
      state.instructorCourses = action.payload;
    },
    setSelectedInstructor: (state, action: PayloadAction<InstructorType | null>) => {
      state.selectedUser = action.payload;
      // Sync selectedUser with localStorage
      if (typeof window !== "undefined" && action.payload !== null) {
        localStorage.setItem("selectedUser", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("selectedUser");
      }
    },
  },
});

export const { setAllInstructors ,setSelectedInstructor ,setInstructorCourses} = instructorSlice.actions;
export default instructorSlice.reducer;
