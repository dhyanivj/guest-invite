import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./AdminPage";
import GuestPage from "./GuestPage";
import NotFoundPage from "./NotFoundPage";
import "./App.scss";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/invite/:uuid" element={<GuestPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
