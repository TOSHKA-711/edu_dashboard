"use client";

import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaRegEyeSlash } from "react-icons/fa";
import { SelectChangeEvent } from "@mui/material/Select";
import { ToastContainer } from "react-toastify";
import Select from "@mui/material/Select";
import { IoPersonAdd } from "react-icons/io5";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { useSetRoleMutation } from "@/app/Redux/Slices/Settings/settingsApi";
import { useAlert } from "@/app/[locale]/items/hooks/useAlert";
import { FormControl, MenuItem } from "@mui/material";
import AllRolesTable from "@/app/[locale]/items/tables/AllRolesTable";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const Page = () => {
  const t = useTranslations();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    role: "admin",
  });
  const { showSuccess, showError } = useAlert();
  const [setRole] = useSetRoleMutation();
  //   handle inputs change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSelectChange = (e: SelectChangeEvent<number | string>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //    handle submit
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await setRole(payload).unwrap();
      showSuccess(`${t("alerts.role_added_success")}`);
    } catch {
      showError(`${t("alerts.role_added_failed")}`);
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="login w-full flex flex-col items-center justify-center relative py-8  gap-4"
        style={{ background: "linear-gradient(to left, #EDF4F1, #E3EBF5)" }}
        dir="rtl"
      >
        <div
          className="card bg-[#fff] flex flex-col items-start pr-6 pl-8 py-8 px-20 gap-3 min-w-[950px] rounded-lg max-lg:min-w-[650px] max-sm:min-w-[250px]"
          style={{ boxShadow: "0px 3.48px 3.48px 0px #00000040" }}
        >
          <span className="flex flex-col items-start gap-1">
            <h2 className="text-[#0E0E0E] font-semibold text-lg">
              {" "}
              {t("settings.roles.grant_permission")}
            </h2>
            <p className="text-[13px]">
              {" "}
              {t("settings.roles.enter_user_data")}
            </p>
          </span>
          <div className="inputs w-full grid grid-cols-2 gap-3 max-md:grid-cols-1">
            <div className="input  w-full flex flex-col items-start gap-2">
              <p className="font-semibold text-[15px]">
                {" "}
                {t("settings.roles.first_name")}
              </p>
              <span className="flex items-center justify-between border-2 px-3 rounded-2xl  w-full focus:outline-none focus:ring-2 focus:ring-blue-500 border-[#2664B1]">
                <input
                  onChange={handleInputChange}
                  name="first_name"
                  value={payload.first_name}
                  type="text"
                  className="border-none outline-none px-3 py-2 w-full"
                />
                <MdOutlineDriveFileRenameOutline className="text-[20px] text-zinc-500" />
              </span>
            </div>
            <div className="input  w-full flex flex-col items-start gap-2">
              <p className="font-semibold text-[15px]">
                {t("settings.roles.last_name")}
              </p>
              <span className="flex items-center justify-between border-2 px-3 rounded-2xl  w-full focus:outline-none focus:ring-2 focus:ring-blue-500 border-[#2664B1]">
                <input
                  onChange={handleInputChange}
                  name="last_name"
                  value={payload.last_name}
                  type="text"
                  className="border-none outline-none px-3 py-2 w-full"
                />
                <MdOutlineDriveFileRenameOutline className="text-[20px] text-zinc-500" />
              </span>
            </div>
            <div className="input  w-full flex flex-col items-start gap-2">
              <p className="font-semibold text-[15px]">
                {t("settings.roles.email")}
              </p>
              <span className="flex items-center justify-between border-2 px-3 rounded-2xl  w-full focus:outline-none focus:ring-2 focus:ring-blue-500 border-[#2664B1]">
                <input
                  onChange={handleInputChange}
                  name="email"
                  value={payload.email}
                  type="text"
                  className="border-none outline-none px-3 py-2 w-full"
                />
                <CiMail className="text-[20px] text-zinc-500" />
              </span>
            </div>
            <div className="input  w-full flex flex-col items-start gap-2">
              <p className="font-semibold text-[15px]">
                {t("settings.roles.password")}
              </p>
              <span className="flex items-center justify-between border-2 px-3 rounded-2xl  w-full focus:outline-none focus:ring-2 focus:ring-blue-500 border-[#2664B1]">
                <input
                  onChange={handleInputChange}
                  name="password"
                  value={payload.password}
                  type="password"
                  className="border-none outline-none px-3 py-2 w-full"
                />
                <FaRegEyeSlash className="text-[20px] text-zinc-500" />
              </span>
            </div>

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
              <IoPersonAdd className="bg-[#2664B1] text-white p-2 rounded-3xl text-4xl" />
              <Select
                value={payload.role}
                name="role"
                onChange={handleSelectChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"admin"} sx={{ direction: "rtl" }}>
                  Admin
                </MenuItem>

                <MenuItem value={"moderator"} sx={{ direction: "rtl" }}>
                  Moderator
                </MenuItem>
              </Select>
            </FormControl>
            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
              className="bg-[#2664B1] text-white self-center w-full p-2 rounded-lg cursor-pointer mt-4"
              onClick={handleSubmit}
            >
              {t("settings.roles.confirm")}
            </motion.button>
          </div>
        </div>
        <AllRolesTable />
      </div>
    </>
  );
};

export default Page;
