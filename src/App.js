import "./App.css";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ArchitectList from "./pages/ArchitectList";
import AstrologerLsit from "./pages/AstrologerLsit";
import Adminhome from "./admin/Adminhome";
import AdminLogin from "./admin/AdminLogin";
import { AdminContext } from "./contexts/Admincontext";
import AdminArchitect from "./admin/AdminArchitect";
import Adminaastroloer from "./admin/Adminaastroloer";
import Addarchitect from "./admin/Addarchitect";
import Adminuser from "./admin/Adminuser";
import ArchitectView from "./components/ArchitectView";
import ArchitectUserView from "./pages/ArchitectUserView";
import FooterSide from "./components/FooterSide";
import Mypayments from "./components/Mypayments";
import Userbooking from "./admin/Userbooking";
import SuccessBooking from "./components/SuccessBooking";
import AdminEnquiry from "./admin/AdminEnquiry";

function App() {
  const { adminNav } = useContext(AdminContext);

  return (
    <div className="app">
      {adminNav && (
        <header className="navbar">
          <Navbar />
        </header>
      )}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/architects" element={<ArchitectList />} />
          <Route path="/architects/:id" element={<ArchitectUserView />} />
          <Route path="/astrologers" element={<AstrologerLsit />} />
          <Route path="/mypayments" element={<Mypayments />} />
          <Route path="/bookingsuccess" element={<SuccessBooking />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin" element={<Adminhome />}>
            <Route path="architect" element={<AdminArchitect />} />
            <Route path="architect/:id" element={<ArchitectView />} />
            <Route path="astrologer" element={<Adminaastroloer />} />
            <Route path="addarchitect" element={<Addarchitect />} />
            <Route path="user" element={<Adminuser />} />
            <Route path="userbooking/:mail" element={<Userbooking />} />
            <Route path="enquiries" element={<AdminEnquiry />} />
          </Route>
        </Routes>
      </div>
      {adminNav && (
        <footer style={{ marginBottom: "0" }}>
          <FooterSide />
        </footer>
      )}
    </div>
  );
}

export default App;
