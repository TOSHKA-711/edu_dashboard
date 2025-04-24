import React, { useState } from "react";
import { Rating, Pagination, Avatar } from "@mui/material";
import { CourseRateType } from "@/app/Redux/types";
import Image from "next/image";
import { useAlert } from "../hooks/useAlert";
import { ToastContainer } from "react-toastify";
import { useChangeCourseRateStatusMutation } from "@/app/Redux/Slices/Courses/courseApi";

const ITEMS_PER_PAGE = 6;

const CourseRates = ({ reviews }: { reviews: CourseRateType[] }) => {
  const [page, setPage] = useState<number>(1);
  const { showSuccess, showError } = useAlert();
  const [changeCourseRateStatus] = useChangeCourseRateStatusMutation();

  const handleChangeCourseStatus = async (CourseId: number, status: number) => {
    try {
      await changeCourseRateStatus({ id: CourseId, status }).unwrap();
      showSuccess("Rate status changed successfully!");
    } catch {
      showError("Rate status changed failed!");
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
        No reviews found{" "}
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
    <>
      <div className="grid grid-cols-2 gap-2 w-full max-lg:grid-cols-1 max-lg:w-[70%] max-md:w-[100%]">
        {paginatedReviews.map((review) => (
          <div
            className="rateCard py-3 px-4 bg-white w-[100%] flex flex-col items-start gap-5 rounded-2xl"
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
                  <h2 className="text-lg">{review?.user?.name}</h2>
                  <p className="text-[#3F434C]">طالب</p>
                </span>
              </div>
              <Rating name="read-only" value={3} readOnly />
            </div>
            <div className="flex items-center justify-between text text-[17px] w-full text-[#3F434C] px-2">
              <p className="whitespace-normal break-words w-4/5 text-base">
                {" "}
                {review.comment}
              </p>
              <button
                className="text-white  text-md py-1 px-6 rounded-sm self-center mt-6 cursor-pointer max-sm:px-15"
                style={{
                  backgroundColor: `${
                    review.is_accept == 0 ? "#ECF8EF" : "#FDECEC"
                  }`,
                  color: `${review.is_accept == 0 ? "#43B75D" : "#DB340B"}`,
                }}
                onClick={() => {
                  handleChangeCourseStatus(
                    review.id,
                    review.is_accept == 0 ? 1 : 0
                  );
                }}
              >
                {review.is_accept == 1 ? "رفض" : "قبول"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        count={Math.ceil(reviews.length / ITEMS_PER_PAGE)}
        page={page}
        onChange={handleChange}
        color="primary"
        sx={{ direction: "ltr" }}
      />
      <ToastContainer />
    </>
  );
};

export default CourseRates;
