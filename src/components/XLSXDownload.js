import React from "react";
import { Button } from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import DownloadIcon from "@mui/icons-material/Download";

export default function XLSXDownload({ expenseList, totalExpense }) {
  const tempArray = [];

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

    return `${localDate?.getDate()}${
      month[localDate?.getMonth()]
    }${localDate?.getFullYear()}`;
  };

  expenseList?.map((item, index) =>
    tempArray.push([
      index + 1,
      item?.reason,
      dateFormat(item?.date),
      item?.amount,
      item?.isFuel === 0 ? "No" : "Yes",
    ])
  );

  console.log(...tempArray, "tempArraytempArray");

  const data = [
    ["Sr.No", "Reason", "Date", "Amount", "isFuel"],
    ...tempArray,
    ["", "", "", "Total Amount", ""],
    ["", "", "", totalExpense, ""],
  ];

  const handleDownload = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "sheet1");

    // const blob = XLSX.write(wb, { bookType: "xlsx", type: "blob" });
    // saveAs(blob, "example.xlsx");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "example.xlsx");
  };

  // React.useEffect(() => {
  //   handleDownload();
  // }, []);

  return (
    <>
      {" "}
      <DownloadIcon onClick={handleDownload} style={{ cursor: "pointer" }} />
      {/* <Button onClick={handleDownload}>Download Excel</Button> */}
    </>
  );
}

// export default XLSXDownload;
