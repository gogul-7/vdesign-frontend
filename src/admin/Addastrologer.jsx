import React, { useState, useEffect, useContext } from "react";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAstrologer } from "../redux/slice/CreateAstrologerSlice";
import { AdminContext } from "../contexts/Admincontext";
import { updateAstrologer } from "../redux/slice/UpdateAstrologerSlice";
import { useNavigate } from "react-router-dom";

function Addastrologer({ setIsOpen }) {
  const { uploadBtn, astrId } = useContext(AdminContext);

  const navigate = useNavigate();

  const item = useSelector((state) => state.astrologerdata.data);

  const astrData = item && item.find((data) => data._id === astrId);

  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const [details, setDetails] = useState({
    name: "",
    email: "",
    location: "",
    rate: "",
  });

  console.log(details);

  useEffect(() => {
    if (astrData) {
      setDetails({
        name: astrData.name,
        email: astrData.email,
        location: astrData.location,
        rate: astrData.rate,
      });
    }
  }, [uploadBtn, astrData]);

  const handleAstrologer = async () => {
    const astrologerDetails = { ...details, file: file };
    try {
      const resultAction = await dispatch(fetchAstrologer(astrologerDetails));
      if (fetchAstrologer.rejected.match(resultAction)) {
        alert("Email already exist. / Invalid mail.");
      } else {
        alert("Astrologer added/updated successfully");
        setIsOpen(!setIsOpen);
        navigate("/admin");
      }
    } catch (error) {
      console.error("Error adding/updating astrologer:", error);
    }
  };
  const handleUpdateAstrologer = async () => {
    const astrologerDetails = { ...details, file: file, id: astrId };
    dispatch(updateAstrologer(astrologerDetails));
    try {
      const resultAction = await dispatch(updateAstrologer(astrologerDetails));
      if (updateAstrologer.rejected.match(resultAction)) {
        alert("Failed to update Astrologer. Please check the data.");
      } else {
        alert("Astrologer updated successfully");
        navigate("/admin");
      }
    } catch (error) {
      console.error("Error adding/updating Astrologer:", error);
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
        placeholder={!uploadBtn && astrData?.name}
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
        placeholder={!uploadBtn && astrData?.email}
        onChange={handleChange}
      />
      <label className="form-label" htmlFor="username">
        Location
      </label>
      <input
        className="form-input"
        type="text"
        name="location"
        placeholder={!uploadBtn && astrData?.location}
        id="location"
        onChange={handleChange}
      />
      <label className="form-label" htmlFor="username">
        Rate
      </label>
      <input
        className="form-input"
        type="text"
        name="rate"
        placeholder={!uploadBtn && astrData?.rate}
        id="rate"
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

      {uploadBtn ? (
        <button className="add-arch-submit-button" onClick={handleAstrologer}>
          Upload
        </button>
      ) : (
        <button
          className="add-arch-submit-button"
          onClick={handleUpdateAstrologer}
        >
          Update
        </button>
      )}
    </div>
  );
}

export default Addastrologer;
