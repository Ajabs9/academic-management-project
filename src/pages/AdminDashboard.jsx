import React from "react";
import "../styles/AdminDashboard.css"; // Assuming you have a CSS file for styles
import { useAuth } from "../contexts/AuthContext";
import FloatingChatbot from "../components/FloatingChatbot";

const AdminDashboard = () => {
  const { currentUser, userData } = useAuth();

  const sidebarLinks = [
    "Dashboard",
    "Manage Students",
    "Manage Lecturers",
    "Lab Assets",
    "Reports",
    "Settings",
    "Logout",
  ];

  const cards = [
    { title: "Total Students", value: "1,253" },
    { title: "Total Lecturers", value: "48" },
    { title: "Lab Devices", value: "312" },
    { title: "Open Reports", value: "7" },
  ];

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          {sidebarLinks.map((link) => (
            <li key={link}>
              <a href="#">{link}</a>
            </li>
          ))}
        </ul>
      </aside>

      <main className="main-content">
        <header>
          {/* Use ? so that an error isn't raised during testing*/}
          {/* Remove ? when testing is done */}
          <h2>Welcome {userData?.username}</h2>
          <p>Department of Computer Science, UI</p>
        </header>

        <section className="cards">
          {cards.map((card) => (
            <div className="card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.value}</p>
            </div>
          ))}
        </section>
      </main>
      <FloatingChatbot />
    </div>
  );
};

export default AdminDashboard;
