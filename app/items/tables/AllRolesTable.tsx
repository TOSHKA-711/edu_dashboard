"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { FaTrash } from "react-icons/fa";
import { Avatar, Box, IconButton, Tooltip } from "@mui/material";
import { UserType } from "@/app/Redux/types";
import Image from "next/image";
import { useAlert } from "../hooks/useAlert";
import { ToastContainer } from "react-toastify";
import {
  useDeleteRoleMutation,
  useGetAllRolesQuery,
} from "@/app/Redux/Slices/Settings/settingsApi";

export default function AllRolesTable() {
  const { showSuccess, showError } = useAlert();

  // start fetch users

  const { data: roles, error, isLoading } = useGetAllRolesQuery();
  const [deleteRole] = useDeleteRoleMutation();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching students</p>;
  const allRoles = roles?.user;
  // end fetch users

  if (!allRoles || allRoles.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 text-lg">
        No parents found{" "}
        <Image
          src={"/404 Error-rafiki.svg"}
          alt="not found"
          width={250}
          height={100}
        />{" "}
      </div>
    );
  }

  const rows = allRoles.map((role: UserType) => ({
    full_name: `${role.first_name} ${role.last_name}`,
    ...role,
  }));

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "full_name",
      headerName: "الاسم",
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
          <Avatar alt="user" src={params.row.image} />
          {params.row.full_name}
        </div>
      ),
    },
    {
      field: "email",
      headerName: "البريد الالكتروني",
      width: 180,
      renderCell: (params) => (
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "phone_number",
      headerName: "رقم الهاتف",
      width: 160,
      renderCell: (params) => (
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "identity_id",
      headerName: " الهويه",
      width: 90,
      renderCell: (params) => (
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "role",
      headerName: " الدور",
      width: 130,
      renderCell: (params) => (
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {params.value}
        </div>
      ),
    },
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
              params.row.status == 1 ? "#ECF8EF" : "#FDECEC"
            }`,
            color: `${params.row.status == 1 ? "#43B75D" : "#DB340B"}`,
          }}
        >
          {params.row.status == 1 ? "مفعل" : "غير مفعل"}
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "الإجراء",
      width: 60,
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

  const handleDelete = async (instructorId: number) => {
    const confirmDelete = window.confirm(
      "هل أنت متأكد أنك تريد حذف هذا المستخدم ؟"
    );
    if (!confirmDelete) return;

    try {
      await deleteRole(instructorId).unwrap();
      showSuccess("تم حذف المستخدم بنجاح!");
    } catch {
      showError("فشل في حذف المستخدم!");
    }
  };

  return (
    <>
      <ToastContainer />
      <Paper
        sx={{
          height: 600,
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
        <Box sx={{ overflowX: "auto" }}>
          <div style={{ minWidth: 800 }}>
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
    </>
  );
}
