// studentsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllStudentCoursesType, StudentType } from "../../types";

interface StudentsState {
  allStudents: StudentType[];
  studentCourses: AllStudentCoursesType | null;
  selectedUser: StudentType | null;
}

const initialState: StudentsState = {
  allStudents: [],
  studentCourses: null,
  selectedUser:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("selectedUser") || "null")
      : null,
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setAllStudents: (state, action: PayloadAction<StudentType[]>) => {
      state.allStudents = action.payload;
    },
    // setStudentCourses: (state, action: PayloadAction<AllStudentCoursesType>) => {
    //   state.studentCourses = action.payload;
    // },
    setSelectedUser: (state, action: PayloadAction<StudentType | null>) => {
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

export const { setAllStudents, setSelectedUser } = studentsSlice.actions;
export default studentsSlice.reducer;
