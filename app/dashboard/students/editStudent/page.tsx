"use client";
import { InputField } from "@/app/items/InputField";
import Image from "next/image";
import React, { useState } from "react";
import { RiUploadLine } from "react-icons/ri";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
    
  };

  return (
    <div className="edit-student w-full">
      {/* ----------img upload-------  */}
      <div className="img-upload flex items-center justify-start gap-4">
        <Image src={"/profile image.svg"} alt="img" width={60} height={70} />
        <div className="inputs flex flex-col items-center gap-3">
          <p className="text-[#5D5959] text-md">
            نحن ندعم فقط ملفات JPG، JPEG، أو PNG.
          </p>
          <div className="flex items-center justify-center gap-8">
            <span className="flex items-center justify-center gap-2 text-[#2664B1] text-[17px] font-bold cursor-pointer">
              <RiUploadLine />
              رفع الصورة
            </span>
            <button className="flex items-center justify-center text-[#DB340B] text-[16px] font-bold border-2 pt-1 pb-2 px-7 rounded-full cursor-pointer">
              مسح
            </button>
          </div>
        </div>
      </div>

      {/* ------------forms------------  */}
      <div className="personal-details flex flex-col items-start gap-8 pt-10">
        <div className="header bg-[#2664B11A] flex items-center justify-start w-full  p-4 text-2xl rounded-md">
          معلومات شخصية
        </div>
        <div className="inputs w-full grid grid-cols-3 gap-4">
          <InputField
            label="الاسم بالكامل *"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="الاسم بالكامل *"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="الاسم بالكامل *"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="الاسم بالكامل *"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="الاسم بالكامل *"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="الاسم بالكامل *"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
      </div>
      {/* --------------- */}
      <div className="course-details flex flex-col items-start gap-8 pt-10">
        <div className="header bg-[#2664B11A] flex items-center justify-start w-full  p-4 text-2xl rounded-md">
        معلومات عن الصف /مكان الدورة 
        </div>
        <div className="inputs w-full grid grid-cols-3 gap-4">
          <InputField
            label="الاسم بالكامل *"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="الاسم بالكامل *"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="الاسم بالكامل *"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="الاسم بالكامل *"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="الاسم بالكامل *"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="الاسم بالكامل *"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
      </div>
      {/* --------------- */}
      <div className="date-details flex flex-col items-start gap-8 pt-10">
        <div className="header bg-[#2664B11A] flex items-center justify-start w-full  p-4 text-2xl rounded-md">
        تفاصيل الدورة وتاريخ اقامتها
        </div>
        <div className="inputs w-full grid grid-cols-3 gap-4">
          <InputField
            label="الاسم بالكامل *"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="الاسم بالكامل *"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="الاسم بالكامل *"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="الاسم بالكامل *"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="الاسم بالكامل *"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="الاسم بالكامل *"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
      </div>
      {/* --------------- */}
      <div className="sub-btn p-10 w-full flex flex-col items-center gap-4">
        <button className="bg-[#2664B1] text-white py-2 px-30 rounded-3xl cursor-pointer">حفظ</button>
        <button className="bg-[#F2F4F8]  py-2 px-30 rounded-3xl cursor-pointer">الغاء</button>
      </div>
    </div>
  );
};

export default Page;
