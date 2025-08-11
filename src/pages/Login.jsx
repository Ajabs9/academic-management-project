import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { userData, setUserData } = useAuth();

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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user data from Firestore
      const docRef = await doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUserData(userData); // <-- Store in context
        console.log("User data:", userData);
      }else{
        setUserData(null); // No user data found
        toast.error("No user data found!");
        console.log("No User data found!");
      }

      toast.success("Login successful!");
      if (userData.role === "admin") {
        navigate("/admin-dashboard");
      } else if (userData.role === "lecturer") {
        navigate("/lecturer-dashboard");
      } else if (userData.role === "lab-supervisor") {
        navigate("/lab-supervisor-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    } catch (err) {
      setError(err.message);
      toast.error("Login failed. Please check your credentials.");
      console.error("Login error:", err);
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
            htmlFor="email"
            style={{
              display: "block",
              marginTop: 15,
              fontWeight: 500,
              textAlign: "left",
            }}
          >
            Email:
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email"
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
          <Link
            to="/signup"
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
            Don't have an account? Sign Up
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
