import Image from "next/image";
import React from "react";

const SubjectsCard = ({
  title,
  color,
  count,
  image,
}: {
  title: string;
  color: string;
  count: number | string;
  image: File | null;
}) => {
  console.log(image);

  return (
    <div
      className={`card flex flex-col items-start justify-center p-5 rounded-xl bg-[${color}]  w-1/4 max-lg:w-full h-40 text-3xl relative`}
      dir="rtl"
    >
      {image && (
        <Image
          src={URL.createObjectURL(image)}
          alt="صورة"
          className="absolute left-2 top-2 w-10 h-10 object-fill"
          width={40}
          height={40}
        />
      )}
      <p className="font-medium">{count ?? 0}</p>
      <p className="whitespace-normal break-words w-full text-base text-[22px]">{title}</p>
    </div>
  );
};

export default SubjectsCard;
