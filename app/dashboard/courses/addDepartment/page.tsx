"use client";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { CiFileOn } from "react-icons/ci";
import { RxDragHandleDots2 } from "react-icons/rx";
import { MdOndemandVideo } from "react-icons/md";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const sectionsData = [
  {
    id: 1,
    title: "القسم 1",
    subtitle: "مقدمة",
    lessons: [
      { id: 1, title: "الدرس 1", videoTitle: "مقدمة" },
      { id: 2, title: "الدرس 2", videoTitle: "أساسيات" },
      { id: 3, title: "الدرس 3", videoTitle: "متقدم" },
    ],
  },
  {
    id: 2,
    title: "القسم 2",
    subtitle: "محتوى متقدم",
    lessons: [
      { id: 1, title: "الدرس 1", videoTitle: "الموضوع الأول" },
      { id: 2, title: "الدرس 2", videoTitle: "الموضوع الثاني" },
    ],
  },
];

const Page = () => {
  const [expandedSections, setExpandedSections] = useState<{ [key: number]: boolean }>({});

  const toggleSection = (id: number) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
    
  };

   return (
    <div className="add-department bg-white p-5 rounded-lg flex flex-col items-start gap-4 mb-5">
      {/* العنوان الرئيسي */}
      <div className="title w-full flex items-center justify-between text-[20px] mb-5">
        <p className="font-semibold">محتوي الدورة</p>
        <p className="flex items-center gap-1 text-[#2664B1] cursor-pointer">
          <IoMdAdd />
          إضافة قسم
        </p>
      </div>

      {/* الأقسام */}
      {sectionsData.map((section) => (
        <div key={section.id} className="section flex flex-col items-start gap-4 mb-5 w-full">
          <div className="flex items-center justify-between w-full">
            <span className="title flex items-center gap-1 text-[18px]">
              <p className="font-semibold">{section.title} :</p>
              <p className="flex items-center gap-1 text-zinc-600">
                <CiFileOn />
                {section.subtitle}
              </p>
            </span>
            <span>
              {expandedSections[section.id] ? (
                <IoIosArrowUp
                  className="bg-[#E6F4FF] text-[#2095D3] p-1 text-2xl rounded-full cursor-pointer"
                  onClick={() => toggleSection(section.id)}
                />
              ) : (
                <IoIosArrowDown
                  className="bg-[#E6F4FF] text-[#2095D3] p-1 text-2xl rounded-full cursor-pointer"
                  onClick={() => toggleSection(section.id)}
                />
              )}
            </span>
          </div>

          {expandedSections[section.id] && (
            <div className="lessons p-2 flex flex-col items-start gap-6">
              {section.lessons.map((lesson) => (
                <div key={lesson.id} className="lesson flex items-center gap-1 text-[17px]">
                  <RxDragHandleDots2 className="ml-2" />
                  <p>{lesson.title}</p>
                  <MdOndemandVideo />
                  <p>{lesson.videoTitle}</p>
                </div>
              ))}
            </div>
          )}

          <p className="add-lesson flex items-center gap-1 text-[#2664B1] cursor-pointer text-[20px]">
            <IoMdAdd />
            إضافة درس
          </p>
        </div>
      ))}
    </div>
  );
};

export default Page;
