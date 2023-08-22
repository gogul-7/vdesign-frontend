import React, { useEffect, useContext, useState } from "react";
import { AdminContext } from "../contexts/Admincontext";
import "./Admin.css";
import Adminsidenav from "./Adminsidenav";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function Adminhome() {
  const { handleAdminNav } = useContext(AdminContext);
  const location = useLocation();
  const [hasOutlet, setHasOutlet] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("adminuser")) {
      alert("Please Login to continue");
      navigate("/adminlogin");
    }
  });

  const handleLogout = () => {
    const userconfirm = window.confirm("Are you sure?");
    if (userconfirm) localStorage.removeItem("adminuser");
    navigate("/adminlogin");
  };

  useEffect(() => {
    handleAdminNav();
    setHasOutlet(location.pathname !== "/admin");
  }, [location.pathname]);

  return (
    <div className="admin-container">
      <div className="sidenav-container">
        <Adminsidenav />
      </div>
      <div className="admin-content-container">
        {!hasOutlet && (
          <div className="admin-home-container">
            <h1>Welcome Admin !!!</h1>
            <button className="arch-view-button-delete" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
}

export default Adminhome;
