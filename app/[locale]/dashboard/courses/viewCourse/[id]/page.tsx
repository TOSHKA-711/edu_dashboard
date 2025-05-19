"use client";
import React, { useEffect, useState } from "react";
import { CiFileOn } from "react-icons/ci";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useParams } from "next/navigation";

import {
  useGetCourseDepartmentsQuery,
  useGetStudentsInSessionQuery,
} from "@/app/Redux/Slices/Courses/courseApi";
import Image from "next/image";
import LessonsTable from "@/app/[locale]/items/tables/LessonsTable";
import { useTranslations } from "next-intl";
import { ToastContainer } from "react-toastify";

const ViewCourse = () => {
  const params = useParams();
  const t = useTranslations();
  const courseId = (params.id as string) ?? "";
  const [expandedSections, setExpandedSections] = useState<{
    [key: number]: boolean;
  }>({});
  const [sessionId, setSessionId] = useState<number | string>(0);
  const [sessionLoading, setSessionLoading] = useState(false);
  const { data: departments } = useGetCourseDepartmentsQuery(courseId);
  const { data: sessionStudents, refetch } = useGetStudentsInSessionQuery(
    { courseId, sessionId },
    {
      skip: !courseId || !sessionId,
    }
  );
  const [isViewCourses, setIsViewCourses] = useState<string>("");

  const selectedDepartment = departments?.data.find(
    (dep) => dep.title === isViewCourses
  );

  const sessions = selectedDepartment?.session || [];

  useEffect(() => {
    if (departments?.data?.length && !isViewCourses) {
      setIsViewCourses(departments.data[0].title);
    }
  }, [departments, isViewCourses]);
  useEffect(() => {
    if (sessionStudents) {
      setSessionLoading(false);
    }
  }, [sessionStudents]);
  useEffect(() => {
    if (sessionId) {
      refetch();
    }
  }, [sessionId, refetch]);

  const toggleSection = async (id: number) => {
    setExpandedSections((prev) => (prev[id] ? {} : { [id]: true }));
    setSessionId(id);
    setSessionLoading(true);
    if (id == sessionId) {
      setSessionLoading(false);
    }
  };

  //   handle switch view
  const handleSwitchView = async (name: string) => {
    setIsViewCourses(name);
    setSessionLoading(false);
  };

  if (departments?.data.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 text-lg">
        {t("alerts.no_courses_found")}{" "}
        <Image
          src={"/404 Error-rafiki.svg"}
          alt="not found"
          width={250}
          height={100}
        />
      </div>
    );
  }

  return (
    <>
      <div className="view-course flex flex-col items-start gap-4">
        <div className="w-full flex flex-col items-start gap-4 py-6 px-4">
          <div
            className="view-btns py-2 px-4 rounded-2xl mb-12 "
            style={{
              boxShadow: " 3.25px 8.3px 20.51px 0px #0000000D",
              backdropFilter: "blur(14.350000381469727px)",
            }}
          >
            <div className="rounded-2xl p-2 flex items-center flex-wrap gap-2 bg-[#F2F4F5] max-md:justify-center">
              {departments?.data.map((section, index) => {
                return (
                  <button
                    key={section.id}
                    onClick={() => handleSwitchView(section.title)}
                    className={`py-2 px-6 rounded-lg text-lg font-semibold cursor-pointer ${
                      isViewCourses == section.title
                        ? "bg-white"
                        : "text-[#757575]"
                    }`}
                  >
                    {t("courses.view.department")} {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
          {sessions.length !== 0 ? (
            sessions?.map((session) => (
              <div
                key={session.id}
                className="session flex flex-col items-start gap-4 mb-5 w-full"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="title flex items-center gap-1 text-[18px]">
                    <p className="font-semibold">{session.title} :</p>
                    <p className="flex items-center gap-1 text-zinc-600">
                      <CiFileOn />
                      {/* {section.subtitle} */}
                    </p>
                  </span>
                  <span className="flex items-center gap-5">
                    {expandedSections[session.id] ? (
                      <IoIosArrowUp
                        className="bg-[#286FC1] text-[#FFFFFF] p-1 text-2xl rounded-full cursor-pointer"
                        onClick={() => toggleSection(session.id)}
                      />
                    ) : (
                      <IoIosArrowDown
                        className="bg-[#286FC1]  text-[#FFFFFF] p-1 text-2xl rounded-full cursor-pointer"
                        onClick={() => toggleSection(session.id)}
                      />
                    )}
                  </span>
                </div>

                {expandedSections[session.id] && (
                  <div className="lessons p-2 flex flex-col items-start gap-6 w-full">
                    {sessionLoading ? (
                      <div> جاري تحميل بيانات الطلاب...</div>
                    ) : (
                      <LessonsTable
                        students={
                          sessionStudents ?? {
                            status: false,
                            message: "",
                            data: [],
                          }
                        }
                        sessionId={session.id}
                        refetch={refetch}
                      />
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center gap-2 text-lg">
              No sessions found{" "}
              <Image
                src={"/404 Error-rafiki.svg"}
                alt="not found"
                width={250}
                height={100}
              />{" "}
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ViewCourse;
