"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { RiUploadLine } from "react-icons/ri";
import { SelectChangeEvent } from "@mui/material/Select";
import dayjs, { Dayjs } from "dayjs";
import { useUpdateCourseMutation } from "@/app/Redux/Slices/Courses/courseApi";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Redux/Store";
import { useAlert } from "@/app/[locale]/items/hooks/useAlert";
import { useImageUpload } from "@/app/[locale]/items/hooks/useImageUploader";
import { useTranslations } from "next-intl";
import CourseDetailsSelectBtns from "@/app/[locale]/items/inputs&btns/CourseDetialsSelectBtns";

const Page = () => {
  const [isRendered, setIsRendered] = useState(false);
  const t = useTranslations();
  const { showSuccess, showError } = useAlert();
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [image, setImage] = useState<File | null>(null);
  const { imagePreviewUrl, handleImageChange, resetImage } =
    useImageUpload(setImage);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedCourse = useSelector(
    (state: RootState) => state.Courses.selectedCourse
  );
  const [updateCourse] = useUpdateCourseMutation();
  const [payload, setPayload] = useState({
    title: selectedCourse?.title ?? "",
    title_he: selectedCourse?.title_he ?? "",
    price: selectedCourse?.price ?? "",
    address: selectedCourse?.address ?? "",
    address_he: selectedCourse?.address ?? "",
    description: selectedCourse?.description ?? "",
    description_he: selectedCourse?.description_he ?? "",
    item_type: selectedCourse?.type ?? "",
    start_date: selectedCourse?.start_date ?? "",
    end_date: selectedCourse?.end_date ?? "",
    max_people: selectedCourse?.max_people ?? "",
    age_range: selectedCourse?.age_range ?? "",
    session_count: selectedCourse?.session_count ?? "",
    earnings_point: selectedCourse?.earnings_point ?? "",
    category_id: selectedCourse?.category?.id ?? "",
    instructor_id: selectedCourse?.instructor?.id ?? "",
    active: selectedCourse?.active ?? "",
    image: image,
  });

  useEffect(() => {
    setIsRendered(true);
  }, []);

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
    if (payload.title != null && payload.title !== selectedCourse?.title) {
      formData.append("title", payload.title);
    }

    if (
      payload.title_he != null &&
      payload.title_he !== selectedCourse?.title_he
    ) {
      formData.append("title_he", payload.title_he);
    }

    if (
      payload.address != null &&
      payload.address !== selectedCourse?.address
    ) {
      formData.append("address", payload.address);
    }

    if (
      payload.address_he != null &&
      payload.address_he !== selectedCourse?.address
    ) {
      formData.append("address_he", payload.address_he);
    }

    if (payload.active != null && payload.active !== selectedCourse?.active) {
      formData.append("active", String(payload.active));
    }

    if (
      payload.age_range != null &&
      payload.age_range !== selectedCourse?.age_range
    ) {
      formData.append("age_range", String(payload.age_range));
    }

    if (
      payload.category_id != null &&
      payload.category_id !== selectedCourse?.category?.id
    ) {
      formData.append("category_id", String(payload.category_id));
    }

    if (
      payload.description != null &&
      payload.description !== selectedCourse?.description
    ) {
      formData.append("description", payload.description);
    }

    if (
      payload.description_he != null &&
      payload.description_he !== selectedCourse?.description_he
    ) {
      formData.append("description_he", payload.description_he);
    }

    if (
      payload.earnings_point != null &&
      payload.earnings_point !== selectedCourse?.earnings_point
    ) {
      formData.append("earnings_point", String(payload.earnings_point));
    }

    if (
      payload.start_date != null &&
      payload.start_date !== selectedCourse?.start_date
    ) {
      formData.append("start_date", payload.start_date);
    }

    if (
      payload.end_date != null &&
      payload.end_date !== selectedCourse?.end_date
    ) {
      formData.append("end_date", payload.end_date);
    }

    if (
      payload.item_type != null &&
      payload.item_type !== selectedCourse?.type
    ) {
      formData.append("item_type", payload.item_type);
    }

    if (
      payload.instructor_id != null &&
      payload.instructor_id !== selectedCourse?.instructor?.id
    ) {
      formData.append("instructor_id", String(payload.instructor_id));
    }

    if (
      payload.max_people != null &&
      payload.max_people !== selectedCourse?.max_people
    ) {
      formData.append("max_people", String(payload.max_people));
    }

    if (
      payload.session_count != null &&
      payload.session_count !== selectedCourse?.session_count
    ) {
      formData.append("session_count", String(payload.session_count));
    }

    if (payload.price != null && payload.price !== selectedCourse?.price) {
      formData.append("price", payload.price);
    }

    // إرسال البيانات
    if (selectedCourse) {
      try {
        await updateCourse({ id: selectedCourse.id, data: formData }).unwrap();
        showSuccess(`${t("alerts.course_updated_success")}`);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      } catch {
        showError(`${t("alerts.course_updated_failed")}`);
      }
    }
  };

  if (!isRendered) {
    return null;
  }

  return (
    <>
      <ToastContainer />
      <div className="add-course flex flex-col items-start gap-12 w-full pb-8">
        {/* course title  */}
        <h1 className="text-2xl font-semibold">
          {t("courses.add.course_info")}
        </h1>
        <input
          type="text"
          placeholder={t("courses.add.course_title_ar_placeholder")}
          className="bg-[#2664B1] text-white text-[20px] w-full border-none outline-none p-6 rounded-2xl "
          value={payload.title}
          name="title"
          onChange={handleInputsChange}
        />
        <input
          type="text"
          placeholder={t("courses.add.course_title_he_placeholder")}
          className="bg-[#2664B1] text-white text-[20px] w-full border-none outline-none p-6 rounded-2xl "
          value={payload.title_he}
          name="title_he"
          onChange={handleInputsChange}
        />

        {/* description  */}
        <div className="description w-full flex flex-col items-start gap-4">
          <p className="text-lg font-semibold">
            {" "}
            {t("courses.add.description_ar")}
          </p>
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
          <p className="text-lg font-semibold">
            {" "}
            {t("courses.add.description_he")}
          </p>
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
              {t("courses.add.supported_file_types")}
            </p>

            <div className="flex items-center justify-center gap-8 max-sm:flex-col">
              <span
                className="flex items-center justify-center gap-2 text-[#2664B1] text-[17px] font-bold cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <RiUploadLine />
                {t("courses.add.upload_image")}
              </span>

              <button
                type="button"
                className="flex items-center justify-center text-[#DB340B] text-[16px] font-bold border-2 pt-1 pb-2 px-7 rounded-full cursor-pointer"
                onClick={resetImage}
              >
                {t("courses.add.delete_image")}
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
          <p className="text-[22px] font-semibold">
            {" "}
            {t("courses.add.course_details")}
          </p>
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
            <p className="text-[18px] text-[#2664B1]">
              {" "}
              {t("courses.add.address_he_label")}
            </p>
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
            <p className="text-[18px] text-[#2664B1]">
              {" "}
              {t("courses.add.address_he_placeholder")}
            </p>
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
          {t("courses.add.confirm")}
        </button>
      </div>
    </>
  );
};

export default Page;
