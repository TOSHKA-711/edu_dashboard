"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosAdd } from "react-icons/io";
import TeachersTable from "../../items/tables/TeachersTable";
import { useTranslations } from "next-intl";

const Page = () => {
  const router = useRouter();
  const t = useTranslations();

  const handleAdd = () => {
    router.push("/dashboard/teachers/addTeacher");
  };
  return (
    <div className="flex flex-col gap-4 -mt-10 pb-4">
      <button
        className="flex flex-row gap-1 items-center bg-[#2664B1] text-white py-2 px-4 rounded-3xl cursor-pointer self-end"
        onClick={handleAdd}
      >
        <IoIosAdd className="text-lg" />
        {t('instructors.all.add_teacher')}
      </button>
      <TeachersTable />
    </div>
  );
};

export default Page;
