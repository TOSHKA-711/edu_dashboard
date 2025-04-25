"use client"
import React from "react";
import UsersTable from "@/app/items/tables/usersTable";
import { IoIosAdd } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function AllStudents() {
  const router =useRouter();
  return (
    <div className="all-students flex flex-col gap-3">
      <button
        className="flex flex-row gap-1 items-center bg-[#2664B1] text-white py-2 px-4 rounded-3xl cursor-pointer self-end"
        onClick={()=>router.push("/dashboard/students/addStudent")}
      >
        <IoIosAdd className="text-lg" />
        إضافة طالب
      </button>
      <UsersTable />
    </div>
  );
}
