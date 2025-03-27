"use client";
import LessonsTable from "@/app/items/tables/LessonsTable";
import React, { useState } from "react";

const ViewCourse = () => {
  const [isViewCourses, setIsViewCourses] = useState<boolean>(true);

  //   handle switch view
  const handleSwitchView = () => {
    setIsViewCourses(!isViewCourses);
  };
  return (
    <div className="view-course flex flex-col items-start gap-4">
      <div className="w-full flex flex-col items-start gap-4 py-6">
        <div
          className="view-btns py-2 px-4 rounded-2xl "
          style={{
            boxShadow: " 3.25px 8.3px 20.51px 0px #0000000D",
            backdropFilter: "blur(14.350000381469727px)",
          }}
        >
          <div className="rounded-2xl p-2 flex items-center gap-2 bg-[#F2F4F5]">
            <button
              onClick={handleSwitchView}
              className={`py-2 px-6 rounded-lg text-lg font-semibold cursor-pointer ${
                isViewCourses && "bg-white"
              } ${!isViewCourses && "text-[#757575]"} `}
            >
              القسم 1
            </button>
            <button
              onClick={handleSwitchView}
              className={`py-2 px-6 rounded-lg text-lg font-semibold cursor-pointer ${
                !isViewCourses && "bg-white"
              } ${isViewCourses && "text-[#757575] "} `}
            >
              القسم 2
            </button>
          </div>
        </div>
        <h1 className="text-zinc-600 text-2xl mt-6">
          {" "}
          القسم 1-مقدمة: مخطط الدورة
        </h1>
        <LessonsTable />
        <h1 className="text-zinc-600 text-2xl mt-6">
          {" "}
        القسم 1-مقدمة: إعداد فلاتر
        </h1>
        <LessonsTable />
      </div>
    </div>
  );
};

export default ViewCourse;
