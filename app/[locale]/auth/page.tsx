"use client";
import Image from "next/image";
import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { useAlert } from "../items/hooks/useAlert";
import { useLoginMutation } from "@/app/Redux/Slices/Auth/authApi";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const AuthPage = () => {
  const router = useRouter();
  const [login] = useLoginMutation();
  const [payload, setPayload] = useState({ email: "", password: "" });
  const { showSuccess, showError } = useAlert();
  const t = useTranslations();

  //   handle inputs change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      await login(payload).unwrap();
      showSuccess("Login success");
      router.push("/dashboard/overview");
    } catch {
      showError("Login error");
    }
  };

  return (
    <>
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="login w-full h-screen flex items-center justify-center relative "
        style={{ background: "linear-gradient(to left, #EDF4F1, #E3EBF5)" }}
        dir="rtl"
      >
        <Image
          src="/logo1.svg"
          alt="logo"
          width={70}
          height={100}
          className="absolute top-4 left-5"
        />
        <div
          className="card bg-[#fff] flex flex-col items-start pr-6 pl-8 py-8 gap-5 min-w-[450px] rounded-lg max-sm:min-w-[320px]"
          style={{ boxShadow: "0px 3.48px 3.48px 0px #00000040" }}
        >
          <span className="flex flex-col items-start gap-1">
            <h2 className="text-[#0E0E0E] font-semibold"> </h2>
            <p className="text-[13px]">
              {" "}
              {t("settings.roles.enter_user_data")}
            </p>
          </span>
          <div className="input  w-full flex flex-col items-start gap-2">
            <p className="font-semibold text-[15px]">
              {" "}
              {t("alerts.enter_email")}
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
              {" "}
              {t("alerts.enter_password")}
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
            {t("alerts.login")}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default AuthPage;
