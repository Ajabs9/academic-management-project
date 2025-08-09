import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import LabSupervisorDashboard from './pages/LabSupervisorDashboard'
import AdminDashboard from './pages/AdminDashboard'
import LecturerDashboard from './pages/LecturerDashboard'
import Studentdashboard from './pages/Studentdashboard'
import EquipmentMonitoring from './pages/EquipmentMonitoring'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/lecturer-dashboard" element={<LecturerDashboard />} />
        <Route path="/lab-supervisor-dashboard" element={<LabSupervisorDashboard />} />
        <Route path="student-dashboard" element={<Studentdashboard />} />
        <Route path='equipment-monitoring' element={<EquipmentMonitoring />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
