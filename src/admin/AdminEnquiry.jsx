import React, { useEffect } from "react";
import { getEnquiryData } from "../redux/slice/GetEnquirySlice";
import { useDispatch, useSelector } from "react-redux";

function AdminEnquiry() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEnquiryData());
  }, []);
  const enqData = useSelector((state) => state.getEnquiryData.data);

  return (
    <div>
      <div>
        <h1>Enquiries.</h1>
        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
          {enqData &&
            enqData.map((data) => {
              const newDate = data.date.slice(0, 10);
              const id = data._id;
              return (
                <tr>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.message}</td>
                  <td>{newDate}</td>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
}

export default AdminEnquiry;
