"use client"
import PaymentsTable from "@/app/items/tables/PaymentsTable";
import { useGetCoursesPaymentsQuery } from "@/app/Redux/Slices/Courses/courseApi";
import React from "react";

const Page = () => {
  const { data: payments } = useGetCoursesPaymentsQuery();
  return (
    <div>
      <PaymentsTable
        payments={payments ?? { status: false, message: "", data: [] }}
      />
    </div>
  );
};

export default Page;
