import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher, faUpload, faCalendarCheck, faEye } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from "../contexts/AuthContext";

const LecturerDashboard = () => {
  const { currentUser, userData } = useAuth();
  const overviewCards = [
    {
      title: "Practical Classes",
      value: "3 Active",
      bg: "bg-primary",
      icon: faChalkboardTeacher,
    },
    {
      title: "Materials Uploaded",
      value: "15 Total",
      bg: "bg-success",
      icon: faUpload,
    },
    {
      title: "Attendance Sessions",
      value: "5 Logged",
      bg: "bg-warning",
      icon: faCalendarCheck,
    },
  ];
  const classRows = [
    {
      code: "CSC421",
      title: "Operating Systems",
      schedule: "Weds 10:00 - 12:00",
      lab: "Lab A",
      students: 38,
    },
    {
      code: "CSC499",
      title: "Data Structures",
      schedule: "Mon 1:00 - 3:00",
      lab: "Lab B",
      students: 42,
    },
    // Add more rows as needed
  ];
  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", display: "flex", }}>
    <div
      className="dashboard container"
      style={{
        padding: "2rem",
        background: "#f8f9fa",
        fontFamily: "Segoe UI, sans-serif",
        display:"flex",
        flexDirection: "column",
      }}
    >
      <div className="welcome text-center mb-4">
        {/* Use ? so that an error isn't raised during testing*/}
        {/* Remove ? when testing is done */}
        <h2>👨‍🏫 Welcome {userData?.username}</h2>
        <p className="text-muted">Here's a quick overview of your activities</p>
      </div>

      {/* Overview cards */}
      <div className="row mb-4">
        {overviewCards.map((card, idx) => (
          <div className="col-md-4 mb-3" key={card.title}>
            <div
              className={`card text-white ${card.bg}`}
              style={{ borderRadius: 10 }}
            >
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text fs-4">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-4 d-flex flex-wrap gap-3 justify-content-center">
        <button className="btn btn-outline-primary btn-custom">
          <FontAwesomeIcon icon={faUpload} />  Upload Material
        </button>
        <button className="btn btn-outline-success btn-custom">
          <FontAwesomeIcon icon={faCalendarCheck} />Mark Attendance
        </button>
        <button className="btn btn-outline-secondary btn-custom">
          <FontAwesomeIcon icon={faEye} />View Lab Access Log
        </button>
      </div>

      {/* Class Table */}
      <div className="card" style={{ padding: "0" }}>
        <div className="card-header bg-dark text-white">
          Your Practical Classes
        </div>
        <div className="card-body" style={{padding: "0"}}>
          <table className="table" style={{marginBottom: "0"}}>
            <thead style={{ backgroundColor: "#343a40", color: "white" }}>
              <tr>
                <th>Course Code</th>
                <th>Title</th>
                <th>Schedule</th>
                <th>Lab Room</th>
                <th>Students</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {classRows.map((row) => (
                <tr key={row.code}>
                  <td>{row.code}</td>
                  <td>{row.title}</td>
                  <td>{row.schedule}</td>
                  <td>{row.lab}</td>
                  <td>{row.students}</td>
                  <td>
                    <button className="btn btn-sm btn-primary">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LecturerDashboard;