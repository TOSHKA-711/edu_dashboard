"use client";
import CalenderDialog from "@/app/[locale]/items/Dialogs/CalenderDialog";
import SelectImageDialog from "@/app/[locale]/items/Dialogs/SelectImageDialog";
import { useAlert } from "@/app/[locale]/items/hooks/useAlert";
import { InputField } from "@/app/[locale]/items/inputs&btns/InputField";
import {
  useGetStudentImagesQuery,
  useSetStudentUpdateMutation,
} from "@/app/Redux/Slices/Students/studentsApi";
import { RootState } from "@/app/Redux/Store";
import { FormControl } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { useSelector } from "react-redux";
import {motion} from "framer-motion"
// alert
import { ToastContainer } from "react-toastify";

const Page = () => {
  const [isRendered, setIsRendered] = useState(false);
  const t = useTranslations();
  const { showSuccess, showError } = useAlert();
  const router = useRouter();
  const [image, setImage] = useState<string | Blob | null>(null);
  const selectedUser = useSelector(
    (state: RootState) => state.students.selectedUser
  );
  const [date_of_birth, setDate_of_birth] = useState<Dayjs | null>(
    dayjs(selectedUser?.date_of_birth)
  );
  const [setStudentUpdate] = useSetStudentUpdateMutation();
  const { data: studentImages } = useGetStudentImagesQuery();

  const [payload, setPayload] = useState({
    image: selectedUser?.image,
    first_name: selectedUser?.first_name ?? "null",
    last_name: selectedUser?.last_name ?? "null",
    identity_id: selectedUser?.identity_id ?? "null",
    email: selectedUser?.email ?? "null",
    phone: selectedUser?.phone_number ?? "null",
    parent_id: selectedUser?.parent_id ?? "null",
    mother_identity_id: selectedUser?.mother_identity_id ?? "null",
    mother_name: selectedUser?.mother_name ?? "null",
    student_type: selectedUser?.child_type ?? "null",
    neighborhood: selectedUser?.neighborhood ?? "null",
    educational_stage: selectedUser?.educational_stage ?? "null",
    school_name: selectedUser?.school_name ?? "null",
    grade_name: selectedUser?.grade_name ?? "null",
    points: selectedUser?.points ?? 0,
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
    if (image) {
      formData.append("image", image as Blob);
    }

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
        selectedUser.parent_id !== payload.parent_id &&
        payload.parent_id !== null
      ) {
        formData.append("parent_id", String(payload.parent_id));
      }
      if (
        selectedUser.mother_identity_id !== payload.mother_identity_id &&
        payload.mother_identity_id !== null
      ) {
        formData.append(
          "mother_identity_id",
          String(payload.mother_identity_id)
        );
      }
      if (
        selectedUser.child_type !== payload.student_type &&
        payload.student_type !== null
      ) {
        formData.append("student_type", payload.student_type);
      }
      if (
        selectedUser.neighborhood !== payload.neighborhood &&
        payload.neighborhood !== null
      ) {
        formData.append("neighborhood", payload.neighborhood);
      }
      if (
        selectedUser.educational_stage !== payload.educational_stage &&
        payload.educational_stage !== null
      ) {
        formData.append("educational_stage", payload.educational_stage);
      }
      if (
        selectedUser.school_name !== payload.school_name &&
        payload.school_name !== null
      ) {
        formData.append("school_name", payload.school_name);
      }
      if (
        selectedUser.grade_name !== payload.grade_name &&
        payload.grade_name !== null
      ) {
        formData.append("grade_name", payload.grade_name);
      }
      if (
        selectedUser.mother_name !== payload.mother_name &&
        payload.mother_name !== null
      ) {
        formData.append("mother_name", payload.mother_name);
      }
      if (
        selectedUser.points !== payload.points &&
        payload.points !== null &&
        payload.points !== 0
      ) {
        formData.append("points", String(payload.points));
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
  const getImageSrc = () => {
    if (typeof image === "string") return image;
    if (image instanceof Blob) return URL.createObjectURL(image);
    return "";
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
        </div>

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
              label={t("students.edit.student_id")}
              type="text"
              name="identity_id"
              value={payload.identity_id}
              onChange={handleChange}
            />
            <InputField
              label={t("students.edit.father_id")}
              type="text"
              name="parent_id"
              value={payload.parent_id}
              onChange={handleChange}
            />
            <InputField
              label={t("students.edit.mother_id")}
              type="text"
              name="mother_identity_id"
              value={payload.mother_identity_id}
              onChange={handleChange}
            />
            <InputField
              label={t("students.edit.mother_name")}
              type="text"
              name="mother_name"
              value={payload.mother_name}
              onChange={handleChange}
            />
            <InputField
              label={t("students.edit.points")}
              type="number"
              name="points"
              value={payload.points}
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
        <div className="course-details flex flex-col items-start gap-8 pt-10">
          <div className="header bg-[#2664B11A] flex items-center justify-start w-full  p-4 text-2xl max-sm:text-[16px] rounded-md">
            {t("students.edit.class_info")}
          </div>
          <div className="inputs w-full grid grid-cols-3 gap-4 max-md:grid-cols-1">
            <InputField
              label={t("students.edit.class")}
              type="text"
              name="grade_name"
              value={payload.grade_name}
              onChange={handleChange}
            />
            <InputField
              label={t("students.edit.school")}
              type="text"
              name="school_name"
              value={payload.school_name}
              onChange={handleChange}
            />
            <InputField
              label={t("students.edit.education_level")}
              type="text"
              name="educational_stage"
              value={payload.educational_stage}
              onChange={handleChange}
            />
            <InputField
              label={t("students.edit.district")}
              type="text"
              name="neighborhood"
              value={payload.neighborhood}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* --------------- */}
        <div className="sub-btn p-10 w-full flex flex-col items-center gap-4">
          <motion.button
       whileTap={{ scale: 0.9 }}
       transition={{
         type: 'spring',
         stiffness: 400,
         damping: 10
       }}
            className="bg-[#2664B1] text-white py-2 px-30 max-sm:px-20 rounded-3xl cursor-pointer"
            onClick={handleSubmit}
          >
            {t("students.edit.save")}
          </motion.button>
          <motion.button
       whileTap={{ scale: 0.9 }}
       transition={{
         type: 'spring',
         stiffness: 400,
         damping: 10
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
