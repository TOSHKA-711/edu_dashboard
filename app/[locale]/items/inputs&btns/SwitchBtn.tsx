import * as React from "react";
import Switch from "@mui/material/Switch";
import { useSetUserAttendanceMutation } from "@/app/Redux/Slices/Courses/courseApi";
import { AllStudentCoursesAttendanceResponseType } from "@/app/Redux/types";
import { useAlert } from "../hooks/useAlert";

const label = { inputProps: { "aria-label": "Attendance" } };

export default function SwitchBtn({
  active,
  sessionId,
  userId,
  refetch
}: {
  active: boolean;
  sessionId: number | string;
  userId: number | string;
  refetch: () => Promise<{
    data?: AllStudentCoursesAttendanceResponseType;
    error?: unknown;
  }>;
}) {
  const [checked, setChecked] = React.useState(active);
  const [setUserAttendance, { isLoading }] = useSetUserAttendanceMutation();
  const {showError,showSuccess}=useAlert();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setChecked(newChecked);

    try {
      await setUserAttendance({ sessionId, userId });
      showSuccess(`Attendance marked successfully for userId ${userId}`);
      console.log({ sessionId, userId });
      
      await refetch()
    } catch  {
      showError("Attendance update failed");
      setChecked(!newChecked);
    }
  };

  return (
    <Switch
      {...label}
      checked={checked}
      onChange={handleChange}
      disabled={isLoading}
    />
  );
}
