import React, { useContext, useEffect } from "react";
import { AdminContext } from "../contexts/Admincontext";
import { deleteAstrolger } from "../redux/slice/DeleteAstrologerSlice";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../redux/slice/CreateOrderSlice";
import { useNavigate } from "react-router-dom";

function Astrologercard({ item, setIsOpen }) {
  const { adminBtn, handleAstrId, setFalseUpload } = useContext(AdminContext);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const email = localStorage.getItem("userEmail");
  const category = "Astrologer";

  const handleUserDelete = () => {
    const id = item._id;
    console.log(id);
    dispatch(deleteAstrolger(id));
    alert("Astrologer deleted Successfully.");
    window.location.reload();
  };

  const handleUserEdit = () => {
    setFalseUpload();
    handleAstrId(item._id);
    setIsOpen(true);
  };

  const token = localStorage.getItem("authToken");

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

  const order = useSelector((state) => state.createOrder.data?.data);

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
      <img className="arch-image-container" src={item.image} alt="no_img" />
      <div className="arch-card-title">{item.name}</div>
      <div className="arch-card-decription">
        <p>Rate : &nbsp;{item.rate}&nbsp;/ Booking</p>
        <p style={{ fontSize: "18px" }}>Location :&nbsp;{item?.location}</p>
      </div>
      <div className="arch-card-button-section">
        {adminBtn ? (
          <>
            <button
              className="arch-card-button button1"
              onClick={handleUserEdit}
            >
              Edit Profile
            </button>
            <button
              className="arch-card-button button2"
              onClick={handleUserDelete}
            >
              Delete Profile
            </button>
          </>
        ) : (
          <button className="arch-card-button button2" onClick={handleBook}>
            Book an appoinment
          </button>
        )}
      </div>
    </div>
  );
}

export default Astrologercard;
