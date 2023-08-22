import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const variants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  close: {
    clipPath: "circle(0px at 40px 40px)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

function Navbar() {
  const [nav, setNav] = useState(true);
  const [isNavopen, setIsNavopen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 1230 ? setNav(true) : setNav(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    const userConfirmed = window.confirm("Are you sure?");
    if (userConfirmed) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userEmail");
      navigate("/");
    }
  };

  const scrollToAbout = (n) => {
    window.scrollTo({ top: n, behavior: "smooth" });
  };
  return (
    <div className="nav-container">
      <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
        <div className="titleLogo">V-Design</div>
      </Link>
      {nav ? (
        <div className="navItems-container2">
          <button
            className="navButton"
            onClick={() => setIsNavopen(!isNavopen)}
          >
            <Icon icon="ic:baseline-menu" width={28} />
          </button>
          <motion.div
            animate={isNavopen ? "open" : "close"}
            variants={variants}
            transition={{
              duration: 2,
            }}
            className="navitems-container3"
          >
            <Link className="navItems navitems2" to={"/"}>
              <p onClick={() => scrollToAbout(0)}>Home</p>
            </Link>
            <Link to={"/"} className="navItems navitems2">
              <p onClick={() => scrollToAbout(900)}>About</p>
            </Link>
            <Link className="navItems navitems2" to="architects">
              <p>Our Architects</p>
            </Link>
            <Link className="navItems navitems2" to="astrologers">
              <p>Our Astrologers</p>
            </Link>
            <Link to={"/"} className="navItems navitems2">
              <p onClick={() => scrollToAbout(2000)}>Contact us</p>
            </Link>
            {localStorage.getItem("authToken") ? (
              <div className="toggled-auth-section">
                <Link to="mypayments" style={{ textDecoration: "none" }}>
                  <button className="nav-login-btn button4">My Payments</button>
                </Link>
                <button className="nav-login-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="toggled-auth-section">
                <button
                  className="nav-login-btn"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="nav-login-btn"
                  onClick={() => navigate("/register")}
                >
                  SignUp
                </button>
              </div>
            )}
          </motion.div>
        </div>
      ) : (
        <>
          <div className="navItems-container">
            <Link className="navItems" to={"/"}>
              <p onClick={() => scrollToAbout(0)}>Home</p>
            </Link>
            <Link to={"/"} className="navItems">
              <p onClick={() => scrollToAbout(900)}>About</p>
            </Link>
            <Link className="navItems" to="architects">
              <p>Our Architects</p>
            </Link>
            <Link className="navItems" to="astrologers">
              <p>Our Astrologers</p>
            </Link>
            <Link to={"/"} className="navItems">
              <p onClick={() => scrollToAbout(2000)}>Contact us</p>
            </Link>
          </div>
          <div className="nav-auth-section">
            {localStorage.getItem("authToken") ? (
              <>
                <Link to="mypayments" style={{ textDecoration: "none" }}>
                  <button className="nav-login-btn button4">My Payments</button>
                </Link>
                <button className="nav-login-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="nav-login-btn"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="nav-login-btn"
                  onClick={() => navigate("/register")}
                >
                  SignUp
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
