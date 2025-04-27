"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosAdd } from "react-icons/io";
import ParentsTable from "../../items/tables/ParentsTable";
import { useTranslations } from "next-intl";

const Page = () => {
    const router =useRouter();
    const t = useTranslations();
  return (
    <div className="all-students flex flex-col gap-3">
      <button
        className="flex flex-row gap-1 items-center bg-[#2664B1] text-white py-2 px-4 rounded-3xl cursor-pointer self-end"
        onClick={() => router.push("/dashboard/parents/addParent")}
      >
        <IoIosAdd className="text-lg" />
        {t('parents.all.guardians')}
      </button>
      <ParentsTable />
    </div>
  );
};

export default Page;
