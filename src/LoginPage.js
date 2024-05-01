import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // Ensure this path is correct

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook to perform navigation

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin"); // Redirect to the admin page on successful login
    } catch (error) {
      console.error("Failed to sign in", error);
      // Optionally handle errors, e.g., show an error message
    }
  };

  return (
    <div>
      <form
        onSubmit={handleLogin}
        className="p-4 shadow rounded"
        style={{ maxWidth: "400px", margin: "auto", marginTop: "50px" }}
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
