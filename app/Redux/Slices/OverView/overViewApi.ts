import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {  DashboardStatsType } from "../../types";

export const OverViewApi = createApi({
  reducerPath: "OverViewApi",
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
    getAllOverViewData: builder.query<DashboardStatsType, void>({
      query: () => "overview",
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
         await queryFulfilled;
        } catch (error) {
          console.error("Fetching overview failed", error);
        }
      },
    }),
    

  }),
});

export const {
  useGetAllOverViewDataQuery,
} = OverViewApi;
