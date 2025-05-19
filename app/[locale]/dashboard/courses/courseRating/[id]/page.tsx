"use client";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiOutlineIdentification } from "react-icons/hi2";
import { MdOutlineDateRange } from "react-icons/md";
import { useParams } from "next/navigation";
import {
  useGetCourseQuery,
  useGetCourseRatesQuery,
} from "@/app/Redux/Slices/Courses/courseApi";
import CourseRates from "@/app/[locale]/items/cards/CourseRates";
import { useTranslations } from "next-intl";

const ViewCourse = () => {
  const params = useParams();
  const t = useTranslations();
  const courseId = parseInt(params.id as string) ?? 0;
  const [isRendered, setIsRendered] = useState(false);
  const { data: selectedCourse } = useGetCourseQuery(courseId);

  const { data: rates, refetch } = useGetCourseRatesQuery(courseId);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  if (!courseId || !isRendered) {
    return <div>{t("alerts.loading")}</div>;
  }

  if (!selectedCourse) {
    return <div>{t("alerts.loading_or_no_rates_found")}</div>;
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
            {t("courses.view.student")}
          </span>
          <span className="flex flex-col items-center gap-1">
            <Image alt="user" src="/Frame_book.svg" width={40} height={100} />
            <p>{selectedCourse?.data?.session_count}</p>
            {t("courses.view.lessons")}
          </span>
          <span className="flex flex-col items-center gap-1">
            <Image alt="user" src="/Frame_rate.svg" width={40} height={100} />
            <p>{selectedCourse?.data?.type}</p>
            {t("courses.view.category")}
          </span>
        </div>
        <div className="middle w-[2px] h-[6rem] bg-[#B0DEFF] max-md:h-1 max-md:w-4/5  "></div>
        <div className="per-details flex flex-col items-start gap-3">
          <h2 className="text-lg font-semibold  ">
            {" "}
            {t("courses.add.course_info")}
          </h2>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="flex flex-row gap-1 items-center justify-start">
              {" "}
              <HiOutlineIdentification className="text-lg" />:
            </span>
            <span> {selectedCourse?.data?.address}</span>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="flex flex-row gap-1 items-center justify-start">
              {" "}
              <MdOutlineDateRange className="text-lg" />
              {t("courses.view.start_date_label")}
            </span>
            <span> {selectedCourse?.data?.start_date}</span>
          </div>
        </div>
        <div className="middle w-[2px] h-[6rem] bg-[#B0DEFF] max-md:h-1 max-md:w-4/5  "></div>
        <div className="about flex flex-col items-start gap-4">
          <p className="font-semibold text-lg">
            {" "}
            {t("courses.view.short_description")}
          </p>
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
              {t("courses.view.reviews")}
            </button>
          </div>
        </div>

        <CourseRates reviews={rates?.data ?? []} refetch={refetch} />
      </div>
    </div>
  );
};

export default ViewCourse;
