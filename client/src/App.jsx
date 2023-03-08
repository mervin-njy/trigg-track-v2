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
  // const [loggedUserData, setLoggedUserData] = useState({
  //   access:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJhNDM1MTJmLWZiMjEtNDcyNC1iMzM5LTk2YmFkM2ZhMmUyMSIsInVzZXJuYW1lIjoibWVydmluX25qeSIsImFjY2Vzc1R5cGUiOiJQdWJsaWMiLCJ1c2VyVHlwZSI6IkhlYWx0aCBMb2dnZXIiLCJpYXQiOjE2NzgyNTE0MzAsImV4cCI6MTY3ODI1MjYzMCwianRpIjoiMmE0MzUxMmYtZmIyMS00NzI0LWIzMzktOTZiYWQzZmEyZTIxIn0.Izl7DL9bWGjPpNAncJshrDOYigbYpdIBfPbfJLW5W0k",
  //   accessType: "Public",
  //   bio: '"Long time victim of eczema flares on a daily basis, gets triggered easily by sweat, stress, lack of sleep and probably diet - here to find out! Tries to exercise 1-3 times a week and cook if possible."',
  //   displayName: "Mervin Ng",
  //   email: "mervin.njy@outlook.com",
  //   profession: "Student",
  //   refresh:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJhNDM1MTJmLWZiMjEtNDcyNC1iMzM5LTk2YmFkM2ZhMmUyMSIsInVzZXJuYW1lIjoibWVydmluX25qeSIsImFjY2Vzc1R5cGUiOiJQdWJsaWMiLCJ1c2VyVHlwZSI6IkhlYWx0aCBMb2dnZXIiLCJpYXQiOjE2NzgyNTE0MzAsImV4cCI6MTY4MDg0MzQzMCwianRpIjoiMmE0MzUxMmYtZmIyMS00NzI0LWIzMzktOTZiYWQzZmEyZTIxIn0.dY0FltjOlgL7R0Lb_Ciz9MSDdxErUS_uATj3sP4r7Nc",
  //   userType: "Health Logger",
  //   username: "mervin_njy",
  // });
  const [loggedUserData, setLoggedUserData] = useState(null);
  const [newUser, setNewUser] = useState(false);
  const [userConnections, setUserConnections] = useState(null);

  // variables ----------------------------------------------------------------------------------------------------
  const landingEndPoint = loggedUserData ? "home" : "welcome";

  // render -------------------------------------------------------------------------------------------------------
  return (
    <>
      {/* Navigation bar showing available routes for each user type --------------------------------------------------------------- */}
      {loggedUserData && (
        <NavBar
          userType={loggedUserData.userType}
          setLoggedUserData={setLoggedUserData}
        />
      )}

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
            element={
              <LandingPage
                setLoggedUserData={setLoggedUserData}
                setUserConnections={setUserConnections}
                setNewUser={setNewUser}
              />
            }
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
