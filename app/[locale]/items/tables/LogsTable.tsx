"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import { LogType } from "@/app/Redux/types";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function LogsTable({ logs }: { logs: LogType[] }) {
  const t = useTranslations();
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "brand", headerName: `${t("tables.type")}`, width: 120 },
    { field: "model", headerName: `${t("tables.version")}`, width: 180 },
    { field: "system_name", headerName: `${t("tables.system")}`, width: 100 },
    { field: "device_name", headerName: `${t("tables.name")}`, width: 140 },
    {
      field: "os_version",
      headerName: `${t("tables.system_version")}`,
      width: 100,
    },
    { field: "ip_address", headerName: "ip", width: 140 },
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
              params.row.status == "success" ? "#ECF8EF" : "#FDECEC"
            }`,
            color: `${params.row.status == "success" ? "#43B75D" : "#DB340B"}`,
          }}
        >
          {params.row.status == "success"
            ? `${t("btns.success")}`
            : `${t("btns.failed")}`}
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
          "& .MuiDataGrid-row--borderBottom": { gap: "2rem", background: "" },
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
              rows={logs}
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
