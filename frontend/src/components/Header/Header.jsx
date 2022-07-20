import React, { useState } from "react";
import { Link } from "react-router-dom";
import bg__img from "../../assets/images/bg2.jpg";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style.css";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import { HashLink } from "react-router-hash-link";

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
              <Link to="/">Home</Link>
            </li>
            <li>
              <HashLink smooth to="#about">
                About
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="#garage">
                Cars
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="#contacts">
                Contacts
              </HashLink>
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
          <h1>Easy &nbsp; Car &nbsp; Rental</h1>
          <h6>the drive of your life....</h6>
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
