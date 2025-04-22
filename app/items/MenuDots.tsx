import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CiEdit } from "react-icons/ci";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { IoBookmarksOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { CourseType } from "../Redux/types";
import { useDispatch } from "react-redux";
import { setSelectedCourse } from "../Redux/Slices/Courses/courseSlice";
import { useChangeCourseStatusMutation } from "../Redux/Slices/Courses/courseApi";
import { useAlert } from "./hooks/useAlert";

export default function MenuDots({ course }: { course: CourseType }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const dispatch = useDispatch();
  const {showSuccess,showError} = useAlert();
  const [changeCourseStatus] = useChangeCourseStatusMutation();


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // handle edit
  const handleEditCourse = (course: CourseType) => {
    dispatch(setSelectedCourse(course));
    router.push("/dashboard/courses/editCourse")
  };

  // handle change status
  const handleChangeCourseStatus = async(id: number) => {
    try {
      await changeCourseStatus(id).unwrap();
      showSuccess("Course status changed successfully!");
    } catch {
      showError("Course status changed failed!");
    }
  };

  

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ fontSize: "25px", fontWeight: "bold", marginBottom: "14px" }}
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
            fontFamily: "unset",
          },
        }}
      >
        <MenuItem onClick={() => handleEditCourse(course)}>
          تعديل <CiEdit />
        </MenuItem>
        <MenuItem
          onClick={()=>handleChangeCourseStatus(course.id)}
          sx={{
            color: `${course.active == 0 ? "#43B75D" : "#DB340B"}`,
          }}
        >
          {course.active == 0 ? "تفعيل" : "تعطيل"}

          <MdOutlinePublishedWithChanges />
        </MenuItem>
        <MenuItem
          onClick={() =>
            router.push(`/dashboard/courses/viewCourse/${course.id}`)
          }
        >
          الحضور <FaUsers />
        </MenuItem>
        <MenuItem
          onClick={() =>
            router.push(`/dashboard/courses/addDepartment/${course.id}`)
          }
        >
          الاقسام <IoMdAdd />
        </MenuItem>
        <MenuItem
          onClick={() =>
            router.push(`/dashboard/courses/enrolled/${course.id}`)
          }
        >
          الحجوزات
          <IoBookmarksOutline />
        </MenuItem>
      </Menu>
    </div>
  );
}
