"use client";
import {
  useGetStudentImagesQuery,
  useSetStudentMutation,
} from "@/app/Redux/Slices/Students/studentsApi";

import { FormControl, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { IoIosColorPalette } from "react-icons/io";
import {motion} from "framer-motion"

// alert
import { ToastContainer } from "react-toastify";
import { Dayjs } from "dayjs";
import { FaRegUser } from "react-icons/fa";
import { RiParentFill } from "react-icons/ri";
import { useTranslations } from "next-intl";
import SelectImageDialog from "@/app/[locale]/items/Dialogs/SelectImageDialog";
import { InputField } from "@/app/[locale]/items/inputs&btns/InputField";
import CalenderDialog from "@/app/[locale]/items/Dialogs/CalenderDialog";
import SelectParentDialog from "@/app/[locale]/items/Dialogs/SelectParentdialog";
import SelectColorDialog from "@/app/[locale]/items/Dialogs/SelectColorDialog";
import { useAlert } from "@/app/[locale]/items/hooks/useAlert";

const Page = () => {
  const t = useTranslations();
  const [isRendered, setIsRendered] = useState(false);
  const { showSuccess, showError } = useAlert();
  const router = useRouter();

  const [setStudent] = useSetStudentMutation();
  const { data: studentImages } = useGetStudentImagesQuery();

  const [image, setImage] = useState<string | Blob | null>(null);
  const [color, setColor] = useState("");
  const [colorShow, setColorShow] = useState("");
  const [parent, setParent] = useState<{ name: string; id: string | number }>({
    name: "",
    id: "",
  });
  const [date_of_birth, setDate_of_birth] = useState<Dayjs | null>(null);
  const [payload, setPayload] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_number: "",
    identity_id: "",
    password: "",
    password_confirmation: "",
    child_type: "",
  });

  useEffect(() => {
    setIsRendered(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (e: SelectChangeEvent<number | string>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // return image
  const getImageSrc = () => {
    if (typeof image === "string") return image;
    if (image instanceof Blob) return URL.createObjectURL(image);
    return "";
  };

  // convert color from flutter to hex

  //  handle submit

  const handleSubmit = async () => {
    const formData = new FormData();

    // إضافة الصورة إذا كانت موجودة
    if (image && image !== null) {
      formData.append("image", image as Blob);
    }

    if (parent.id) {
      if (payload.first_name !== null) {
        formData.append("first_name", payload.first_name);
      }
      if (payload.last_name !== null) {
        formData.append("last_name", payload.last_name);
      }
      if (payload.identity_id !== null) {
        formData.append("identity_id", payload.identity_id);
      }
      if (payload.child_type !== null) {
        formData.append("child_type", payload.child_type);
      }
      if (payload.password !== null) {
        formData.append("password", payload.password);
      }
      if (payload.password_confirmation !== null) {
        formData.append("password_confirmation", payload.password_confirmation);
      }
      if (payload.email !== null) {
        formData.append("email", payload.email);
      }
      if (payload.phone_number !== null) {
        formData.append("phone_number", payload.phone_number);
      }
      if (payload.username !== null) {
        formData.append("username", payload.username);
      }
      if (date_of_birth !== null) {
        formData.append(
          "date_of_birth",
          String(date_of_birth.format("YYYY-MM-DD"))
        );
      }
      if (color !== null) {
        formData.append("color", String(color));
      }

      // إرسال البيانات
      try {
        await setStudent({
          parentId: parseInt(String(parent.id)),
          data: formData,
        }).unwrap();
        showSuccess(`${t("alerts.user_added_success")}`);
      } catch {
        showError(`${t("alerts.user_added_failed")}`);
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
              label={t("students.add.first_name")}
              type="text"
              name="first_name"
              value={payload.first_name}
              onChange={handleChange}
            />
            <InputField
              label={t("students.add.father_name")}
              type="text"
              name="last_name"
              value={payload.last_name}
              onChange={handleChange}
            />
            <InputField
              label={t("students.add.username")}
              type="text"
              name="username"
              value={payload.username}
              onChange={handleChange}
            />
            <InputField
              label={t("students.add.student_id")}
              type="text"
              name="identity_id"
              value={payload.identity_id}
              onChange={handleChange}
            />
            <InputField
              label={t("students.add.email")}
              type="email"
              name="email"
              value={payload.email}
              onChange={handleChange}
            />
            <InputField
              label={t("students.add.phone")}
              type="phone"
              name="phone_number"
              value={payload.phone_number}
              onChange={handleChange}
            />
            <InputField
              label={t("students.add.password")}
              type="text"
              name="password"
              value={payload.password}
              onChange={handleChange}
            />
            <InputField
              label={t("students.add.confirm_password")}
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

                "& .MuiInputBase-root": {
                  borderRadius: "16px",
                  fontFamily: "unset",
                  width: "100%",
                  backgroundColor: "white",
                },
              }}
            >
              <p className="absolute -top-3 right-12 text-lg text-[#2664B1]  ">
                {" "}
                {t("students.add.gender")}
              </p>
              <FaRegUser className="bg-[#2664B1] text-white p-2 rounded-3xl text-4xl" />
              <Select
                value={payload.child_type}
                name="child_type"
                onChange={handleSelectChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"male"} sx={{ direction: "rtl" }}>
                  {t("students.add.male")}
                </MenuItem>

                <MenuItem value={"female"} sx={{ direction: "rtl" }}>
                  {t("students.add.female")}
                </MenuItem>
              </Select>
            </FormControl>
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
                {t("students.add.date_of_birth")}
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
                {t("students.add.color")}
              </p>
              <IoIosColorPalette className="bg-[#2664B1] text-white p-2 rounded-3xl text-4xl" />
              <SelectColorDialog setColor={setColor} setColorShow={setColorShow}/>
              <span
                style={{
                  marginRight: "8px",
                  color: "#2664B1",
                  fontWeight: "bold",
                }}
              >
                {colorShow && (
                  <div
                    className={`w-12 h-12 max-sm:h-9 max-sm:w-9  rounded-full cursor-pointer border-2 transition-all duration-200 hover:scale-110 `}
                    style={{ backgroundColor: colorShow }}
                  ></div>
                )}
              </span>
            </FormControl>
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
                {t("students.add.guardians")}
              </p>
              <RiParentFill className="bg-[#2664B1] text-white p-2 rounded-3xl text-4xl" />
              <SelectParentDialog setParent={setParent} />
              <p>{parent.name}</p>
            </FormControl>
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
            {t("students.add.save")}
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
            {t("students.add.cancel")}
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default Page;
