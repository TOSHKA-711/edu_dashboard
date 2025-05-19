import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAllInstructors } from "./InstructorsSlice";
import {  AllInstructorCoursesType, AllInstructorRatesResponseType, GetAllInstructorsResponseType } from "../../types";

export const instructorsApi = createApi({
  reducerPath: "instructorsApi",
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
    getAllInstructors: builder.query<GetAllInstructorsResponseType, void>({
      query: () => "instructors",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;
          dispatch(setAllInstructors(response.data));
        } catch (error) {
          console.error("Fetching instructors failed", error);
        }
      },
    }),
    getInstructorCourses: builder.query<AllInstructorCoursesType, string | number>({
      query: (instructorId) => `instructorCourses/${instructorId}`,
    }),
    getInstructorRates: builder.query<AllInstructorRatesResponseType, string | number>({
      query: (instructorId) => `instructorRating/${instructorId}`,
    }),
    setInstructor: builder.mutation<unknown, FormData>({
      query: ( data ) => ({
        url: `instructors`,
        method: "POST",
        body: data,
      }),
    }),
    setInstructorUpdate: builder.mutation<unknown, { id: number; data: FormData }>({
      query: ({ id, data }) => ({
        url: `instructors/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    changeInstructorRateStatus: builder.mutation<unknown,{id:number,status:number}>({
      query: ({id,status}) => ({
        url: `changeInstructorRatingStatusReview/${id}/${status}`,
        method: "GET",
      }),
    }),
    deleteInstructor: builder.mutation<unknown, { instructorId: number }>({
        query: ({ instructorId }) => ({
          url: `instructors/${instructorId}`,
          method: "DELETE",
        }),
      }),
      
  }),
});

export const {
  useGetAllInstructorsQuery,
  useGetInstructorCoursesQuery,
  useSetInstructorMutation,
  useGetInstructorRatesQuery,
  useSetInstructorUpdateMutation,
  useChangeInstructorRateStatusMutation,
  useDeleteInstructorMutation
} = instructorsApi;
