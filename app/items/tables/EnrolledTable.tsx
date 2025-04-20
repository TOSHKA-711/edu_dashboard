"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Avatar, Box, IconButton, Tooltip } from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import {
  AllEnrolledUsersResponseType,
  EnrolledUserType,
} from "@/app/Redux/types";
import { useSetUserPaymentMutation } from "@/app/Redux/Slices/Courses/courseApi";
import { useAlert } from "../hooks/useAlert";
import { ToastContainer } from "react-toastify";

export default function EnrolledTable({
  users,
}: {
  users: AllEnrolledUsersResponseType;
}) {
  const { showSuccess, showError } = useAlert();
  const [setUserPayment] = useSetUserPaymentMutation();
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
      headerName: "الاسم",
      width: 230,
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
      headerName: "حالة الدفع",
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
      headerName: "رسالة الدفع",
      width: 400,
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
      headerName: "الحالة",
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
          {params.row.status}
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "سداد مبلغ",
      width: 280,
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
            type="number"
            className="border-1 h-7 w-30 rounded-lg py-2 px-3  focus:outline-none focus:ring-1 focus:ring-blue-500 border-[#2664B1] "
            onChange={(e) => handleInputsChange(e, params.row.id)}
            value={amounts[params.row.id] || ""}
          />
          {/* سداد مبلغ */}
          <Tooltip title="سداد جزء">
            <IconButton
              onClick={() => handleAddPayment(parseInt(params.row.id))}
              color="primary"
              size="small"
              sx={{ cursor: "pointer" }}
            >
              <IoMdAdd />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  const handleAddPayment = async (userId: number) => {
    const amount = amounts[userId];
    if (amount && userId) {
      const confirmed = window.confirm(`هل أنت متأكد من سداد مبلغ ${amount} ؟`);

      if (!confirmed) return;

      try {
        await setUserPayment({ amount, userId }).unwrap();
        setAmounts((prev) => ({ ...prev, [userId]: 0 }));
        showSuccess("Payment added successfully!");
      } catch {
        showError("Payment failed!");
      }
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
