import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from '../contexts/AuthContext';

const Studentdashboard = () => {
  const { currentUser, userData } = useAuth();

  const sidebarLinks = [
  { label: "🏠 Dashboard", active: true },
  { label: "📚 Practical Modules" },
  { label: "📥 Request Lab Access" },
  { label: "🧪 Assigned Practicals" },
  { label: "📝 Submit Reports" },
  { label: "🖥️ Hardware Log" },
  { label: "📊 Progress Tracker" },
  { label: "📄 Academic Resources" },
  { label: "📧 Support" },
];

const quickActions = [
  "✅ Submit Lab Report",
  "📅 Book Lab Slot",
  "📦 Check Assigned Equipment",
  "📖 Download Practical Module",
];

const accessRequests = [
  { date: "July 6", time: "10:00 AM", lab: "2B", status: "Approved" },
  { date: "July 4", time: "3:00 PM", lab: "3C", status: "Denied" },
];

const progressStats = [
  { icon: "✅", text: <><strong>3/5</strong> Practicals Submitted</> },
  { icon: "🖥️", text: <><strong>2</strong> Equipments Returned</> },
  { icon: "🧾", text: <><strong>1</strong> Report Pending</> },
  { icon: "⌛", text: <> <strong>Next Lab:</strong> Aug 8, 9:00 AM </> },
];

  return (
    <div className="container-fluid" style={{ fontFamily: "Segoe UI, sans-serif", textAlign: "left" }}>
    <div className="row">
      {/* Sidebar */}
      <div className="col-md-2 sidebar" style={{ height: "100vh", background: "#1a1a2e", color: "#fff", paddingTop: 20 }}>
        <h5 className="text-center">CSC UI LMS</h5>
        {sidebarLinks.map((link) => (
          <a
            key={link.label}
            href="#"
            className={link.active ? "active" : ""}
            style={{
              color: link.active ? "#fff" : "#ccc",
              background: link.active ? "#16213e" : "none",
              padding: "12px 20px",
              display: "block",
              textDecoration: "none",
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Main Content */}
      <div className="col-md-10 content" style={{ padding: 20, background: "#f7f9fc", height: "100vh", overflowY: "auto" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Use ? so that an error isn't raised during testing*/}
        {/* Remove ? when testing is done */}
        <h2>Welcome back {userData?.username}</h2>
          <div>
            <button className="btn btn-outline-secondary me-2">🔔</button>
            <button className="btn btn-outline-secondary">👤</button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="row g-3 mb-4">
          {quickActions.map((action) => (
            <div className="col-md-3" key={action}>
              <div className="card card-action p-3 shadow-sm" style={{ cursor: "pointer", transition: "transform 0.2s" }}>
                <h6>{action}</h6>
              </div>
            </div>
          ))}
        </div>

        {/* Assigned Practical */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5>🧪 Today’s Assigned Practical</h5>
            <p><strong>Course:</strong> CSC 421 - Operating Systems</p>
            <p><strong>Practical:</strong> Process Scheduling Algorithms</p>
            <p><strong>Status:</strong> Pending</p>
            <p><strong>Time:</strong> 11:00 AM – 1:00 PM</p>
            <p><strong>Location:</strong> Lab 3A</p>
          </div>
        </div>

        {/* Access Requests */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5>📥 Recent Lab Access Requests</h5>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Lab</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {accessRequests.map((req, idx) => (
                  <tr key={idx}>
                    <td>{req.date}</td>
                    <td>{req.time}</td>
                    <td>{req.lab}</td>
                    <td>
                      <span className={`badge bg-${req.status === "Approved" ? "success" : "danger"}`}>{req.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="row g-3">
          {progressStats.map((stat, idx) => (
            <div className="col-md-3" key={idx}>
              <div className="card p-3 shadow-sm progress-box" style={{ fontSize: 14 }}>
                {stat.icon} {stat.text}
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-4 text-center text-muted small">
          © 2025 Department of Computer Science, University of Ibadan.
        </footer>
      </div>
    </div>
    </div>
  )
}

export default Studentdashboard