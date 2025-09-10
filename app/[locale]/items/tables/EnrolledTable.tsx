"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Avatar, Box, IconButton, Tooltip } from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import { RiAlarmWarningFill } from "react-icons/ri";
import {
  AllEnrolledUsersResponseType,
  EnrolledUserType,
} from "@/app/Redux/types";
import {
  useSetUserPaymentMutation,
  useSetWarningMutation,
} from "@/app/Redux/Slices/Courses/courseApi";
import { useAlert } from "../hooks/useAlert";
import { ToastContainer } from "react-toastify";
import { useTranslations } from "next-intl";
import {motion} from "framer-motion"

export default function EnrolledTable({
  users,
}: {
  users: AllEnrolledUsersResponseType;
}) {
  const t = useTranslations();
  const { showSuccess, showError } = useAlert();
  const [setUserPayment] = useSetUserPaymentMutation();
  const [setWarning] = useSetWarningMutation();
  const [amounts, setAmounts] = React.useState<{ [userId: number]: number }>(
    {}
  );

  const handleInputsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    userId: number
  ) => {
    const { value } = e.target;
    setAmounts((prev) => ({ ...prev, [userId]: parseInt(value) }));
  };

  const rows = users?.data.map((user: EnrolledUserType) => ({
    full_name: `${user.first_name} ${user.last_name}`,
    ...user,
  }));

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 40 },
    {
      field: "full_name",
      headerName: `${t("tables.name")}`,
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
            fontFamily: "Tajawal",
            fontSize: "16px",
          }}
        >
          <Avatar alt="user" src="/user.jpg" />
          {params.row.full_name}
        </div>
      ),
    },
    {
      field: "payment_status",
      headerName: `${t("tables.payment_status")}`,
      width: 110,
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
            fontFamily: "Tajawal",
            fontSize: "16px",
          }}
        >
          {params.row.payment_status}
        </div>
      ),
    },
    {
      field: "payment_message",
      headerName: `${t("tables.payment_message")}`,
      width: 390,
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
            fontFamily: "Tajawal",
            fontSize: "17px",
          }}
        >
          {params.row.payment_message}
        </div>
      ),
    },
    {
      field: "status",
      headerName: `${t("tables.status")}`,
      width: 140,
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
    {
      field: "actions",
      headerName: `${t("tables.pay_amount")}`,
      width: 290,
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
            <input
            placeholder="000"
            type="number"
            className="border border-[#2664B1] h-7 pt-1.5 w-[120px] rounded-lg px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(
                /[^0-9]/g,
                ""
              );
            }}
            onChange={(e) => handleInputsChange(e, params.row.id)}
            value={amounts[params.row.id] || ""}
          />
          {/* سداد مبلغ */}
          <Tooltip title={t("alerts.pay_part")}>
            <IconButton
              onClick={() => handleAddPayment(parseInt(params.row.id))}
              color="primary"
              size="small"
              sx={{ cursor: "pointer" }}
            >
              <IoMdAdd />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("alerts.send_alert")}>
            <IconButton
              onClick={() => handleSendWarning(parseInt(params.row.id))}
              color="primary"
              size="small"
              sx={{ cursor: "pointer", color: "#C53B3B" }}
            >
              <RiAlarmWarningFill />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  const handleAddPayment = async (userId: number) => {
    const amount = amounts[userId];
    if (amount && userId) {
      const confirmed = window.confirm(
        `${t("alerts.confirm_pay_amount")} ${amount} ؟`
      );

      if (!confirmed) return;

      try {
        await setUserPayment({ amount, userId }).unwrap();
        setAmounts((prev) => ({ ...prev, [userId]: 0 }));
        showSuccess(`${t("alerts.payment_added_success")}`);
      } catch {
        showError(`${t("alerts.payment_failed")}`);
      }
    }
  };
  const handleSendWarning = async (userId: number) => {
    if (userId) {
      const confirmed = window.confirm(
        `${t("alerts.confirm_send_alert")} ${userId} ؟`
      );

      if (!confirmed) return;

      try {
        await setWarning(userId).unwrap();
        showSuccess(`${t("alerts.notification_sent_success")}`);
      } catch {
        showError(`${t("alerts.notification_sent_failed")}`);
      }
    }
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
          marginBottom: "2rem",
          "& .MuiToolbar-root": { direction: "ltr" },
          "& .MuiDataGrid-row--borderBottom": { gap: "23px", background: "" },
          "& .MuiDataGrid-row": { gap: "1rem" },
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
    </motion.div>
  );
}

