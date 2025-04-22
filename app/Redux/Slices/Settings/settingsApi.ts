import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllRolesResponseType,
} from "../../types";

export const settingsApi = createApi({
  reducerPath: "settingsApi",
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
    setRole: builder.mutation<unknown, unknown>({
      query: (data) => ({
        url: `createAdminOrModerator`,
        method: "POST",
        body: data,
      }),
    }),
    getAllRoles: builder.query<AllRolesResponseType, void>({
      query: () => `getAllRole`,
    }),
    deleteRole: builder.mutation<unknown, number>({
      query: (roleId) => ({
        url: `deleteRole/${roleId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSetRoleMutation,
  useGetAllRolesQuery,
  useDeleteRoleMutation,
} = settingsApi;
