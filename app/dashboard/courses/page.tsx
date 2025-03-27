"use client";
import AllCoursesTable from "@/app/items/tables/AllCoursesTable";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosAdd } from "react-icons/io";

const Page = () => {
  const router = useRouter();

  const handleAdd = () => {
    router.push("/dashboard/courses/addCourse");
  };
  return (
    <div className="flex flex-col gap-4 -mt-10 pb-4">
      <button
        className="flex flex-row gap-1 items-center bg-[#2664B1] text-white py-2 px-4 rounded-3xl cursor-pointer self-end"
        onClick={handleAdd}
      >
        <IoIosAdd className="text-lg" />
        إضافة دورة
      </button>

      <AllCoursesTable />
    </div>
  );
};

export default Page;
