"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

import { Box } from "@mui/material";

import Image from "next/image";
import {
  AllCoursesPaymentsResponseType,
  CoursesPaymentType,
} from "@/app/Redux/types";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function PaymentsTable({
  payments,
}: {
  payments: AllCoursesPaymentsResponseType;
}) {
  const t = useTranslations();

  if (!payments || payments.data.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 text-lg">
        {t("btns.no_payments_found")}{" "}
        <Image
          src={"/404 Error-rafiki.svg"}
          alt="not found"
          width={250}
          height={100}
        />{" "}
      </div>
    );
  }

  const rows = payments.data.map((user: CoursesPaymentType) => ({
    full_name: `${user.first_name} ${user.last_name}`,
    ...user,
  }));

  // const router = useRouter();
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "user",
      headerName: `${t("tables.user")}`,
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
          {params.row.full_name}
        </div>
      ),
    },
    {
      field: "course_title",
      headerName: `${t("tables.course_title")}`,
      width: 250,
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
          {params.row.course_title}
        </div>
      ),
    },

    {
      field: "payment_status",
      headerName: `${t("tables.payment_status")}`,
      width: 120,
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
          {params.row.payment_status}
        </div>
      ),
    },
    {
      field: "payment_message",
      headerName: `${t("tables.payment_message")}`,
      width: 280,
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
          {params.row.payment_message}
        </div>
      ),
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
              params.row.status === "approved"
                ? "#ECF8EF"
                : params.row.status === "pending"
                ? "#E9DF93"
                : "#FDECEC"
            }`,
            color: `${
              params.row.status === "approved"
                ? "#43B75D"
                : params.row.status === "pending"
                ? "#C7B10D"
                : "#DB340B"
            }`,
          }}
        >
          {params.row.status == "approved"
            ? `${t("tables.enabled")}`
            : `${t("tables.disabled")}`}
        </div>
      ),
    },
  ];

  return (
    <motion.div
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
    </motion.div>
  );
}
