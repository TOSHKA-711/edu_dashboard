"use client";
import OverViewCard from "@/app/items/cards/OverViewCard";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosAdd } from "react-icons/io";

const Page = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-start gap-5 py-8">
      <button
        className="flex flex-row gap-1 items-center bg-[#2664B1] text-white py-2 px-4 rounded-3xl cursor-pointer self-end"
        onClick={() => router.push("/dashboard/subjects/addSubject")}
      >
        <IoIosAdd className="text-lg" />
        إضافة موضوع
      </button>
      <OverViewCard />
      <OverViewCard />
    </div>
  );
};

export default Page;
