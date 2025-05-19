// import { RootState } from "@/app/Redux/Store";
import Avatar from "@mui/material/Avatar";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
// import { useSelector } from "react-redux";
const NavBar = () => {
  // const user = useSelector((state:RootState)=>state.auth.user)
  return (
    <div
      className="navbar h-full w-full px-8 flex items-center justify-end gap-2"
      dir="rtl"
    >
      <IoIosNotificationsOutline className="text-3xl cursor-pointer " />
      <div className="user flex items-center justify-start ">
        <span className="flex items-center justify-center flex-row-reverse gap-2 cursor-pointer border-r-2 pr-2  ">
          <IoIosArrowDown />
          <Avatar alt="user" src={""} />
        </span>
      </div>
    </div>
  );
};

export default NavBar;
