import React, { useEffect } from "react";
import "./Architectcard.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../contexts/Admincontext";
import { createOrder } from "../redux/slice/CreateOrderSlice";
import { useDispatch, useSelector } from "react-redux";

function Architectcard({ item }) {
  const { bookBtn } = useContext(AdminContext);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const category = "Architect";

  const email = localStorage.getItem("userEmail");
  const token = localStorage.getItem("authToken");

  const order = useSelector((state) => state.createOrder.data?.data);

  const handleBook = async () => {
    if (token !== null) {
      const details = {
        rate: item.rate,
        email: email,
        name: item.name,
        category: category,
      };
      dispatch(createOrder(details));
    } else {
      alert("Please Login to Book");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (order) {
      handleOpenPortal();
    }
  }, [order]);

  const handleOpenPortal = async () => {
    const options = {
      key: "rzp_test_6Puuv0n2ovHHbh",
      amount: order.amount,
      currency: "INR",
      name: "V-Desing corp",
      description: "Booking Payment",
      image:
        "https://media.istockphoto.com/id/849525242/vector/letter-v-logo-blue-vector-icon-ribbon-styled-font.jpg?s=170667a&w=0&k=20&c=9pC89LYAye1rU8_GP8GmJkQ98q0YnfqKjQbaaeZylcA=",
      order_id: order.id,
      callback_url: "https://v-design.onrender.com/api/paymentverification",
      prefill: {
        name: item.name,
        email: item.email,
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#5C9AFF",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="card-container">
      <img className="arch-image-container" src={item?.image} alt="no_img" />
      <div className="arch-card-title">{item?.name}</div>
      <div className="arch-card-decription">
        <p>Rate :&nbsp;{item?.rate}&nbsp;/ sqft.</p>
        <p style={{ fontSize: "18px" }}>Location :&nbsp;{item?.location}</p>
      </div>
      <div className="arch-card-button-section">
        <Link
          style={{ textDecoration: "none" }}
          to={
            bookBtn
              ? `/architects/${item?._id}`
              : `/admin/architect/${item?._id}`
          }
        >
          <button className="arch-card-button button1">View Works</button>
        </Link>
        {bookBtn && (
          <button className="arch-card-button button2" onClick={handleBook}>
            Book a site visit.
          </button>
        )}
      </div>
    </div>
  );
}

export default Architectcard;
