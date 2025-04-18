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
          console.error("Fetching students failed", error);
        }
      },
    }),
    getParentChildren: builder.query<GetAllParentChildrenResponseType, string|number>({
      query: (parentId) => `/users/info/parent/${parentId}/children`,
    }),
    // setStudentUpdate: builder.mutation<unknown, FormData>({
    //   query: (credentials) => ({
    //     url: `users/updateUserInfo/${parseInt(credentials.get('student_id') as string)}`,
    //     method: 'POST',
    //     body: credentials,
    //   }),
    // }),
  }),
});

export const { useGetAllParentsQuery , useGetParentChildrenQuery } = parentsApi;
