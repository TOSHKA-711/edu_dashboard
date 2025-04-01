
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser, logout } from "./authSlice"; // تأكد أن المسار صحيح

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://your-api-url.com/",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { token, user } = data;
          if (typeof window !== "undefined") {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
          }
          dispatch(setUser({ user, token }));
        } catch (error) {
          console.error("Login failed", error);
        }
      },
    }),
  }),
});

// تأكد أن التصدير صحيح
export const { useLoginMutation } = authApi;
