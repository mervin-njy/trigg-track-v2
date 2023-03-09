import React, { useState } from "react";

// START OF COMPONENT ***********************************************************************************************************************
const LoggerHome = ({ loggerInfo }) => {
  // states -------------------------------------------------------------------------------------------------------
  // state toggles from question button click => show form input fields when true
  const [showForm, setShowForm] = useState(false);
  // state checks if details on today's date already exists in the database => show question types
  const [todayDone, setTodayDone] = useState(false);

  //   event handlers ---------------------------------------------------------------------------------------------
  const handleOpenForm = () => {
    setShowForm(true);
  };

  // render component --------------------------------------------------------------------------------------------
  return (
    <div>
      <h2>Fill form</h2>
    </div>
  );
};

export default LoggerHome;
