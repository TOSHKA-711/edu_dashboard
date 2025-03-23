
import Image from "next/image";
import React from "react";
import { TbMinusVertical } from "react-icons/tb";

const HomeCourseCard = () => {
  return (
    <div className="course-card p-4 rounded-lg bg-white flex flex-row items-center justify-between cursor-pointer max-sm:flex-col max-sm:gap-2" dir="rtl">
      <div className="course flex flex-row items-center justify-center gap-2">
        <Image src={"/user.jpg"} alt="course" className="h-12 w-12" width={60} height={20} />
        <p className="text-[16px]">أساسايات برمجة الموبيل</p>
      </div>
      <div className="details flex flex-row items-center justify-center text-[16px] text-zinc-500 px-4">
        <span>12 موضوع</span>
        <TbMinusVertical className=" text-2xl h-h-4 font-light " />
        <span>220 إتمام الدورة</span>
        <TbMinusVertical className=" text-2xl h-h-4 font-light " />
        <span>290 طالب مُسجل</span>
      </div>
    </div>
  );
};

export default HomeCourseCard;
