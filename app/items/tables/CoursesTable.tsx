"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { Box, IconButton, Tooltip } from "@mui/material";
import LinearProgressBar from "../charts/LinearProgress";
import Image from "next/image";
import MenuDots from "../MenuDots";
import { useChangeCourseStatusMutation } from "@/app/Redux/Slices/Courses/courseApi";
import { useAlert } from "../hooks/useAlert";
import { useGetStudentCoursesQuery } from "@/app/Redux/Slices/Students/studentsApi";

export default function CoursesTable({ userId }: { userId: number }) {
  const { showSuccess, showError } = useAlert();
  const [changeCourseStatus] = useChangeCourseStatusMutation();
  const { data, refetch } = useGetStudentCoursesQuery(userId, {
    skip: !userId,
  });

  const courses = data?.data;
  
  if (!courses || courses.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 text-lg">
        No courses found{" "}
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
      headerName: "الدورة",
      width: 250,
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
            src={params.row.course.image}
            width={40}
            height={30}
            className="h-10"
          />
          {params.row.course.title}
        </div>
      ),
    },
    {
      field: "instructor",
      headerName: "المعلم",
      width: 150,
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
          {params.row.course.instructor.first_name}{" "}
          {params.row.course.instructor.last_name}
        </div>
      ),
    },
    {
      field: "progress",
      headerName: "التقدم",
      width: 180,
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
          <LinearProgressBar value={params.row.attendance_percentage} />
        </div>
      ),
    },

    {
      field: "attendance",
      headerName: "الحضور",
      width: 100,
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
          {params.row.course.session_count} درس
        </div>
      ),
    },

    {
      field: "status",
      headerName: "الحالة",
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
            backgroundColor: `${
              params.row.course.active == 1 ? "#ECF8EF" : "#FDECEC"
            }`,
            color: `${params.row.course.active == 1 ? "#43B75D" : "#DB340B"}`,
          }}
        >
          {params.row.course.active == 1 ? "مفعل" : "غير مفعل"}
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "الإجراء",
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
          <Tooltip title="الحالة">
            <IconButton
              onClick={() => handleChangeCourseStatus(params.row.id)}
              color="success"
              size="small"
              sx={{ cursor: "pointer", gap: "3px" }}
            >
              <MdOutlinePublishedWithChanges />
            </IconButton>
          </Tooltip>
          <MenuDots course={params.row.course} />
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
        <div style={{ minWidth: 800 }}>
          <DataGrid
            rows={courses ?? []}
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
  );
}
