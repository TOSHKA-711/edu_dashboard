"use client";
import SubjectsCard from "@/app/items/cards/SubjectsCard";
import { InputField } from "@/app/items/inputs&btns/InputField";
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const Page = () => {
    const colors = ["#EFECFF", "#FFFADF", "#E8FBF5", "#FFF0FF"];
  const [cardData, setCardData] = useState({ title: "", color: "" });
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };
  return (
    <div className="add-subject p-5 flex flex-col items-stretch gap-5">
      <InputField
        label="اسم الموضوع *"
        type="text"
        name="title"
        value={cardData.title}
        onChange={handleChange}
      />

      <div className="image-upload w-full flex flex-col items-start gap-4">
        <p className="text-lg font-semibold"> صوره للموضوع</p>
        <div className="w-full flex flex-col items-center justify-center gap-2 py-12 border-2 border-dashed border-[#5e87b8] rounded-lg">
          <FaCloudUploadAlt className="text-[#2664B1] text-4xl" />
          <p className="text-zinc-500 ">قم برفع صوره هنا</p>
        </div>
      </div>
      <div className="flex gap-4 bg-white p-5 items-center justify-between w-full">
      <div className="flex gap-4 bg-white p-5">
        {colors.map((color) => (
          <div
            key={color}
            className={`w-12 h-12 rounded-full cursor-pointer border-2 transition-all duration-200 ${
              selectedColor === color ? "border-black scale-110" : "border-transparent"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          ></div>
        ))}
      </div>
      <SubjectsCard title={cardData.title} color={selectedColor}/>
      </div>
      <button className="text-white bg-[#2664B1] text-2xl py-2 px-24 rounded-full self-center mt-6 cursor-pointer">تأكيد</button>
    </div>
  );
};

export default Page;
