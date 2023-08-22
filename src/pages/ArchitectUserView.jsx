import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUploadedImagesData } from "../redux/slice/UploadedImageDataSlice";
import { fetchArchitectsData } from "../redux/slice/ArchtectDataSlice";

function ArchitectUserView() {
  const archId = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUploadedImagesData(archId));
    dispatch(fetchArchitectsData());
  }, [dispatch, archId]);

  const archData = useSelector((state) => state.architectdata.data);

  const imageData = useSelector(
    (state) => state.uploadImageData.data?.imageUrls
  );

  const architect = archData && archData.find((data) => data._id == archId.id);

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
                {/* <b>Date created:</b>&nbsp;&nbsp;{architect.date.slice(0, 10)} */}
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h2>Work Images.</h2>
          </div>
          <div className="arch-view-work-part">
            <div className="workImage-part">
              {imageData ? (
                imageData.map((image) => (
                  <img
                    src={image}
                    alt="noImag"
                    className="arch-view-work-image"
                  />
                ))
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

export default ArchitectUserView;
