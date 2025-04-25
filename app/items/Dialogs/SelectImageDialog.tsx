"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Image from "next/image";

const Transition = React.forwardRef<
  unknown,
  TransitionProps & { children: React.ReactElement }
>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function SelectImageDialog({
  setImage,
  images,
}: {
  setImage: React.Dispatch<React.SetStateAction<string | Blob | null>>;
  images: string[];
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNextClick = (image: string) => {
    handleClose();
    setImage(image);
  };

  return (
    <>
      <Button onClick={handleOpen} sx={{ fontSize: "20px" }}>
        اختر صورة{" "}
      </Button>

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
          <div className="w-full flex items-start justify-end flex-wrap gap-3 p-4 min-h-[200px] max-h-[300px]">
            {images?.length ? (
              images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`image-${index}`}
                  width={100}
                  height={100}
                  onClick={() => handleNextClick(image)}
                  className="cursor-pointer duration-200 hover:scale-110"
                />
              ))
            ) : (
              <p className="text-lg">No images found</p>
            )}
          </div>
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
