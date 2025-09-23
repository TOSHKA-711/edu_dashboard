"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { FaEdit, FaRegEye, FaTrash } from "react-icons/fa";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { Avatar, Box, IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { ParentType } from "@/app/Redux/types";
import { useGetAllParentsQuery } from "@/app/Redux/Slices/Parents/parentsApi";
import { setSelectedParent } from "@/app/Redux/Slices/Parents/ParentsSlice";
import Image from "next/image";
import { useAlert } from "../hooks/useAlert";
import {
  useChangeUserStatusMutation,
  useDeleteUserMutation,
} from "@/app/Redux/Slices/Students/studentsApi";
import { ToastContainer } from "react-toastify";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ParentsTable() {
  const t = useTranslations();
  const router = useRouter();
  const dispatch = useDispatch();
  const { showSuccess, showError } = useAlert();
  const [deleteUser] = useDeleteUserMutation();
  const { data, error, isLoading, refetch } = useGetAllParentsQuery();
  const [changeUserStatus] = useChangeUserStatusMutation();

  if (isLoading) return <p>{t("alerts.loading")}</p>;
  if (error) return <p>Error fetching students</p>;
  const parents = data?.data;
  // end fetch users

  if (!parents || parents.length === 0) {
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

  const rows = parents.map((parent: ParentType) => ({
    full_name: `${parent.first_name} ${parent.last_name}`,
    ...parent,
  }));
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "full_name",
      headerName: `${t("tables.name")}`,
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
          <Avatar alt="user" src={params.row.image} />
          {params.row.full_name}
        </div>
      ),
    },
    {
      field: "phone_number",
      headerName: `${t("tables.phone_number")}`,
      width: 150,
    },
    { field: "email", headerName: `${t("tables.email")}`, width: 230 },
    {
      field: "children_count",
      headerName: `${t("tables.number_of_children")}`,
      width: 90,
    },
    {
      field: "status",
      headerName: `${t("tables.status")}`,
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
          {params.row.status == "active"
            ? `${t("tables.enabled")}`
            : `${t("tables.disabled")}`}
        </div>
      ),
    },
    {
      field: "actions",
      headerName: `${t("tables.action")}`,
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
          <Tooltip title={t("tables.status")}>
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

  const handleView = (user: ParentType) => {
    router.push(`/dashboard/parents/viewParent/${user.id}`);
    dispatch(setSelectedParent(user));
  };
  const handleDelete = async (id: number) => {
    if (window.confirm(`هل أنت متأكد من حذف المستخدم ID: ${id}؟`)) {
      try {
        await deleteUser(id).unwrap();
        showSuccess("user deleted successfully!");
        await refetch();
      } catch {
        showError("user deleted failed!");
      }
    }
  };
  const handleEdit = (user: ParentType) => {
    router.push("/dashboard/parents/editParent");
    dispatch(setSelectedParent(user));
  };

  const handleChangeCourseStatus = async (id: number) => {
    try {
      await changeUserStatus(id).unwrap();
      showSuccess(`${t("alerts.user_updated_success")}`);
      await refetch();
    } catch {
      showError(`${t("alerts.user_updated_failed")}`);
    }
  };

  // save file

  const handleExportToExcel = () => {
    if (parents.length === 0) {
      alert("No data to export!");
      return;
    }

    // Convert JSON to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(parents);

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
    saveAs(data, "All parents.xlsx");
  };

  return (
    <motion.div
      className="py-3"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
    >
      <Paper
        sx={{
          height: 600,
          width: "100%",
          background: "",
          marginBottom: "3rem",
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
      <ToastContainer />
      <button
        onClick={handleExportToExcel}
        className="px-4 py-2 -mt-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
      >
        {t("exports.export_excel")}
      </button>
    </motion.div>
  );
}
