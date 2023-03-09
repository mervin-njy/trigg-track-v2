import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";

// START OF COMPONENT ***********************************************************************************************************************
const NavBar = ({ userType, setLoggedUserData }) => {
  // variables ----------------------------------------------------------------------------------------------------
  const showAll = userType !== "Admin" ? true : false;
  const showLogger = userType !== "Service Provider" ? true : false;

  // event handlers -----------------------------------------------------------------------------------------------
  const handleLogout = () => {
    console.log("NavBar -", "logout clicked: ");
    setLoggedUserData(null);
  };

  const handleProfile = () => {};

  // render component ---------------------------------------------------------------------------------------------
  return (
    <header className="fixed z-50 flex justify-between items-center top-0 bg-mainDarkest w-full h-20 text-2xl text-mainLightest">
      {/* <img id="app-logo" src="" alt="triggtrack logo" /> */}
      <NavLink
        to="./home"
        className="w-3/12 text-center font-tilt text-4xl font-bold tracking-wider hover:text-main2"
      >
        Trigg.Track.
      </NavLink>

      {showAll && (
        <nav className="flex flex-wrap justify-between w-6/12">
          {showLogger && (
            <ul className="flex flex-wrap justify-around items-center list-none h-full w-full my-0 mx-auto">
              {/* <li>
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
              </li> */}
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
                  to="./services"
                  className={(navData) =>
                    navData.isActive
                      ? "w-1/5 pb-2 border-b-2 tracking-widest hover:text-main2"
                      : "hover:text-main2"
                  }
                >
                  Services
                </NavLink>
              </li>
            </ul>
          )}

          {/* for service providers */}
          {!showLogger && (
            <ul className="flex flex-wrap justify-around items-center list-none h-full w-full my-0 mx-auto">
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
                  to="./Services"
                  className={(navData) =>
                    navData.isActive
                      ? "w-1/5 pb-2 border-b-2 tracking-widest hover:text-main2"
                      : "hover:text-main2"
                  }
                >
                  Services
                </NavLink>
              </li>
            </ul>
          )}
        </nav>
      )}
      <div className="flex flex-wrap justify-center w-3/12">
        <NavLink
          to="./profile"
          className="mr-4 cursor-pointer flex flex-wrap my-auto w-1/5 hover:text-blueAccent"
          id="profile"
          onClick={handleProfile}
        >
          <FaUser size={24} className="my-auto mr-2" />
          <h3 className="text-sm tracking-wide my-auto">profile</h3>
        </NavLink>
        <NavLink
          to="./welcome"
          className="cursor-pointer flex flex-wrap my-auto w-1/5 hover:text-yellowAccent"
          id="logout"
          onClick={handleLogout}
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
