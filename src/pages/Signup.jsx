import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const Signup = () => {
  const [role, setRole] = useState("student");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save additional data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        username: username,
        role: role,
        createdAt: new Date(),
      });

      console.log({
        uid: user.uid,
        email: user.email,
        role: role,
        username: username,
        createdAt: new Date(),
      });
      toast.success("Signup successful!");
      navigate("/login"); // Redirect to login page after signup
    } catch (err) {
      setError(err.message);
      toast.error("Login failed. Please check your credentials.");
      console.error("Login error:", err);
    }
    // Handle login logic here
    // Example: console.log({ role, email, password });
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
        minHeight: "100vh",
        margin: 0,
        padding: 20,
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
            htmlFor="username"
            style={{
              display: "block",
              marginTop: 15,
              fontWeight: 500,
              textAlign: "left",
            }}
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={inputCSS}
          />

          <label
            htmlFor="role"
            style={{
              display: "block",
              marginTop: 15,
              fontWeight: 500,
              textAlign: "left",
            }}
          >
            Sign Up as:
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
            style={{
              display: "block",
              marginTop: 15,
              fontWeight: 500,
              textAlign: "left",
            }}
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
            style={{
              display: "block",
              marginTop: 15,
              fontWeight: 500,
              textAlign: "left",
            }}
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

          <label
            htmlFor="confirmPassword"
            style={{
              display: "block",
              marginTop: 15,
              fontWeight: 500,
              textAlign: "left",
            }}
          >
            Confirm Password:
          </label>
          <div style={passwordInputWrapper}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={inputCSS}
            />
            <button
              type="button"
              style={eyeIconStyle}
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              tabIndex={-1}
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
              />
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
            Sign Up
          </button>
          <Link
            to="/login"
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
            Already have an account? Log In
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
