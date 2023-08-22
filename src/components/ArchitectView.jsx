import React, { useEffect, useState, useContext } from "react";
import "./ArchitectView.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { fetchImageUpload } from "../redux/slice/ImageUploadSlice";
import { fetchUploadedImagesData } from "../redux/slice/UploadedImageDataSlice";
import { fetchArchitectsData } from "../redux/slice/ArchtectDataSlice";
import Addarchitect from "../admin/Addarchitect";
import { AdminContext } from "../contexts/Admincontext";
import { deleteAcrhitect } from "../redux/slice/DeleteArchitectSlice";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const variants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px calc(100% - 40px))`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  close: {
    clipPath: "circle(20px at 40px calc(100% - 40px))",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

function ArchitectView() {
  const archId = useParams();

  const navigate = useNavigate();

  const { handleAdminBtn } = useContext(AdminContext);

  const archData = useSelector((state) => state.architectdata.data);

  useEffect(() => {
    handleAdminBtn();
  });

  const [images, setImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  const handleUserEdit = () => {
    setIsOpen(!isOpen);
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUploadedImagesData(archId));
    dispatch(fetchArchitectsData());
  }, []);

  const architect = archData && archData.find((data) => data._id == archId.id);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (images.length < 2) {
      alert("Please select more than one image to upload.");
      return;
    }
    const archDetails = { files: images, imageId: archId };

    try {
      setIsLoading(true);
      const resultAction = await dispatch(fetchImageUpload(archDetails));
      if (fetchImageUpload.pending) setIsLoading(true);
      if (fetchImageUpload.rejected.match(resultAction)) {
        alert("Failed to upload image. Please check the connection.");
        setIsLoading(false);
      } else {
        alert("Image Uploaded Successfully.");
        navigate("/admin/architect");
      }
    } catch (error) {
      console.error("Error adding/updating images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const hanldeUserDelete = () => {
    const id = archId.id;
    dispatch(deleteAcrhitect(id));
    alert("Architect Deleted Successfully.");
    navigate("/admin/architect");
  };

  const imageData = useSelector(
    (state) => state.uploadImageData.data?.imageUrls
  );

  return (
    <div className="arch-view-container">
      {architect && (
        <>
          <h1>{architect.name}</h1>
          <div className="arch-view-desc-part">
            <img className="arch-view-desc-img" src={architect.image} alt="" />
            <div style={{ marginLeft: "20px", fontSize: "20px" }}>
              <p>
                <b>Email:</b>&nbsp;&nbsp;{architect.email}
              </p>
              <p>
                <b>Location:</b>&nbsp;&nbsp;{architect.location}
              </p>
              <p>
                <b>Rate:</b>&nbsp;&nbsp;{architect.rate}
              </p>
              <p>
                <b>Date created:</b>&nbsp;&nbsp;{architect.date.slice(0, 10)}
              </p>
              <div className="arch-view-button-part">
                <button
                  className="arch-view-button-edit"
                  onClick={handleUserEdit}
                >
                  Edit
                </button>
                <button
                  className="arch-view-button-delete"
                  onClick={hanldeUserDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <motion.div
            className="add-arch-part"
            animate={isOpen ? "open" : "close"}
            variants={variants}
            transition={{
              duration: 2,
            }}
          >
            <Addarchitect setIsOpen={setIsOpen} item={architect} />
          </motion.div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h2>Work Images.</h2>
            {imageData ? (
              <form encType="multipart/form-data" className="work-image-form">
                <input
                  type="file"
                  multiple
                  name="images"
                  className="custom-file-input input1"
                  title="Add More Photos"
                  onChange={handleFileChange}
                />
                <button
                  className="custom-file-button"
                  onClick={handleImageUpload}
                >
                  <Icon icon="ic:baseline-upload" width={28} />
                </button>
              </form>
            ) : (
              <form encType="multipart/form-data" className="work-image-form">
                <input
                  type="file"
                  multiple
                  name="images"
                  className="custom-file-input input2"
                  onChange={handleFileChange}
                />
                <button
                  className="custom-file-button"
                  onClick={handleImageUpload}
                >
                  <Icon icon="ic:baseline-upload" width={28} />
                </button>
              </form>
            )}
          </div>
          <div className="arch-view-work-part">
            {imageData && isloading && (
              <div className="loader-container">
                <Loader></Loader>
              </div>
            )}
            <div className="workImage-part">
              {imageData ? (
                imageData.map((image) => (
                  <img
                    src={image}
                    alt="noImag"
                    className="arch-view-work-image"
                  />
                ))
              ) : isloading ? (
                <div className="loader-container">
                  <Loader></Loader>
                </div>
              ) : (
                <p>No Works to Display</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ArchitectView;
