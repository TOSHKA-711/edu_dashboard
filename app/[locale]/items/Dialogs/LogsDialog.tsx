"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { LogType } from "@/app/Redux/types";

const Transition = React.forwardRef<
  unknown,
  TransitionProps & { children: React.ReactElement }
>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LogsDialog({
 device,
 open,
 setOpen
}: {
 device:LogType,
 open : boolean,
 setOpen : React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const handleClose = () => setOpen(false);


  return (
    <>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiPaper-root": { margin: "15px" },
          "& .MuiDialogContent-root": { padding: "20px 0px" },
        }}
      >
        <DialogContent className="bg-[#363636] text-white">
          <Card
            sx={{
              maxWidth: 600,
              m: "auto",
              mt: 4,
              boxShadow: 5,
              borderRadius: 3,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📱 Device Information
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Model:</strong> {device.model}
                  </Typography>
                  <Typography>
                    <strong>Brand:</strong> {device.brand}
                  </Typography>
                  <Typography>
                    <strong>Manufacturer:</strong> {device.manufacturer}
                  </Typography>
                  <Typography>
                    <strong>Device Name:</strong> {device.device_name}
                  </Typography>
                  <Typography>
                    <strong>System:</strong> {device.system_name}
                  </Typography>
                  <Typography>
                    <strong>Status:</strong> {device.status}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography>
                    <strong>OS Version:</strong> {device.os_version}
                  </Typography>
                  <Typography>
                    <strong>SDK Version:</strong> {device.sdk_version}
                  </Typography>
                  <Typography>
                    <strong>Device ID:</strong> {device.device_id}
                  </Typography>
                  <Typography>
                    <strong>IP Address:</strong> {device.ip_address}
                  </Typography>
                  <Typography>
                    <strong>Contact:</strong> {device.contact_info}
                  </Typography>
                  <Typography>
                    <strong>Location:</strong> {device.latitude},{" "}
                    {device.longitude}
                  </Typography>
                </Grid>
              </Grid>

              <Box mt={2}>
                <Typography variant="caption" color="text.secondary">
                  Created At: {new Date(device.created_at).toLocaleString()}
                </Typography>
                <br />
                <Typography variant="caption" color="text.secondary">
                  Updated At: {new Date(device.updated_at).toLocaleString()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
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
