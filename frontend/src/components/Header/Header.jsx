import React, { useState } from "react";
import { Link } from "react-router-dom";
import bg__img from "../../assets/images/bg2.jpg";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style.css";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import { HashLink } from "react-router-hash-link";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { display } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

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

        <div
          style={{
            // border: "2px solid red",
            position: "absolute",
            top: "30px",
            right: "30px",
          }}
        >
          <Link to="#register" onClick={popupRegister}>
            <Tooltip title="Admin/Driver">
              <IconButton>
                <AccountCircleIcon
                  style={{ color: "#ffffff", fontSize: "50px" }}
                />
              </IconButton>
            </Tooltip>
          </Link>
        </div>
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
