import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types";

interface AuthState {
  user: UserType | null;
  token: string | null;
  userRole: string | null;
  userLang: string | null;
}
const getFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : null;
    } catch {
      return item; // If JSON parsing fails, return the raw string
    }
  }
  return null;
};


const initialState: AuthState = {
  userRole: getFromLocalStorage("userRole"),
  token: getFromLocalStorage("token"),
  user: getFromLocalStorage("user"),
  userLang: getFromLocalStorage("userLang") || "ar", 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: UserType; token: string; role: string; lang: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userRole = action.payload.role;
      state.userLang = "ar";

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("userRole", action.payload.role);
        
      }
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userRole = null;
      state.userLang = null;
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
