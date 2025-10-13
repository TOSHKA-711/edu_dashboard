import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAllCourses } from "./courseSlice";
import {
  AllCategoriesResponseType,
  AllCourseDepartmentsResponseType,
  AllCourseRatesResponseType,
  AllCoursesPaymentsResponseType,
  AllEnrolledUsersResponseType,
  AllStudentCoursesAttendanceResponseType,
  CourseType,
  GetAllCoursesResponseType,
} from "../../types";

export const coursesApi = createApi({
  reducerPath: "coursesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jmaheryapp.com/api",
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
    getAllCourses: builder.query<GetAllCoursesResponseType, void>({
      query: () => "course",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;
          dispatch(setAllCourses(response.data));
        } catch (error) {
          console.error("Fetching courses failed", error);
        }
      },
    }),
    getCourse: builder.query<
      { status: boolean; message: string; data: CourseType },
      number
    >({
      query: (courseId) => `courses/${courseId}`,
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Fetching course failed", error);
        }
      },
    }),
    getCourseDepartments: builder.query<
      AllCourseDepartmentsResponseType,
      number | string
    >({
      query: (courseId) => `departmentAndSessions/${courseId}`,
      async onQueryStarted(courseId, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Fetching sessions failed", error);
        }
      },
    }),
    getAllCategories: builder.query<AllCategoriesResponseType, void>({
      query: () => "categories",
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Fetching categories failed", error);
        }
      },
    }),
    getStudentsInSession: builder.query<
      AllStudentCoursesAttendanceResponseType,
      { courseId: number | string; sessionId: number | string }
    >({
      query: ({ courseId, sessionId }) =>
        `usersCoursesBySession/${courseId}/${sessionId}`,
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Fetching categories failed", error);
        }
      },
    }),
    getEnrolledUsers: builder.query<
      AllEnrolledUsersResponseType,
      number | string
    >({
      query: (courseId) => `getUsersEnrolledInCourse/${courseId}`,
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Fetching users failed", error);
        }
      },
    }),
    getCoursesPayments: builder.query<AllCoursesPaymentsResponseType, void>({
      query: () => `allPayments`,
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Fetching payments failed", error);
        }
      },
    }),
    getCourseRates: builder.query<AllCourseRatesResponseType, number>({
      query: (courseId) => `courseRating/${courseId}`,
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Fetching Rates failed", error);
        }
      },
    }),
    setCourse: builder.mutation<unknown, unknown>({
      query: (data) => ({
        url: `courses-add`,
        method: "POST",
        body: data,
      }),
    }),

    setDepartment: builder.mutation<unknown, FormData>({
      query: (data) => ({
        url: `departments`,
        method: "POST",
        body: data,
      }),
    }),
    setSession: builder.mutation<unknown, FormData>({
      query: (data) => ({
        url: `course-sessions`,
        method: "POST",
        body: data,
      }),
    }),
    setUserAttendance: builder.mutation<
      unknown,
      { sessionId: number | string; userId: number | string }
    >({
      query: ({ sessionId, userId }) => ({
        url: `makeAttendForUsers`,
        method: "POST",
        body: {
          course_session_id: sessionId,
          user_ids: [userId],
        },
      }),
    }),
    setUserPayment: builder.mutation<
      unknown,
      { amount: number; userId: number | string }
    >({
      query: ({ amount, userId }) => ({
        url: `makePaymentForUser`,
        method: "POST",
        body: {
          amount: amount,
          id: userId,
        },
      }),
    }),
    setWarning: builder.mutation<unknown, number | string>({
      query: (userId) => ({
        url: `sendNotification/${userId}`,
        method: "GET",
      }),
    }),
    changeCourseStatus: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `changeCourseStatus/${id}`,
        method: "GET",
      }),
    }),
    changeCourseRateStatus: builder.mutation<
      unknown,
      { id: number; status: number }
    >({
      query: ({ id, status }) => ({
        url: `changeCourseRatingStatusReview/${id}/${status}`,
        method: "GET",
      }),
    }),
    updateCourse: builder.mutation<
      unknown,
      { id: number | string; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `courses/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteCourse: builder.mutation<unknown, number>({
      query: (courseId) => ({
        url: `courses/${courseId}`,
        method: "DELETE",
      }),
    }),
    deleteDepartment: builder.mutation<unknown, number>({
      query: (departmentId) => ({
        url: `departments/${departmentId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useGetCourseQuery,
  useGetCourseDepartmentsQuery,
  useGetAllCategoriesQuery,
  useGetStudentsInSessionQuery,
  useGetEnrolledUsersQuery,
  useGetCoursesPaymentsQuery,
  useGetCourseRatesQuery,
  useSetDepartmentMutation,
  useSetCourseMutation,
  useSetSessionMutation,
  useSetUserAttendanceMutation,
  useSetUserPaymentMutation,
  useSetWarningMutation,
  useChangeCourseStatusMutation,
  useChangeCourseRateStatusMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useDeleteDepartmentMutation,
} = coursesApi;
