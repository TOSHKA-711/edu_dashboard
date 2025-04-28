"use client";
import CalenderDialog from "@/app/[locale]/items/Dialogs/CalenderDialog";
import { useAlert } from "@/app/[locale]/items/hooks/useAlert";
import { InputField } from "@/app/[locale]/items/inputs&btns/InputField";
import {
  useSetStudentUpdateMutation,
} from "@/app/Redux/Slices/Students/studentsApi";
import { RootState } from "@/app/Redux/Store";
import { FormControl } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
// alert
import { ToastContainer } from "react-toastify";

const Page = () => {
  const [isRendered, setIsRendered] = useState(false);
  const t = useTranslations();
  const { showSuccess, showError } = useAlert();
  const router = useRouter();
//   const [image, setImage] = useState<string | Blob | null>(null);
  const selectedUser = useSelector(
    (state: RootState) => state.Parents.selectedParent
  );
  const [date_of_birth, setDate_of_birth] = useState<Dayjs | null>(
    dayjs(selectedUser?.date_of_birth)
  );
  const [setStudentUpdate] = useSetStudentUpdateMutation();
//   const { data: studentImages } = useGetStudentImagesQuery();

  const [payload, setPayload] = useState({
    // image: selectedUser?.image,
    first_name: selectedUser?.first_name ?? "null",
    last_name: selectedUser?.last_name ?? "null",
    identity_id: selectedUser?.identity_id ?? "null",
    email: selectedUser?.email ?? "null",
    phone_number: selectedUser?.phone_number ?? "null",
    parent_type: selectedUser?.parent_type ?? "null",
  });

  useEffect(() => {
    setIsRendered(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  //  handle submit

  const handleSubmit = async () => {
    const formData = new FormData();

    // إضافة الصورة إذا كانت موجودة
    // if (image) {
    //   formData.append("image", image as Blob);
    // }

    if (selectedUser) {
      // formData.append("student_id", `${selectedUser?.id}`);
      if (
        selectedUser.first_name !== payload.first_name &&
        payload.first_name !== null
      ) {
        formData.append("first_name", payload.first_name);
      }
      if (
        selectedUser.last_name !== payload.last_name &&
        payload.last_name !== null
      ) {
        formData.append("last_name", payload.last_name);
      }
      if (
        selectedUser.email !== payload.email &&
        payload.email !== null
      ) {
        formData.append("email", payload.email);
      }
      if (
        selectedUser.phone_number !== payload.phone_number &&
        payload.phone_number !== null
      ) {
        formData.append("phone_number", payload.phone_number);
      }
      if (
        selectedUser.identity_id !== payload.identity_id &&
        payload.identity_id !== null
      ) {
        formData.append("identity_id", payload.identity_id);
      }
      if (
        selectedUser.date_of_birth !== date_of_birth?.format("YYYY-MM-DD") &&
        date_of_birth !== null
      ) {
        formData.append(
          "date_of_birth",
          String(date_of_birth.format("YYYY-MM-DD"))
        );
      }
      if (
        selectedUser.parent_type !== payload.parent_type &&
        payload.parent_type !== null
      ) {
        formData.append("parent_type", payload.parent_type);
      }
     

      // إرسال البيانات
      try {
        await setStudentUpdate({
          id: selectedUser.id,
          data: formData,
        }).unwrap();
        showSuccess(`${t("alerts.user_added_success")}`);
        console.log(formData);
      } catch {
        showError(`${t("alerts.user_added_failed")}`);
      }
    }
  };

  // return image
//   const getImageSrc = () => {
//     if (typeof image === "string") return image;
//     if (image instanceof Blob) return URL.createObjectURL(image);
//     return "";
//   };

  if (!isRendered) {
    return null;
  }

  return (
    <>
      <ToastContainer />
      <div className="edit-student w-full">
        {/* ----------img upload-------  */}
        {/* <div className="img-upload flex items-center justify-start gap-4">
          {image && (
            <Image src={getImageSrc()} alt="img" width={60} height={70} />
          )}

          <div className="inputs flex flex-col items-center gap-3">
            <p className="text-[#5D5959] text-md">
              {t("students.add.supported_file_types")}
            </p>

            <div className="flex items-center justify-center gap-8">
              <SelectImageDialog
                setImage={setImage}
                images={studentImages?.data?.data ?? []}
              />
            </div>
          </div>
        </div> */}

        {/* ------------forms------------  */}
        <div className="personal-details flex flex-col items-start gap-8 pt-10">
          <div className="header bg-[#2664B11A] flex items-center justify-start w-full  p-4 text-2xl max-sm:text-[16px] rounded-md">
            {t("students.add.personal_information")}
          </div>
          <div className="inputs w-full grid grid-cols-3 gap-4 max-md:grid-cols-1">
            <InputField
              label={t("students.edit.first_name")}
              type="text"
              name="first_name"
              value={payload.first_name}
              onChange={handleChange}
            />
            <InputField
              label={t("students.edit.father_name")}
              type="text"
              name="last_name"
              value={payload.last_name}
              onChange={handleChange}
            />
            <InputField
              label={t("tables.identity")}
              type="text"
              name="identity_id"
              value={payload.identity_id}
              onChange={handleChange}
            />
            <InputField
              label={t("tables.email")}
              type="text"
              name="email"
              value={payload.email}
              onChange={handleChange}
            />
            <InputField
              label={t("tables.phone_number")}
              type="phone"
              name="phone_number"
              value={payload.phone_number}
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
                {t("students.edit.date_of_birth")}
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
          <motion.button
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
            className="bg-[#2664B1] text-white py-2 px-30 max-sm:px-20 rounded-3xl cursor-pointer"
            onClick={handleSubmit}
          >
            {t("students.edit.save")}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
            className="bg-[#F2F4F8]  py-2 px-30 max-sm:px-20 rounded-3xl cursor-pointer"
            onClick={() => router.push("/dashboard/students/allStudents")}
          >
            {t("students.edit.cancel")}
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default Page;
