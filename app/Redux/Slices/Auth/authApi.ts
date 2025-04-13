import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "./authSlice"; // Ensure the path is correct

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://morabrand.net/el-fahem-commuintyApp/public/api/auth/",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "loginAdmin",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          const { token, user } = data;

          if (typeof window !== "undefined") {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            
          }

          if (getState()) {
            dispatch(setUser({ user, token }));
          } else {
            console.warn("Store is not initialized yet");
          }
        } catch (error) {
          console.error("Login failed", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
