"use client"
import DashLineChart from "@/app/items/charts/LineChart";
import OverViewCard from "@/app/items/cards/OverViewCard";
import React from "react";
import { useGetAllOverViewDataQuery } from "@/app/Redux/Slices/OverView/overViewApi";

const OverView = () => {
  const {data , isLoading} = useGetAllOverViewDataQuery();

  if (isLoading) {
    return(
      <div className="text-2xl">... Loading</div>
    )
  }

  return (
    <div className="overview w-full flex flex-col gap-5 pb-3">
      <div className="cards w-full flex flex-row items-center justify-start gap-2">
        <OverViewCard data={data?.totals??{child_users:0,parent_users:0,individual_users:0,enrollments:0,course:0,category:0,instructor:0}}/>
      </div>
      <div className="charts w-full flex flex-row items-center justify-start gap-5 max-md:flex-col">
        <DashLineChart areaColor="#25CD25" gradientId="greenGradient" dir={true} title=" المستخدمين "  data={data?.user_chart??[{date:"",value:0}]}/>
        <DashLineChart areaColor="#FFAA00" gradientId="orangeGradient" dir={true} title="الربح" data={data?.profit_chart??[]}/>
      </div>
      {/* <div className="courses flex flex-col gap-4 mt-2">
        <h1 className="text-2xl font-bold">دورات المستخدمين المسجلين</h1>
       <div className="flex flex-col gap-3 items-stretch " >
       <HomeCourseCard/>
       <HomeCourseCard/>
       <HomeCourseCard/>
       </div>
      </div> */}
    </div>
  );
};

export default OverView;
