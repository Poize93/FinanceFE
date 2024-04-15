import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";

export default function ResponsiveDatePickers({
  expenseDetails,
  setExpenseDetails,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={
          [
            // "DatePicker",
            // "MobileDatePicker",
            // "DesktopDatePicker",
            // "StaticDatePicker",
          ]
        }
      >
        <DemoItem>
          <DatePicker
            defaultValue={dayjs(expenseDetails)}
            onChange={(date) => {
              setExpenseDetails({ ...expenseDetails, date: date?.$d });
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}

export function DateRangePicker({ dateRange, setDateRange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateRangeCalendar", "DateRangeCalendar"]}>
        <DemoItem label="1 calendar">
          <DateRangeCalendar
            calendars={1}
            defaultValue={[dayjs("2022-04-17"), dayjs("2022-04-21")]}
            value={dateRange}
            onChange={(newValue) => setDateRange(newValue)}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
