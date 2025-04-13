"use client";
import CoursesTable from "@/app/items/tables/CoursesTable";
import { useGetStudentCoursesQuery } from "@/app/Redux/Slices/Students/studentsApi";
import { RootState } from "@/app/Redux/Store";
import { Avatar } from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiOutlineIdentification } from "react-icons/hi2";
import { MdOutlineDateRange } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewStudent = () => {
  const params = useParams();
  const studentId = (params.id as string) ?? "";

  const [isRendered, setIsRendered] = useState(false);
  const { data: studentCourses } = useGetStudentCoursesQuery(studentId, {
    skip: !studentId,
  });
  const selectedUser = useSelector((state: RootState) => state.students.selectedUser);
  
  useEffect(() => {
    setIsRendered(true);
  }, []);
  
  if (!studentId) {
    return <div>Loading...</div>; 
  }
  
  if (!isRendered) {
    return null;
  }
  
  if (!selectedUser) {
    return <div>Loading or no student found.</div>;
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
            دورة
          </span>
          <span className="flex flex-col items-center gap-1">
            <Image alt="user" src="/Frame_rate.svg" width={40} height={100} />
            <p>4.5</p>
            تقييم
          </span>
        </div>
        <div className="middle w-[2px] h-[6rem] bg-[#B0DEFF] max-md:h-1 max-md:w-4/5  "></div>
        <div className="per-details flex flex-col items-start gap-3">
          <h2 className="text-lg font-semibold  ">معلومات شخصية</h2>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="flex flex-row gap-1 items-center justify-start">
              {" "}
              <HiOutlineIdentification className="text-lg" />
              الرقم التعريفي :
            </span>
            <span> {selectedUser?.identity_id}</span>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="flex flex-row gap-1 items-center justify-start">
              {" "}
              <MdOutlineDateRange className="text-lg" />
              تاريخ الإنضمام :
            </span>
            <span> 05 Jan, 2024</span>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-start gap-4 py-6">
        <h1 className="text-2xl font-semibold">الدورات المسجلة</h1>
        <CoursesTable
          courses={studentCourses ?? { status: false, message: "", data: [] }}
        />
      </div>
    </div>
  );
};

export default ViewStudent;
