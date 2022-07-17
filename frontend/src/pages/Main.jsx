import React from "react";
import Navbar from "../components/NavBar/Navbar";
import About from "../pages/About/About";
import Garage from "../pages/Garage/Garage";

function Main() {
  return (
    <div>
      <Navbar />
      <About />
      <Garage />
    </div>
  );
}

export default Main;
