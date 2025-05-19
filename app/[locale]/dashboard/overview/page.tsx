"use client";

import React from "react";
import { useGetAllOverViewDataQuery } from "@/app/Redux/Slices/OverView/overViewApi";
import OverViewCard from "../../items/cards/OverViewCard";
import DashLineChart from "../../items/charts/LineChart";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const OverView = () => {
  const t = useTranslations();
  const { data, isLoading } = useGetAllOverViewDataQuery();

  if (isLoading) {
    return <div className="text-2xl">... Loading</div>;
  }

  return (
    <div className="overview w-full flex flex-col gap-10 pb-3">
      <motion.div
        className="cards w-full flex flex-row items-center justify-start gap-2"
        animate={{ opacity: 1, y: 10 }}
        initial={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <OverViewCard
          data={
            data?.totals ?? {
              child_users: 0,
              parent_users: 0,
              individual_users: 0,
              enrollments: 0,
              course: 0,
              category: 0,
              instructor: 0,
            }
          }
        />
      </motion.div>
      <motion.div
        className="charts w-full flex flex-row items-center justify-start gap-5 max-md:flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <DashLineChart
          areaColor="#25CD25"
          gradientId="greenGradient"
          dir={true}
          title={t("home.users")}
          data={data?.user_chart ?? [{ date: "", value: 0 }]}
        />
        <DashLineChart
          areaColor="#FFAA00"
          gradientId="orangeGradient"
          dir={true}
          title={t("home.profit")}
          data={data?.profit_chart ?? []}
        />
      </motion.div>
      <motion.div
        className="charts w-full flex flex-row items-center justify-start gap-5 max-md:flex-col -mt-5 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <DashLineChart
          areaColor="#25CD25"
          gradientId="greenGradient"
          dir={true}
          title={t("home.users")}
          data={data?.user_chart ?? [{ date: "", value: 0 }]}
        />
    
      </motion.div>
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
