import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
} from "@mui/material";
import ResponsiveDatePickers, { DateRangePicker } from "./DatePicker";
import {
  Paper,
  TableRow,
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableContainer,
} from "@mui/material";
import XLSXDownload from "./XLSXDownload";
import dayjs from "dayjs";

export default function DailyExpense() {
  const [expenseList, setExpenseList] = useState([]);
  const [expenseDetails, setExpenseDetails] = useState({
    amount: "",
    reason: "",
    isFuel: 1,
    date: new Date("MM/DD/YYYY"),
  });

  const userName = window.sessionStorage.getItem("userName");

  const { amount, reason, isFuel, date } = expenseDetails;
  const isLive = true;
  const hostName = !!isLive
    ? "https://financebe.onrender.com"
    : "http://localhost:5678";

  const handleAddFunction = async () => {
    if (!!amount && !!reason && !!date) {
      const response = await fetch(`${hostName}/addExpense`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...expenseDetails, userName }),
      });
      await handleFetchExpenes();

      setExpenseDetails({
        ...expenseDetails,
        amount: "",
        reason: "",
        isFuel: 1,
      });
    } else {
      window.alert("Fill all values");
    }
  };

  React.useEffect(() => {
    handleFetchExpenes();
  }, []);

  const handleFetchExpenes = async () => {
    const response = await fetch(
      `${hostName}/getAllExpenses?userName=${userName}`,
      {
        method: "GET",
      }
    );

    response.json().then((res) => setExpenseList(res));
  };

  const dateFormat = (date) => {
    const localDate = new Date(date);
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${localDate?.getDate()}-${
      month[localDate?.getMonth()]
    }-${localDate?.getFullYear()}`;
  };
  const [searchDetails, setSearchDetails] = useState({ isFuel: 2, Date: "" });
  const filterData = expenseList?.filter((item) =>
    searchDetails?.isFuel === 2 ? item : item?.isFuel === searchDetails?.isFuel
  );

  const totalExpense = filterData
    ?.map((item) => item?.amount)
    ?.reduce((acc, currentValue) => {
      return parseInt(acc) + parseInt(currentValue);
    }, 0);

  // const [dateRange, setDateRange] = React.useState([
  //   dayjs("2022-04-17"),
  //   dayjs("2022-04-21"),
  // ]);

  console.log(filterData, "filterDatafilterData");

  return (
    <>
      {/* <DateRangePicker /> */}

      <Typography>Daily Expense Tracker</Typography>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ width: "80%", margin: "10px" }}
            label="Amount"
            type="number"
            value={amount}
            required
            onChange={(e) =>
              setExpenseDetails({ ...expenseDetails, amount: e.target.value })
            }
          />
          <TextField
            sx={{ width: "80%", margin: "10px" }}
            label="Reason"
            required
            value={reason}
            onChange={(e) =>
              setExpenseDetails({ ...expenseDetails, reason: e.target.value })
            }
          />
          <FormControl fullWidth sx={{ margin: "10px", width: "80%" }}>
            <InputLabel id="demo-simple-select-label">isFuel</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={!!expenseDetails.isFuel ? 1 : 0}
              label="isFuel"
              // style={{ width: "80%" }}
              name="isFuel"
              onChange={(e) =>
                setExpenseDetails({ ...expenseDetails, isFuel: e.target.value })
              }
            >
              <MenuItem value={1} name="yes">
                Yes
              </MenuItem>
              <MenuItem value={0} name="no">
                No
              </MenuItem>
            </Select>
          </FormControl>

          <ResponsiveDatePickers
            expenseDetails={expenseDetails}
            setExpenseDetails={setExpenseDetails}
            onChange={(e) => console.log(e.target, "jjjjj")}
          />
          <Button
            variant="outlined"
            style={{ margin: "20px" }}
            onClick={handleAddFunction}
          >
            Add Expense
          </Button>
        </Box>
        <Box sx={{ width: "60%" }}>
          <Box
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <XLSXDownload
              expenseList={filterData}
              totalExpense={totalExpense}
            />
          </Box>

          <TableContainer
            component={Paper}
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No</TableCell>
                  <TableCell style={{ maxWidth: "40px" }}>Reason</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right"> Date</TableCell>
                  <TableCell align="right">
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">
                        isFuel
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={searchDetails?.isFuel}
                        label="isFuel"
                        onChange={(e) =>
                          setSearchDetails({
                            ...searchDetails,
                            isFuel: e.target.value,
                          })
                        }
                      >
                        <MenuItem value={1}>Yes</MenuItem>
                        <MenuItem value={0}>No</MenuItem>
                        <MenuItem value={2}>All</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterData?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} style={{ textAlign: "center" }}>
                      No Data Available
                    </TableCell>
                  </TableRow>
                ) : (
                  filterData.map((row, index) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell
                        style={{ maxWidth: "40px", textWrap: "wrap" }}
                        component="th"
                        scope="row"
                      >
                        {row?.reason}
                      </TableCell>
                      <TableCell align="right">{row?.amount}</TableCell>
                      <TableCell align="right">
                        {dateFormat(row?.date)}
                      </TableCell>
                      <TableCell align="right">
                        {row?.isFuel === 1 ? "Yes" : "No"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
                <TableRow>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">Total</TableCell>

                  <TableCell align="right">{totalExpense}</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
