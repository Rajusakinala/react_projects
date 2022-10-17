import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

export default function MaterialUIPickers(props) {
  const [date, setDate] = React.useState(dayjs('2022/09/29'));
  // funct dateHandler()

  const handleChange = (newDate) => {
    console.log(newDate);
    const DatePath = `${newDate.$y}/${newDate.$M + 1}/${newDate.$D}`;
    console.log(DatePath);
    setDate(DatePath);
    props.DateHandler(DatePath);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        label="Date"
        inputFormat="YYYY/MM/DD"
        value={date}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
