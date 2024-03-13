import React from "react";
import { NavLink } from "react-router-dom";

const Button = ({ to, children }) => {
  return (
    <button className=" border-none flex items-center bg-transparent justify-center">
      <NavLink to={to}>{children}</NavLink>
    </button>
  );
};

export default Button;
