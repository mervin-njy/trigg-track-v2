import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Account = () => {
  const { action } = useParams(); // login or signup or settings
  const showLogin = action === "login" ? true : false;
  const showSignup = action === "signup" ? true : false;
  const showSettings = action === "settings" ? true : false;

  return (
    <>
      {showLogin && <h1>SHOW LOGIN CARD</h1>}
      {showSignup && <h1>SHOW SIGNUP CARD</h1>}
      {showSettings && <h1>SHOW SETTINGS CARD</h1>}
    </>
  );
};

export default Account;
