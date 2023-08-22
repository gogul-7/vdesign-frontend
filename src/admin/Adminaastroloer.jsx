import React, { useState, useEffect, useContext } from "react";
import { Icon } from "@iconify/react";
import Addastrologer from "./Addastrologer";
import { motion } from "framer-motion";
import Astrologercard from "../components/Astrologercard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAstrologersData } from "../redux/slice/AstrologerDataSlice";
import { AdminContext } from "../contexts/Admincontext";

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

function Adminaastroloer() {
  const { setTrueUpload, handleAdminBtn } = useContext(AdminContext);

  const [isOpen, setIsOpen] = useState(false);

  const astrologerData = useSelector((state) => state.astrologerdata.data);
  console.log(astrologerData);

  const dispatch = useDispatch();

  const handleAddButton = () => {
    setTrueUpload();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    handleAdminBtn();
    dispatch(fetchAstrologersData());
  }, []);

  return (
    <div className="admin-arch-container">
      <div className="arch-header">
        <h1>Astrologers.</h1>
        <button className="arch-add-button" onClick={handleAddButton}>
          Add <Icon icon="fluent:person-add-24-filled" width={24} />
        </button>
      </div>
      <div className="arch-view-part">
        {astrologerData && astrologerData.length == 0 ? (
          <h3>No Data to Display</h3>
        ) : (
          astrologerData?.map((data) => {
            return (
              <Astrologercard
                key={astrologerData._id}
                item={data}
                setIsOpen={setIsOpen}
              />
            );
          })
        )}
      </div>
      <motion.div
        className="add-arch-part"
        animate={isOpen ? "open" : "close"}
        variants={variants}
        transition={{
          duration: 2,
        }}
      >
        <Addastrologer setIsOpen={setIsOpen} item={astrologerData} />
      </motion.div>
    </div>
  );
}

export default Adminaastroloer;
