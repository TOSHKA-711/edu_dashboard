import React, { useState } from "react";
import { Rating, Pagination, Avatar } from "@mui/material";
import {
  AllInstructorRatesResponseType,
  InstructorRateType,
} from "@/app/Redux/types";
import Image from "next/image";
import { useAlert } from "../hooks/useAlert";
import { useChangeInstructorRateStatusMutation } from "@/app/Redux/Slices/Instructors/InstructorsApi";
import { ToastContainer } from "react-toastify";
import { useTranslations } from "next-intl";
import {motion} from "framer-motion"

const ITEMS_PER_PAGE = 5;

const TeacherRates = ({
  reviews,
  instructorId,
  refetch,
}: {
  reviews: InstructorRateType[];
  instructorId: number;
  refetch: () => Promise<{
    data?: AllInstructorRatesResponseType;
    error?: unknown;
  }>;
}) => {
  const t = useTranslations();
  const [page, setPage] = useState<number>(1);
  const { showSuccess, showError } = useAlert();
  const [changeInstructorRateStatus] = useChangeInstructorRateStatusMutation();

  const handleChangeCourseStatus = async (
    instructorId: number,
    status: number
  ) => {
    try {
      await changeInstructorRateStatus({ id: instructorId, status }).unwrap();
      showSuccess(`${t("alerts.course_status_changed_success")}`);
      await refetch();
    } catch {
      showError(`${t("alerts.course_status_changed_failed")}`);
    }
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedReviews = reviews.slice(startIndex, endIndex);

  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 text-lg">
        {t("alerts.loading")}{" "}
        <Image
          src={"/404 Error-rafiki.svg"}
          alt="not found"
          width={250}
          height={100}
        />{" "}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-5">
      {paginatedReviews.map((review) => (
        <div
          className="rateCard py-3 px-4 bg-white w-[40rem] flex flex-col items-start gap-5 rounded-2xl"
          key={review.id}
        >
          <div className="about flex flex-row items-center justify-between w-full">
            <div className="per-details flex flex-row items-center gap-3">
              <Avatar
                alt="user"
                src={review.user?.image}
                sx={{ width: "3rem", height: "3rem" }}
              />
              <span className="flex flex-col items-start gap-1">
                <h2 className="text-lg">
                  {review?.user?.first_name} {review?.user?.last_name}
                </h2>
                <p className="text-[#3F434C]">طالب</p>
              </span>
            </div>
            <Rating name="read-only" value={3} readOnly />
          </div>
          <div className="flex items-center justify-between text text-[17px] w-full text-[#3F434C] px-2">
            <p className="whitespace-normal break-words w-4/5 text-base">
              {" "}
              {review.review}
            </p>
            <motion.button
       whileTap={{ scale: 0.9 }}
       transition={{
         type: 'spring',
         stiffness: 400,
         damping: 10
       }}
              className="text-white  text-md py-1 px-6 rounded-sm self-center mt-6 cursor-pointer max-sm:px-15"
              style={{
                backgroundColor: `${
                  review.is_accept == 0 ? "#ECF8EF" : "#FDECEC"
                }`,
                color: `${review.is_accept == 0 ? "#43B75D" : "#DB340B"}`,
              }}
              onClick={() => {
                handleChangeCourseStatus(
                  instructorId,
                  review.is_accept == 0 ? 1 : 0
                );
              }}
            >
              {review.is_accept == 1 ? "رفض" : "قبول"}
            </motion.button>
          </div>
        </div>
      ))}
      <Pagination
        count={Math.ceil(reviews.length / ITEMS_PER_PAGE)}
        page={page}
        onChange={handleChange}
        color="primary"
        sx={{ direction: "ltr" }}
      />
      <ToastContainer />
    </div>
  );
};

export default TeacherRates;
