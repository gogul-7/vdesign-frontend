import React, { useState, useEffect, useContext } from "react";
import "./Admin.css";
import { Icon } from "@iconify/react";
import Architectcard from "../components/Architectcard";
import Addarchitect from "./Addarchitect";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchArchitectsData } from "../redux/slice/ArchtectDataSlice";
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

function AdminArchitect() {
  const dispatch = useDispatch();

  const architectData = useSelector((state) => state.architectdata.data);

  const { handleHomeBtn, setFalseBook } = useContext(AdminContext);

  useEffect(() => {
    handleHomeBtn();
    setFalseBook();
  });

  useEffect(() => {
    dispatch(fetchArchitectsData());
  }, []);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="admin-arch-container">
      <div className="arch-header">
        <h1>Architects.</h1>
        <button className="arch-add-button" onClick={handleOpen}>
          Add <Icon icon="fluent:person-add-24-filled" width={24} />
        </button>
      </div>
      <div className="arch-view-part">
        {architectData && architectData.length == 0 ? (
          <h3>No Data to Display</h3>
        ) : (
          architectData?.map((data) => {
            return <Architectcard key={data._id} item={data} />;
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
        <Addarchitect setIsOpen={setIsOpen} />
      </motion.div>
    </div>
  );
}

export default AdminArchitect;
