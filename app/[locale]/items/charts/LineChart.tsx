"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { RiCalendarScheduleLine } from "react-icons/ri";

export default function DashLineChart({
  areaColor,
  gradientId,
  dir,
  title,
  data
}: {
  areaColor: string;
  gradientId: string;
  title: string;
  dir: boolean;
  data:{date:string,value:string|number}[]
}) {

  const formattedData = data.map(item => ({
    date: item.date ?? item.date ?? "",
    value: Number(item.value),
  }));
  

  // قلب البيانات عند الاتجاه من اليمين لليسار
  const rtlData = dir ? [...formattedData].reverse() : formattedData;


  return (
    <div
      style={{
        width: "100%",
        height: "320px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "25px 0 35px 25px",
        direction: dir ? "rtl" : "ltr", // ضبط اتجاه النصوص
      }}
    >
      {/* عنوان الرسم البياني */}
      <div className="header w-full pb-2 px-4 flex flex-row items-center justify-between">
        <h1 className="text-black text-2xl">{title} </h1>
        <h1 className="text-zinc-500 flex flex-row items-center gap-2">
          <RiCalendarScheduleLine /> Jan-Jul 2025
        </h1>
      </div>

      <ResponsiveContainer>
        <AreaChart data={rtlData} margin={{ top: 20, right: 10, left: 10, bottom: 10 }}>
          {/* تعريف التدرج اللوني */}
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={areaColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={areaColor} stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* الشبكة الخلفية */}
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />

          {/* المحور X يبدأ من اليمين */}
          <XAxis 
            dataKey="date" 
            reversed={dir} 
            axisLine={false} 
            tickLine={false} 
            tickMargin={10} 
          />

          {/* المحور Y يكون على اليمين عند تفعيل RTL */}
          <YAxis 
            orientation={dir ? "right" : "left"} 
            axisLine={false} 
            tickLine={false} 
            tickMargin={25} 
          />

          {/* الماوس تولتيب */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#333",
              borderRadius: "10px",
              border: "1px solid #fff",
              color: "#fff",
            }}
          />

          {/* المخطط */}
          <Area
            type="monotone"
            dataKey="value"
            stroke={areaColor}
            fill={`url(#${gradientId})`}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
