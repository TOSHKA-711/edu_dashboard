"use client";
import { useAlert } from "@/app/items/hooks/useAlert";
import { useImageUpload } from "@/app/items/hooks/useImageUploader";
import { InputField } from "@/app/items/inputs&btns/InputField";
import { useSetStudentUpdateMutation } from "@/app/Redux/Slices/Students/studentsApi";
import { RootState } from "@/app/Redux/Store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { RiUploadLine } from "react-icons/ri";
import { useSelector } from "react-redux";
// alert
import { ToastContainer } from "react-toastify";

const Page = () => {
  const [isRendered, setIsRendered] = useState(false);
  const { showSuccess, showError } = useAlert();
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const { imagePreviewUrl, handleImageChange, resetImage } =
    useImageUpload(setImage);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedUser = useSelector(
    (state: RootState) => state.students.selectedUser
  );
  const [setStudentUpdate] =
    useSetStudentUpdateMutation();

  const [payload, setPayload] = useState({
    image: selectedUser?.image,
    first_name: selectedUser?.first_name ?? "null",
    last_name: selectedUser?.last_name ?? "null",
    identity_id: selectedUser?.identity_id ?? "null",
    email: selectedUser?.email ?? "null",
    phone: selectedUser?.phone_number ?? "null",
    date_of_birth: selectedUser?.date_of_birth ?? "null",
    parent_id: selectedUser?.parent_id ?? "null",
    mother_id: selectedUser?.mother_identity_id ?? "null",
    student_type: selectedUser?.child_type ?? "null",
    neighborhood: selectedUser?.neighborhood ?? "null",
    educational_stage: selectedUser?.educational_stage ?? "null",
    school_name: selectedUser?.school_name ?? "null",
    grade_name: selectedUser?.grade_name ?? "null",
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

    // إضافة الصورة إذا كانت موجودة
    if (image) {
      formData.append("image", image as Blob);
    }

    if (selectedUser) {
      // formData.append("student_id", `${selectedUser?.id}`);
      if (
        selectedUser.first_name !== payload.first_name &&
        selectedUser.first_name !== null
      ) {
        formData.append("first_name", payload.first_name);
      }
      if (
        selectedUser.last_name !== payload.last_name &&
        selectedUser.last_name !== null
      ) {
        formData.append("last_name", payload.last_name);
      }
      if (
        selectedUser.identity_id !== payload.identity_id &&
        selectedUser.identity_id !== null
      ) {
        formData.append("identity_id", payload.identity_id);
      }
      if (
        selectedUser.date_of_birth !== payload.date_of_birth &&
        selectedUser.date_of_birth !== null
      ) {
        formData.append("date_of_birth", payload.date_of_birth);
      }
      if (
        selectedUser.parent_id !== payload.parent_id &&
        selectedUser.parent_id !== null
      ) {
        formData.append("parent_id", String(payload.parent_id));
      }
      if (
        selectedUser.mother_identity_id !== payload.mother_id &&
        selectedUser.mother_identity_id !== null
      ) {
        formData.append("mother_id", String(payload.mother_id));
      }
      if (
        selectedUser.child_type !== payload.student_type &&
        selectedUser.child_type !== null
      ) {
        formData.append("student_type", payload.student_type);
      }
      if (
        selectedUser.neighborhood !== payload.neighborhood &&
        selectedUser.neighborhood !== null
      ) {
        formData.append("neighborhood", payload.neighborhood);
      }
      if (
        selectedUser.educational_stage !== payload.educational_stage &&
        selectedUser.educational_stage !== null
      ) {
        formData.append("educational_stage", payload.educational_stage);
      }
      if (
        selectedUser.school_name !== payload.school_name &&
        selectedUser.school_name !== null
      ) {
        formData.append("school_name", payload.school_name);
      }
      if (
        selectedUser.grade_name !== payload.grade_name &&
        selectedUser.grade_name !== null
      ) {
        formData.append("grade_name", payload.grade_name);
      }

      // إرسال البيانات
      try {
        await setStudentUpdate({
          id: selectedUser.id,
          data: formData,
        }).unwrap();
        showSuccess("Data updated successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 5000);
        for (const [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
      } catch {
        showError("Data updated failed!");
        for (const [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
      }
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
              نحن ندعم فقط ملفات JPG، JPEG، أو PNG.
            </p>

            <div className="flex items-center justify-center gap-8">
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

        {/* ------------forms------------  */}
        <div className="personal-details flex flex-col items-start gap-8 pt-10">
          <div className="header bg-[#2664B11A] flex items-center justify-start w-full  p-4 text-2xl rounded-md">
            معلومات شخصية
          </div>
          <div className="inputs w-full grid grid-cols-3 gap-4">
            <InputField
              label="الاسم الشخصي *"
              type="text"
              name="first_name"
              value={payload.first_name}
              onChange={handleChange}
            />
            <InputField
              label=" اسم الاب *"
              type="text"
              name="last_name"
              value={payload.last_name}
              onChange={handleChange}
            />
            <InputField
              label="هويه الطالب *"
              type="text"
              name="identity_id"
              value={payload.identity_id}
              onChange={handleChange}
            />
            <InputField
              label="تاريخ الميلاد *"
              type="text"
              name="date_of_birth"
              value={payload.date_of_birth}
              onChange={handleChange}
            />
            <InputField
              label="هويه الاب *"
              type="text"
              name="parent_id"
              value={payload.parent_id}
              onChange={handleChange}
            />
            <InputField
              label="هويه الام *"
              type="text"
              name="mother_id"
              value={payload.mother_id}
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
              label="الصف*"
              type="text"
              name="grade_name"
              value={payload.grade_name}
              onChange={handleChange}
            />
            <InputField
              label="المدرسة*"
              type="text"
              name="school_name"
              value={payload.school_name}
              onChange={handleChange}
            />
            <InputField
              label="المرحلة التعليمية*"
              type="text"
              name="educational_stage"
              value={payload.educational_stage}
              onChange={handleChange}
            />
            <InputField
              label="الحي*"
              type="text"
              name="neighborhood"
              value={payload.neighborhood}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* --------------- */}
        {/* <div className="date-details flex flex-col items-start gap-8 pt-10">
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
      </div> */}
        {/* --------------- */}
        <div className="sub-btn p-10 w-full flex flex-col items-center gap-4">
          <button
            className="bg-[#2664B1] text-white py-2 px-30 rounded-3xl cursor-pointer"
            onClick={handleSubmit}
          >
            حفظ
          </button>
          <button
            className="bg-[#F2F4F8]  py-2 px-30 rounded-3xl cursor-pointer"
            onClick={() => router.push("/dashboard/students/allStudents")}
          >
            الغاء
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
