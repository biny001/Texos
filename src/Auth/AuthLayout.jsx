import React from "react";

import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className=" flex justify-center items-center h-screen">
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
