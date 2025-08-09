import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { faS, faHome, faDesktop, faFileAlt,faUsers, faSignOutAlt  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EquipmentMonitoring = () => {
  const equipmentData = [
    {
      assetName: "PC-01",
      sensorId: "S-102",
      lastMovement: "10:10 AM",
      status: "Secure",
      statusClass: "success",
    },
    {
      assetName: "PC-02",
      sensorId: "S-103",
      lastMovement: "10:12 AM",
      status: "Moved",
      statusClass: "danger",
    },
  ];
  return (
    <div
      className="d-flex"
      style={{ fontFamily: "Segoe UI, sans-serif", background: "#f8f9fa" }}
    >
      {/* Sidebar */}
      <div
        className="sidebar p-3"
        style={{
          height: "100vh",
          backgroundColor: "#1a2e4f",
          color: "#fff",
          minWidth: "200px",
          display: "flex",
          flexDirection: "column",
          color: "#fff",
        }}
      >
        <h2 className="mb-4" style={{fontSize: "30px"}}>Lab System</h2>
        <a href="#" style={{ color: "#fff", textDecoration: "none", fontSize: "1.2rem", marginBottom: "0.7rem", textAlign: "left" }}>
          <FontAwesomeIcon icon={faHome} /> Dashboard
        </a>
        <a href="#" style={{ color: "#fff", textDecoration: "none", fontSize: "1.2rem", marginBottom: "0.7rem", textAlign: "left" }}>
          <FontAwesomeIcon icon={faDesktop} /> Equipment
        </a>
        <a href="#" style={{ color: "#fff", textDecoration: "none", fontSize: "1.2rem", marginBottom: "0.7rem", textAlign: "left" }}>
          <FontAwesomeIcon icon={faFileAlt} /> Reports
        </a>
        <a href="#" style={{ color: "#fff", textDecoration: "none", fontSize: "1.2rem", marginBottom: "0.7rem", textAlign: "left" }}>
          <FontAwesomeIcon icon={faUsers} /> Users
        </a>
        <a href="#" style={{ color: "#fff", textDecoration: "none", fontSize: "1.2rem", marginBottom: "0.7rem", textAlign: "left" }}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </a>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h2 className="mb-4">Equipment Monitoring</h2>

        {/* Filter Bar */}
        <div
          className="filter-bar mb-4"
          style={{
            background: "#fff",
            borderRadius: 6,
            padding: "1rem",
            boxShadow: "0 0 10px rgba(0,0,0,0.05)",
          }}
        >
          <div className="row g-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Filter by Room"
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Filter by Asset Type"
              />
            </div>
            <div className="col-md-3">
              <input type="date" className="form-control" />
            </div>
            <div className="col-md-3">
              <button className="btn btn-primary w-100">Apply Filters</button>
            </div>
          </div>
        </div>

        {/* Equipment Table */}
        <div className="card shadow-sm">
          <div className="card-header bg-secondary text-white">
            <strong>Lab Equipment Status</strong>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Asset Name</th>
                  <th>Sensor ID</th>
                  <th>Last Movement</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {equipmentData.map((item) => (
                  <tr key={item.sensorId}>
                    <td>{item.assetName}</td>
                    <td>{item.sensorId}</td>
                    <td>{item.lastMovement}</td>
                    <td>
                      <span className={`badge bg-${item.statusClass}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-outline-info btn-sm action-btn me-1">
                        View Logs
                      </button>
                      <button className="btn btn-outline-warning btn-sm action-btn me-1">
                        Manual Scan
                      </button>
                      <button className="btn btn-outline-secondary btn-sm">
                        Mark as Maintenance
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Floor Plan Placeholder */}
        <div className="mt-5">
          <h5 style={{textAlign: "left"}}>🗺️ Floor Plan View (Coming Soon)</h5>
          <div className="bg-light p-5 text-center border rounded">
            <em>Visual sensor map under construction...</em>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentMonitoring;
