import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
// import components
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/home/Home";
import Records from "./components/records/Records";
// import custom hooks

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/records" element={<Records />} />
        {/* <Route path="/triggers" element={<TriggerDisplay />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </>
  );
}

export default App;
