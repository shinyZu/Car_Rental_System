import React, { useEffect } from "react";
import Footer from "../components/Footer/Footer";
import NavbarGuest from "../components/NavBar/NavbarGuest";
import About from "../pages/About/About";
import Garage from "../pages/Garage/Garage";

function Main(props) {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <div>
      <About />
      <Garage />
      <Footer />
    </div>
  );
}

export default Main;
