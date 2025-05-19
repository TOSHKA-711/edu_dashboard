import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "./authSlice"; // Ensure the path is correct
import { LogType } from "../../types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://morabrand.net/el-fahem-commuintyApp/public/api/",
    prepareHeaders: (headers) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");

        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/loginAdmin",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          const { token, user, role } = data;

          if (typeof window !== "undefined") {
            localStorage.setItem("token", token);
            localStorage.setItem("userRole", role);
            localStorage.setItem("user", JSON.stringify(user));
          }

          if (getState()) {
            dispatch(setUser({ user, token , role , lang:"ar"}));
          } else {
            console.warn("Store is not initialized yet");
          }
        } catch (error) {
          console.error("Login failed", error);
        }
      },
    }),
    getLogs: builder.query<
    {logs:LogType[]},
    void
  >({
    query: () => `logsLogin`,
    async onQueryStarted(arg, { queryFulfilled }) {
      try {
        await queryFulfilled;
      } catch (error) {
        console.error("Fetching Logs failed", error);
      }
    },
  }),
  }),
  
});

export const { useLoginMutation ,useGetLogsQuery} = authApi;
