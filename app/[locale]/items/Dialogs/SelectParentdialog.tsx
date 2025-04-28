"use client";

import * as React from "react";
import Image from "next/image";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  Avatar,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useGetAllParentsQuery } from "@/app/Redux/Slices/Parents/parentsApi";
import { ParentType } from "@/app/Redux/types";
import { useTranslations } from "next-intl";

// Transition for dialog
const Transition = React.forwardRef<
  unknown,
  TransitionProps & { children: React.ReactElement }
>((props, ref) => <Slide direction="up" ref={ref} {...props} />);

Transition.displayName = "Transition";

type Props = {
  setParent: React.Dispatch<
    React.SetStateAction<{ name: string; id: string | number }>
  >;
};

export default function SelectParentDialog({ setParent }: Props) {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);
  const { data, error, isLoading } = useGetAllParentsQuery();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (isLoading) return <p>{t("alerts.loading")}</p>;
  if (error) return <p>Error fetching parents</p>;

  const parents = data?.data;

  if (!parents || parents.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 text-lg">
        {t("alerts.no_user_found")}
        <Image
          src="/404 Error-rafiki.svg"
          alt="not found"
          width={250}
          height={100}
        />
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
      width: 220,
      sortable: true,
      renderCell: (params) => (
        <Box
          sx={{
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
        </Box>
      ),
    },
    {
      field: "phone_number",
      headerName: `${t("tables.phone_number")}`,
      width: 150,
    },
  ];

  return (
    <>
      <Button onClick={handleOpen} sx={{ fontSize: "20px" }}>
        {t("btns.select_guardian")}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        disableEnforceFocus
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiPaper-root": {
            margin: "15px",
            maxWidth: "95%",
          },
          "& .MuiDialogContent-root": { padding: "20px 0px" },
        }}
      >
        <DialogContent className="bg-[#363636] text-white">
          <Paper
            sx={{
              direction: "rtl",
              height: "auto",
              width: {
                xs: "90%",
                sm: 500,
                md: 600,
              },
              marginBottom: "3rem",
              "& .MuiToolbar-root": { direction: "ltr" },
              "& .MuiDataGrid-row--borderBottom": { gap: "2rem" },
              "& .MuiDataGrid-row": { gap: "2rem" },
              "& .MuiDataGrid-columnHeaders": {
                background: "white",
                padding: "12px 0",
              },
            }}
          >
            <Box sx={{ overflowX: "auto" }}>
              <Box sx={{ minWidth: 300 }}>
                <DataGrid
                  rows={rows}
                  aria-hidden={false}
                  columns={columns}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 10, page: 0 } },
                  }}
                  pageSizeOptions={[10]}
                  onCellClick={(params) => {
                    setParent({
                      name: params.row.full_name,
                      id: params.row.id,
                    });
                    handleClose();
                  }}
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
                      fontWeight: 500,
                    },
                  }}
                />
              </Box>
            </Box>
          </Paper>
        </DialogContent>

        <DialogActions className="bg-[#363636] text-white">
          <Button onClick={handleClose} sx={{ color: "#D4D4D4" }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
