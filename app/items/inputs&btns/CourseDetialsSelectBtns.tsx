import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FaPaintbrush } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaChartSimple } from "react-icons/fa6";
import CalenderDialog from "../CalenderDialog";
import { CiCalendarDate } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { RiNumbersLine } from "react-icons/ri";
import { MdOutlineSignalWifiStatusbarConnectedNoInternet4 } from "react-icons/md";
import { AddCoursePayloadType } from "@/app/Redux/types";
import { Dayjs } from "dayjs";
import { useGetAllCategoriesQuery } from "@/app/Redux/Slices/Courses/courseApi";
import { useGetAllInstructorsQuery } from "@/app/Redux/Slices/Instructors/InstructorsApi";
import { VscActivateBreakpoints } from "react-icons/vsc";

export default function CourseDetailsSelectBtns({
  payload,
  handleInputsChange,
  handleSelectChange,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: {
  payload: AddCoursePayloadType;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  setStartDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  handleInputsChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSelectChange: (e: SelectChangeEvent<number | string>) => void;
}) {
  const { data: categories } = useGetAllCategoriesQuery();
  const { data: instructors } = useGetAllInstructorsQuery();

  return (
    <div className="w-full grid grid-cols-4 items-center justify-start gap-y-15 gap-x-5 max-md:grid max-lg:grid-cols-2 max-md:grid-cols-1">
      <FormControl
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          flexDirection: "row",
          position: "relative",

          "& .MuiInputBase-root": {
            borderRadius: "16px",
            fontFamily: "unset",
            width: "100%",
            backgroundColor: "white",
          },
        }}
      >
        <p className="absolute -top-9 right-12 text-lg text-[#2664B1]  ">
          {" "}
          الفئه
        </p>
        <FaPaintbrush className="bg-[#2664B1] text-white p-2 rounded-3xl text-4xl" />
        <Select
          value={payload.category_id}
          name="category_id"
          onChange={handleSelectChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}

        >
          {categories?.data.map((category) => (
            <MenuItem
              key={category.id}
              value={category.id}
              sx={{ direction: "rtl" }}
            >
              {category.name_ar}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          flexDirection: "row",
          position: "relative",

          "& .MuiInputBase-root": {
            borderRadius: "16px",
            fontFamily: "unset",
            width: "100%",
            backgroundColor: "white",
          },
        }}
      >
        <p className="absolute -top-9 right-12 text-lg text-[#2664B1]  ">
          {" "}
          النوع
        </p>
        <FaPaintbrush className="bg-[#2664B1] text-white p-2 rounded-3xl text-4xl" />
        <Select
          value={payload.item_type}
          name="item_type"
          onChange={handleSelectChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="course" sx={{ direction: "rtl" }}>
            دورة
          </MenuItem>
          <MenuItem value="event" sx={{ direction: "rtl" }}>
            حدث
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          flexDirection: "row",
          position: "relative",

          "& .MuiInputBase-root": {
            borderRadius: "16px",
            fontFamily: "unset",
            width: "100%",
            backgroundColor: "white",
          },
        }}
      >
        <p className="absolute -top-9 right-12 text-lg text-[#2664B1]  ">
          {" "}
          المعلمين
        </p>
        <FaUser className="bg-[#2664B1] text-white p-2 rounded-3xl text-4xl" />
        <Select
          value={payload.instructor_id}
          name="instructor_id"
          onChange={handleSelectChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          {instructors?.data.map((Instructor) => (
            <MenuItem
              key={Instructor.id}
              value={Instructor.id}
              sx={{ direction: "rtl" }}
            >
              {Instructor.first_name} {Instructor.last_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          flexDirection: "row",
          position: "relative",

          "& .MuiInputBase-root": {
            borderRadius: "16px",
            fontFamily: "unset",
            width: "100%",
            backgroundColor: "white",
          },
        }}
      >
        <p className="absolute -top-9 right-12 text-lg text-[#2664B1]  ">
          {" "}
          السعر
        </p>
        <AiFillDollarCircle className="bg-[#2664B1] text-white p-2 rounded-3xl text-4xl" />
        <input
          type="number"
          className="bg-white p-4 rounded-lg w-full"
          value={payload.price}
          name="price"
          onChange={handleInputsChange}
        />
      </FormControl>
      <FormControl
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          flexDirection: "row",
          position: "relative",

          "& .MuiInputBase-root": {
            borderRadius: "16px",
            fontFamily: "unset",
            width: "100%",
            backgroundColor: "white",
          },
        }}
      >
        <p className="absolute -top-9 right-12 text-lg text-[#2664B1]  ">
          {" "}
          متوسط العمر
        </p>
        <FaChartSimple className="bg-[#2664B1] text-white p-2 rounded-3xl text-4xl" />
        <input
          type="number"
          className="bg-white p-4 rounded-lg w-full"
          value={payload.age_range}
          name="age_range"
          onChange={handleInputsChange}
        />
      </FormControl>
      <FormControl
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          flexDirection: "row",
          position: "relative",

          "& .MuiInputBase-root": {
            borderRadius: "16px",
            fontFamily: "unset",
            width: "100%",
            backgroundColor: "white",
          },
        }}
      >
        <p className="absolute -top-9 right-12 text-lg text-[#2664B1]  ">
          {" "}
          عدد الحصص
        </p>
        <RiNumbersLine className="bg-[#2664B1] text-white p-2 rounded-3xl text-4xl" />
        <input
          type="number"
          className="bg-white p-4 rounded-lg w-full"
          value={payload.session_count}
          name="session_count"
          onChange={handleInputsChange}
        />
      </FormControl>
      <FormControl
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          flexDirection: "row",
          position: "relative",

          "& .MuiInputBase-root": {
            borderRadius: "16px",
            fontFamily: "unset",
            width: "100%",
            backgroundColor: "white",
          },
        }}
      >
        <p className="absolute -top-9 right-12 text-lg text-[#2664B1]  ">
          {" "}
          سعة الكورس
        </p>
        <FaUsers className="bg-[#2664B1] text-white p-2 rounded-3xl text-4xl" />
        <input
          type="number"
          className="bg-white p-4 rounded-lg w-full"
          value={payload.max_people}
          name="max_people"
          onChange={handleInputsChange}
        />
      </FormControl>
      <FormControl
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          flexDirection: "row",
          position: "relative",

          "& .MuiInputBase-root": {
            borderRadius: "16px",
            fontFamily: "unset",
            width: "100%",
            backgroundColor: "white",
          },
        }}
      >
        <p className="absolute -top-9 right-12 text-lg text-[#2664B1]  ">
          {" "}
          النقاط
        </p>
        <VscActivateBreakpoints className="bg-[#2664B1] text-white p-2 rounded-3xl text-4xl" />
        <input
          type="number"
          className="bg-white p-4 rounded-lg w-full"
          value={payload.earnings_point}
          name="earnings_point"
          onChange={handleInputsChange}
        />
      </FormControl>
      <FormControl
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          flexDirection: "row",
          position: "relative",

          "& .MuiInputBase-root": {
            borderRadius: "16px",
            fontFamily: "unset",
            width: "100%",
            backgroundColor: "white",
          },
        }}
      >
        <p className="absolute -top-9 right-12 text-lg text-[#2664B1]  ">
          {" "}
          الحالة
        </p>
        <MdOutlineSignalWifiStatusbarConnectedNoInternet4 className="bg-[#2664B1] text-white p-2 rounded-3xl text-4xl" />
        <Select
          value={payload.active}
          name="active"
          onChange={handleSelectChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value={1} sx={{ direction: "rtl" }}>
            مفعل
          </MenuItem>
          <MenuItem value={0} sx={{ direction: "rtl" }}>
            غير مفعل
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          flexDirection: "row",
          position: "relative",

          "& .MuiInputBase-root": {
            borderRadius: "16px",
            fontFamily: "unset",
            width: "100%",
            backgroundColor: "white",
          },
        }}
      >
        <p className="absolute -top-9 right-12 text-lg text-[#2664B1]  ">
          {" "}
          تاريخ البدأ
        </p>
        <CiCalendarDate className="bg-[#2664B1] text-white p-2 rounded-3xl text-4xl" />
        <CalenderDialog setStartDate={setStartDate} />
        <span
          style={{ marginRight: "8px", color: "#2664B1", fontWeight: "bold" }}
        >
          {startDate ? startDate.format("YYYY-MM-DD") : ""}
        </span>
      </FormControl>
      <FormControl
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          flexDirection: "row",
          position: "relative",

          "& .MuiInputBase-root": {
            borderRadius: "16px",
            fontFamily: "unset",
            width: "100%",
            backgroundColor: "white",
          },
        }}
      >
        <p className="absolute -top-9 right-12 text-lg text-[#2664B1]  ">
          {" "}
          تاريخ الانتهاء
        </p>
        <CiCalendarDate className="bg-[#2664B1] text-white p-2 rounded-3xl text-4xl" />
        <CalenderDialog setStartDate={setEndDate} />
        <span
          style={{ marginRight: "8px", color: "#2664B1", fontWeight: "bold" }}
        >
          {endDate ? endDate.format("YYYY-MM-DD") : ""}
        </span>
      </FormControl>
    </div>
  );
}
