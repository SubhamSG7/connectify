import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wrapper = () => {
  return (
    <div>
      <Header />
      <ToastContainer />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Wrapper;
