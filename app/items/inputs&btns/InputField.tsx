"use client"
import React from "react";
interface PropsType {
  label: string;
  type: string;
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<PropsType> = ({ label, type, name, value, onChange}) => {
  return (
    <div className="mb-4 w-full">
      <label className="block text-gray-700 mb-2 px-2 text-lg">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="border-2 px-3 py-3 rounded-2xl  w-full focus:outline-none focus:ring-2 focus:ring-blue-500 border-[#2664B1] "
      />
    </div>
  );
};
