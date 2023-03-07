import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
// import components
import NavBar from "./components/NavBar/NavBar";
import Account from "./components/account/Login";
import LandingPage from "./components/account/LandingPage";
import Home from "./components/home/Home";
import AccountManager from "./components/admin/AccountManager";
import Records from "./components/records/Records";
import Profile from "./components/profile/Profile";

// main app begins . . .
function App() {
  // states -------------------------------------------------------------------------------------------------------
  // const [loginPrompt, setLoginPrompt] = useState(true);
  const [loggedUserData, setLoggedUserData] = useState(null);
  const [userConnections, setUserConnections] = useState(null);

  // variables ----------------------------------------------------------------------------------------------------
  const landingEndPoint = loggedUserData ? "home" : "welcome";

  // render -------------------------------------------------------------------------------------------------------
  return (
    <>
      {/* Navigation bar showing available routes for each user type --------------------------------------------------------------- */}
      {loggedUserData && <NavBar userType={loggedUserData.userType} />}

      <Routes>
        {/* REMOVE: <Route
          path="/account/:action"
          element={<Account setLoggedUserData={setLoggedUserData} />}
        /> */}

        {/* Navigate to welcome or home - according to login status ---------------------------------------------------------------- */}
        <Route
          path="/"
          element={<Navigate replace to={`/${landingEndPoint}`} />}
        />
        {
          <Route
            path="/welcome"
            element={<LandingPage setLoggedUserData={setLoggedUserData} />}
          />
        }
        <Route
          path="/home"
          element={<Home loggedUserData={loggedUserData} />}
        />

        {/* AFTER LOGGIN IN -------------------------------------------------------------------------------------------------------- */}
        {/* ADMIN: CENTER ---------------------------------------------------------------------------------------- */}
        <Route path="/AccountManager" element={<AccountManager />} />

        {/* USERS: CENTER ---------------------------------------------------------------------------------------- */}
        <Route
          path="/records"
          element={<Records loggedUserData={loggedUserData} />}
        />
        {/* <Route path="/triggers" element={<Triggers />} /> */}
        {/* <Route path="/connect" element={<Connect />} /> */}
        {/* <Route path="/about" element={<About />} /> */}

        {/* COMMON: CORNER --------------------------------------------------------------------------------------- */}
        <Route
          path="/profile"
          element={<Profile loggedUserData={loggedUserData} />}
        />
      </Routes>
    </>
  );
}

export default App;
