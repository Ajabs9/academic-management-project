import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Simple email validation (checks for @ and .)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "lecturer") {
        navigate("/lecturer-dashboard");
      } else if (role === "lab-supervisor") {
        navigate("/lab-supervisor-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
    // Handle login logic here
    // Example: console.log({ role, email, password });
    // navigate("/admin-dashboar;d") // Redirect to admin dashboard after signup
  };

  const inputCSS = {
    width: "100%",
    padding: 10,
    marginTop: 5,
    borderRadius: 6,
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    color: "black",
  };

  const passwordInputWrapper = {
    position: "relative",
    width: "100%",
    marginTop: 5,
  };

  const eyeIconStyle = {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#888",
    fontSize: 18,
    background: "none",
    border: "none",
    padding: 0,
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

          {/* <label
            htmlFor="role"
            style={{ display: "block", marginTop: 15, fontWeight: 500, textAlign: "left" }}
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
          </select> */}

          <label
            htmlFor="email"
            style={{ display: "block", marginTop: 15, fontWeight: 500, textAlign: "left"  }}
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
            style={{ display: "block", marginTop: 15, fontWeight: 500, textAlign: "left"  }}
          >
            Password:
          </label>
          <div style={passwordInputWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputCSS}
            />
            <button
              type="button"
              style={eyeIconStyle}
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

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
            Login
          </button>

          <a
            href="#"
            style={{
              display: "block",
              textAlign: "center",
              marginTop: 15,
              color: "#1a237e",
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            Forgot Password?
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
