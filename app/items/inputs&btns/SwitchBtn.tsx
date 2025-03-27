import * as React from 'react';
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Attendance' } };

export default function SwitchBtn() {
  return (
    <div>
      <Switch {...label}  />
    </div>
  );
}
