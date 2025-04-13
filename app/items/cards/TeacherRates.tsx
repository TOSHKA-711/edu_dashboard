import React, { useState } from "react";
import { Rating, Pagination, Avatar } from "@mui/material";
import { InstructorRateType } from "@/app/Redux/types";
import Image from "next/image";

const ITEMS_PER_PAGE = 5;

const TeacherRates = ({reviews}:{reviews:InstructorRateType[]}) => {
  
  const [page, setPage] = useState<number>(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedReviews = reviews.slice(startIndex, endIndex);

  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 text-lg">
        No reviews found <Image src={"/404 Error-rafiki.svg"} alt="not found" width={250} height={100}/>{" "}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-5">
      {paginatedReviews.map((review , index) => (
        <div
          className="rateCard py-3 px-4 bg-white w-[40rem] flex flex-col items-start gap-5 rounded-2xl"
          key={index}
        >
          <div className="about flex flex-row items-center justify-between w-full">
            <div className="per-details flex flex-row items-center gap-3">
              <Avatar
                alt="user"
                src={review.user?.image}
                sx={{ width: "3rem", height: "3rem" }}
              />
              <span className="flex flex-col items-start gap-1">
                <h2 className="text-lg">{review?.user?.first_name} {review?.user?.last_name}</h2>
                <p className="text-[#3F434C]">طالب</p>
              </span>
            </div>
            <Rating name="read-only" value={3} readOnly />
          </div>
          <p className="text text-[17px] w-full text-[#3F434C] px-2">
            {review.review}
          </p>
        </div>
      ))}
      <Pagination
        count={Math.ceil(reviews.length / ITEMS_PER_PAGE)}
        page={page}
        onChange={handleChange}
        color="primary"
        sx={{ direction: "ltr" }}
      />
    </div>
  );
};

export default TeacherRates;
