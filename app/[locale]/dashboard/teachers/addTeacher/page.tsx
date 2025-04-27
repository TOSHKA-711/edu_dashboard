"use client";

import CalenderDialog from "@/app/[locale]/items/Dialogs/CalenderDialog";
import { useAlert } from "@/app/[locale]/items/hooks/useAlert";
import { useImageUpload } from "@/app/[locale]/items/hooks/useImageUploader";
import { InputField } from "@/app/[locale]/items/inputs&btns/InputField";
import { useSetInstructorMutation } from "@/app/Redux/Slices/Instructors/InstructorsApi";
import { FormControl } from "@mui/material";
import { Dayjs } from "dayjs";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { RiUploadLine } from "react-icons/ri";
// alert
import { ToastContainer } from "react-toastify";

const Page = () => {
  const [isRendered, setIsRendered] = useState(false);
  const t = useTranslations();
  const { showSuccess, showError } = useAlert();
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const { imagePreviewUrl, handleImageChange, resetImage } =
    useImageUpload(setImage);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [setInstructor] = useSetInstructorMutation();
  const [date_of_birth, setDate_of_birth] = useState<Dayjs | null>(null);
  const [payload, setPayload] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    info: "",
    phone_number: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    setIsRendered(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
    // console.log({ ...payload, [name]: value });
  };

  //  handle submit

  const handleSubmit = async () => {
    const formData = new FormData();

    if (image) {
      formData.append("image", image as Blob);
    }
    // formData.append("student_id", `${selectedUser?.id}`);
    if (payload.first_name !== null) {
      formData.append("first_name", payload.first_name);
    }
    if (payload.last_name !== null) {
      formData.append("last_name", payload.last_name);
    }
    if (date_of_birth !== null) {
      formData.append(
        "date_of_birth",
        String(date_of_birth.format("YYYY-MM-DD"))
      );
    }
    if (payload.bio !== null) {
      formData.append("bio", payload.bio);
    }
    if (payload.info !== null) {
      formData.append("info", payload.info);
    }
    if (payload.email !== null) {
      formData.append("email", payload.email);
    }
    if (payload.password !== null) {
      formData.append("password", payload.password);
    }
    if (payload.password_confirmation !== null) {
      formData.append("password_confirmation", payload.password_confirmation);
    }
    if (payload.phone_number !== null) {
      formData.append("phone_number", payload.phone_number);
    }

    // إرسال البيانات
    try {
      await setInstructor(formData).unwrap();
      showSuccess(`${t("alerts.user_added_success")}`);
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch {
      showError(`${t("alerts.user_added_failed")}`);
    }
  };

  if (!isRendered) {
    return null;
  }

  return (
    <>
      <ToastContainer />
      <div className="edit-student w-full">
        {/* ----------img upload-------  */}
        <div className="img-upload flex items-center justify-start gap-4">
          {imagePreviewUrl && (
            <Image src={imagePreviewUrl} alt="img" width={60} height={70} />
          )}

          <div className="inputs flex flex-col items-center gap-3">
            <p className="text-[#5D5959] text-md">
              {t("instructors.add.supported_file_types")}
            </p>

            <div className="flex items-center justify-center gap-8">
              <span
                className="flex items-center justify-center gap-2 text-[#2664B1] text-[17px] font-bold cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <RiUploadLine />
                {t("instructors.add.upload_image")}
              </span>

              <button
                type="button"
                className="flex items-center justify-center text-[#DB340B] text-[16px] font-bold border-2 pt-1 pb-2 px-7 rounded-full cursor-pointer"
                onClick={resetImage}
              >
                {t("instructors.add.delete_image")}
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

        {/* ------------forms------------  */}
        <div className="personal-details flex flex-col items-start gap-8 pt-10">
          <div className="header bg-[#2664B11A] flex items-center justify-start w-full  p-4 text-2xl rounded-md">
            {t("instructors.add.personal_information")}
          </div>
          <div className="inputs w-full grid grid-cols-3 max-md:grid-cols-1 gap-4">
            <InputField
              label={t("instructors.add.first_name")}
              type="text"
              name="first_name"
              value={payload.first_name}
              onChange={handleChange}
            />
            <InputField
              label={t("instructors.add.father_name")}
              type="text"
              name="last_name"
              value={payload.last_name}
              onChange={handleChange}
            />
            <InputField
              label={t("instructors.add.bio")}
              type="text"
              name="bio"
              value={payload.bio}
              onChange={handleChange}
            />
            <InputField
              label={t("instructors.add.description")}
              type="text"
              name="info"
              value={payload.info}
              onChange={handleChange}
            />
            <InputField
              label={t("instructors.add.email")}
              type="email"
              name="email"
              value={payload.email}
              onChange={handleChange}
            />
            <InputField
              label={t("instructors.add.phone")}
              type="phone"
              name="phone_number"
              value={payload.phone_number}
              onChange={handleChange}
            />
            <InputField
              label={t("instructors.add.password")}
              type="text"
              name="password"
              value={payload.password}
              onChange={handleChange}
            />
            <InputField
              label={t("instructors.add.confirm_password")}
              type="text"
              name="password_confirmation"
              value={payload.password_confirmation}
              onChange={handleChange}
            />
            <FormControl
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                flexDirection: "row",
                position: "relative",
                marginTop: "1rem",

                "& .MuiInputBase-root": {
                  borderRadius: "16px",
                  fontFamily: "unset",
                  width: "100%",
                  backgroundColor: "white",
                },
              }}
            >
              <p className="absolute -top-7 right-12 text-lg text-[#2664B1]  ">
                {" "}
                {t("instructors.add.date_of_birth")}
              </p>
              <CiCalendarDate className="bg-[#2664B1] text-white p-2 rounded-3xl text-4xl" />
              <CalenderDialog setStartDate={setDate_of_birth} />
              <span
                style={{
                  marginRight: "8px",
                  color: "#2664B1",
                  fontWeight: "bold",
                }}
              >
                {date_of_birth ? date_of_birth.format("YYYY-MM-DD") : ""}
              </span>
            </FormControl>
          </div>
        </div>

        {/* --------------- */}
        <div className="sub-btn p-10 w-full flex flex-col items-center gap-4">
          <button
            className="bg-[#2664B1] text-white py-2 px-30 max-sm:px-20 rounded-3xl cursor-pointer"
            onClick={handleSubmit}
          >
            {t("instructors.add.save")}
          </button>
          <button
            className="bg-[#F2F4F8]  py-2 px-30 max-sm:px-20 rounded-3xl cursor-pointer"
            onClick={() => router.push("/dashboard/students/allStudents")}
          >
            {t("instructors.add.cancel")}
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
