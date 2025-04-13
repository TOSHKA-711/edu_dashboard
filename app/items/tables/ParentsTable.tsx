"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { FaRegEye, FaTrash } from "react-icons/fa";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { ParentType } from "@/app/Redux/types";
import { useGetAllParentsQuery } from "@/app/Redux/Slices/Parents/parentsApi";
import { setSelectedParent } from "@/app/Redux/Slices/Parents/ParentsSlice";
import Image from "next/image";

export default function ParentsTable() {
  const router = useRouter();
  const dispatch = useDispatch();

  // start fetch users

  const { data, error, isLoading } = useGetAllParentsQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching students</p>;
  const parents = data?.data ;
  // end fetch users

  if (!parents || parents.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 text-lg">
        No parents found <Image src={"/404 Error-rafiki.svg"} alt="not found" width={250} height={100}/>{" "}
      </div>
    );
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "firstName",
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
          {params.row.first_name} {params.row.last_name}
        </div>
      ),
    },
    { field: "phone_number", headerName: "رقم الهاتف", width: 150 },
    { field: "email", headerName: " البريد", width: 200 },
    { field: "children_count", headerName: " عدد الابناء", width: 100 },
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
      width: 80,
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
          {/* <Tooltip title="تعديل">
            <IconButton
              onClick={() => handleEdit(params.row)}
              color="secondary"
              size="small"
              sx={{ cursor: "pointer" }}
            >
              <FaEdit />
            </IconButton>
          </Tooltip> */}

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

  const handleView = (user: ParentType) => {
    router.push(`/dashboard/parents/viewParent/${user.id}`);
    dispatch(setSelectedParent(user));
  };

  const handleDelete = (id: number) => {
    if (window.confirm(`هل أنت متأكد من حذف المستخدم ID: ${id}؟`)) {
      alert(`تم حذف المستخدم ID: ${id}`);
    }
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
        rows={parents}
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
