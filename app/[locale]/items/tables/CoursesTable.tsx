"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import LinearProgressBar from "../charts/LinearProgress";
import Image from "next/image";
import MenuDots from "../MenuDots";
import { useGetStudentCoursesQuery } from "@/app/Redux/Slices/Students/studentsApi";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function CoursesTable({ userId }: { userId: number }) {
  const t = useTranslations();
  const { data, refetch } = useGetStudentCoursesQuery(userId, {
    skip: !userId,
  });

  const courses = data?.data;

  React.useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId, refetch]);

  if (!courses || courses.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 text-lg">
        {t("alerts.no_courses_found")}{" "}
        <Image
          src={"/404 Error-rafiki.svg"}
          alt="not found"
          width={250}
          height={100}
        />{" "}
      </div>
    );
  }

  // 🟢 تفكيك بيانات الكورس
  const flatCourses = courses.map((item) => ({
    id: item.id,
    title: item.course.title,
    image: item.course.image,
    instructor: `${item.course.instructor.first_name} ${item.course.instructor.last_name}`,
    session_count: item.course.session_count,
    active: item.course.active,
    attendance_percentage: item.attendance_percentage,
    course: item.course, // محتاجينها عشان MenuDots
  }));

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "title",
      headerName: `${t("tables.course")}`,
      width: 250,
      sortable: true,
      filterable: true,
      renderCell: (params) => (
        <div className="flex gap-2 items-center">
          <Image
            alt="course"
            src={params.row.image}
            width={40}
            height={30}
            className="h-10"
          />
          {params.row.title}
        </div>
      ),
    },
    {
      field: "instructor",
      headerName: `${t("btns.teachers")}`,
      width: 150,
      sortable: true,
      filterable: true,
    },
    {
      field: "progress",
      headerName: `${t("alerts.progress")}`,
      width: 180,
      sortable: true,
      renderCell: (params) => (
        <div className="flex items-center w-full">
          <LinearProgressBar value={params.row.attendance_percentage} />
        </div>
      ),
    },
    {
      field: "session_count",
      headerName: `${t("tables.attendance")}`,
      width: 100,
      sortable: true,
      filterable: true,
    },
    {
      field: "active",
      headerName: `${t("tables.status")}`,
      width: 120,
      sortable: true,
      filterable: true,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
            height: "60%",
            borderRadius: "6px",
            backgroundColor: params.row.active == 1 ? "#ECF8EF" : "#FDECEC",
            color: params.row.active == 1 ? "#43B75D" : "#DB340B",
          }}
        >
          {params.row.active == 1
            ? `${t("tables.enabled")}`
            : `${t("tables.disabled")}`}
        </div>
      ),
    },
    {
      field: "actions",
      headerName: `${t("tables.action")}`,
      width: 90,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div className="flex justify-center items-center w-full">
          <MenuDots course={params.row.course} />
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
      className="w-full"
    >
      <Paper
        sx={{
          height: 600,
          width: "100%",
          background: "",
          marginBottom: "3rem",
          "& .MuiToolbar-root": { direction: "ltr" },
          "& .MuiDataGrid-row--borderBottom": {
            gap: "2rem",
            width: "fit-content",
          },
          "& .MuiDataGrid-row": { gap: "2rem" },
          "& .MuiDataGrid-columnHeaders": {
            background: "white",
            padding: "12px 0",
          },
        }}
      >
        <Box sx={{ overflowX: "auto" }}>
          <div style={{ minWidth: 800, height: 600 }}>
            <DataGrid
              rows={flatCourses ?? []}
              columns={columns}
              initialState={{
                pagination: { paginationModel: { pageSize: 10, page: 0 } },
              }}
              pageSizeOptions={[10]}
              sx={{
                border: 0,
                "& .MuiDataGrid-cell": {
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontSize: "14px",
                  fontFamily: "Tajawal",
                  fontWeight: "bold",
                },
                "& .MuiDataGrid-cell.MuiDataGrid-cell": {
                  fontSize: "15px",
                  fontFamily: "Tajawal",
                  fontWeight: "500",
                },
              }}
            />
          </div>
        </Box>
      </Paper>
    </motion.div>
  );
}
