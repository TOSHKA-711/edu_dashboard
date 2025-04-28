"use client";
import React from "react";
import { IoIosAdd } from "react-icons/io";
import { useRouter } from "next/navigation";
import UsersTable from "@/app/[locale]/items/tables/usersTable";
import { useTranslations } from "next-intl";
import {motion} from "framer-motion"

export default function AllStudents() {
  const t = useTranslations();
  const router = useRouter();
  return (
    <div className="all-students flex flex-col gap-3">
      <motion.button
       whileTap={{ scale: 0.9 }}
       transition={{
         type: 'spring',
         stiffness: 400,
         damping: 10
       }}
        className="flex flex-row gap-1 items-center bg-[#2664B1] text-white py-2 px-4 rounded-3xl cursor-pointer self-end"
        onClick={() => router.push("/dashboard/students/addStudent")}
      >
        <IoIosAdd className="text-lg" />
        {t('students.all.add_student')}
      </motion.button>
      <UsersTable />
    </div>
  );
}
