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
  const [loginPrompt, setLoginPrompt] = useState(true);
  const [loggedUser, setLoggedUser] = useState(null);

  // render -------------------------------------------------------------------------------------------------------
  return (
    <>
      {!loginPrompt && <NavBar />}
      <Routes>
        <Route
          path="/account/:action"
          element={
            <Account
              LoginPrompt={loginPrompt}
              setLoginPrompt={setLoginPrompt}
            />
          }
        />

        {/* Navigate to welcome or home - according to login status ---------------------------------------------------------------- */}
        <Route
          path="/"
          element={
            loginPrompt ? (
              <Navigate replace to="/welcome" />
            ) : (
              <Navigate replace to="/home" />
            )
          }
        />
        {<Route path="/welcome" element={<LandingPage />} />}
        <Route path="/home" element={<Home />} />

        {/* AFTER LOGGIN IN -------------------------------------------------------------------------------------------------------- */}
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/search" element={<Search />} /> */}
        <Route path="/records" element={<Records />} />
        {/* <Route path="/connect" element={<Connect />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </>
  );
}

export default App;
