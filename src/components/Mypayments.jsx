import React, { useEffect } from "react";
import { fetchOrderData } from "../redux/slice/OrderDataSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Mypayments.css";

function Mypayments() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrderData());
  }, []);

  const orderData = useSelector((state) => state.orderData.data);

  const email = localStorage.getItem("userEmail");

  console.log(orderData);

  const archData =
    orderData &&
    orderData.filter(
      (data) =>
        data.useremail === email &&
        data.category === "Architect" &&
        data.paymentId !== null
    );

  const astrData =
    orderData &&
    orderData.filter(
      (data) =>
        data.useremail === email &&
        data.category === "Astrologer" &&
        data.paymentId !== null
    );

  console.log(astrData);

  return (
    <div className="payment-container">
      <div className="architect-payment">
        <h3>Architect</h3>
        {archData.length === 0 ? (
          <p>No bookings yet</p>
        ) : (
          archData.map((order) => (
            <div className="payment-sub-container">
              <h3>
                <u>
                  <b>Order Id:</b>&nbsp;{order.orderId.slice(6)}
                </u>
              </h3>
              <p>
                <b>Architect Name:</b>&nbsp;{order.servicename}
              </p>
              <p>
                <b>Amount Paid:</b>&nbsp;{order.amount}
              </p>
              <p>
                <b>Payment Date:</b>&nbsp;{order.date.slice(0, 10)}
              </p>
              <p>
                <b>Payment Id:</b>&nbsp;{order.paymentId}
              </p>
              <p>
                <b>Status:</b> &nbsp;Our architect will contact you shortly!
              </p>
            </div>
          ))
        )}
      </div>
      <div className="astrologer-payment">
        <h3>Astrologer</h3>
        {astrData.length === 0 ? (
          <p>No bookings yet</p>
        ) : (
          astrData.map((order) => (
            <div className="payment-sub-container">
              <h3>
                <u>
                  <b>Order Id:</b>&nbsp;{order.orderId.slice(6)}
                </u>
              </h3>
              <p>
                <b>Architect Name:</b>&nbsp;{order.servicename}
              </p>
              <p>
                <b>Amount Paid:</b>&nbsp;{order.amount}
              </p>
              <p>
                <b>Payment Id:</b>&nbsp;{order.paymentId}
              </p>
              <p>
                <b>Status:</b> &nbsp;Our astrologer will contact you shortly!
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Mypayments;
