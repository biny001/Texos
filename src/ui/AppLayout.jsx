import React from "react";
import Navbar from "./Navbar";
import { Link, Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import { FiLogOut } from "react-icons/fi";

import Options from "./Options";

const AppLayout = () => {
  return (
    <div className="relative   h-screen mx-auto      sm:w-full   lg:px-28">
      <div className="   sticky z-50    space-x-2 flex items-center justify-between py-8  px-3 ">
        <Link to={"/"}>
          <img
            className="  w-36"
            src="src\assets\images\logo.svg"
          />
        </Link>
        <TopBar />
        <Options />
      </div>
      <div className="   mx-auto  max-w-[600px]">
        <div className=" w-full flex items-center justify-center">
          <Outlet />
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default AppLayout;
