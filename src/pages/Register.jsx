import React, { useState, useEffect } from "react";
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateUser } from "../redux/slice/CreateUserSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    mail: "",
    password: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const data = useSelector((state) => state.createuser.data);

  const handleRegister = async () => {
    try {
      const resultAction = await dispatch(fetchCreateUser(details));
      if (fetchCreateUser.rejected.match(resultAction)) {
        alert("Enter Valid Credentials");
      } else {
        alert("Registration Succesfull");
        navigate("/login");
      }
    } catch (error) {
      console.error("Enter Valid Credentials", error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <p>Register Here.</p>
        <div className="input-container">
          <label className="form-label" htmlFor="username">
            Name
          </label>
          <input
            className="form-input"
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="username">
            Mail
          </label>
          <input
            className="form-input"
            type="text"
            name="mail"
            id="mail"
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
          <label className="form-label" htmlFor="username">
            Location
          </label>
          <input
            className="form-input"
            type="text"
            name="location"
            id="location"
            onChange={handleChange}
          />
        </div>
        <div className="form-button">
          <button className="register-button" onClick={handleRegister}>
            Register
          </button>
          <p>
            Already a user?{" "}
            <Link to={"/login"} style={{ color: "black" }}>
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
