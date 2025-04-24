"use client";
import CategoryCard from "@/app/items/cards/CategoryCard";
import { useGetAllCategoriesQuery } from "@/app/Redux/Slices/Categories/categoryApi";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosAdd } from "react-icons/io";

const bgColors = ["#FFFADF", "#EFECFF", "#E8FBF5", "#FFF0FF"];
const iconBgColors = ["#FBF2C0", "#E6E0FF", "#D8F8ED", "#FFE5FF"];
const iconColors = ["#D9CC83", "#917FF0", "#75A896", "#B270B2"];

const Page = () => {
  const router = useRouter();
  const { data: categories } =
    useGetAllCategoriesQuery();




  return (
    <div className="flex flex-col items-start gap-5 py-8">
      <button
        className="flex flex-row gap-1 items-center bg-[#2664B1] text-white py-2 px-4 rounded-3xl cursor-pointer self-end"
        onClick={() => router.push("/dashboard/subjects/addSubject")}
      >
        <IoIosAdd className="text-lg" />
        إضافة موضوع
      </button>

      {categories && (
        <div className="flex w-full items-center justify-start flex-wrap gap-3 max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1">
          {categories.data.map((category,index) => (
            <CategoryCard
              key={category.id}
              category={category}
              bgColor={bgColors[index % bgColors.length]}
              iconBg={iconBgColors[index % iconBgColors.length]}
              iconColor={iconColors[index % iconColors.length]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
