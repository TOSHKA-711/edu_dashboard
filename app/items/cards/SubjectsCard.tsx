import React from "react";
import { IoCheckmarkDone } from "react-icons/io5";

const SubjectsCard = ({title , color} : {title:string , color:string}) => {
  return (
    <div
      className={`card flex flex-col items-start justify-center p-5 rounded-xl bg-[${color}]  w-1/4 max-lg:w-full h-40 text-3xl relative`}
      dir="rtl"
    >
      <IoCheckmarkDone className="absolute left-2 top-2 bg-[#FBF2C0] p-1 text-2xl text-[#D9CC83]" />
      <p className="font-medium">0</p>
      <p>{title}</p>
    </div>
  );
};

export default SubjectsCard;
