import React from "react";
import SubjectsCardDots from "../SubjectsCardDots";
import { CategoryType } from "@/app/Redux/types";
import Image from "next/image";

const CategoryCard = ({
  category,
  bgColor,
  iconBg,
  iconColor,
}: {
  category: CategoryType;
  bgColor: string;
  iconBg: string;
  iconColor: string;
}) => {
  return (
    <div
      className="card flex flex-col items-start justify-center p-5 rounded-xl w-[19.7rem] max-lg:w-full h-40 text-3xl relative overflow-hidden"
      dir="rtl"
      style={{ backgroundColor: bgColor }}
    >
      <Image
        src={category.image}
        alt="img"
        width={40}
        height={40}
        className={`absolute left-2 top-2 w-10 h-10 object-fill bg-[${iconBg}] text-[${iconColor}]`}
      />
      <SubjectsCardDots bg={iconBg} color={iconColor} categoryId={category.id}/>
      <p className="font-medium">{category.courses_count}</p>
      <p className="whitespace-normal break-words w-full text-base text-[22px]">
        {category.name_ar}
      </p>
    </div>
  );
};

export default CategoryCard;
