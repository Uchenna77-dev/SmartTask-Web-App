import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/DashboardPage";
import TasksPage from "./pages/TaskPage";

function App() {
  return (
    <Router>
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          padding: "10px",
          background: "#007bff",
        }}
      >
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Dashboard
        </Link>
        <Link to="/tasks" style={{ color: "white", textDecoration: "none" }}>
          Manage Tasks
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </Router>
  );
}

export default App;
