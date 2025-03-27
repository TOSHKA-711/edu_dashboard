import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FaPaintbrush } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaChartSimple } from "react-icons/fa6";

export default function CourseDetailsSelectBtns() {
  const [value, setValue] = React.useState("published");

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <div className="w-full flex items-center justify-between">
      <FormControl
        sx={{
          width: "20vw",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          flexDirection: "row",
          position: "relative",

          "& .MuiInputBase-root": {
            borderRadius: "16px",
            fontFamily: "unset",
            width: "17vw",
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
          value={value}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="published" sx={{ direction: "rtl" }}>
          UI/UX Design
          </MenuItem>
          <MenuItem value="pending" sx={{ direction: "rtl" }}>
          UI/UX Design
          </MenuItem>
          <MenuItem value="draft" sx={{ direction: "rtl" }}>
          UI/UX Design
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl
        sx={{
          width: "20vw",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          flexDirection: "row",
          position: "relative",

          "& .MuiInputBase-root": {
            borderRadius: "16px",
            fontFamily: "unset",
            width: "17vw",
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
          value={value}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="published" sx={{ direction: "rtl" }}>
          احمد جمعه
          </MenuItem>
          <MenuItem value="pending" sx={{ direction: "rtl" }}>
          احمد جمعه
          </MenuItem>
          <MenuItem value="draft" sx={{ direction: "rtl" }}>
          احمد جمعه
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl
        sx={{
          width: "20vw",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          flexDirection: "row",
          position: "relative",

          "& .MuiInputBase-root": {
            borderRadius: "16px",
            fontFamily: "unset",
            width: "17vw",
            backgroundColor: "white",
          },
        }}
      >
        <p className="absolute -top-9 right-12 text-lg text-[#2664B1]  ">
          {" "}
          السعر
        </p>
        <AiFillDollarCircle className="bg-[#2664B1] text-white p-2 rounded-3xl text-4xl" />
        <Select
          value={value}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="published" sx={{ direction: "rtl" }}>
          3400 $
          </MenuItem>
          <MenuItem value="pending" sx={{ direction: "rtl" }}>
          3400 $
          </MenuItem>
          <MenuItem value="draft" sx={{ direction: "rtl" }}>
          3400 $
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl
        sx={{
          width: "20vw",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          flexDirection: "row",
          position: "relative",

          "& .MuiInputBase-root": {
            borderRadius: "16px",
            fontFamily: "unset",
            width: "17vw",
            backgroundColor: "white",
          },
        }}
      >
        <p className="absolute -top-9 right-12 text-lg text-[#2664B1]  ">
          {" "}
          المستوى
        </p>
        <FaChartSimple className="bg-[#2664B1] text-white p-2 rounded-3xl text-4xl" />
        <Select
          value={value}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="published" sx={{ direction: "rtl" }}>
          الجميع
          </MenuItem>
          <MenuItem value="pending" sx={{ direction: "rtl" }}>
          مبتدئ
          </MenuItem>
          <MenuItem value="draft" sx={{ direction: "rtl" }}>
          متوسط
          </MenuItem>
          <MenuItem value="draft" sx={{ direction: "rtl" }}>
          مرتفع
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
