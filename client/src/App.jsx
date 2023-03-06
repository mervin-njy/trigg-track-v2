import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
// import components
import NavBar from "./components/NavBar/NavBar";
import Account from "./components/account/Account";
import LandingPage from "./components/account/LandingPage";
import Home from "./components/home/Home";
import Records from "./components/records/Records";
// import custom hooks

function App() {
  // states -------------------------------------------------------------------------------------------------------
  // const [loginPrompt, setLoginPrompt] = useState(true);
  const [loggedUserData, setLoggedUserData] = useState(null);

  const landingEndPoint = loggedUserData ? "home" : "welcome";

  // render -------------------------------------------------------------------------------------------------------
  return (
    <>
      {loggedUserData && <NavBar />}
      <Routes>
        <Route
          path="/account/:action"
          element={<Account setLoggedUserData={setLoggedUserData} />}
        />

        {/* Navigate to welcome or home - according to login status ---------------------------------------------------------------- */}
        <Route
          path="/"
          element={<Navigate replace to={`/${landingEndPoint}`} />}
        />
        {<Route path="/welcome" element={<LandingPage />} />}
        <Route
          path="/home"
          element={<Home loggedUserData={loggedUserData} />}
        />

        {/* AFTER LOGGIN IN -------------------------------------------------------------------------------------------------------- */}
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/search" element={<Search />} /> */}
        <Route
          path="/records"
          element={<Records loggedUserData={loggedUserData} />}
        />
        {/* <Route path="/connect" element={<Connect />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </>
  );
}

export default App;
