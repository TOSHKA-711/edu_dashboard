"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { CiFileOn } from "react-icons/ci";
import { MdOndemandVideo } from "react-icons/md";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import {
  useDeleteDepartmentMutation,
  useGetCourseDepartmentsQuery,
  useSetDepartmentMutation,
  useSetSessionMutation,
} from "@/app/Redux/Slices/Courses/courseApi";
import { useParams } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { useAlert } from "@/app/[locale]/items/hooks/useAlert";
import { InputField } from "@/app/[locale]/items/inputs&btns/InputField";
import { useTranslations } from "next-intl";

const Page = () => {
  const params = useParams();
  const t = useTranslations();
  const courseId = (params.id as string) ?? "";
  const { showSuccess, showError } = useAlert();
  const [expandedSections, setExpandedSections] = useState<{
    [key: number]: boolean;
  }>({});
  const [departmentPayload, setDepartmentPayload] = useState({
    title: "",
    title_he: "",
    course_id: courseId,
  });
  const [sessionPayload, setSessionPayload] = useState({
    title: "",
    title_he: "",
    course_id: courseId,
    department_id: "",
  });
  const [isAddingDepartment, setIsAddingDepartment] = useState(false);
  const [isAddingSession, setIsAddingSession] = useState(false);
  const departmentRef = useRef<HTMLDivElement | null>(null);
  // const sessionRef = useRef<HTMLDivElement | null>(null);
  const { data: departments } = useGetCourseDepartmentsQuery(courseId);
  const [setDepartment] = useSetDepartmentMutation();
  const [deleteDepartment] = useDeleteDepartmentMutation();
  const [setSession] = useSetSessionMutation();

  const toggleSection = (id: number) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // handle input change
  const handleAddDepartmentInputsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setDepartmentPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleAddSessionInputsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setSessionPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddDepartmentClick = () => {
    setIsAddingDepartment(!isAddingDepartment);
    setIsAddingSession(false);
  };

  const handleAddSessionClick = (departmentId: number) => {
    setIsAddingSession(!isAddingSession);
    setIsAddingDepartment(false);
    setSessionPayload((prev) => ({
      ...prev,
      department_id: departmentId.toString(), // Make sure it's a string
    }));
  };
  // Scroll when isAddingDepartment becomes true
  useEffect(() => {
    if (isAddingDepartment) {
      departmentRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isAddingDepartment]);

  // handle add department
  const handleAddDepartment = async () => {
    const payload = new FormData();
    Object.entries(departmentPayload).forEach(([key, value]) => {
      payload.append(key, value);
    });
    try {
      await setDepartment(payload).unwrap();
      showSuccess(`${t('alerts.department_added_success')}`);
    } catch {
      showError(`${t('alerts.department_added_failed')}`);
    }
  };
  // handle add session
  const handleAddSession = async () => {
    const payload = new FormData();
    Object.entries(sessionPayload).forEach(([key, value]) => {
      payload.append(key, value);
    });
    try {
      await setSession(payload).unwrap();
      showSuccess(`${t('alerts.session_added_success')}`);
    } catch {
      showError(`${t('alerts.session_added_failedsession_added_failed')}`);
    }
  };

  // handle delete department

  const handleDeleteDepartment = async (id: number) => {
    const confirmDelete = window.confirm(
        `${t('alerts.delete_section_confirm')}`
    );
    if (!confirmDelete) return;

    try {
      await deleteDepartment(id).unwrap();
      showSuccess(`${t('alerts.delete_section_success')}`);
    } catch {
      showError(`${t('alerts.delete_section_confirm')}`);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="add-department bg-white p-5 rounded-lg flex flex-col items-start gap-4 mb-5 max-sm:p-2">
        {/* العنوان الرئيسي */}
        <div className="title w-full flex items-center justify-between text-[20px] mb-5">
          <p className="font-semibold max-md:text-[17px]">{t("tables.course_content")},</p>
          <button
            className="flex items-center gap-1 text-[#2664B1] cursor-pointer max-md:text-[17px]"
            onClick={handleAddDepartmentClick}
          >
            <IoMdAdd />
            {t("courses.add.add_department")}
          </button>
        </div>

        {/* الأقسام */}
        {departments?.data.map((section) => (
          <div
            key={section.id}
            className="section flex flex-col items-start gap-4 mb-5 w-full"
          >
            <div className="flex items-center justify-between w-full">
              <span className="title flex items-center gap-1 text-[18px]">
                <p className="font-semibold max-md:text-[17px]">{section.title} :</p>
                <p className="flex items-center gap-1 text-zinc-600">
                  <CiFileOn />
                  {/* {section.subtitle} */}
                </p>
              </span>
              <span className="flex items-center gap-5 max-md:gap-1">
                {expandedSections[section.id] ? (
                  <IoIosArrowUp
                    className="bg-[#E6F4FF] text-[#2095D3] p-1 text-2xl rounded-full cursor-pointer"
                    onClick={() => toggleSection(section.id)}
                  />
                ) : (
                  <IoIosArrowDown
                    className="bg-[#E6F4FF] text-[#2095D3] p-1 text-2xl rounded-full cursor-pointer"
                    onClick={() => toggleSection(section.id)}
                  />
                )}
                <MdDeleteOutline
                  className="ml-2 text-[#DB340B] text-[20px] cursor-pointer"
                  onClick={() => handleDeleteDepartment(section.id)}
                />
              </span>
            </div>

            {expandedSections[section.id] && (
              <div className="lessons p-2 flex flex-col items-start gap-6">
                {section.session.length === 0 ? (
                  <div>no sessions yet</div>
                ) : (
                  section.session.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="lesson flex items-center gap-1 text-[17px] max-md:text-[15px] max-md:gap-0"
                    >
                      <MdDeleteOutline className="ml-2 text-[#DB340B] text-[20px] cursor-pointer " />
                      <p>{lesson.title}</p>
                      <MdOndemandVideo />
                      <p>{lesson.description}</p>
                    </div>
                  ))
                )}
              </div>
            )}

            <button
              className="add-lesson flex items-center gap-1 text-[#2664B1] cursor-pointer text-[20px]"
              onClick={() => handleAddSessionClick(section.id)}
            >
              <IoMdAdd />
              {t("courses.add.add_lesson")}
            </button>
            {isAddingSession &&
              sessionPayload.department_id === section.id.toString() && (
                <>
                  <div
                    className="department-inputs w-full flex items-center gap-5 max-md:flex-col max-md:gap-0"
                    // ref={sessionRef}
                  >
                    <InputField
                      label= {t("courses.add.title_l_ar")}
                      type="text"
                      name="title"
                      value={sessionPayload.title}
                      onChange={handleAddSessionInputsChange}
                    />
                    <InputField
                      label={t("courses.add.title_l_he")}
                      type="text"
                      name="title_he"
                      value={sessionPayload.title_he}
                      onChange={handleAddSessionInputsChange}
                    />
                  </div>
                  <button
                    className="text-white bg-[#2664B1] text-2xl py-2 px-24 rounded-full self-center cursor-pointer max-md:px-15"
                    onClick={handleAddSession}
                  >
                    {t("courses.add.confirm")}
                  </button>
                </>
              )}
          </div>
        ))}

        {isAddingDepartment && (
          <>
            <div
              className="department-inputs w-full flex items-center gap-5 max-md:flex-col max-md:gap-0"
              ref={departmentRef}
            >
              <InputField
                label={t("courses.add.title_d_ar")}
                type="text"
                name="title"
                value={departmentPayload.title}
                onChange={handleAddDepartmentInputsChange}
              />
              <InputField
                label={t("courses.add.title_d_he")}
                type="text"
                name="title_he"
                value={departmentPayload.title_he}
                onChange={handleAddDepartmentInputsChange}
              />
            </div>
            <button
              className="text-white bg-[#2664B1] text-2xl py-2 px-24 rounded-full self-center cursor-pointer max-md:px-15"
              onClick={handleAddDepartment}
            >
             {t("courses.add.confirm")}
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Page;
