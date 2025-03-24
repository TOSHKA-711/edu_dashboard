"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { FaRegEye, FaEdit, FaTrash } from "react-icons/fa";
import { IconButton, Tooltip } from "@mui/material";
// import { useRouter } from "next/navigation";
import LinearProgressBar from "./LinearProgress";
import Image from "next/image";

export default function AllCoursesTable() {
  // const router = useRouter();
  const columns: GridColDef[] = [
    {
      field: "courseName",
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
            src="/course image.svg"
            width={40}
            height={30}
            className="h-10"
          />
          {params.row.courseName}
        </div>
      ),
    },

    { field: "students", headerName: "الطلاب", width: 90 },
    { field: "lessons", headerName: "الدروس", width: 90 },
    { field: "price", headerName: " السعر", width: 120 },
    { field: "duration", headerName: " المده", width: 120 },
    {
      field: "status",
      headerName: "الحالة",
      width: 90,
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
              params.row.status == "مفعل" ? "#ECF8EF" : "#FDECEC"
            }`,
            color: `${params.row.status == "مفعل" ? "#43B75D" : "#DB340B"}`,
          }}
        >
          {params.row.status}
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "الإجراء",
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
          {/* عرض */}
          <Tooltip title="عرض">
            <IconButton
              onClick={() => handleView(params.row.id)}
              color="primary"
              size="small"
              sx={{ cursor: "pointer" }}
            >
              <FaRegEye />
            </IconButton>
          </Tooltip>

          {/* تعديل */}
          <Tooltip title="تعديل">
            <IconButton
              onClick={() => handleEdit(params.row.id)}
              color="secondary"
              size="small"
              sx={{ cursor: "pointer" }}
            >
              <FaEdit />
            </IconButton>
          </Tooltip>

          {/* حذف */}
          <Tooltip title="حذف">
            <IconButton
              onClick={() => handleDelete(params.row.id)}
              color="error"
              size="small"
              sx={{ cursor: "pointer" }}
            >
              <FaTrash />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      courseName: "مقدمة في علوم الحاسب",
      price: "200$",
      duration: "3 شهور",
      lessons: "16",
      students: "28",
      status: "مفعل",
    },
    {
      id: 2,
      courseName: "مقدمة في علوم الحاسب",
      price: "200$",
      duration: "3 شهور",
      lessons: "16",
      students: "28",
      status: "غير مفعل",
    },
    {
      id: 3,
      courseName: "مقدمة في علوم الحاسب",
      price: "200$",
      duration: "3 شهور",
      lessons: "16",
      students: "28",
      status: "مفعل",
    },
    {
      id: 4,
      courseName: "مقدمة في علوم الحاسب",
      price: "200$",
      duration: "3 شهور",
      lessons: "16",
      students: "28",
      status: "مفعل",
    },
    {
      id: 5,
     courseName: "مقدمة في علوم الحاسب",
      price: "200$",
      duration: "3 شهور",
      lessons: "16",
      students: "28",
      status: "غير مفعل",
    },
    {
      id: 6,
     courseName: "مقدمة في علوم الحاسب",
      price: "200$",
      duration: "3 شهور",
      lessons: "16",
      students: "28",
      status: "غير مفعل",
    },
    {
      id: 7,
     courseName: "مقدمة في علوم الحاسب",
      price: "200$",
      duration: "3 شهور",
      lessons: "16",
      students: "28",
      status: "غير مفعل",
    },
    {
      id: 8,
     courseName: "مقدمة في علوم الحاسب",
      price: "200$",
      duration: "3 شهور",
      lessons: "16",
      students: "28",
      status: "غير مفعل",
    },
    {
      id: 9,
     courseName: "مقدمة في علوم الحاسب",
      price: "200$",
      duration: "3 شهور",
      lessons: "16",
      students: "28",
      status: "غير مفعل",
    },
    {
      id: 10,
     courseName: "مقدمة في علوم الحاسب",
      price: "200$",
      duration: "3 شهور",
      lessons: "16",
      students: "28",
      status: "غير مفعل",
    },
    {
      id: 11,
     courseName: "مقدمة في علوم الحاسب",
      price: "200$",
      duration: "3 شهور",
      lessons: "16",
      students: "28",
      status: "غير مفعل",
    },
    {
      id: 12,
     courseName: "مقدمة في علوم الحاسب",
      price: "200$",
      duration: "3 شهور",
      lessons: "16",
      students: "28",
      status: "غير مفعل",
    },
    {
      id: 13,
     courseName: "مقدمة في علوم الحاسب",
      price: "200$",
      duration: "3 شهور",
      lessons: "16",
      students: "28",
      status: "غير مفعل",
    },
  ];

  const handleView = (id: number) => {
    // alert(`عرض المستخدم ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    // if (window.confirm(`هل أنت متأكد من حذف المستخدم ID: ${id}؟`)) {
    //   alert(`تم حذف المستخدم ID: ${id}`);
    // }
  };

  const handleEdit = (id: number) => {
    // alert(`تعديل المستخدم ID: ${id}`);
  };

  return (
    <Paper
      sx={{
        height: 590,
        width: "100%",
        background: "",
        "& .MuiToolbar-root": { direction: "ltr" },
        "& .MuiDataGrid-row--borderBottom": { gap: "2rem", background: "" },
        "& .MuiDataGrid-row": { gap: "2rem" },
        "& .MuiDataGrid-columnHeaders": {
          background: "white",
          padding: "12px 0",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        pageSizeOptions={[5, 10, 20, 50]}
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
    </Paper>
  );
}
