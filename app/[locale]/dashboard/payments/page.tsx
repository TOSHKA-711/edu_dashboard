"use client";
import { useGetCoursesPaymentsQuery } from "@/app/Redux/Slices/Courses/courseApi";
import React from "react";
import PaymentsTable from "../../items/tables/PaymentsTable";

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
