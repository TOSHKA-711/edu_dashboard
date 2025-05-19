"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Avatar, Box } from "@mui/material";
import SwitchBtn from "../inputs&btns/SwitchBtn";
import {
  AllStudentCoursesAttendanceResponseType,
  CourseStudentAttendanceType,
} from "@/app/Redux/types";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function LessonsTable({
  students,
  sessionId,
  refetch,
}: {
  students: AllStudentCoursesAttendanceResponseType;
  sessionId: number | string;
  refetch: () => Promise<{
    data?: AllStudentCoursesAttendanceResponseType;
    error?: unknown;
  }>;
}) {
  const t = useTranslations();
  const rows = students.data.map((student: CourseStudentAttendanceType) => ({
    full_name: `${student.first_name} ${student.last_name}`,
    ...student,
  }));

  const columns: GridColDef[] = [
    { field: "user_id", headerName: "ID", width: 50 },
    {
      field: "full_name",
      headerName: `${t("tables.name")}`,
      width: 400,
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
            fontFamily: "Tajawal",
            fontSize: "20px",
          }}
        >
          <Avatar alt="user" src={params.row.image} />
          {params.row.full_name}
        </div>
      ),
    },
    {
      field: "attendance",
      headerName: `${t("tables.attendance")}`,
      width: 350,
      sortable: false,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            fontFamily: "Tajawal",
            fontSize: "18px",
          }}
        >
          <SwitchBtn
            active={params.row.attended_session ? true : false}
            userId={params.row.user_id}
            sessionId={sessionId}
            refetch={refetch}
          />
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
              rows={rows}
              columns={columns}
              getRowId={(row) => row.user_id}
              initialState={{
                pagination: { paginationModel: { pageSize: 10, page: 0 } },
              }}
              pageSizeOptions={[10]}
              // checkboxSelection
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
