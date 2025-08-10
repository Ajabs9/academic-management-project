import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LabSupervisorDashboard from "./pages/LabSupervisorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import LecturerDashboard from "./pages/LecturerDashboard";
import Studentdashboard from "./pages/Studentdashboard";
import EquipmentMonitoring from "./pages/EquipmentMonitoring";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/lecturer-dashboard" element={<LecturerDashboard />} />
          <Route
            path="/lab-supervisor-dashboard"
            element={<LabSupervisorDashboard />}
          />
          <Route path="student-dashboard" element={<Studentdashboard />} />
          <Route
            path="equipment-monitoring"
            element={<EquipmentMonitoring />}
          />
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
