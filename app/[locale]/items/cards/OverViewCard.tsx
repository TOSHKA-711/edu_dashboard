"use client";
import React from "react";
import { IoCheckmarkDone } from "react-icons/io5";
import { HiMiniUsers } from "react-icons/hi2";
import { TbCurrencyDollar } from "react-icons/tb";
import { TbChartCircles } from "react-icons/tb";
import { useTranslations } from "next-intl";

export default function OverViewCard({
  data,
}: {
  data: {
    child_users: number;
    parent_users: number;
    individual_users: number;
    enrollments: number;
    category: number;
    course: number;
    instructor: number;
  };
}) {

  const t = useTranslations();

  if (!data) {
    return <div> {t("alerts.loading")} </div>; 
  }
  
  return (
    <div className="grid w-full grid-cols-4 gap-3 max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1">
      <div
        className="card flex flex-col items-start justify-center p-5 rounded-xl bg-[#FFFADF]  w-full max-lg:w-full h-40 text-3xl relative"
        dir="rtl"
      >
        <IoCheckmarkDone className="absolute left-2 top-2 bg-[#FBF2C0] p-1 text-2xl text-[#D9CC83]" />
        <p className="font-medium  ">{data.child_users}</p>
        <p> {t('home.children')}</p>
      </div>
      <div
        className="card flex flex-col items-start justify-center p-5 rounded-xl bg-[#EFECFF] w-full max-lg:w-full h-40 text-3xl relative"
        dir="rtl"
      >
        <HiMiniUsers className="absolute left-2 top-2 bg-[#E6E0FF] p-1 text-2xl text-[#917FF0]" />
        <p className="font-medium  ">{data.parent_users}</p>
        <p>  {t('home.parents')}</p>
      </div>
      <div
        className="card flex flex-col items-start justify-center p-5 rounded-xl bg-[#E8FBF5] w-full max-lg:w-full h-40 text-3xl relative"
        dir="rtl"
      >
        <TbCurrencyDollar className="absolute left-2 top-2 bg-[#D8F8ED] p-1 text-2xl text-[#75A896]" />
        <p className="font-medium  ">{data.individual_users}</p>
        <p>  {t('home.individual')}</p>
      </div>
      <div
        className="card flex flex-col items-start justify-center p-5 rounded-xl bg-[#FFF0FF] w-full max-lg:w-full h-40 text-3xl relative"
        dir="rtl"
      >
        <TbChartCircles className="absolute left-2 top-2 bg-[#FFE5FF] p-1 text-2xl text-[#B270B2]" />
        <p className="font-medium  ">{data.enrollments}</p>
        <p> {t('home.enrollments')}</p>
      </div>
      <div
        className="card flex flex-col items-start justify-center p-5 rounded-xl bg-[#EFECFF] w-full max-lg:w-full h-40 text-3xl relative"
        dir="rtl"
      >
        <HiMiniUsers className="absolute left-2 top-2 bg-[#E6E0FF] p-1 text-2xl text-[#917FF0]" />
        <p className="font-medium  ">{data.course}</p>
        <p> {t('home.courses')}</p>
      </div>
      <div
        className="card flex flex-col items-start justify-center p-5 rounded-xl bg-[#E8FBF5] w-full max-lg:w-full h-40 text-3xl relative"
        dir="rtl"
      >
        <TbCurrencyDollar className="absolute left-2 top-2 bg-[#D8F8ED] p-1 text-2xl text-[#75A896]" />
        <p className="font-medium  ">{data.instructor}</p>
        <p> {t('home.instructors')}</p>
      </div>
      <div
        className="card flex flex-col items-start justify-center p-5 rounded-xl bg-[#FFF0FF] w-full max-lg:w-full h-40 text-3xl relative"
        dir="rtl"
      >
        <TbChartCircles className="absolute left-2 top-2 bg-[#FFE5FF] p-1 text-2xl text-[#B270B2]" />
        <p className="font-medium  ">{data.category}</p>
        <p> {t('home.categories')}</p>
      </div>
    </div>
  );
}
