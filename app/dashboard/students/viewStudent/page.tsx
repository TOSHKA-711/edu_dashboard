"use client"
import CoursesTable from "@/app/items/CoursesTable";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React from "react";
import { HiOutlineIdentification } from "react-icons/hi2";
import { MdOutlineDateRange } from "react-icons/md";

const ViewStudent = () => {
  return (
    <div className="view-student flex flex-col items-start gap-4">
      <div className="student-card rounded-lg flex flex-row items-center justify-start gap-8 p-8 w-full" style={{backgroundColor:"rgba(255, 255, 255, 0.5)" }}>
        <div className="main-details flex flex-row items-center justify-start gap-8">
          <span className="flex flex-col items-center gap-2">
            <Avatar alt="user" src="/user.jpg" sx={{width:"5rem" , height:"5rem",objectFit:"cover" }}/>
            Ali mostafa
          </span>
          <span className="flex flex-col items-center gap-1">
            <Image alt="user" src="/Frame_book.svg" width={40} height={100}/>
            <p>07</p>
            دورة
          </span>
          <span className="flex flex-col items-center gap-1">
            <Image alt="user" src="/Frame_rate.svg" width={40} height={100}/>
            <p>4.5</p>
            تقييم
          </span>
        </div>
        <div className="middle w-[2px] h-[6rem] bg-[#B0DEFF]"></div>
        <div className="per-details flex flex-col items-start gap-3">
          <h2 className="text-lg font-semibold  ">معلومات شخصية</h2>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="flex flex-row gap-1 items-center justify-start">
              {" "}
              <HiOutlineIdentification className="text-lg"/>
              الرقم التعريفي :
            </span>
            <span> b57646</span>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="flex flex-row gap-1 items-center justify-start">
              {" "}
              <MdOutlineDateRange className="text-lg"/>
              تاريخ الإنضمام :
            </span>
            <span> 05 Jan, 2024</span>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-start gap-4 py-6">
        <h1 className="text-2xl font-semibold">الدورات المسجلة</h1>
        <CoursesTable/>
      </div>
    </div>
  );
};

export default ViewStudent;
