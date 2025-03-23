import Avatar from "@mui/material/Avatar";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
const NavBar = () => {
  console.log("NavBar rendered");
  return (
    <div
      className="navbar h-full w-full px-8 flex items-center justify-end gap-2"
      dir="rtl"
    >
      <IoIosNotificationsOutline className="text-3xl cursor-pointer " />
      <div className="user flex items-center justify-start ">
        <span className="flex items-center justify-center flex-row-reverse gap-2 cursor-pointer border-r-2 pr-2  ">
          <IoIosArrowDown />
          <Avatar alt="user" src="/user.jpg" />
        </span>
      </div>
    </div>
  );
};

export default NavBar;
