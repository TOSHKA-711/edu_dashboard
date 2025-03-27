"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { FaRegEye } from "react-icons/fa";
import { IconButton, Tooltip } from "@mui/material";
import Image from "next/image";
import MenuDots from "../MenuDots";
import { useRouter } from "next/navigation";

export default function AllCoursesTable() {
  const router = useRouter();
  const columns: GridColDef[] = [
    {
      field: "courseName",
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
            src="/course image.svg"
            width={40}
            height={30}
            className="h-10"
          />
          {params.row.courseName}
        </div>
      ),
    },

    { field: "students", headerName: "الطلاب", width: 120 },
    { field: "lessons", headerName: "الدروس", width: 120 },
    { field: "price", headerName: " السعر", width: 120 },
    { field: "duration", headerName: " المده", width: 120 },
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
      renderCell: () => (
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
          <Tooltip title="عرض">
            <IconButton
              onClick={() => handleView()}
              color="primary"
              size="small"
              sx={{ cursor: "pointer" }}
            >
              <FaRegEye />
            </IconButton>
          </Tooltip>


          <MenuDots />
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

  const handleView = () => {
    router.push("/dashboard/courses/viewCourse");
  };

  // const handleDelete = () => {
  //   if (window.confirm(`هل أنت متأكد من حذف المستخدم ID: ${id}؟`)) {
  //     alert(`تم حذف المستخدم ID: ${id}`);
  //   }
  // };

  // const handleEdit = () => {
  //   alert(`تعديل المستخدم ID: ${id}`);
  // };

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
