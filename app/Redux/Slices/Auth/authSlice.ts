import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types";

interface AuthState {
  user: UserType|null;
  token: string | null;
  userRole: string | null;
}

const initialState: AuthState = {
  userRole: null,
  token: null,
  user:    typeof window !== "undefined"
  ? JSON.parse(localStorage.getItem("user") || "null")
  : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: UserType; token: string; role: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userRole = action.payload.role;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userRole");
      }
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
