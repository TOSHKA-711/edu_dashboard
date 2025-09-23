"use client";
import SelectUserDialog from "@/app/[locale]/items/Dialogs/SelectUserdialog";
import { useAlert } from "@/app/[locale]/items/hooks/useAlert";
import EnrolledTable from "@/app/[locale]/items/tables/EnrolledTable";
import { useGetEnrolledUsersQuery } from "@/app/Redux/Slices/Courses/courseApi";
import { useSetStudentToCourseMutation } from "@/app/Redux/Slices/Students/studentsApi";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

const Page = () => {
  const t = useTranslations();
  const { showSuccess, showError } = useAlert();
  const params = useParams();
  const courseId = (params.id as string) ?? "";

  const [student, setStudent] = useState<{ name: string; id: string | number }>(
    {
      name: "",
      id: "",
    }
  );

  const { data: users, refetch } = useGetEnrolledUsersQuery(courseId);
  const [setStudentToCourse] = useSetStudentToCourseMutation();

  const handleSubmit = async () => {
    const formData = new FormData();

    if (student.id) {
      formData.append("user_id", String(student.id));
      formData.append("course_id", courseId); // add if API needs it
    }

    try {
      await setStudentToCourse({ data: formData }).unwrap();
      showSuccess(`${t("alerts.user_added_success")}`);
      refetch();
      setStudent({ name: "", id: "" });
    } catch {
      showError(`${t("alerts.user_added_failed")}`);
      console.log("Error");
    }
  };

  return (
    <div className="flex flex-col py-4">
       <div className="flex-row flex self-end items-center justify-start gap-7 -mb-4">
        <SelectUserDialog setStudent={setStudent} />
        {student.name != "" && (
          <button
            onClick={handleSubmit}
            className="add-btn rounded-lg text-[20px] cursor-pointer text-white pt-3 pb-2.5 px-8 bg-green-500 mb-3 -mt-4 "
          >
           {t("students.add.save")}
          </button>
        )}
      </div>
      <EnrolledTable
        users={users ?? { status: false, message: "", data: [] }}
      />
     
      <ToastContainer />
    </div>
  );
};

export default Page;
