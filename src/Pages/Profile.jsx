import { AuthContext } from "@/Context/AuthProvider";
import React, { useContext } from "react";
import { IoCalendar } from "react-icons/io5";

const Profile = () => {
  const { info } = useContext(AuthContext);
  return (
    <div className=" h-[110vh]  w-full ">
      <div className=" grid col-span-1 columns-1   h-60">
        <div
          style={{
            backgroundImage:
              "linear-gradient(rgba(96, 96, 96, 0.5), rgba(96, 96, 96, 0.5))",
          }}
          className="relative "
        >
          <div className=" size-24 z-40 absolute -bottom-[40%] left-6 rounded-full border-black border-[2px]">
            <img
              className=" w-full h-full rounded-full"
              src="public\icons\profile-placeholder.svg"
            />
          </div>
        </div>
        <div className=" bg-zinc-950 relative">
          <div className=" absolute left-7 top-16">
            <h1 className=" text-2xl font-bold">Biny</h1>
            <p className=" text-xs text-zinc-500 mb-2">biny@gmail.com</p>
            <p className="  flex  items-center text-sm  justify-center  gap-2 text-zinc-500">
              <IoCalendar className=" w-4 h-5" />
              Joined October 2022
            </p>
          </div>
          <div className=" absolute right-4 top-4  ">
            <button className="rounded-xl text-xs bg-zinc-900 px-4 py-2 text-white   hover:bg-zinc-700 transition-colors ease-in-out duration-300">
              setup profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
