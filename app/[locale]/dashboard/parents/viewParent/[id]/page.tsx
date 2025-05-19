"use client";

import CoursesTable from "@/app/[locale]/items/tables/CoursesTable";
import { useGetParentChildrenQuery } from "@/app/Redux/Slices/Parents/parentsApi";
import { RootState } from "@/app/Redux/Store";
import { Avatar } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiOutlineIdentification } from "react-icons/hi2";
import { MdOutlineDateRange } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewParent = () => {
  const t = useTranslations();
  const params = useParams();
  const parentId = parseInt(params.id as string) ?? 0;
  const [fetchingCoursesId, setFetchingCoursesId] = useState(parentId);
  const [isRendered, setIsRendered] = useState(false);
  const { data: parentChildren } = useGetParentChildrenQuery(fetchingCoursesId);

  const selectedUser = useSelector(
    (state: RootState) => state.Parents.selectedParent
  );

  const [isViewCourses, setIsViewCourses] = useState<string>("parent");

  useEffect(() => {
    setIsRendered(true);
  }, []);

  if (!parentId || !isRendered) {
    return <div>{t("alerts.loading")}</div>;
  }

  if (!selectedUser) {
    return <div>{t("alerts.loading_or_no_users_found")}</div>;
  }

  const handleSwitchView = async (name: string, id: number) => {
    setIsViewCourses(name);
    setFetchingCoursesId(id);
    console.log(fetchingCoursesId);
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
            <p>{selectedUser?.children_count}</p>
            {t("parents.view.children")}
          </span>
          <span className="flex flex-col items-center gap-1">
            <Image alt="user" src="/Frame_book.svg" width={40} height={100} />
            <p>07</p>
            {t("parents.view.course")}
          </span>
        </div>
        <div className="middle w-[2px] h-[6rem] bg-[#B0DEFF] max-md:h-1 max-md:w-4/5  "></div>
        <div className="per-details flex flex-col items-start gap-3">
          <h2 className="text-lg font-semibold  ">
            {" "}
            {t("parents.view.personal_information")}
          </h2>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="flex flex-row gap-1 items-center justify-start">
              {" "}
              <HiOutlineIdentification className="text-lg" />
              {t("parents.view.id_number")}
            </span>
            <span> {selectedUser?.identity_id}</span>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="flex flex-row gap-1 items-center justify-start">
              {" "}
              <MdOutlineDateRange className="text-lg" />
              {t("parents.view.join_date")}
            </span>
            <span> 05 Jan, 2024</span>
          </div>
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
          <div className="rounded-2xl p-2 flex items-center gap-2 bg-[#F2F4F5] flex-wrap max-sm:justify-center">
            <button
              onClick={() => handleSwitchView("parent", parentId)}
              className={`py-2 px-6 rounded-lg text-lg font-semibold cursor-pointer ${
                isViewCourses == "parent" ? "bg-white" : "text-[#757575]"
              }`}
            >
              {t("parents.view.my_courses")}
            </button>
            {parentChildren?.data.map((child) => {
              return (
                <button
                  key={child.id}
                  onClick={() => handleSwitchView(child.first_name, child.id)}
                  className={`py-2 px-6 rounded-lg text-lg font-semibold cursor-pointer ${
                    isViewCourses == child.first_name
                      ? "bg-white"
                      : "text-[#757575]"
                  }`}
                >
                  {child.first_name}
                </button>
              );
            })}
          </div>
        </div>
        <CoursesTable key={fetchingCoursesId} userId={fetchingCoursesId} />
      </div>
    </div>
  );
};

export default ViewParent;
