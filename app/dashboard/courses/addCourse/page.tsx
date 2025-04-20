"use client";
import { useImageUpload } from "@/app/items/hooks/useImageUploader";
import CourseDetailsSelectBtns from "@/app/items/inputs&btns/CourseDetialsSelectBtns";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { RiUploadLine } from "react-icons/ri";
import { SelectChangeEvent } from "@mui/material/Select";
import dayjs, { Dayjs } from "dayjs";
import { useSetCourseMutation } from "@/app/Redux/Slices/Courses/courseApi";
import { useAlert } from "@/app/items/hooks/useAlert";
import { ToastContainer } from "react-toastify";

const Page = () => {
  const { showSuccess, showError } = useAlert();
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [image, setImage] = useState<File | null>(null);
  const { imagePreviewUrl, handleImageChange, resetImage } =
    useImageUpload(setImage);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [setCourse] = useSetCourseMutation();
  const [payload, setPayload] = useState({
    title: "",
    title_he: "",
    price: "",
    address: "",
    address_he: "",
    description: "",
    description_he: "",
    item_type: "",
    start_date: startDate ? startDate.format("YYYY-MM-DD") : "",
    end_date: endDate ? endDate.format("YYYY-MM-DD") : "",
    max_people: "",
    age_range: "",
    session_count: "",
    earnings_point: "",
    category_id: "",
    instructor_id: "",
    active: "",
    image: image,
  });

  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      image: image,
    }));
  }, [image]);

  const handleInputsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const numberFields = [
      "price",
      "earnings_point",
      "max_people",
      "session_count",
      "category_id",
      "instructor_id",
      "active",
    ];

    setPayload((prev) => ({
      ...prev,
      [name]: numberFields.includes(name) ? Number(value) : value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<number | string>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    const formData = new FormData();

    // إضافة الصورة إذا كانت موجودة
    if (image) {
      formData.append("image", image as Blob);
    }
    formData.append("title", payload.title);
    formData.append("title_he", payload.title_he);
    formData.append("address", payload.address);
    formData.append("address_he", payload.address_he);
    formData.append("active", payload.active);
    formData.append("age_range", payload.age_range);
    formData.append("category_id", payload.category_id);
    formData.append("description", payload.description);
    formData.append("description_he", payload.description_he);
    formData.append("earnings_point", payload.earnings_point);
    formData.append("start_date", payload.start_date);
    formData.append("end_date", payload.end_date);
    formData.append("item_type", payload.item_type);
    formData.append("instructor_id", payload.instructor_id);
    formData.append("max_people", payload.max_people);
    formData.append("session_count", payload.session_count);
    formData.append("price", payload.price);

    // إرسال البيانات
    try {
      await setCourse(formData).unwrap();
      showSuccess("Course added successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch {
      showError("Course added failed!");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="add-course flex flex-col items-start gap-12 w-full pb-8">
        {/* course title  */}
        <h1 className="text-2xl font-semibold">معلومات عن الكورس</h1>
        <input
          type="text"
          placeholder="قم بكتابه عنوان الكورس بالعربي هنا....."
          className="bg-[#2664B1] text-white text-[20px] w-full border-none outline-none p-6 rounded-2xl "
          value={payload.title}
          name="title"
          onChange={handleInputsChange}
        />
        <input
          type="text"
          placeholder="قم بكتابه عنوان الكورس بالعبري هنا....."
          className="bg-[#2664B1] text-white text-[20px] w-full border-none outline-none p-6 rounded-2xl "
          value={payload.title_he}
          name="title_he"
          onChange={handleInputsChange}
        />

        {/* description  */}
        <div className="description w-full flex flex-col items-start gap-4">
          <p className="text-lg font-semibold">الوصف بالعربي</p>
          <textarea
            name="description"
            cols={30}
            rows={2}
            placeholder="اكتب هنا..."
            className="w-full outline-none border-b border-[#2664B1] px-5 "
            style={{ width: "100%" }}
            value={payload.description}
            onChange={handleInputsChange}
          ></textarea>
        </div>
        <div className="description w-full flex flex-col items-start gap-4">
          <p className="text-lg font-semibold">الوصف بالعبري</p>
          <textarea
            name="description_he"
            cols={30}
            rows={2}
            placeholder="اكتب هنا..."
            className="w-full outline-none border-b border-[#2664B1] px-5 "
            style={{ width: "100%" }}
            value={payload.description_he}
            onChange={handleInputsChange}
          ></textarea>
        </div>

        {/* img upload  */}
        <div className="img-upload flex items-center justify-start gap-4 w-full">
          <div className="inputs flex flex-col items-center gap-3 w-full flex flex-col items-center justify-center gap-2 py-18 border-2 border-dashed border-[#5e87b8] rounded-lg">
            {imagePreviewUrl && (
              <Image src={imagePreviewUrl} alt="img" width={100} height={50} />
            )}
            <p className="text-[#5D5959] text-md">
              نحن ندعم فقط ملفات JPG، JPEG، أو PNG.
            </p>

            <div className="flex items-center justify-center gap-8 max-sm:flex-col">
              <span
                className="flex items-center justify-center gap-2 text-[#2664B1] text-[17px] font-bold cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <RiUploadLine />
                رفع الصورة
              </span>

              <button
                type="button"
                className="flex items-center justify-center text-[#DB340B] text-[16px] font-bold border-2 pt-1 pb-2 px-7 rounded-full cursor-pointer"
                onClick={resetImage}
              >
                مسح
              </button>
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
          </div>
        </div>
        {/* course content  */}
    
        <div className="course-details w-full flex flex-col items-start gap-14">
          <p className="text-[22px] font-semibold">تفاصيل الكورس</p>
          <CourseDetailsSelectBtns
            payload={payload}
            handleInputsChange={handleInputsChange}
            handleSelectChange={handleSelectChange}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        {/* course content description */}
        <div className="course-content-description w-full flex flex-col items-start gap-6">
          <span className="w-full flex flex-col items-start gap-4 ">
            <p className="text-[18px] text-[#2664B1]">العنوان بالعربي</p>
            <input
              type="text"
              placeholder=" العنوان "
              className=" text-[20px] w-full border-2 border-[#2664B1] outline-none p-6 rounded-2xl "
              value={payload.address}
              name="address"
              onChange={handleInputsChange}
            />
          </span>
          <span className="w-full flex flex-col items-start gap-4">
            <p className="text-[18px] text-[#2664B1]">العنوان بالعبري</p>
            <input
              type="text"
              placeholder=" العنوان "
              className=" text-[20px] w-full border-2 border-[#2664B1] outline-none p-6 rounded-2xl "
              value={payload.address_he}
              name="address_he"
              onChange={handleInputsChange}
            />
          </span>
        </div>
        {/* submit  */}
        <button
          className="text-white bg-[#2664B1] text-2xl py-2 px-24 rounded-full self-center mt-6 cursor-pointer max-sm:px-15"
          onClick={handleSubmit}
        >
          تأكيد
        </button>
      </div>
    </>
  );
};

export default Page;
