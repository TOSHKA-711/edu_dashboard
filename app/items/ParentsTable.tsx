"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { FaRegEye, FaEdit, FaTrash } from "react-icons/fa";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ParentsTable() {
  const router = useRouter();
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "الاسم",
      width: 160,
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
          <Avatar alt="user" src="/user.jpg" />
          {params.row.firstName}
        </div>
      ),
    },
    { field: "coursesNumber", headerName: " عدد الدورات", width: 90 },
    { field: "payments", headerName: " المدفوعات", width: 100 },
    { field: "childNumber", headerName: "عدد الأبناء", width: 90 },
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
              onClick={() => handleView()}
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
              onClick={() => handleEdit()}
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
      coursesNumber: "6",
      firstName: "Jon",
      payments: "200$",
      childNumber: "5",
      status: "مفعل",
    },
    {
      id: 2,
      coursesNumber: "6",
      firstName: "Cersei",
      payments: "200$",
      childNumber: "5",
      status: "غير مفعل",
    },
    {
      id: 3,
      coursesNumber: "6",
      firstName: "Jaime",
      payments: "200$",
      childNumber: "5",
      status: "مفعل",
    },
    {
      id: 4,
      coursesNumber: "6",
      firstName: "Arya",
      payments: "200$",
      childNumber: "5",
      status: "مفعل",
    },
    {
      id: 5,
      coursesNumber: "6",
      firstName: "Daenerys",
      payments: "200$",
      childNumber: "5",
      status: "غير مفعل",
    },
    {
      id: 6,
      coursesNumber: "6",
      firstName: "Daenerys",
      payments: "200$",
      childNumber: "5",
      status: "غير مفعل",
    },
    {
      id: 7,
      coursesNumber: "6",
      firstName: "Daenerys",
      payments: "200$",
      childNumber: "5",
      status: "غير مفعل",
    },
    {
      id: 8,
      coursesNumber: "6",
      firstName: "Daenerys",
      payments: "200$",
      childNumber: "5",
      status: "غير مفعل",
    },
    {
      id: 9,
      coursesNumber: "6",
      firstName: "Daenerys",
      payments: "200$",
      childNumber: "5",
      status: "غير مفعل",
    },
    {
      id: 10,
      coursesNumber: "6",
      firstName: "Daenerys",
      payments: "200$",
      childNumber: "5",
      status: "غير مفعل",
    },
    {
      id: 11,
      coursesNumber: "6",
      firstName: "Daenerys",
      payments: "200$",
      childNumber: "5",
      status: "غير مفعل",
    },
    {
      id: 12,
      coursesNumber: "6",
      firstName: "Daenerys",
      payments: "200$",
      childNumber: "5",
      status: "غير مفعل",
    },
    {
      id: 13,
      coursesNumber: "6",
      firstName: "Daenerys",
      payments: "200$",
      childNumber: "5",
      status: "غير مفعل",
    },
  ];

  const handleView = () => {
    router.push("/dashboard/parents/viewParent");
  };

  const handleDelete = (id: number) => {
    if (window.confirm(`هل أنت متأكد من حذف المستخدم ID: ${id}؟`)) {
      alert(`تم حذف المستخدم ID: ${id}`);
    }
  };

  const handleEdit = () => {
    // router.push("/dashboard/students/editStudent");
  };

  return (
    <Paper
      sx={{
        height: 590,
        width:"100%",
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
        // checkboxSelection
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
