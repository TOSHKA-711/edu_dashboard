import React from "react";
import { IoCheckmarkDone } from "react-icons/io5";
import { HiMiniUsers } from "react-icons/hi2";
import { TbCurrencyDollar } from "react-icons/tb";
import { TbChartCircles } from "react-icons/tb";

export default function OverViewCard() {
  return (
    <>
      <div
        className="card flex flex-col items-start justify-center p-5 rounded-xl bg-[#FFFADF] w-1/4 h-40 text-3xl relative"
        dir="rtl"
      >
        <IoCheckmarkDone className="absolute left-2 top-2 bg-[#FBF2C0] p-1 text-2xl text-[#D9CC83]" />
        <p className="font-medium  ">45</p>
        <p>عدد الدورات</p>
      </div>
      <div
        className="card flex flex-col items-start justify-center p-5 rounded-xl bg-[#EFECFF] w-1/4 h-40 text-3xl relative"
        dir="rtl"
      >
        <HiMiniUsers className="absolute left-2 top-2 bg-[#E6E0FF] p-1 text-2xl text-[#917FF0]" />
        <p className="font-medium  ">45</p>
        <p>عدد الدورات</p>
      </div>
      <div
        className="card flex flex-col items-start justify-center p-5 rounded-xl bg-[#E8FBF5] w-1/4 h-40 text-3xl relative"
        dir="rtl"
      >
        <TbCurrencyDollar className="absolute left-2 top-2 bg-[#D8F8ED] p-1 text-2xl text-[#75A896]" />
        <p className="font-medium  ">45</p>
        <p>عدد الدورات</p>
      </div>
      <div
        className="card flex flex-col items-start justify-center p-5 rounded-xl bg-[#FFF0FF] w-1/4 h-40 text-3xl relative"
        dir="rtl"
      >
        <TbChartCircles className="absolute left-2 top-2 bg-[#FFE5FF] p-1 text-2xl text-[#B270B2]" />
        <p className="font-medium  ">45</p>
        <p>عدد الدورات</p>
      </div>
    </>
  );
}
