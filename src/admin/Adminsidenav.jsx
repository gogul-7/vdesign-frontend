import React from "react";
import "./Admin.css";
import { Link } from "react-router-dom";

function Adminsidenav() {
  return (
    <div className="sidenav-container">
      <Link className="titleLogo" to="/admin">
        <div>
          <p style={{ fontSize: "11px" }}>admin</p>
          V-Design
        </div>
      </Link>
      <div className="sidenav-content-container">
        <Link className="sidenav-content" to="architect">
          <p>Architects</p>
        </Link>
        <Link className="sidenav-content" to="astrologer">
          <p>Astrologers</p>
        </Link>
        <Link className="sidenav-content" to="user">
          <p>Users</p>
        </Link>
        <Link className="sidenav-content" to="enquiries">
          <p>Enquiries</p>
        </Link>
      </div>
    </div>
  );
}

export default Adminsidenav;
