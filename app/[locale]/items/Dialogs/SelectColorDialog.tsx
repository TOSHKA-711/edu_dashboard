"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useTranslations } from "next-intl";

const colorList = [
  {
    name: "blue",
    color: "#2664B1",
  },
  {
    name: "secondBlue",
    color: "#3B82F6",
  },
  {
    name: "red&orange",
    color: "#F4827E",
  },
  {
    name: "redColor",
    color: "#EE443F",
  },
];

const Transition = React.forwardRef<
  unknown,
  TransitionProps & { children: React.ReactElement }
>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SelectColorDialog({
  setColor,
  setColorShow
}: {
  setColor: React.Dispatch<React.SetStateAction<string>>;
  setColorShow: React.Dispatch<React.SetStateAction<string>>;
}) {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNextClick = (color: string) => {
    const cleanedHex = color.replace('#', '');
    setColor(`Color(0xFF${cleanedHex.toUpperCase()})`);
    setColorShow(color);
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen} sx={{ fontSize: "20px" }}>
        {t("btns.select_color")}{" "}
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
          <div className="w-full flex items-start justify-end flex-wrap gap-3 p-4 min-h-[100px] max-h-[300px]">
            {colorList?.length ? (
              colorList.map((color, index) => (
                <div className="flex flex-col items-center gap-2" key={index}>
                  <div
                    className={`w-12 h-12 max-sm:h-9 max-sm:w-9  rounded-full cursor-pointer border-2 transition-all duration-200 hover:scale-110 `}
                    style={{ backgroundColor: color.color }}
                    onClick={() => handleNextClick(color.color)}
                  ></div>
                  <p>{color.name}</p>
                </div>
              ))
            ) : (
              <p className="text-lg">No colors found</p>
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
