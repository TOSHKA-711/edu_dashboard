import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CiEdit } from "react-icons/ci";

import { FaUsers } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdStarRate } from "react-icons/md";
import { IoBookmarksOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { CourseType } from "@/app/Redux/types";
import { setSelectedCourse } from "@/app/Redux/Slices/Courses/courseSlice";
import { useTranslations } from "next-intl";

export default function MenuDots({ course }: { course: CourseType }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const dispatch = useDispatch();
  const t = useTranslations();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // handle edit
  const handleEditCourse = (course: CourseType) => {
    dispatch(setSelectedCourse(course));
    router.push("/dashboard/courses/editCourse");
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
        {t("btns.edit")} <CiEdit />
        </MenuItem>

        <MenuItem
          onClick={() =>
            router.push(`/dashboard/courses/viewCourse/${course.id}`)
          }
        >
          {t("tables.attendance")} <FaUsers />
        </MenuItem>
        <MenuItem
          onClick={() =>
            router.push(`/dashboard/courses/addDepartment/${course.id}`)
          }
        >
          {t("btns.departments")} <IoMdAdd />
        </MenuItem>
        <MenuItem
          onClick={() =>
            router.push(`/dashboard/courses/enrolled/${course.id}`)
          }
        >
          {t("btns.edit")}
          <IoBookmarksOutline />
        </MenuItem>
        <MenuItem
          onClick={() =>
            router.push(`/dashboard/courses/courseRating/${course.id}`)
          }
        >
          {t("btns.rates")}
          <MdStarRate />
        </MenuItem>
      </Menu>
    </div>
  );
}
