"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, IconButton, Tooltip } from "@mui/material";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import Image from "next/image";
import { AllInstructorCoursesType } from "@/app/Redux/types";
import { useChangeCourseStatusMutation } from "@/app/Redux/Slices/Courses/courseApi";
import { useAlert } from "../hooks/useAlert";
import { ToastContainer } from "react-toastify";
import { useTranslations } from "next-intl";
import {motion} from "framer-motion"

export default function InstructorsCoursesTable({
  courses,
  refetch,
}: {
  courses: AllInstructorCoursesType;
  refetch: () => Promise<{
    data?: AllInstructorCoursesType;
    error?: unknown;
  }>;
}) {
  const t = useTranslations();
  const { showSuccess, showError } = useAlert();
  const [changeCourseStatus] = useChangeCourseStatusMutation();

  const handleChangeCourseStatus = async (id: number) => {
    try {
      await changeCourseStatus(id).unwrap();
      showSuccess(`${t("alerts.course_status_changed_success")}`);
      await refetch();
    } catch {
      showError(`${t("alerts.course_status_changed_failed")}`);
    }
  };

  if (!courses || courses.data.length === 0) {
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

  // const router = useRouter();
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "title",
      headerName: `${t("tables.course")}`,
      width: 220,
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
    {
      field: "address",
      headerName: "العنوان",
      width: 260,
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
          {params.row.address}
        </div>
      ),
    },

    {
      field: "session_count",
      headerName: "الحصص",
      width: 80,
      sortable: true,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {params.row.session_count}
        </div>
      ),
    },
    {
      field: "type",
      headerName: `${t("btns.type")}`,
      width: 90,
      sortable: true,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {params.row.type}
        </div>
      ),
    },
    {
      field: "status",
      headerName: `${t("tables.status")}`,
      width: 110,
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
            backgroundColor: `${
              params.row.active == 1 ? "#ECF8EF" : "#FDECEC"
            }`,
            color: `${params.row.active == 1 ? "#43B75D" : "#DB340B"}`,
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
      width: 180,
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
          }}
        >
          <Tooltip title={t("btns.edit")}>
            <IconButton
              onClick={() => handleChangeCourseStatus(params.row.id)}
              color="success"
              size="small"
              sx={{ cursor: "pointer", gap: "3px" }}
            >
              <MdOutlinePublishedWithChanges />
            </IconButton>
          </Tooltip>
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
      <ToastContainer />
      <Paper
        sx={{
          height: 600,
          width: "100%",
          background: "",
          marginBottom: "3rem",
          "& .MuiToolbar-root": { direction: "ltr" },
          "& .MuiDataGrid-row--borderBottom": { gap: "2rem", background: "" },
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
              rows={courses?.data ?? []}
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
