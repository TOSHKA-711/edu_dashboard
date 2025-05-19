import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useAlert } from "./hooks/useAlert";
import { useDeleteCategoryMutation } from "@/app/Redux/Slices/Categories/categoryApi";
import { useTranslations } from "next-intl";

export default function SubjectsCardDots({
  bg,
  color,
  categoryId,
}: {
  bg: string;
  color: string;
  categoryId: number | string;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { showError, showSuccess } = useAlert();
  const [deleteCategory] = useDeleteCategoryMutation();
  const t = useTranslations();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteCategory = async (categoryId: number) => {
    const confirmed = window.confirm(`${t("alerts.confirm_delete_topic")}`);
    if (!confirmed) return;
    try {
      await deleteCategory(categoryId).unwrap();
      showSuccess(`${t("alerts.category_deleted_success")}`);
    } catch {
      showError(`${t("alerts.category_delete_failed")}`);
    }
  };

  return (
    <div
      className={`absolute -right-2 -top-1 bg-[${bg}] p-0 text-sm  scale-[-.5]`}
    >
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          fontSize: "30px",
          fontWeight: "bold",
          marginBottom: "14px",
          height: "30px",
          color: `${color}`,
        }}
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
        <MenuItem
          onClick={() =>
            router.push(`/dashboard/subjects/editCategory/${categoryId}`)
          }
        >
          {t("btns.edit")} <CiEdit />
        </MenuItem>
        <MenuItem
          onClick={() => handleDeleteCategory(parseInt(String(categoryId)))}
          sx={{ color: "#DB340B" }}
        >
          {t("btns.delete")} <MdOutlineDelete />
        </MenuItem>
      </Menu>
    </div>
  );
}
