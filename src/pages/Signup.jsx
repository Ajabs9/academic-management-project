import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    // Example: console.log({ role, email, password });
    navigate("/admin-dashboard"); // Redirect to admin dashboard after signup
  };

  const inputCSS = {
    width: "100%",
    padding: 10,
    marginTop: 5,
    borderRadius: 6,
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    color: "#333",
  };

  return (
    <div
      style={{
        fontFamily: "Segoe UI, sans-serif",
        backgroundColor: "#f0f2f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        margin: 0,
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: 40,
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: 400,
        }}
      >
        <form className="login-form" onSubmit={handleSubmit}>
          <h2
            style={{ textAlign: "center", marginBottom: 8, color: "#1a237e" }}
          >
            CS Dept | Lab & LMS
          </h2>
          <p style={{ textAlign: "center", color: "#555", marginBottom: 20 }}>
            University of Ibadan
          </p>

          <label
            htmlFor="role"
            style={{ display: "block", marginTop: 15, fontWeight: 500 }}
          >
            Login as:
          </label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              marginTop: 5,
              borderRadius: 6,
              border: "1px solid #ccc",
              backgroundColor: "#fff",
              color: "#333",
            }}
          >
            <option value="student">Student</option>
            <option value="lecturer">Lecturer</option>
            <option value="admin">Admin</option>
          </select>

          <label
            htmlFor="email"
            style={{ display: "block", marginTop: 15, fontWeight: 500 }}
          >
            Email / Matric No:
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email or matric no"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputCSS}
          />

          <label
            htmlFor="password"
            style={{ display: "block", marginTop: 15, fontWeight: 500 }}
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputCSS}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: 12,
              marginTop: 20,
              backgroundColor: "#1a237e",
              color: "white",
              border: "none",
              borderRadius: 6,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
