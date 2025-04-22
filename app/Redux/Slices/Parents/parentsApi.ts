import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAllParents } from "./ParentsSlice";
import { GetAllParentChildrenResponseType, GetAllParentsResponseType } from "../../types";

export const parentsApi = createApi({
  reducerPath: "parentsApi",
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
    getAllParents: builder.query<GetAllParentsResponseType, void>({
      query: () => "users/info/parent",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;
          dispatch(setAllParents(response.data));
        } catch (error) {
          console.error("Fetching parents failed", error);
        }
      },
    }),
    getParentChildren: builder.query<GetAllParentChildrenResponseType, string|number>({
      query: (parentId) => `/users/info/parent/${parentId}/children`,
    }),
  }),
});

export const { useGetAllParentsQuery , useGetParentChildrenQuery } = parentsApi;
