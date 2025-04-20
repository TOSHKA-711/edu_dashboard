import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useDeleteCategoryMutation } from "../Redux/Slices/Categories/categoryApi";
import { useAlert } from "./hooks/useAlert";

export default function SubjectsCardDots({bg,color,categoryId}:{bg:string,color:string,categoryId:number|string}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter()
  const {showError,showSuccess} = useAlert()
  const [deleteCategory] = useDeleteCategoryMutation();


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteCategory= async(categoryId:number)=>{
    const confirmed = window.confirm(`هل أنت متأكد من حذف الموضوع  ؟`);
    if (!confirmed) return;
    try {
      await deleteCategory(categoryId).unwrap();
      showSuccess("Category deleted successfully!");

    } catch {
      showError("Failed to delete category!");
    }
  }

  return (
    <div className={`absolute -right-2 -top-1 bg-[${bg}] p-0 text-sm  scale-[-.5]`}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ fontSize: "30px", fontWeight: "bold" ,marginBottom:"14px" , height:"30px" , color:`${color}`}}
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
        <MenuItem onClick={()=>router.push(`/dashboard/subjects/editCategory/${categoryId}`)}>
          تعديل <CiEdit />
        </MenuItem>
        <MenuItem onClick={()=>handleDeleteCategory(parseInt(String(categoryId)))} sx={{ color: "#DB340B" }}>
          حذف <MdOutlineDelete />
        </MenuItem>
        {/* <MenuItem onClick={()=>router.push(`/dashboard/courses/viewCourse/${course.id}`)}>
            الحضور <FaUsers />
        </MenuItem>
        <MenuItem onClick={()=>router.push(`/dashboard/courses/addDepartment/${course.id}`)}>
           الاقسام <IoMdAdd />
        </MenuItem>
        <MenuItem onClick={()=>router.push(`/dashboard/courses/enrolled/${course.id}`)}>
          الحجوزات
          <IoBookmarksOutline />
        </MenuItem> */}
      </Menu>
    </div>
  );
}
