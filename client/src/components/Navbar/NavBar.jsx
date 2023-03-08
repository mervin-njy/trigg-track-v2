import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";

const NavBar = ({ userType }) => {
  // event handlers -----------------------------------------------------------------------------------------------
  const handleClick = (event) => {
    console.log("NavBar -", "clicked: ", event.target.id);
    if (event.target.id === "logout") setLoggedUserData(null);
  };

  const showAll = userType !== "Admin" ? true : false;
  return (
    <header className="fixed z-50 flex justify-between items-center top-0 bg-mainDarkest w-full h-20 text-2xl text-mainLightest">
      {/* <img id="app-logo" src="" alt="triggtrack logo" /> */}
      <div className="w-3/12 text-center">
        <h1 className="font-tilt text-4xl font-bold tracking-wider">
          Trigg.Track.
        </h1>
      </div>
      {showAll && (
        <nav className="flex flex-wrap justify-between w-6/12">
          <ul className="flex flex-wrap justify-between items-center list-none h-full w-full my-0 mx-auto">
            <li>
              <NavLink
                to="./home"
                className={(navData) =>
                  navData.isActive
                    ? "w-1/5 pb-2 border-b-2 tracking-widest hover:text-main2"
                    : "hover:text-main2"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="./records"
                className={(navData) =>
                  navData.isActive
                    ? "w-1/5 pb-2 border-b-2 tracking-widest hover:text-main2"
                    : "hover:text-main2"
                }
              >
                Records
              </NavLink>
            </li>
            <li>
              <NavLink
                to="./connect"
                className={(navData) =>
                  navData.isActive
                    ? "w-1/5 pb-2 border-b-2 tracking-widest hover:text-main2"
                    : "hover:text-main2"
                }
              >
                Connect
              </NavLink>
            </li>
            <li>
              <NavLink
                to="./about"
                className={(navData) =>
                  navData.isActive
                    ? "w-1/5 pb-2 border-b-2 tracking-widest hover:text-main2"
                    : "hover:text-main2"
                }
              >
                About
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      <div className="flex flex-wrap justify-center w-3/12">
        <NavLink
          to="./profile"
          className="mr-4 cursor-pointer flex flex-wrap my-auto w-1/5 hover:text-main2 hover:motion-safe:animate-pulsateLittle"
          id="profile"
          onClick={handleClick}
        >
          <FaUser size={24} className="my-auto mr-2" />
          <h3 className="text-sm tracking-wide my-auto">profile</h3>
        </NavLink>
        <NavLink
          to="./welcome"
          className="cursor-pointer flex flex-wrap my-auto w-1/5 hover:text-main2 hover:motion-safe:animate-pulsateLittle"
          id="logout"
          onClick={handleClick}
        >
          <RiLogoutBoxFill size={24} className="my-auto mr-2" />
          <h3 className="text-sm tracking-wide my-auto">log out</h3>
        </NavLink>
      </div>
      {/* <Profile /> */}
    </header>
  );
};

export default NavBar;
