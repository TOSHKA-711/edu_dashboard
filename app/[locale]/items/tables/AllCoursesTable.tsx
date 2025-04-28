"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import MenuDots from "../MenuDots";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import {
  useChangeCourseStatusMutation,
  useGetAllCoursesQuery,
} from "@/app/Redux/Slices/Courses/courseApi";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useAlert } from "../hooks/useAlert";
import { ToastContainer } from "react-toastify";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function AllCoursesTable() {
  const t = useTranslations();
  const { showSuccess, showError } = useAlert();
  const { data, error, isLoading, refetch } = useGetAllCoursesQuery();
  const [changeCourseStatus] = useChangeCourseStatusMutation();
  if (isLoading) return <p>{t("alerts.loading")}</p>;
  if (error) return <p>Error fetching students</p>;
  const courses = data?.data;
  // end fetch users

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

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "title",
      headerName: `${t("tables.course")}`,
      width: 230,
      sortable: true,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            alt="user"
            src={params.row.image}
            width={40}
            height={30}
            className="h-10"
          />
          {params.row.title}
        </div>
      ),
    },

    { field: "max_people", headerName: `${t("tables.students")}`, width: 80 },
    { field: "type", headerName: `${t("tables.type")}`, width: 70 },
    {
      field: "session_count",
      headerName: `${t("tables.number_of_sessions")}`,
      width: 90,
    },
    {
      field: "start_date",
      headerName: `${t("tables.start_date")}`,
      width: 120,
    },
    { field: "end_date", headerName: `${t("tables.end_date")}`, width: 120 },
    {
      field: "status",
      headerName: `${t("tables.status")}`,
      width: 120,
      sortable: true,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
            height: "60%",
            alignSelf: "center",
            borderRadius: "6px",
            backgroundColor: `${params.row.active ? "#ECF8EF" : "#FDECEC"}`,
            color: `${params.row.active ? "#43B75D" : "#DB340B"}`,
          }}
        >
          {params.row.active
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
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            gap: "4px",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Tooltip title={t("tables.status")}>
            <IconButton
              onClick={() => handleChangeCourseStatus(params.row.id)}
              color="success"
              size="small"
              sx={{ cursor: "pointer", gap: "3px" }}
            >
              <MdOutlinePublishedWithChanges />
              {/* {params.row.active == 0 ? "تفعيل" : "تعطيل"} */}
            </IconButton>
          </Tooltip>
          <MenuDots course={params.row} />
        </div>
      ),
    },
  ];

  const handleChangeCourseStatus = async (id: number) => {
    try {
      await changeCourseStatus(id).unwrap();
      showSuccess("Course status changed successfully!");
      await refetch();
    } catch {
      showError("Course status changed failed!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
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
              rows={courses}
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
      <ToastContainer />
    </motion.div>
  );
}
