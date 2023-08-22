import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { AdminContext } from "../contexts/Admincontext";
import { Link } from "react-router-dom";
import { enquiryPost } from "../redux/slice/EnquirySlice";
import { useDispatch } from "react-redux";

function Home() {
  const { handleHomeNav } = useContext(AdminContext);

  const dispatch = useDispatch();

  const [enqDetails, setEnqDetails] = useState({
    email: "",
    name: "",
    message: "",
  });

  useEffect(() => {
    handleHomeNav();
  });

  const handleEnquiry = async (e) => {
    dispatch(enquiryPost(enqDetails));
    try {
      const resultAction = await dispatch(enquiryPost(enqDetails));
      if (enquiryPost.rejected.match(resultAction)) {
        alert("Enter valid mail.");
      } else {
        alert("Message sent successfully.");
      }
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnqDetails({ ...enqDetails, [name]: value });
  };

  // console.log(enqDetails);

  return (
    <div className="home-container">
      <div className="carousal-part"></div>
      <p className="home-heading">Welcome to V-Design</p>
      <div className="home-content">
        <div className="home-content-image"></div>
        <div className="home-content-container">
          <p style={{ fontSize: "40px", fontWeight: "600" }}>
            Communicate. <br />
            Collaborate. Create.
          </p>
          <p>
            V-Design provides an effective and powerful <br /> way to manage
            your home construction.
          </p>
          <Link to={"/login"}>
            <button className="home-content-button">Get Started</button>
          </Link>
        </div>
      </div>
      <div className="about-part">
        <div className="about-content-container">
          <p className="about-header">
            With the Right <br /> Direction, Great <br /> Things Can Happen
          </p>
          <p style={{ width: "350px", marginTop: "68px" }}>
            I'm a paragraph. Click here to add your own text and edit me. It’s
            easy. Just click “Edit Text” or double click me to add your own
            content and make changes to the font. Feel free to drag and drop me
            anywhere you like on your page. I’m a great place for you to tell a
            story and let your users know a little more about you.
          </p>
        </div>
      </div>
      <div className="contact">
        <div className="contact-map"></div>
        <div className="contact-form">
          <h3>Contact Us</h3>
          <form action="">
            <div className="input-container">
              <input
                className="home-input"
                type="text"
                name="name"
                placeholder="Enter your name.."
                onChange={handleChange}
              />
              <input
                className="home-input"
                type="text"
                name="email"
                placeholder="Enter your Email.."
                onChange={handleChange}
              />
              <textarea
                className="home-textarea"
                type="textArea"
                name="message"
                rows={4}
                placeholder="Enter your enquiry.."
                onChange={handleChange}
              />
            </div>
            <button
              className="home-content-button button3"
              onClick={handleEnquiry}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
