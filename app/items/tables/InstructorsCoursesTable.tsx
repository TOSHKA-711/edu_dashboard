"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { FaRegEye, FaEdit, FaTrash } from "react-icons/fa";
import { Box, IconButton, Tooltip } from "@mui/material";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import Image from "next/image";
import { AllInstructorCoursesType } from "@/app/Redux/types";
import { useChangeCourseStatusMutation } from "@/app/Redux/Slices/Courses/courseApi";
import { useAlert } from "../hooks/useAlert";
import { ToastContainer } from "react-toastify";

export default function InstructorsCoursesTable({
  courses,
}: {
  courses: AllInstructorCoursesType;
}) {
  const { showSuccess, showError } = useAlert();
  const [changeCourseStatus] = useChangeCourseStatusMutation();

  const handleChangeCourseStatus = async (id: number) => {
    try {
      await changeCourseStatus(id).unwrap();
      showSuccess("Course status changed successfully!");
    } catch {
      showError("Course status changed failed!");
    }
  };

  if (!courses || courses.data.length === 0) {
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
              params.row.active == 1 ? "#ECF8EF" : "#FDECEC"
            }`,
            color: `${params.row.active == 1 ? "#43B75D" : "#DB340B"}`,
          }}
        >
          {params.row.active == 1 ? "مفعل" : "غير مفعل"}
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
          <Tooltip title="تعديل">
            <IconButton
              onClick={() => handleChangeCourseStatus(params.row.id)}
              color="success"
              size="small"
              sx={{ cursor: "pointer", gap: "3px" }}
            >
              <MdOutlinePublishedWithChanges />
              {/* {params.row.active == 0 ? "تفعيل" : "تعطيل"} */}
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
    <>
      <ToastContainer />
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
              rows={courses?.data ?? []}
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
                  fontFamily: 'Tajawal',
                  fontWeight:"bold"
                },
                "& .MuiDataGrid-cell.MuiDataGrid-cell": {
                  fontSize: "15px",
                  fontFamily: 'Tajawal',
                  fontWeight:"500"
                },
              }}
            />
          </div>
        </Box>
      </Paper>
    </>
  );
}
