"use client";
import SubjectsCard from "@/app/[locale]/items/cards/SubjectsCard";
import { useAlert } from "@/app/[locale]/items/hooks/useAlert";
import { useImageUpload } from "@/app/[locale]/items/hooks/useImageUploader";
import { InputField } from "@/app/[locale]/items/inputs&btns/InputField";
import { useSetCategoryMutation } from "@/app/Redux/Slices/Categories/categoryApi";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { RiUploadLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";

const colors = ["#EFECFF", "#FFFADF", "#E8FBF5", "#FFF0FF"];
const Page = () => {
  const t = useTranslations();
  const { showSuccess, showError } = useAlert();
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { imagePreviewUrl, handleImageChange, resetImage } =
    useImageUpload(setImage);
  const [setCategory] = useSetCategoryMutation();
  const [payload, setPayload] = useState({
    name_ar: "",
    name_he: "",
    course_count: "",
  });

  // handle changes

  const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    // إضافة الصورة إذا كانت موجودة
    if (image) {
      formData.append("image", image as Blob);
    }
    formData.append("name_ar", payload.name_ar);
    formData.append("name_he", payload.name_he);
    formData.append("course_count", payload.course_count);

    // إرسال البيانات
    try {
      await setCategory(formData).unwrap();
      showSuccess(`${t("alerts.category_added_success")}`);
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch {
      showError(`${t("alerts.category_added_failed")}`);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="add-subject p-5 flex flex-col items-stretch gap-5 max-sm:px-2">
        <div className="flex items-center gap-3 max-md:flex-col max-md:gap-0">
          <InputField
            label={t("categories.add.topic_name_ar")}
            type="text"
            name="name_ar"
            value={payload.name_ar}
            onChange={handleInputsChange}
          />
          <InputField
            label={t("categories.add.topic_name_he")}
            type="text"
            name="name_he"
            value={payload.name_he}
            onChange={handleInputsChange}
          />
          <InputField
            label={t("categories.add.count")}
            type="number"
            name="course_count"
            value={payload.course_count}
            onChange={handleInputsChange}
          />
        </div>

        {/* img upload  */}
        <div className="img-upload flex items-center justify-start gap-4 w-full">
          <div className="inputs flex flex-col items-center gap-3 w-full flex flex-col items-center justify-center gap-2 py-18 border-2 border-dashed border-[#5e87b8] rounded-lg">
            {imagePreviewUrl && (
              <Image src={imagePreviewUrl} alt="img" width={100} height={50} />
            )}
            <p className="text-[#5D5959] text-md">
              {t("categories.add.supported_file_types")}
            </p>

            <div className="flex items-center justify-center gap-8 max-sm:flex-col max-sm:justify-center">
              <span
                className="flex items-center justify-center gap-2 text-[#2664B1] text-[17px] font-bold cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <RiUploadLine />
                {t("categories.add.upload_image")}
              </span>

              <button
                type="button"
                className="flex items-center justify-center text-[#DB340B] text-[16px] font-bold border-2 pt-1 pb-2 px-7 rounded-full cursor-pointer"
                onClick={resetImage}
              >
                {t("categories.add.delete_image")}
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
        <div className="flex gap-4 bg-white p-5 items-center justify-between w-full max-md:flex-col">
          <div className="flex gap-4 bg-white p-5">
            {colors.map((color) => (
              <div
                key={color}
                className={`w-12 h-12 max-sm:h-9 max-sm:w-9  rounded-full cursor-pointer border-2 transition-all duration-200 ${
                  selectedColor === color
                    ? "border-black scale-110"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              ></div>
            ))}
          </div>
          <SubjectsCard
            title={payload.name_ar}
            color={selectedColor}
            count={payload.course_count}
            image={image ?? null}
          />
        </div>
        <button
          className="text-white bg-[#2664B1] text-2xl py-2 px-24 rounded-full self-center mt-6 cursor-pointer max-sm:px-15"
          onClick={handleSubmit}
        >
          {t("categories.add.confirm")}
        </button>
      </div>
    </>
  );
};

export default Page;
