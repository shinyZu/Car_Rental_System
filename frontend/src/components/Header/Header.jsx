import React, { useState } from "react";
import { Link } from "react-router-dom";
import bg__img from "../../assets/images/bg2.jpg";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style.css";
import Navbar from "../NavBar/Navbar";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";

function Header(props) {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const { classes } = props;

  function popupLogin() {
    if (openRegister) closeRegister();
    setOpenLogin(true);
  }

  function closeLogin() {
    setOpenLogin(false);
  }

  function popupRegister() {
    if (openLogin) closeLogin();
    setOpenRegister(true);
  }

  function closeRegister() {
    setOpenRegister(false);
  }

  return (
    <div>
      <header className="body-header">
        <nav>
          <ul className="horizontal-list text-center">
            <li>
              <Link to="#home">Home</Link>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#garage">Cars</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <Link to="#login" onClick={popupLogin}>
                Login
              </Link>
            </li>
            <li>
              <Link to="#register" onClick={popupRegister}>
                Register
              </Link>
            </li>
          </ul>
        </nav>

        <div className="title text-center">
          <h1>Easy Car Rental</h1>
          <h3>Drive of Your Life....</h3>
        </div>
      </header>

      <Login open={openLogin} onClose={closeLogin} onSwitch={popupRegister} />

      <Register
        open={openRegister}
        onClose={closeRegister}
        onSwitch={popupLogin}
      />
    </div>
  );
}

export default withStyles()(Header);
