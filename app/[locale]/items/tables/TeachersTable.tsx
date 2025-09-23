"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { FaRegEye, FaTrash, FaEdit } from "react-icons/fa";
import { Avatar, Box, IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { InstructorType } from "@/app/Redux/types";
import Image from "next/image";
import {
  useDeleteInstructorMutation,
  useGetAllInstructorsQuery,
} from "@/app/Redux/Slices/Instructors/InstructorsApi";
import { setSelectedInstructor } from "@/app/Redux/Slices/Instructors/InstructorsSlice";
import { useAlert } from "../hooks/useAlert";
import { ToastContainer } from "react-toastify";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function TeachersTable() {
  const t = useTranslations();
  const router = useRouter();
  const dispatch = useDispatch();
  const { showSuccess, showError } = useAlert();

  // start fetch users

  const { data, error, isLoading, refetch } = useGetAllInstructorsQuery();
  const [deleteInstructor] = useDeleteInstructorMutation();
  if (isLoading) return <p>{t("alerts.loading")}</p>;
  if (error) return <p>Error fetching students</p>;
  const instructors = data?.data;
  // end fetch users

  if (!instructors || instructors.length === 0) {
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

  const rows = instructors.map((instructor: InstructorType) => ({
    full_name: `${instructor.first_name} ${instructor.last_name}`,
    ...instructor,
  }));

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "full_name",
      headerName: `${t("tables.name")}`,
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
      field: "bio",
      headerName: `${t("tables.bio")}`,
      width: 280,
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
      field: "info",
      headerName: `${t("tables.about")}`,
      width: 300,
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
      headerName: `${t("tables.status")}`,
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
              params.row.status == "active" ? "#ECF8EF" : "#FDECEC"
            }`,
            color: `${params.row.status == "active" ? "#43B75D" : "#DB340B"}`,
          }}
        >
          {params.row.status == "active"
            ? `${t("tables.enabled")}`
            : `${t("tables.disabled")}`}
        </div>
      ),
    },
    {
      field: "actions",
      headerName: `${t("tables.action")}`,
      width: 100,
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
          <Tooltip title={t("btns.view")}>
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
          <Tooltip title={t("btns.edit")}>
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
          <Tooltip title={t("btns.delete")}>
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

  const handleView = (user: InstructorType) => {
    router.push(`/dashboard/teachers/viewTeacher/${user.id}`);
    dispatch(setSelectedInstructor(user));
  };
  const handleEdit = (user: InstructorType) => {
    router.push(`/dashboard/teachers/editTeacher`);
    dispatch(setSelectedInstructor(user));
  };

  const handleDelete = async (instructorId: number) => {
    const confirmDelete = window.confirm(`${t("alerts.delete_user_confirm")}`);
    if (!confirmDelete) return;

    try {
      await deleteInstructor({ instructorId }).unwrap();
      showSuccess(`${t("alerts.user_deleted_success")}`);
      await refetch();
    } catch {
      showError(`${t("alerts.user_delete_failed")}`);
    }
  };

  // save file

  const handleExportToExcel = () => {
    if (instructors.length === 0) {
      alert("No data to export!");
      return;
    }

    // Convert JSON to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(instructors);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "UsersData");

    // Write the file and trigger download
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Save the file
    saveAs(data, "All instructors.xlsx");
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
    >
      <ToastContainer />
      <Paper
        sx={{
          height: 600,
          width: "100%",
          background: "",
          "& .MuiToolbar-root": { direction: "ltr" },
          "& .MuiDataGrid-row--borderBottom": {
            gap: "2rem",
            width: "fit-content",
          },
          "& .MuiDataGrid-row": { gap: "2rem" },
          "& .MuiDataGrid-columnHeaders": {
            background: "white",
            padding: "12px 0",
          },
        }}
      >
        <Box sx={{ overflowX: "auto" }}>
          <div style={{ minWidth: 800, height: 600 }}>
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
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontSize: "14px",
                  fontFamily: "Tajawal",
                  fontWeight: "bold",
                },
                "& .MuiDataGrid-cell.MuiDataGrid-cell": {
                  fontSize: "15px",
                  fontFamily: "Tajawal",
                  fontWeight: "500",
                },
              }}
            />
          </div>
        </Box>
      </Paper>
      <button
        onClick={handleExportToExcel}
        className="px-4 py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
      >
        {t("exports.export_excel")}
      </button>
    </motion.div>
  );
}
