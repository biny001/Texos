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
import { CgOptions } from "react-icons/cg";

const TopBar = () => {
  const paths = [
    {
      to: "/",
      iconActive: <GoHomeFill size="28px" />,
      icon: <GoHome size="28px" />,
    },
    {
      to: "/search",
      iconActive: <RiSearch2Fill size="28px" />,
      icon: <GoSearch size="28px" />,
    },
    {
      to: "/post",
      iconActive: (
        <FiEdit
          size="28px"
          fill="#fffff"
        />
      ),
      icon: (
        <FiEdit
          strokeWidth="1.5px"
          size="28px"
        />
      ),
    },
    {
      to: "/saved",
      iconActive: <GoHeartFill size="28px" />,
      icon: <GoHeart size="28px" />,
    },
    {
      to: "/profile",
      iconActive: <IoPerson size="28px" />,
      icon: <IoPersonOutline size="28px" />,
    },
  ];

  return (
    <div className=" flex-1 hidden    h-full   py-2 sm:p-0 sm:block">
      <ul className="w-full flex px-4 pb-2 h-full sm:pb-0 sm:p-0   justify-center space-x-12  min-h-8 items-center">
        {paths.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="h-full -ml-12"
          >
            {({ isActive }) => (
              <button className="bg-transparent h-full  flex flex-col  justify-start border-none">
                {isActive ? item.iconActive : item.icon}
              </button>
            )}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default TopBar;
