import React, { useState } from "react";
import FloatingChatbot from "../components/FloatingChatbot";

const equipmentList = [
  { name: "Projector", sensorId: "S001", status: "Online", lastMovement: "2 mins ago" },
  { name: "Router", sensorId: "S002", status: "Offline", lastMovement: "1 hour ago" },
  { name: "Printer", sensorId: "S003", status: "Online", lastMovement: "10 mins ago" },
  { name: "3D Printer", sensorId: "S004", status: "Online", lastMovement: "30 secs ago" }
];

const thStyle = { padding: "12px 15px", border: "1px solid #ddd", textAlign: "center", backgroundColor: "#e6f0ff", color: "#003366" };
const tdStyle = { padding: "12px 15px", border: "1px solid #ddd", textAlign: "center", color:"black" };

const LabSupervisorDashboard = () => {
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  const toggleAlerts = () => {
    setAlertsEnabled((prev) => !prev);
  };

  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", backgroundColor: "#f4f7fa", minHeight: "100vh", margin: 0 }}>
      <header style={{ backgroundColor: "#003366", color: "white", padding: "15px 30px", textAlign: "center", fontSize: 24 }}>
        Lab Supervisor Dashboard
      </header>

      <div style={{ padding: 30 }}>
        <div>
          <h2 style={{ fontSize: 20, marginBottom: 10, color: "#003366", textAlign:"left" }}>Live Equipment Status</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
            <thead>
              <tr>
                <th style={thStyle}>Equipment</th>
                <th style={thStyle}>Sensor ID</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Last Movement</th>
              </tr>
            </thead>
            <tbody>
              {equipmentList.map((item, idx) => (
                <tr key={item.sensorId}>
                  <td style={tdStyle}>{item.name}</td>
                  <td style={tdStyle}>{item.sensorId}</td>
                  <td
                    style={{
                      padding: "12px 15px",
                      border: "1px solid #ddd",
                      textAlign: "center",
                      color: item.status === "Online" ? "green" : "red",
                      fontWeight: "bold"
                    }}
                  >
                    {item.status}
                  </td>
                  <td style={tdStyle}>{item.lastMovement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 40, backgroundColor: "white", padding: 20, border: "1px solid #ddd", boxShadow: "0 2px 5px rgba(0,0,0,0.05)", color: "black" }}>
          <h2 style={{ fontSize: 20, marginBottom: 10, color: "#003366" }}>Alert Settings</h2>
          <p>Enable or disable real-time alerts for unauthorized movements.</p>
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#003366",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: 5,
              marginTop: 10
            }}
            onClick={toggleAlerts}
          >
            Toggle Alerts
          </button>
          <p style={{ marginTop: 10, fontWeight: "bold" }}>Alerts: {alertsEnabled ? "ON" : "OFF"}</p>
        </div>
      </div>
      <FloatingChatbot />
    </div>
  );
};

export default LabSupervisorDashboard;