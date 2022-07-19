import React, { Component, Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import CallIcon from "@mui/icons-material/Call";
import { styleSheet } from "./style";
import { withStyles } from "@mui/styles";
import Login from "../../pages/Login/Login";
import { Link, NavLink } from "react-router-dom";

function Navbar(props) {
  const [value, setValue] = useState("");
  const [openModal, setOpenModal] = useState(false);

  function changePage(e) {
    console.log(e);
    console.log("Page Changed...");
  }

  const { classes } = props;
  return (
    // <div>
    <Box className={classes.nav__bar}>
      <Tabs
        // value={value}
        onChange={changePage}
        className={classes.nav__tabs}
      >
        <div className={classes.nav_left}>
          <Tab
            icon={<HomeIcon />}
            className={classes.nav__text}
            label="Home"
            // href="#home"
            onClick={() => {
              console.log("to homeeeeeeeee...........");
              props.onSwitch("main");
            }}
          />
          <Tab
            icon={<EmojiTransportationIcon />}
            className={classes.nav__text}
            label="About"
            href="#about"
          />
          <Tab
            icon={<DirectionsCarIcon />}
            className={classes.nav__text}
            label="Cars"
            href="#garage"
          />
          <Tab
            icon={<CallIcon />}
            className={classes.nav__text}
            label="Contact"
            href="#contact"
          />
        </div>
        <div className={classes.nav__right}>
          {/* <Tab
            icon={<LoginIcon />}
            className={classes.nav__text}
            label="Login"
            href="#login"
            onClick={() => setOpenModal(true)}
          />
          <Tab
            icon={<HowToRegIcon />}
            className={classes.nav__text}
            label="Register"
            href="#register"
          /> */}
          <Tab
            icon={<LogoutIcon />}
            className={classes.nav__text}
            label="Logout"
            href="#logout"
          />
        </div>
      </Tabs>
      <Login open={openModal} onClose={() => setOpenModal(false)} />
    </Box>
    // </div>
  );
}
export default withStyles(styleSheet)(Navbar);
