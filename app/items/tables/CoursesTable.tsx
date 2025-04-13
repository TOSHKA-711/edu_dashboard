"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { FaRegEye, FaEdit, FaTrash } from "react-icons/fa";
import { IconButton, Tooltip } from "@mui/material";
// import { useRouter } from "next/navigation";
import LinearProgressBar from "../charts/LinearProgress";
import Image from "next/image";
import { AllStudentCoursesType } from "@/app/Redux/types";

export default function CoursesTable({
  courses,
}: {
  courses: AllStudentCoursesType;
}) {
  console.log(courses);

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
            src={params.row.course.image}
            width={40}
            height={30}
            className="h-10"
          />
          {params.row.course.title}
        </div>
      ),
    },
    {
      field: "instructor",
      headerName: "المعلم",
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
          {params.row.course.instructor.first_name}{" "}
          {params.row.course.instructor.last_name}
        </div>
      ),
    },
    {
      field: "progress",
      headerName: "التقدم",
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
          <LinearProgressBar value={params.row.course.earnings_point} />
          {/* {params.row.progress} */}
        </div>
      ),
    },

    {
      field: "attendance",
      headerName: "الحضور",
      width: 100,
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
          {params.row.course.session_count} دروس
        </div>
      ),
    },
    // {
    //   field: "start_date",
    //   headerName: " تاريخ البدأ",
    //   width: 120,
    //   sortable: true,
    //   renderCell: (params) => (
    //     <div
    //       style={{
    //         display: "flex",
    //         gap: "8px",
    //         justifyContent: "start",
    //         alignItems: "center",
    //         width: "100%",
    //         height: "100%",
    //       }}
    //     >

    //       {params.row.course.start_date}
    //     </div>
    //   ),
    // },
    // { field: "price", headerName: " السعر", width: 120 },
    {
      field: "price",
      headerName: "  السعر",
      width: 110,
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
          {params.row.course.price} $
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

  // const rows = [
  //   {
  //     id: 1,
  //     courseName: "مقدمة في علوم الحاسب",
  //     price: "200$",
  //     date: "2023-01-15",
  //     attendance: "90%",
  //     status: "مفعل",
  //   },
  //   {
  //     id: 2,
  //     courseName: "Lannister",
  //     price: "200$",
  //     date: "2023-02-10",
  //     attendance: "75%",
  //     status: "غير مفعل",
  //   },
  //   {
  //     id: 3,
  //     courseName: "Lannister",
  //     price: "200$",
  //     date: "2023-03-22",
  //     attendance: "85%",
  //     status: "مفعل",
  //   },
  //   {
  //     id: 4,
  //     courseName: "Stark",
  //     price: "200$",
  //     date: "2023-04-05",
  //     attendance: "95%",
  //     status: "مفعل",
  //   },
  //   {
  //     id: 5,
  //     courseName: "Targaryen",
  //     price: "200$",
  //     date: "2023-05-18",
  //     attendance: "80%",
  //     status: "غير مفعل",
  //   },
  //   {
  //     id: 6,
  //     courseName: "Targaryen",
  //     price: "200$",
  //     date: "2023-05-18",
  //     attendance: "80%",
  //     status: "غير مفعل",
  //   },
  //   {
  //     id: 7,
  //     courseName: "Targaryen",
  //     price: "200$",
  //     date: "2023-05-18",
  //     attendance: "80%",
  //     status: "غير مفعل",
  //   },
  //   {
  //     id: 8,
  //     courseName: "Targaryen",
  //     price: "200$",
  //     date: "2023-05-18",
  //     attendance: "80%",
  //     status: "غير مفعل",
  //   },
  //   {
  //     id: 9,
  //     courseName: "Targaryen",
  //     price: "200$",
  //     date: "2023-05-18",
  //     attendance: "80%",
  //     status: "غير مفعل",
  //   },
  //   {
  //     id: 10,
  //     courseName: "Targaryen",
  //     price: "200$",
  //     date: "2023-05-18",
  //     attendance: "80%",
  //     status: "غير مفعل",
  //   },
  //   {
  //     id: 11,
  //     courseName: "Targaryen",
  //     price: "200$",
  //     date: "2023-05-18",
  //     attendance: "80%",
  //     status: "غير مفعل",
  //   },
  //   {
  //     id: 12,
  //     courseName: "Targaryen",
  //     price: "200$",
  //     date: "2023-05-18",
  //     attendance: "80%",
  //     status: "غير مفعل",
  //   },
  //   {
  //     id: 13,
  //     courseName: "Targaryen",
  //     price: "200$",
  //     date: "2023-05-18",
  //     attendance: "80%",
  //     status: "غير مفعل",
  //   },
  // ];

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
