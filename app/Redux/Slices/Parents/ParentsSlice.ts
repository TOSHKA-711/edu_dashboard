// studentsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ParentType } from "../../types";

interface ParentsState {
  allParents: ParentType[];
//   studentCourses: AllStudentCoursesType | null;
  selectedParent: ParentType | null;
}

const initialState: ParentsState = {
  allParents: [],
//   studentCourses: null,
  selectedParent:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("selectedParent") || "null")
      : null,
};

const parentsSlice = createSlice({
  name: "parents",
  initialState,
  reducers: {
    setAllParents: (state, action: PayloadAction<ParentType[]>) => {
      state.allParents = action.payload;
    },
    setSelectedParent: (state, action: PayloadAction<ParentType | null>) => {
      state.selectedParent = action.payload;
      if (typeof window !== "undefined" && action.payload !== null) {
        localStorage.setItem("selectedUser", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("selectedUser");
      }
    },
  },
});

export const { setAllParents, setSelectedParent } = parentsSlice.actions;
export default parentsSlice.reducer;
