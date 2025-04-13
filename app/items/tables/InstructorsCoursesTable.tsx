"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { FaRegEye, FaEdit, FaTrash } from "react-icons/fa";
import { IconButton, Tooltip } from "@mui/material";
import Image from "next/image";
import { AllInstructorCoursesType } from "@/app/Redux/types";

export default function InstructorsCoursesTable({
  courses,
}: {
  courses: AllInstructorCoursesType;
}) {

  if (!courses || courses.data.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 text-lg">
        No courses found <Image src={"/404 Error-rafiki.svg"} alt="not found" width={250} height={100}/>{" "}
      </div>
    );
  }

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
      field: "price",
      headerName: "  السعر",
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
          {params.row.price} $
        </div>
      ),
    },
    {
      field: "type",
      headerName: " النوع",
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
      width: 140,
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


 

  const handleView = (id: number) => {
    alert(`عرض المستخدم ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm(`هل أنت متأكد من حذف المستخدم ID: ${id}؟`)) {
      alert(`تم حذف المستخدم ID: ${id}`);
    }
  };

  const handleEdit = (id: number) => {
    alert(`تعديل المستخدم ID: ${id}`);
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
        rows={courses?.data ?? []}
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
