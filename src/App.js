import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { auth } from "./firebase"; // make sure this path is correct
import AdminPage from "./AdminPage";
import GuestPage from "./GuestPage";
import NotFoundPage from "./NotFoundPage";
import LoginPage from "./LoginPage"; // assuming you have a login page component
import "./App.scss";

// Higher-order component for protected routes
const ProtectedRoute = ({ children }) => {
  if (!auth.currentUser) {
    // If there is no user logged in, redirect to the login page
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path="/invite/:uuid" element={<GuestPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
