"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { FaRegEye} from "react-icons/fa";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import { IoMdAdd } from "react-icons/io";
import SwitchBtn from "../inputs&btns/SwitchBtn";

export default function LessonsTable() {
  const router = useRouter();
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 120 },
    {
      field: "firstName",
      headerName: "الاسم",
      width: 300,
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
            fontFamily: 'Tajawal',
          }}
        >
          <Avatar alt="user" src="/user.jpg" />
          {params.row.firstName}
        </div>
      ),
    },
    {
      field: "attendance",
      headerName: "الحضور",
      width: 350,
      sortable: false,
      renderCell: () => (
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            fontFamily: 'Tajawal',
            fontSize:"18px"
          }}
        >
        <SwitchBtn/>
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "الإجراء",
      width: 280,
      sortable: false,
      renderCell: () => (
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
              onClick={() => handleView()}
              color="primary"
              size="small"
              sx={{ cursor: "pointer" }}
            >
              <FaRegEye />
            </IconButton>
          </Tooltip>
          {/* سداد مبلغ */}
          {/* <Tooltip title="سداد جزء">
            <IconButton
              onClick={() => handleView()}
              color="primary"
              size="small"
              sx={{ cursor: "pointer" }}
            >
              <IoMdAdd />
            </IconButton>
          </Tooltip> */}
        </div>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      attendance: "تم دفع 300 شيكل من اصل 600",
      firstName: "Jon",
    },
    {
      id: 2,
      attendance: "تم دفع 300 شيكل من اصل 600",
      firstName: "Cersei",
    },
    {
      id: 3,
      attendance: "تم دفع 300 شيكل من اصل 600",
      firstName: "Jaime",
    },
    {
      id: 4,
      attendance: "تم دفع 300 شيكل من اصل 600",
      firstName: "Arya",
    },
    {
      id: 5,
      attendance: "تم دفع 300 شيكل من اصل 600",
      firstName: "Daenerys",
    },
    {
      id: 6,
      attendance: "تم دفع 300 شيكل من اصل 600",
      firstName: "Daenerys",
    },
    {
      id: 7,
      attendance: "تم دفع 300 شيكل من اصل 600",
      firstName: "Daenerys",
    },
    {
      id: 8,
      attendance: "تم دفع 300 شيكل من اصل 600",
      firstName: "Daenerys",
    },
    {
      id: 9,
      attendance: "تم دفع 300 شيكل من اصل 600",
      firstName: "Daenerys",
    },
    {
      id: 10,
      attendance: "تم دفع 300 شيكل من اصل 600",
      firstName: "Daenerys",
    },
    {
      id: 11,
      attendance: "تم دفع 300 شيكل من اصل 600",
      firstName: "Daenerys",
    },
    {
      id: 12,
      attendance: "تم دفع 300 شيكل من اصل 600",
      firstName: "Daenerys",
    },
    {
      id: 13,
      attendance: "تم دفع 300 شيكل من اصل 600",
      firstName: "Daenerys",
    },
  ];

  const handleView = () => {
    router.push("/dashboard/students/viewStudent");
  };

  const handleDelete = (id: number) => {
    if (window.confirm(`هل أنت متأكد من حذف المستخدم ID: ${id}؟`)) {
      alert(`تم حذف المستخدم ID: ${id}`);
    }
  };

  const handleEdit = () => {
    router.push("/dashboard/students/editStudent");
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
        rows={rows}
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
