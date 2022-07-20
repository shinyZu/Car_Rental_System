import React from "react";
import Footer from "../components/Footer/Footer";
import NavbarGuest from "../components/NavBar/NavbarGuest";
import About from "../pages/About/About";
import Garage from "../pages/Garage/Garage";

function Main(props) {
  return (
    <div>
      {/* <NavbarGuest /> */}
      <About />
      <Garage onSwitch={props.onSwitch} />
      <Footer />
    </div>
  );
}

export default Main;
