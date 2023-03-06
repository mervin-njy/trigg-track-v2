import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <header className={styles.navBar}>
      {/* <img id="app-logo" src="" alt="triggtrack logo" /> */}
      <div className={styles.logoSpace}>
        <h1 className={styles.appLogo}>Trigg.Track.</h1>
      </div>
      <nav>
        <ul className={styles.navBarLinks}>
          <li>
            <NavLink
              to="./home"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="./records"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              Records
            </NavLink>
          </li>
          <li>
            <NavLink
              to="./triggers"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              Connect
            </NavLink>
          </li>
          <li>
            <NavLink
              to="./about"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.profileSpace}>
        <img
          className={styles.profilePic}
          src="https://i.imgur.com/nxNDmRF.jpg"
          alt="profile-pic"
        />
        <h4 className={styles.profileOption}>sign out</h4>
      </div>
      {/* <Profile /> */}
    </header>
  );
};

export default NavBar;
