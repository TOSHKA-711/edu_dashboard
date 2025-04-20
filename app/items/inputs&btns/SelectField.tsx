import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function SelectField() {
  const [value, setValue] = React.useState("published"); // تعيين القيمة الافتراضية

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <FormControl
        sx={{
          width: "20rem",
          "& .MuiInputBase-root": { borderRadius: "16px" , fontFamily:"unset" , border:"#2664B1 solid 2px"},
        }}
      >
        <Select
          value={value}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="published" sx={{direction:"rtl" }}>تم نشره</MenuItem>
          <MenuItem value="pending" sx={{direction:"rtl" }}>قيد المراجعة</MenuItem>
          <MenuItem value="draft"  sx={{direction:"rtl" }}>مسودة</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
