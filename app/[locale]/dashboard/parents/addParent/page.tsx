"use client";
import { FormControl, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import {motion} from "framer-motion"

// alert
import { ToastContainer } from "react-toastify";
import { Dayjs } from "dayjs";
import { FaRegUser } from "react-icons/fa";
import { useSetParentMutation } from "@/app/Redux/Slices/Parents/parentsApi";
import { InputField } from "@/app/[locale]/items/inputs&btns/InputField";
import CalenderDialog from "@/app/[locale]/items/Dialogs/CalenderDialog";
import { useAlert } from "@/app/[locale]/items/hooks/useAlert";
import { useTranslations } from "next-intl";

const Page = () => {
  const [isRendered, setIsRendered] = useState(false);
  const t = useTranslations();
  const { showSuccess, showError } = useAlert();
  const router = useRouter();
  const [setParent] = useSetParentMutation();

  const [date_of_birth, setDate_of_birth] = useState<Dayjs | null>(null);
  const [payload, setPayload] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    identity_id: "",
    parent_type: "",
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

  //  handle submit

  const handleSubmit = async () => {
    const formData = new FormData();

    if (payload.first_name !== null) {
      formData.append("first_name", payload.first_name);
    }
    if (payload.last_name !== null) {
      formData.append("last_name", payload.last_name);
    }
    if (payload.identity_id !== null) {
      formData.append("identity_id", payload.identity_id);
    }
    if (payload.parent_type !== null) {
      formData.append("parent_type", payload.parent_type);
    }
    if (payload.email !== null) {
      formData.append("email", payload.email);
    }
    if (payload.phone_number !== null) {
      formData.append("phone_number", payload.phone_number);
    }
    if (payload.phone_number !== null) {
      formData.append("role", "parent");
    }
    if (date_of_birth !== null) {
      formData.append(
        "date_of_birth",
        String(date_of_birth.format("YYYY-MM-DD"))
      );
    }

    // إرسال البيانات
    try {
      await setParent(formData).unwrap();
      showSuccess(`${t("alerts.user_added_success")}`);
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
        {/* ------------forms------------  */}
        <div className="personal-details flex flex-col items-start gap-8 pt-10">
          <div className="header bg-[#2664B11A] flex items-center justify-start w-full  p-4 text-2xl max-sm:text-[16px] rounded-md">
            {t("parents.add.personal_information")}
          </div>
          <div className="inputs w-full grid grid-cols-3 gap-4 max-md:grid-cols-1">
            <InputField
              label={t("parents.add.first_name")}
              type="text"
              name="first_name"
              value={payload.first_name}
              onChange={handleChange}
            />
            <InputField
              label={t("parents.add.father_name")}
              type="text"
              name="last_name"
              value={payload.last_name}
              onChange={handleChange}
            />
            <InputField
              label={t("parents.add.identity")}
              type="text"
              name="identity_id"
              value={payload.identity_id}
              onChange={handleChange}
            />
            <InputField
              label={t("parents.add.email")}
              type="email"
              name="email"
              value={payload.email}
              onChange={handleChange}
            />
            <InputField
              label={t("parents.add.phone")}
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
                {t("parents.add.gender")}
              </p>
              <FaRegUser className="bg-[#2664B1] text-white p-2 rounded-3xl text-4xl" />
              <Select
                value={payload.parent_type}
                name="parent_type"
                onChange={handleSelectChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"father"} sx={{ direction: "rtl" }}>
                  أب
                </MenuItem>

                <MenuItem value={"mother"} sx={{ direction: "rtl" }}>
                  أم
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
                {t("parents.add.date_of_birth")}
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
         type: 'spring',
         stiffness: 400,
         damping: 10
       }}
            className="bg-[#2664B1] text-white py-2 px-30 max-sm:px-20 rounded-3xl cursor-pointer"
            onClick={handleSubmit}
          >
            {t("parents.add.save")}
          </motion.button>
           <motion.button
       whileTap={{ scale: 0.9 }}
       transition={{
         type: 'spring',
         stiffness: 400,
         damping: 10
       }}
            className="bg-[#F2F4F8]  py-2 px-30 max-sm:px-20 rounded-3xl cursor-pointer"
            onClick={() => router.push("/dashboard/parents")}
          >
            {t("parents.add.cancel")}
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default Page;
