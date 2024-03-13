import React from "react";
import { GoHome } from "react-icons/go";
import { GoSearch } from "react-icons/go";
import { IoPersonOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { GoHeart } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import { RiSearch2Fill } from "react-icons/ri";
import { GoHeartFill } from "react-icons/go";
import { IoPerson } from "react-icons/io5";

const Navbar = () => {
  const paths = [
    {
      to: "/",
      iconActive: <GoHomeFill size="24px" />,
      icon: <GoHome size="24px" />,
    },
    {
      to: "/search",
      iconActive: <RiSearch2Fill size="24px" />,
      icon: <GoSearch size="24px" />,
    },
    {
      to: "/post",
      iconActive: <FiEdit size="24px" />,
      icon: <FiEdit size="24px" />,
    },
    {
      to: "/save",
      iconActive: <GoHeartFill size="24px" />,
      icon: <GoHeart size="24px" />,
    },
    {
      to: "/profile",
      iconActive: <IoPerson size="24px" />,
      icon: <IoPersonOutline size="24px" />,
    },
  ];

  return (
    <div className="w-full  absolute bottom-0 py-2 sm:hidden ">
      <ul className="w-full flex px-4 pb-2 justify-between min-h-8 items-center">
        {paths.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className=""
          >
            {({ isActive }) => (
              <button className="bg-transparent items-center border-none  ">
                {isActive ? item.iconActive : item.icon}
              </button>
            )}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
