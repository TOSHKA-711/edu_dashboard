"use client"
import ParentsTable from "@/app/items/tables/ParentsTable";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosAdd } from "react-icons/io";

const Page = () => {
    const router =useRouter();
  return (
    <div className="all-students flex flex-col gap-3">
      <button
        className="flex flex-row gap-1 items-center bg-[#2664B1] text-white py-2 px-4 rounded-3xl cursor-pointer self-end"
        onClick={() => router.push("/dashboard/parents/addParent")}
      >
        <IoIosAdd className="text-lg" />
        إضافة ولي امر
      </button>
      <ParentsTable />
    </div>
  );
};

export default Page;
