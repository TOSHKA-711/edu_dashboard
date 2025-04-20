"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box} from "@mui/material";
import Image from "next/image";
import MenuDots from "../MenuDots";
import { useGetAllCoursesQuery } from "@/app/Redux/Slices/Courses/courseApi";

export default function AllCoursesTable() {

  const { data, error, isLoading } = useGetAllCoursesQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching students</p>;
  const courses = data?.data;
  // end fetch users

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

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "الدورة",
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

    { field: "max_people", headerName: "الطلاب", width: 90 },
    { field: "type", headerName: "النوع", width: 110 },
    { field: "session_count", headerName: " عدد الحصص", width: 100 },
    { field: "start_date", headerName: " بدايه الدورة", width: 120 },
    { field: "end_date", headerName: "  نهايه الدورة", width: 120 },
    {
      field: "status",
      headerName: "الحالة",
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
            backgroundColor: `${params.row.active ? "#ECF8EF" : "#FDECEC"}`,
            color: `${params.row.active ? "#43B75D" : "#DB340B"}`,
          }}
        >
          {params.row.active ? "مفعل" : "غير مفعل"}
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "الإجراء",
      width: 100,
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
          <MenuDots course={params.row} />
        </div>
      ),
    },
  ];


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
              "& .MuiDataGrid-columnHeaderTitle": { fontWeight: "bold" },
            }}
          />
        </div>
      </Box>
    </Paper>
  );
}
