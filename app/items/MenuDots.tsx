import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { IoBookmarksOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function MenuDots() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter()
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ fontSize: "25px", fontWeight: "bold" ,marginBottom:"14px"}}
      >
        ...
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          "& .MuiMenuItem-root": {
            justifyContent: "right",
            gap: "5px",
            padding: "10px 10px 10px 5rem",
            fontFamily:"unset"
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          تعديل <CiEdit />
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ color: "#DB340B" }}>
          حذف <MdOutlineDelete />
        </MenuItem>
        <MenuItem onClick={()=>router.push("/dashboard/courses/enrolled")}>
          الافراد المسجلين بالدورة <FaUsers />
        </MenuItem>
        <MenuItem onClick={()=>router.push("/dashboard/courses/addDepartment")}>
          اضافه اقسام <IoMdAdd />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          الحجوزات
          <IoBookmarksOutline />
        </MenuItem>
      </Menu>
    </div>
  );
}
