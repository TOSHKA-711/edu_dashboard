import HomeCourseCard from "@/app/items/homeCourseCard";
import DashLineChart from "@/app/items/LineChart";
import OverViewCard from "@/app/items/OverViewCard";
import React from "react";

const OverView = () => {
  return (
    <div className="overview w-full flex flex-col gap-5 pb-3">
      <div className="cards w-full flex flex-row items-center justify-start gap-2">
        <OverViewCard />
      </div>
      <div className="charts w-full flex flex-row items-center justify-start gap-5">
        <DashLineChart areaColor="#25CD25" gradientId="greenGradient" dir={true} title="عدد المستخدمين " />
        <DashLineChart areaColor="#FFAA00" gradientId="orangeGradient" dir={true} title="الربح" />
      </div>
      <div className="courses flex flex-col gap-4 mt-2">
        <h1 className="text-2xl font-bold">دورات المستخدمين المسجلين</h1>
       <div className="flex flex-col gap-3 items-stretch " >
       <HomeCourseCard/>
       <HomeCourseCard/>
       <HomeCourseCard/>
       </div>
      </div>
    </div>
  );
};

export default OverView;
