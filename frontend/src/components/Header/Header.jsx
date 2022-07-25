import React, { useEffect, useState } from "react";
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
import { useAuth } from "../../pages/Session/Auth";
import MySnackBar from "../common/Snackbar/MySnackbar";
import CarStatusChart from "../Charts/CarStatusChart/CarStatusChart";

function Header(props) {
  const { classes } = props;
  const [openLogin, setOpenLogin] = useState(true);
  const [openRegister, setOpenRegister] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    if (auth.user == null) {
      setOpenLogin(true);
    } else {
      setOpenLogin(false);
    }
  }, []);

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
            {auth.user && auth.user.status == "Customer" && (
              <li>
                <Link to="/my_profile">Profile</Link>
              </li>
            )}
            {auth.user && auth.user.status == "Driver" && (
              <li>
                <Link to="/driver_profile">Profile</Link>
              </li>
            )}
            {auth.user != null && auth.user.status == "Admin" && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
            {!auth.user && (
              <li>
                <Link to="#login" onClick={popupLogin}>
                  Login
                </Link>
              </li>
            )}
            {!auth.user && (
              <li>
                <Link to="#register" onClick={popupRegister}>
                  Register
                </Link>
              </li>
            )}

            {/* if user is not logged in --> if a new user, display the TestLogin navlink */}
            {!auth.user && (
              <li>
                <Link to="/testLogin">TestLogin</Link>
              </li>
            )}
          </ul>
        </nav>

        {/* <div
          style={{
            // border: "2px solid red",
            position: "absolute",
            top: "30px",
            right: "30px",
          }}
        >
          <Link to="#login" onClick={popupLogin}>
            <Tooltip title="Staff Login">
              <IconButton>
                <AccountCircleIcon
                  style={{ color: "#ffffff", fontSize: "50px" }}
                />
              </IconButton>
            </Tooltip>
          </Link>
        </div> */}

        <div className="title text-center">
          <h1>Easy &nbsp; Car &nbsp; Rental</h1>
          <h6>the drive of your life....</h6>
        </div>
      </header>

      <Login
        open={openLogin}
        onClose={() => {
          setOpenLogin(false);
        }}
        onSwitch={popupRegister}
        handleSnackbar={() => {
          setOpenSuccessSnackbar(true);
        }}
      />

      <Register
        open={openRegister}
        onClose={closeRegister}
        onSwitch={popupLogin}
      />

      <MySnackBar
        open={openSuccessSnackbar}
        alert="Successfully Logged In!!!"
        severity="success"
        variant="standard"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => {
          setOpenSuccessSnackbar(false);
        }}
      />
    </div>
  );
}

export default withStyles()(Header);
