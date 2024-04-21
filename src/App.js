import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./AdminPage";
import GuestPage from "./GuestPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/invite/:uuid" element={<GuestPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
