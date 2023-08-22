import React from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

function SuccessBooking() {
  const seachQuery = useSearchParams()[0];

  const referenceNum = seachQuery.get("reference");
  return (
    <div className="success-container">
      <h1>Booking successfull.</h1>
      <h3>Refference id :&nbsp;&nbsp;{referenceNum}</h3>
      <Link to="/mypayments" style={{ color: "black" }}>
        <p>Go to Mypayments for more info.</p>
      </Link>
    </div>
  );
}

export default SuccessBooking;
