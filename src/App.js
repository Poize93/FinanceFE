import "./App.css";
import Registration from "./components/RegistrationPage";
import DetailPage from "./components/DetailPage";
import DailyExpense from "./components/DailyExpense";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundImage: "linear-gradient(to right, #D0E9F6, #E9F8FD)",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/detailPage" element={<DetailPage />} />
          <Route path="/dailyExprenses" element={<DailyExpense />} />
        </Routes>
      </Router>
      {/* <Registration /> */}
    </div>
  );
}

export default App;
