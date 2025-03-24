import React, { useState } from "react";
import { Rating, Pagination, Avatar } from "@mui/material";

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
}

const reviews: Review[] = [
  { id: 1, name: "أحمد", rating: 4, text: "تجربة رائعة!" },
  { id: 2, name: "محمود", rating: 5, text: "خدمة ممتازة!" },
  { id: 3, name: "سارة", rating: 3, text: "جيد ولكن يحتاج لبعض التحسينات." },
  { id: 4, name: "علي", rating: 2, text: "لم تكن كما توقعت." },
  { id: 5, name: "منى", rating: 5, text: "رائع جدًا!" },
  { id: 6, name: "يوسف", rating: 4, text: "جيد جدًا!" },
  { id: 7, name: "هدى", rating: 3, text: "متوسط." },
  { id: 8, name: "خالد", rating: 5, text: "ممتاز!" },
];

const ITEMS_PER_PAGE = 5;

const TeacherRates: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedReviews = reviews.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col items-start gap-5">
      {paginatedReviews.map((review) => (

        <div className="rateCard p-3 bg-white w-[40rem] flex flex-col items-start gap-6 rounded-2xl" key={review.id}>
          <div className="about flex flex-row items-center justify-between w-full">
            <div className="per-details flex flex-row items-center gap-3">
              <Avatar alt="user" src="/user.jpg" sx={{width:"4rem" ,height:"4rem"}}/>
              <span className="flex flex-col items-start gap-1">
                <h2 className="text-lg">{review.name}</h2>
                <p className="text-[#3F434C]">طالب</p>
              </span>
            </div>
            <Rating name="read-only" value={3} readOnly />
          </div>
          <p className="text text-[17px] w-full text-[#3F434C]">{review.text}</p>
        </div>
      ))}
      <Pagination
        count={Math.ceil(reviews.length / ITEMS_PER_PAGE)}
        page={page}
        onChange={handleChange}
        color="primary"
        sx={{direction:"ltr"}}
      />
    </div>
  );
};

export default TeacherRates;
