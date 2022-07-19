import React from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/NavBar/Navbar";
import About from "../pages/About/About";
import Garage from "../pages/Garage/Garage";

function Main(props) {
  return (
    <div>
      {/* <Navbar /> */}
      <About />
      <Garage onSwitch={props.onSwitch} />
      <Footer />
    </div>
  );
}

export default Main;
