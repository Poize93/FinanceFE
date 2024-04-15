import React from "react";
import { Link } from "react-router-dom";

export default function DetailPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Typography>Daily Expenses</Typography>
       */}
      <Link to="/dailyExprenses">Daily Expenses</Link>
      <Link to="">Bank Expenses</Link>
    </div>
  );
}
