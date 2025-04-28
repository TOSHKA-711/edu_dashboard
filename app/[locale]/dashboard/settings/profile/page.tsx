"use client";
import { RootState } from "@/app/Redux/Store";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineIdentification } from "react-icons/hi2";
import { MdOutlineDateRange } from "react-icons/md";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { useSetStudentUpdateMutation } from "@/app/Redux/Slices/Students/studentsApi";
import { useLoginMutation } from "@/app/Redux/Slices/Auth/authApi";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { logout } from "@/app/Redux/Slices/Auth/authSlice";
import { useAlert } from "@/app/[locale]/items/hooks/useAlert";
import { useTranslations } from "next-intl";
import {motion} from "framer-motion"

const Page = () => {
  const [isRendered, setIsRendered] = useState(false);
  const t = useTranslations();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    setIsRendered(true);
  }, []);
  const [payload, setPayload] = useState({
    email: user?.email,
    password: "",
    newPassword: "",
  });
  const { showSuccess, showError } = useAlert();
  const [setStudentUpdate] = useSetStudentUpdateMutation();
  const [login] = useLoginMutation();
  //   handle inputs change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //    handle submit
  const handleChangePassword = async () => {
    try {
      const res = await login({
        email: payload.email,
        password: payload.password,
      }).unwrap();

      if (res) {
        const formDataUpdate = new FormData();
        formDataUpdate.append("password", payload.newPassword);

        await setStudentUpdate({
          id: Number(user?.id),
          data: formDataUpdate,
        }).unwrap();
        showSuccess(`${t("alerts.password_changed_success")}`);
        dispatch(logout());
        router.push("/auth");
      }
    } catch {
      showError(`${t("alerts.password_change_failed")}`);
    }
  };

  if (!isRendered) {
    return <div>{t("alerts.loading")}</div>;
  }

  if (!user) {
    return <div> {t("alerts.no_user_found")}</div>;
  }

  return (
    <div className="w-full flex flex-col items-start">
      <ToastContainer />
      <div className="view-student w-full flex flex-col items-start gap-4">
        <div
          className="student-card w-full rounded-lg flex flex-row items-center justify-start gap-8 p-8 w-full max-md:flex-col max-sm:px-3"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
        >
          <div className="main-details flex flex-row items-center justify-start gap-8">
            <span className="flex flex-col items-center gap-2">
              <Avatar
                alt="user"
                src={user?.image || ""}
                sx={{ width: "5rem", height: "5rem" }}
                imgProps={{ style: { objectFit: "cover" } }}
              />
              {user?.first_name} {user?.last_name}
            </span>

            <span className="flex flex-col items-center gap-1">
              <Image alt="user" src="/Frame_rate.svg" width={40} height={100} />
              <p>{user?.role}</p>
              {t("settings.profile.role")}
            </span>
          </div>
          <div className="middle w-[2px] h-[6rem] bg-[#B0DEFF] max-md:h-1 max-md:w-4/5  "></div>
          <div className="per-details flex flex-col items-start gap-3">
            <h2 className="text-lg font-semibold  ">
              {" "}
              {t("settings.profile.personal_information")}
            </h2>
            <div className="flex flex-row gap-2 items-center justify-center">
              <span className="flex flex-row gap-1 items-center justify-start">
                {" "}
                <HiOutlineIdentification className="text-lg" />
                {t("settings.profile.id_number")}
              </span>
              <span> {user?.identity_id}</span>
            </div>
            <div className="flex flex-row gap-2 items-center justify-center">
              <span className="flex flex-row gap-1 items-center justify-start">
                {" "}
                <MdOutlineDateRange className="text-lg" />
                {t("settings.profile.date_of_birth")}
              </span>
              <span> {user?.date_of_birth}</span>
            </div>
            <div className="flex flex-row gap-2 items-center justify-center">
              <span className="flex flex-row gap-1 items-center justify-start">
                {" "}
                <MdOutlineDateRange className="text-lg" />
                {t("settings.profile.email")}
              </span>
              <span> {user?.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* change password  */}

      <div
        className="login w-full flex items-center justify-center relative py-8"
        style={{ background: "linear-gradient(to left, #EDF4F1, #E3EBF5)" }}
        dir="rtl"
      >
        <div
          className="card  bg-[#fff] flex flex-col items-start pr-6 pl-8 py-8 gap-3 min-w-[450px] rounded-lg max-sm:min-w-[250px]"
          style={{ boxShadow: "0px 3.48px 3.48px 0px #00000040" }}
        >
          <span className="flex flex-col items-start gap-1">
            <h2 className="text-[#0E0E0E] font-semibold text-lg">
              {" "}
              {t("settings.profile.change_password")}
            </h2>
            <p className="text-[13px]">
              {" "}
              {t("settings.profile.enter_new_password")}{" "}
            </p>
          </span>
          <div className="inputs w-full grid grid-cols-2 gap-3 max-md:grid-cols-1">
            <div className="input  w-full flex flex-col items-start gap-2">
              <p className="font-semibold text-[15px]">
                {" "}
                {t("settings.profile.old_password")}
              </p>
              <span className="flex items-center justify-between border-2 px-3 rounded-2xl  w-full focus:outline-none focus:ring-2 focus:ring-blue-500 border-[#2664B1]">
                <input
                  onChange={handleInputChange}
                  name="password"
                  value={payload.password}
                  type="text"
                  className="border-none outline-none px-3 py-2 w-full"
                />
                <MdOutlineDriveFileRenameOutline className="text-[20px] text-zinc-500" />
              </span>
            </div>
            <div className="input  w-full flex flex-col items-start gap-2">
              <p className="font-semibold text-[15px]">
                {" "}
                {t("settings.profile.new_password")}
              </p>
              <span className="flex items-center justify-between border-2 px-3 rounded-2xl  w-full focus:outline-none focus:ring-2 focus:ring-blue-500 border-[#2664B1]">
                <input
                  onChange={handleInputChange}
                  name="newPassword"
                  value={payload.newPassword}
                  type="text"
                  className="border-none outline-none px-3 py-2 w-full"
                />
                <MdOutlineDriveFileRenameOutline className="text-[20px] text-zinc-500" />
              </span>
            </div>
          </div>
          <motion.button
       whileTap={{ scale: 0.9 }}
       transition={{
         type: 'spring',
         stiffness: 400,
         damping: 10
       }}
            className="bg-[#2664B1] text-white self-center w-full p-2 rounded-lg cursor-pointer mt-4"
            onClick={handleChangePassword}
          >
            {t("settings.profile.confirm_password")}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Page;
