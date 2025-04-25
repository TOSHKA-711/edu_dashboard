"use client";

import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaRegEyeSlash } from "react-icons/fa";
import { SelectChangeEvent } from "@mui/material/Select";
import { ToastContainer } from "react-toastify";
import { useAlert } from "@/app/items/hooks/useAlert";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IoPersonAdd } from "react-icons/io5";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { useSetRoleMutation } from "@/app/Redux/Slices/Settings/settingsApi";
import AllRolesTable from "@/app/items/tables/AllRolesTable";

const Page = () => {
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
      showSuccess("Login success");
    } catch {
      showError("Login error");
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
            <h2 className="text-[#0E0E0E] font-semibold text-lg"> اعطاء اذن</h2>
            <p className="text-[13px]">قم بادخال بيانات المستخدم ... </p>
          </span>
          <div className="inputs w-full grid grid-cols-2 gap-3 max-md:grid-cols-1">

    
          <div className="input  w-full flex flex-col items-start gap-2">
            <p className="font-semibold text-[15px]"> الاسم الاول</p>
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
            <p className="font-semibold text-[15px]"> الاسم الثاني</p>
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
            <p className="font-semibold text-[15px]">البريد الالكتروني</p>
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
            <p className="font-semibold text-[15px]"> كلمه السر</p>
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
          <button
            className="bg-[#2664B1] text-white self-center w-full p-2 rounded-lg cursor-pointer mt-4"
            onClick={handleSubmit}
          >
            تأكيد
          </button>
          </div>
        </div>
        <AllRolesTable/>
      </div>
    </>
  );
};

export default Page;
