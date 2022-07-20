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
import Register from "../../pages/Register/Register";

function NavbarGuest(props) {
  const [value, setValue] = useState("");

  function changePage(e) {
    console.log(e);
    console.log("Page Changed...");
  }

  const { classes } = props;
  return (
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
            onClick={() => {
              console.log("to About...........");
              props.onSwitch("about");
            }}
          />
          <Tab
            icon={<DirectionsCarIcon />}
            className={classes.nav__text}
            label="Cars"
            href="#garage"
            onClick={() => {
              console.log("to Garage...........");
              props.onSwitch("garage");
            }}
          />
          <Tab
            icon={<CallIcon />}
            className={classes.nav__text}
            label="Contact"
            href="#contact"
          />
        </div>
        <div className={classes.nav__right}>
          <Tab
            icon={<HowToRegIcon />}
            className={classes.nav__text}
            label="Register"
            href="#register"
            onClick={() => {
              console.log("to homeeeeeeeee...........");
              // setOpenModal(true);
              props.onSwitch("register");
              // props.onSwitch("main");
            }}
          />
        </div>
      </Tabs>
      {/* <Register open={openModal} onClose={() => setOpenModal(false)} /> */}
    </Box>
  );
}
export default withStyles(styleSheet)(NavbarGuest);
