"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { FaRegEye, FaEdit, FaTrash } from "react-icons/fa";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";

export default function UsersTable() {
  const router = useRouter();
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "الاسم",
      width: 130,
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
    { field: "courseName", headerName: "اسم الدورة", width: 190 },
    { field: "joinDate", headerName: "تاريخ الانضمام", width: 120 },
    { field: "attendance", headerName: "الحضور", width: 90 },
    // { field: "status", headerName: "الحالة", width: 90 },
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
      courseName: "Snow",
      firstName: "Jon",
      joinDate: "2023-01-15",
      attendance: "90%",
      status: "مفعل",
    },
    {
      id: 2,
      courseName: "Lannister",
      firstName: "Cersei",
      joinDate: "2023-02-10",
      attendance: "75%",
      status: "غير مفعل",
    },
    {
      id: 3,
      courseName: "Lannister",
      firstName: "Jaime",
      joinDate: "2023-03-22",
      attendance: "85%",
      status: "مفعل",
    },
    {
      id: 4,
      courseName: "Stark",
      firstName: "Arya",
      joinDate: "2023-04-05",
      attendance: "95%",
      status: "مفعل",
    },
    {
      id: 5,
      courseName: "Targaryen",
      firstName: "Daenerys",
      joinDate: "2023-05-18",
      attendance: "80%",
      status: "غير مفعل",
    },
    {
      id: 6,
      courseName: "Targaryen",
      firstName: "Daenerys",
      joinDate: "2023-05-18",
      attendance: "80%",
      status: "غير مفعل",
    },
    {
      id: 7,
      courseName: "Targaryen",
      firstName: "Daenerys",
      joinDate: "2023-05-18",
      attendance: "80%",
      status: "غير مفعل",
    },
    {
      id: 8,
      courseName: "Targaryen",
      firstName: "Daenerys",
      joinDate: "2023-05-18",
      attendance: "80%",
      status: "غير مفعل",
    },
    {
      id: 9,
      courseName: "Targaryen",
      firstName: "Daenerys",
      joinDate: "2023-05-18",
      attendance: "80%",
      status: "غير مفعل",
    },
    {
      id: 10,
      courseName: "Targaryen",
      firstName: "Daenerys",
      joinDate: "2023-05-18",
      attendance: "80%",
      status: "غير مفعل",
    },
    {
      id: 11,
      courseName: "Targaryen",
      firstName: "Daenerys",
      joinDate: "2023-05-18",
      attendance: "80%",
      status: "غير مفعل",
    },
    {
      id: 12,
      courseName: "Targaryen",
      firstName: "Daenerys",
      joinDate: "2023-05-18",
      attendance: "80%",
      status: "غير مفعل",
    },
    {
      id: 13,
      courseName: "Targaryen",
      firstName: "Daenerys",
      joinDate: "2023-05-18",
      attendance: "80%",
      status: "غير مفعل",
    },
  ];

  const handleView = () => {
    router.push("/dashboard/students/viewStudent");
  };

  const handleDelete = (id: number) => {
    if (window.confirm(`هل أنت متأكد من حذف المستخدم ID: ${id}؟`)) {
      alert(`تم حذف المستخدم ID: ${id}`);
    }
  };

  const handleEdit = () => {
    router.push("/dashboard/students/editStudent");
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
