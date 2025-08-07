import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAllStudents } from "./studentsSlice";
import { AllStudentCoursesType, GetAllStudentsResponseType } from "../../types";

export const studentsApi = createApi({
  reducerPath: "studentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://jmaheryapp.com/api",
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
    getAllStudents: builder.query<GetAllStudentsResponseType, void>({
      query: () => "users/info",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;
          dispatch(setAllStudents(response.data));
        } catch (error) {
          console.error("Fetching students failed", error);
        }
      },
    }),
    getStudentCourses: builder.query<AllStudentCoursesType, string | number>({
      query: (studentId) => `course/get/courses?child_id=${studentId}`,
    }),
    getStudentImages: builder.query<
      { status: boolean; message: string; data: { data: string[] } },
      void
    >({
      query: () => `/image`,
    }),
    setStudent: builder.mutation<unknown, { parentId: number; data: FormData }>(
      {
        query: ({ parentId, data }) => ({
          url: `/users/addChild/${parentId}`,
          method: "POST",
          body: data,
        }),
      }
    ),
    setStudentUpdate: builder.mutation<unknown, { id: number; data: FormData }>(
      {
        query: ({ id, data }) => ({
          url: `users/updateUserInfo/${id}`,
          method: "POST",
          body: data,
        }),
      }
    ),
    changeUserStatus: builder.mutation<unknown, number>({
      query: (userId) => ({
        url: `/users/changeStatusUser/${userId}`,
        method: "GET",
      }),
    }),
    deleteUser: builder.mutation<unknown, number>({
      query: (userId) => ({
        url: `users/deleteUser/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllStudentsQuery,
  useGetStudentCoursesQuery,
  useGetStudentImagesQuery,
  useSetStudentUpdateMutation,
  useSetStudentMutation,
  useChangeUserStatusMutation,
  useDeleteUserMutation,
} = studentsApi;
