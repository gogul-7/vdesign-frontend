import React, { useState, useEffect } from "react";
import "./Login.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchLogin } from "../redux/slice/LoginUserSlice";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.loginuser.data);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (credentials.email === "admin") navigate("/adminlogin");
    else{
      try {
        const resultAction = await dispatch(fetchLogin(credentials));
        if (fetchLogin.rejected.match(resultAction)) {
          alert("Enter Valid Credentials");
        } else {
          localStorage.setItem("userEmail", credentials.email);
          alert("Login Succesfull");
          navigate("/");
          localStorage.setItem("authToken", userData.authToken);
        }
      } catch (error) {
        console.error("Enter Valid Credentials", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <p>Please Login To continue.</p>
        <div className="input-container">
          <label className="form-label" htmlFor="username">
            Email
          </label>
          <input
            className="form-input"
            type="text"
            name="email"
            id="email"
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
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
          <p>
            Not a user?{" "}
            <Link to={"/register"} style={{ color: "black" }}>
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
