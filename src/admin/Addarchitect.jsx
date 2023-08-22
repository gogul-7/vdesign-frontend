import React, { useState, useContext, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchArchitect } from "../redux/slice/CreateContentSlice";
import { AdminContext } from "../contexts/Admincontext";
import { updateArchitect } from "../redux/slice/UpdateArchitectSlice";

function Addarchitect({ setIsOpen }) {
  const archId = useParams();

  const navigate = useNavigate();

  const archData = useSelector((state) => state.architectdata.data);

  const item = archData && archData.find((data) => data._id == archId.id);

  const { adminBtn } = useContext(AdminContext);

  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const [details, setDetails] = useState({
    name: "",
    email: "",
    location: "",
    rate: "",
  });

  useEffect(() => {
    if (adminBtn && item) {
      setDetails({
        name: item.name,
        email: item.email,
        location: item.location,
        rate: item.rate,
      });
    }
  }, [adminBtn]);

  const handleArchitect = async () => {
    const architectDetails = { ...details, file: file };
    try {
      const resultAction = await dispatch(fetchArchitect(architectDetails));
      if (fetchArchitect.rejected.match(resultAction)) {
        console.error("Architect creation/update failed");
        alert("Email already exist / Invalid mail.");
      } else {
        alert("Architect added/updated successfully");
        setIsOpen(!setIsOpen);
        navigate("/admin");
      }
    } catch (error) {
      console.error("Error adding/updating architect:", error);
    }
  };

  const handleUpdateArchitect = async () => {
    const architectDetails = { ...details, file: file, id: archId.id };
    console.log(architectDetails);
    try {
      const resultAction = await dispatch(updateArchitect(architectDetails));
      if (updateArchitect.rejected.match(resultAction)) {
        alert("Failed to update architect. Please check the data.");
      } else {
        alert("Architect added/updated successfully");
        navigate("/admin/architects");
      }
    } catch (error) {
      console.error("Error updating architect:", error);
    }
  };

  const handleImage = (e) => {
    const fileData = e.target.files[0];
    setFile(fileData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  return (
    <div className="add-arch-container">
      <div className="add-arch-close-btn">
        <Icon
          icon="iconamoon:close-bold"
          width={34}
          onClick={() => setIsOpen(!setIsOpen)}
        />
      </div>
      <label className="form-label" htmlFor="username">
        Name
      </label>
      <input
        className="form-input"
        type="text"
        name="name"
        id="name"
        placeholder={adminBtn && item?.name}
        onChange={handleChange}
      />
      <label className="form-label" htmlFor="username">
        Mail
      </label>
      <input
        className="form-input"
        type="text"
        name="email"
        id="email"
        placeholder={adminBtn && item?.email}
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
        placeholder={adminBtn && item?.location}
        onChange={handleChange}
      />
      <label className="form-label" htmlFor="username">
        Rate
      </label>
      <input
        className="form-input"
        type="text"
        name="rate"
        id="rate"
        placeholder={adminBtn && item?.rate}
        onChange={handleChange}
      />

      <label className="form-label" htmlFor="username">
        Image
      </label>
      <input
        className="form-file-input"
        type="file"
        name="file"
        id="file"
        onChange={handleImage}
      />

      {adminBtn ? (
        <button
          className="add-arch-submit-button"
          onClick={handleUpdateArchitect}
        >
          Update
        </button>
      ) : (
        <button className="add-arch-submit-button" onClick={handleArchitect}>
          Upload
        </button>
      )}
    </div>
  );
}

export default Addarchitect;
