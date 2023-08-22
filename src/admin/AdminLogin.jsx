import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as variables from "../variables";
import { AdminContext } from "../contexts/Admincontext";

function AdminLogin() {
  const { handleAdminNav } = useContext(AdminContext);

  const [adminDetails, setAdminDetails] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    handleAdminNav();
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails({ ...adminDetails, [name]: value });
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminDetails.username == "") alert("Please Enter Username");
    else {
      if (adminDetails.password == "") alert("Please Enter Password");
      if (
        adminDetails.username == variables.ADMIN_USER &&
        adminDetails.password == variables.ADMIN_PASS
      ) {
        alert("Login Success.");
        localStorage.setItem("adminuser", adminDetails.username);
        navigate("/admin");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <p>Admin Login</p>
        <div className="input-container">
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            className="form-input"
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="username">
            Password
          </label>
          <input
            className="form-input"
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <div className="form-button">
          <button className="login-button" onClick={handleAdminLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
