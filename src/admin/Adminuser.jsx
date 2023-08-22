import React, { useEffect } from "react";
import { fetchUserData } from "../redux/slice/UserDataSlice";
import { deleteUser } from "../redux/slice/DeleteUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Adminuser() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  const userData = useSelector((state) => state.usersData.data);

  const handleDeleteUser = (id) => {
    const userConfirmed = window.confirm("Are you sure?");
    if (userConfirmed) {
      dispatch(deleteUser(id));
      navigate("/admin");
    }
  };

  return (
    <div>
      <div>
        <h1>Users.</h1>
        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Location</th>
            <th>Date created</th>
            <th>Actions</th>
          </tr>
          {userData &&
            userData.map((data) => {
              const newDate = data.date.slice(0, 10);
              const id = data._id;
              return (
                <tr>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.location}</td>
                  <td>{newDate}</td>
                  <td>
                    <Link to={`/admin/userbooking/${data.email}`}>
                      <button
                        className="button2"
                        style={{ marginRight: "10px" }}
                      >
                        View Payments
                      </button>
                    </Link>
                    <button
                      className="button1"
                      onClick={() => handleDeleteUser(id)}
                    >
                      Delete User
                    </button>
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
}

export default Adminuser;
