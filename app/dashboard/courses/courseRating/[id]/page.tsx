"use client";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiOutlineIdentification } from "react-icons/hi2";
import { MdOutlineDateRange } from "react-icons/md";
import { useParams } from "next/navigation";
import { useGetCourseQuery, useGetCourseRatesQuery } from "@/app/Redux/Slices/Courses/courseApi";
import CourseRates from "@/app/items/cards/CourseRates";

const ViewCourse = () => {
  const params = useParams();
  const courseId = parseInt(params.id as string) ?? 0;
  const [isRendered, setIsRendered] = useState(false);
  const {data : selectedCourse} = useGetCourseQuery(courseId);

  const { data: rates } = useGetCourseRatesQuery(courseId);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  if (!courseId || !isRendered) {
    return <div>Loading...</div>;
  }

  if (!selectedCourse) {
    return <div>Loading or no Rates found.</div>;
  }

  return (
    <div className="view-student flex flex-col items-start gap-4">
      <div
        className="student-card rounded-lg flex flex-row items-center justify-start gap-8 p-8 w-full max-md:flex-col max-sm:px-3"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
      >
        <div className="main-details flex flex-row items-center justify-start gap-8">
          <span className="flex flex-col items-center gap-2">
            <Avatar
              alt="user"
              src={selectedCourse?.data?.image}
              sx={{ width: "5rem", height: "5rem", objectFit: "cover" }}
            />
            {selectedCourse?.data?.title} 
          </span>
          <span className="flex flex-col items-center gap-1">
            <Image alt="user" src="/Frame_users.svg" width={40} height={100} />
            <p>{selectedCourse?.data?.max_people}</p>
            طالب
          </span>
          <span className="flex flex-col items-center gap-1">
            <Image alt="user" src="/Frame_book.svg" width={40} height={100} />
            <p>{selectedCourse?.data?.session_count}</p>
            الدروس
          </span>
          <span className="flex flex-col items-center gap-1">
            <Image alt="user" src="/Frame_rate.svg" width={40} height={100} />
            <p>{selectedCourse?.data?.type}</p>
            النوع
          </span>
        </div>
        <div className="middle w-[2px] h-[6rem] bg-[#B0DEFF] max-md:h-1 max-md:w-4/5  "></div>
        <div className="per-details flex flex-col items-start gap-3">
          <h2 className="text-lg font-semibold  ">معلومات عن الدورة</h2>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="flex flex-row gap-1 items-center justify-start">
              {" "}
              <HiOutlineIdentification className="text-lg" />
                :
            </span>
            <span> {selectedCourse?.data?.address}</span>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="flex flex-row gap-1 items-center justify-start">
              {" "}
              <MdOutlineDateRange className="text-lg" />
              تاريخ البدأ :
            </span>
            <span> {selectedCourse?.data?.start_date}</span>
          </div>
        </div>
        <div className="middle w-[2px] h-[6rem] bg-[#B0DEFF] max-md:h-1 max-md:w-4/5  "></div>
        <div className="about flex flex-col items-start gap-4">
          <p className="font-semibold text-lg">نبذة مختصرة</p>
          <p>{selectedCourse?.data?.description}</p>
        </div>
      </div>
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
              className={`py-2 px-6 rounded-lg text-lg font-semibold cursor-pointer bg-white text-[#757575] `}
            >
              التقييمات
            </button>
          </div>
        </div>

        <CourseRates reviews={rates?.data ?? []}  />
      </div>
    </div>
  );
};

export default ViewCourse;
