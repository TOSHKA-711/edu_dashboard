"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosAdd } from "react-icons/io";
import ParentsTable from "../../items/tables/ParentsTable";
import { useTranslations } from "next-intl";
import {motion} from "framer-motion"

const Page = () => {
    const router =useRouter();
    const t = useTranslations();
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
        onClick={() => router.push("/dashboard/parents/addParent")}
      >
        <IoIosAdd className="text-lg" />
        {t('parents.all.guardians')}
      </motion.button>
      <ParentsTable />
    </div>
  );
};

export default Page;
