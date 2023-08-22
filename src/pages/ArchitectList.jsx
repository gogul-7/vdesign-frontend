import React, { useEffect, useState } from "react";
import "./ArchitectList.css";
import Architectcard from "../components/Architectcard";
import { fetchArchitectsData } from "../redux/slice/ArchtectDataSlice";
import { useSelector, useDispatch } from "react-redux";
import { useContext } from "react";
import { AdminContext } from "../contexts/Admincontext";

function ArchitectList() {
  const { setTrueBook } = useContext(AdminContext);
  const dispatch = useDispatch();
  const [searchkey, setSearchKey] = useState("");

  const hanldeSeacrh = (e) => {
    setSearchKey(e.target.value);
  };

  useEffect(() => {
    setTrueBook();
  });

  // console.log(searchkey);

  useEffect(() => {
    dispatch(fetchArchitectsData());
  });

  const architectData = useSelector((state) => state.architectdata.data);

  return (
    <div className="arch-container">
      <div className="top-portion">
        <p className="arch-title">Our Architects.</p>
        <input
          className="arch-search"
          type="text"
          placeholder="search"
          onChange={hanldeSeacrh}
        />
      </div>
      <div className="arch-card-container">
        {architectData ? (
          architectData
            .filter((item) =>
              item.name.toLowerCase().includes(searchkey.toLowerCase())
            )
            .map((data) => {
              return <Architectcard key={data._id} item={data} />;
            })
        ) : (
          <h3>No Data to Display</h3>
        )}
      </div>
    </div>
  );
}

export default ArchitectList;
