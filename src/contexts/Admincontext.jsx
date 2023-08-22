import React, { createContext, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminNav, setAdminNav] = useState(true);
  const [adminBtn, setAdminBtn] = useState(false);
  const [uploadBtn, setUploadBtn] = useState(false);
  const [astrId, setAstrId] = useState("");
  const [bookBtn, setBookBtn] = useState(false);

  console.log("admin", adminBtn);
  console.log("upload", uploadBtn);

  const setFalseUpload = () => {
    setUploadBtn(false);
  };
  const setTrueUpload = () => {
    setUploadBtn(true);
  };
  const setFalseBook = () => {
    setBookBtn(false);
  };
  const setTrueBook = () => {
    setBookBtn(true);
  };

  const handleAdminNav = () => {
    setAdminNav(false);
  };
  const handleHomeNav = () => {
    setAdminNav(true);
  };

  const handleAdminBtn = () => {
    setAdminBtn(true);
  };
  const handleHomeBtn = () => {
    setAdminBtn(false);
  };

  const handleAstrId = (n) => {
    setAstrId(n);
  };
  console.log(adminNav);
  return (
    <AdminContext.Provider
      value={{
        adminNav,
        adminBtn,
        astrId,
        uploadBtn,
        bookBtn,
        setFalseBook,
        setTrueBook,
        handleAdminNav,
        handleHomeNav,
        handleAdminBtn,
        handleHomeBtn,
        handleAstrId,
        setFalseUpload,
        setTrueUpload,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
