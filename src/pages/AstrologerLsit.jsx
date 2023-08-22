import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAstrologersData } from "../redux/slice/AstrologerDataSlice";
import Astrologercard from "../components/Astrologercard";
import { AdminContext } from "../contexts/Admincontext";

function AstrologerLsit() {
  const { handleHomeBtn } = useContext(AdminContext);

  useEffect(() => {
    handleHomeBtn();
  });

  const [searchkey, setSearchKey] = useState("");

  const hanldeSeacrh = (e) => {
    setSearchKey(e.target.value);
  };
  const astrologerData = useSelector((state) => state.astrologerdata.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAstrologersData());
  }, []);

  return (
    <div className="arch-container">
      <div className="top-portion">
        <p className="arch-title">Our Astrologers.</p>
        <input
          className="arch-search"
          type="text"
          placeholder="search"
          onChange={hanldeSeacrh}
        />
      </div>
      <div className="arch-card-container">
        {astrologerData ? (
          astrologerData
            .filter((item) =>
              item.name.toLowerCase().includes(searchkey.toLowerCase())
            )
            .map((data) => {
              return <Astrologercard key={astrologerData._id} item={data} />;
            })
        ) : (
          <h3>No Data to Display</h3>
        )}
      </div>
    </div>
  );
}

export default AstrologerLsit;
