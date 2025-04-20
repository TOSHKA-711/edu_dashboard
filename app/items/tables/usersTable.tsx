"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { FaRegEye, FaEdit, FaTrash } from "react-icons/fa";
import { Avatar, Box, IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import { useGetAllStudentsQuery } from "@/app/Redux/Slices/Students/studentsApi";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "@/app/Redux/Slices/Students/studentsSlice";
import { StudentType } from "@/app/Redux/types";
import Image from "next/image";

export default function UsersTable() {
  const router = useRouter();
  const dispatch = useDispatch();

  // start fetch users

  const { data, error, isLoading } = useGetAllStudentsQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching students</p>;
  const students = data?.data;

  // end fetch users

  if (!students || students.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 text-lg">
        No students found{" "}
        <Image
          src={"/404 Error-rafiki.svg"}
          alt="not found"
          width={250}
          height={100}
        />{" "}
      </div>
    );
  }

  const rows = students.map((student: StudentType) => ({
    full_name: `${student.first_name} ${student.last_name}`,
    ...student,
  }));

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "full_name",
      headerName: "الاسم",
      width: 200,
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
          <Avatar alt="user" src={params.row.image} />
          {/* {params.row.first_name} {params.row.last_name} */}
          {params.row.full_name}
        </div>
      ),
    },
    { field: "phone_number", headerName: "رقم الهاتف", width: 150 },
    { field: "email", headerName: " البريد", width: 200 },
    { field: "educational_stage", headerName: "المرحلة التعليمية", width: 120 },
    // { field: "status", headerName: "الحالة", width: 90 },
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
              params.row.status == "active" ? "#ECF8EF" : "#FDECEC"
            }`,
            color: `${params.row.status == "active" ? "#43B75D" : "#DB340B"}`,
          }}
        >
          {params.row.status}
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "الإجراء",
      width: 120,
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
              onClick={() => handleView(params.row)}
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
              onClick={() => handleEdit(params.row)}
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

  const handleView = (user: StudentType) => {
    router.push(`/dashboard/students/viewStudent/${user.id}`);
    dispatch(setSelectedUser(user));
  };

  const handleDelete = (id: number) => {
    if (window.confirm(`هل أنت متأكد من حذف المستخدم ID: ${id}؟`)) {
      alert(`تم حذف المستخدم ID: ${id}`);
    }
  };

  const handleEdit = (user: StudentType) => {
    router.push("/dashboard/students/editStudent");
    dispatch(setSelectedUser(user));
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
        <div style={{ minWidth: 800, height: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
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
              "& .MuiDataGrid-columnHeaderTitle": { fontWeight: "bold" },
            }}
          />
        </div>
      </Box>
    </Paper>
  );
}
