"use client";

import { Avatar } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiOutlineIdentification } from "react-icons/hi2";
import { MdOutlineDateRange } from "react-icons/md";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Redux/Store";
import {
  useGetInstructorCoursesQuery,
  useGetInstructorRatesQuery,
} from "@/app/Redux/Slices/Instructors/InstructorsApi";
import { useTranslations } from "next-intl";
import InstructorsCoursesTable from "@/app/[locale]/items/tables/InstructorsCoursesTable";
import TeacherRates from "@/app/[locale]/items/cards/TeacherRates";

const ViewTeacher = () => {
  const params = useParams();
  const t = useTranslations();
  const instructorId = parseInt(params.id as string) ?? 0;
  const [isRendered, setIsRendered] = useState(false);
  const [isViewCourses, setIsViewCourses] = useState<boolean>(true);
  const selectedUser = useSelector(
    (state: RootState) => state.Instructors.selectedUser
  );

  const { data: courses, refetch: refetchCourses } =
    useGetInstructorCoursesQuery(instructorId, {
      skip: !instructorId,
    });

  const { data: rates, refetch } = useGetInstructorRatesQuery(instructorId);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  if (!instructorId || !isRendered) {
    return <div>{t("alerts.loading")}</div>;
  }

  if (!selectedUser) {
    return <div>{t("alerts.loading_or_no_users_found")}</div>;
  }

  const handleSwitchView = () => {
    setIsViewCourses(!isViewCourses);
  };
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
              src={selectedUser?.image}
              sx={{ width: "5rem", height: "5rem", objectFit: "cover" }}
            />
            {selectedUser?.first_name} {selectedUser?.last_name}
          </span>
          <span className="flex flex-col items-center gap-1">
            <Image alt="user" src="/Frame_users.svg" width={40} height={100} />
            <p>1258</p>
            {t("instructors.view.student")}
          </span>
          <span className="flex flex-col items-center gap-1">
            <Image alt="user" src="/Frame_book.svg" width={40} height={100} />
            <p>07</p>
            {t("instructors.view.course")}
          </span>
          <span className="flex flex-col items-center gap-1">
            <Image alt="user" src="/Frame_rate.svg" width={40} height={100} />
            <p>4.5</p>
            {t("instructors.view.review")}
          </span>
        </div>
        <div className="middle w-[2px] h-[6rem] bg-[#B0DEFF] max-md:h-1 max-md:w-4/5  "></div>
        <div className="per-details flex flex-col items-start gap-3">
          <h2 className="text-lg font-semibold  ">
            {" "}
            {t("instructors.view.personal_information")}
          </h2>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="flex flex-row gap-1 items-center justify-start">
              {" "}
              <HiOutlineIdentification className="text-lg" />
              {t("instructors.view.id_number")}
            </span>
            <span> b57646</span>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="flex flex-row gap-1 items-center justify-start">
              {" "}
              <MdOutlineDateRange className="text-lg" />
              {t("instructors.view.join_date")}
            </span>
            <span> 05 Jan, 2024</span>
          </div>
        </div>
        <div className="middle w-[2px] h-[6rem] bg-[#B0DEFF] max-md:h-1 max-md:w-4/5  "></div>
        <div className="about flex flex-col items-start gap-4">
          <p className="font-semibold text-lg">
            {" "}
            {t("instructors.view.short_bio")}
          </p>
          <p>{selectedUser?.info}</p>
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
              onClick={handleSwitchView}
              className={`py-2 px-6 rounded-lg text-lg font-semibold cursor-pointer ${
                isViewCourses && "bg-white"
              } ${!isViewCourses && "text-[#757575]"} `}
            >
              {t("instructors.view.courses")}
            </button>
            <button
              onClick={handleSwitchView}
              className={`py-2 px-6 rounded-lg text-lg font-semibold cursor-pointer ${
                !isViewCourses && "bg-white"
              } ${isViewCourses && "text-[#757575] "} `}
            >
              {t("instructors.view.reviews")}
            </button>
          </div>
        </div>
        {isViewCourses ? (
          <InstructorsCoursesTable
            courses={courses ?? { status: false, message: "", data: [] }}
            refetch={refetchCourses}
          />
        ) : (
          <TeacherRates
            reviews={rates?.data ?? []}
            instructorId={instructorId}
            refetch={refetch}
          />
        )}
      </div>
    </div>
  );
};

export default ViewTeacher;
