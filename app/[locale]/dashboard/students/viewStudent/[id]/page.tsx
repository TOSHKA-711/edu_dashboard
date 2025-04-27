"use client";

import CoursesTable from "@/app/[locale]/items/tables/CoursesTable";
import { RootState } from "@/app/Redux/Store";
import { Avatar } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiOutlineIdentification } from "react-icons/hi2";
import { MdOutlineDateRange } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewStudent = () => {
  const t = useTranslations();
  const params = useParams();
  const studentId = (params.id as string) ?? "";
  const [isRendered, setIsRendered] = useState(false);
  const selectedUser = useSelector(
    (state: RootState) => state.students.selectedUser
  );

  useEffect(() => {
    setIsRendered(true);
  }, []);

  if (!studentId) {
    return <div>{t("alerts.loading")}</div>;
  }

  if (!isRendered) {
    return null;
  }

  if (!selectedUser) {
    return <div>{t("alerts.loading_or_no_users_found")}</div>;
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
              src={selectedUser?.image}
              sx={{ width: "5rem", height: "5rem", objectFit: "cover" }}
            />
            {selectedUser?.first_name} {selectedUser?.last_name}
          </span>
          <span className="flex flex-col items-center gap-1">
            <Image alt="user" src="/Frame_book.svg" width={40} height={100} />
            <p>07</p>
            {t("students.view.course")}
          </span>
          <span className="flex flex-col items-center gap-1">
            <Image alt="user" src="/Frame_rate.svg" width={40} height={100} />
            <p>4.5</p>
            {t("students.view.review")}
          </span>
        </div>
        <div className="middle w-[2px] h-[6rem] bg-[#B0DEFF] max-md:h-1 max-md:w-4/5  "></div>
        <div className="per-details flex flex-col items-start gap-3">
          <h2 className="text-lg font-semibold  ">
            {" "}
            {t("students.view.course")}
          </h2>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="flex flex-row gap-1 items-center justify-start">
              {" "}
              <HiOutlineIdentification className="text-lg" />
              {t("students.view.id_number")}
            </span>
            <span> {selectedUser?.identity_id}</span>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="flex flex-row gap-1 items-center justify-start">
              {" "}
              <MdOutlineDateRange className="text-lg" />
              {t("students.view.join_date")}
            </span>
            <span> 05 Jan, 2024</span>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-start gap-4 py-6">
        <h1 className="text-2xl font-semibold">
          {" "}
          {t("students.view.enrolled_courses")}
        </h1>
        <CoursesTable userId={parseInt(studentId)} />
      </div>
    </div>
  );
};

export default ViewStudent;
