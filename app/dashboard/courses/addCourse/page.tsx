"use client";
import CheckBtn from "@/app/items/inputs&btns/CheckBtn";
import CourseDetailsSelectBtns from "@/app/items/inputs&btns/CourseDetialsSelectBtns";
import SelectField from "@/app/items/inputs&btns/SelectField";
import TextEditor from "@/app/items/TextEditor";
import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const Page = () => {
  return (
    <div className="add-course flex flex-col items-start gap-12 w-full pb-8">
      <div className="lang-btns flex items-center justify-start gap-4">
        <button className="text-[#2664B1] underline text-lg">عربي</button>
        <button className=" text-lg">عبري</button>
      </div>
      {/* course title  */}
      <h1 className="text-2xl font-semibold">معلومات عن الكورس</h1>
      <input
        type="text"
        placeholder="قم بكتابه عنوان الكورس هنا....."
        className="bg-[#2664B1] text-white text-[20px] w-full border-none outline-none p-6 rounded-2xl "
      />
      {/* description  */}
      <div className="description w-full flex flex-col items-start gap-4">
        <p className="text-lg font-semibold">الوصف</p>
        <TextEditor />
      </div>

      {/* img upload  */}
      <div className="image-upload w-full flex flex-col items-start gap-4">
        <p className="text-lg font-semibold">صوره الغلاف</p>
        <div className="w-full flex flex-col items-center justify-center gap-2 py-18 border-2 border-dashed border-[#5e87b8] rounded-lg">
          <FaCloudUploadAlt className="text-[#2664B1] text-4xl" />
          <p className="text-zinc-500 ">قم برفع صوره هنا</p>
        </div>
      </div>

      {/* course content  */}
      <div className="course-content w-full flex flex-col items-start gap-8">
        <p className="text-[22px] font-semibold">محتوي الكورس</p>
        <span className="w-full flex flex-col items-start gap-4">
          <p className="text-[18px] font-semibold"> مده الكورس </p>
          <input
            type="number"
            placeholder="مده الكورس بالدقائق"
            className="border-2 px-3 py-4 rounded-2xl w-[70vw] focus:outline-none focus:ring-2 focus:ring-blue-500 border-[#2664B1] "
          />
        </span>
        <span className="w-full flex flex-col items-start gap-4">
          <p className="text-[18px] font-semibold"> حاله الكورس </p>
          <SelectField />
        </span>
        <span className="w-full flex items-center gap-1">
          <CheckBtn />
          <p className="text-[16px] text-zinc-600  ">  قم بأخفاء هذا الكورس </p>
        </span>
      </div>
      {/* course details  */}
      <div className="course-details w-full flex flex-col items-start gap-14">
        <p className="text-[22px] font-semibold">تفاصيل الكورس</p>
        <CourseDetailsSelectBtns/>
      </div>
      {/* course content description */}
      <div className="course-content-description w-full flex flex-col items-start gap-6">
    
         <span className="w-full flex flex-col items-start gap-4">
          <p className="text-[18px] text-[#2664B1]">  ما الذي سوف يتم تعليمه للطلاب </p>
          <input
        type="text"
        placeholder="كيفيه التصميم علي اداه فيجما"
        className=" text-[20px] w-full border-2 border-[#2664B1] outline-none p-6 rounded-2xl "
      />
        </span>
      </div>
      {/* submit  */}
      <button className="text-white bg-[#2664B1] text-2xl py-2 px-24 rounded-full self-center mt-6 cursor-pointer">تأكيد</button>
    </div>
  );
};

export default Page;
