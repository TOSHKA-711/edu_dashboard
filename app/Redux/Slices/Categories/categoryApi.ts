import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllCategoriesResponseType, CategoryType } from "../../types";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
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
    getCategory: builder.query<
      { status: boolean; message: string; data: CategoryType },
      number | string
    >({
      query: (categoryId) => `categories/${categoryId}`,
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Fetching categories failed", error);
        }
      },
    }),
    setCategory: builder.mutation<unknown, FormData>({
      query: (data) => ({
        url: `categories`,
        method: "POST",
        body: data,
      }),
    }),
    updateCategory: builder.mutation<
      unknown,
      { categoryId: number; data: FormData }
    >({
      query: ({ categoryId, data }) => ({
        url: `categories-update/${categoryId}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteCategory: builder.mutation<unknown, number>({
      query: (categoryId) => ({
        url: `categories/${categoryId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useSetCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
