import React, { Component, Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import LogoutIcon from "@mui/icons-material/Logout";
import { styleSheet } from "./style";
import { withStyles } from "@mui/styles";
import Login from "../../pages/Login/Login";

function NavBarRegistered(props) {
  //   const [value, setValue] = useState("");
  //   const [openModal, setOpenModal] = useState(false);

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
            icon={<FactCheckIcon />}
            className={classes.nav__text}
            label="My Bookings"
            href="#my_bookings"
            onClick={() => {
              console.log("to My Bookings...........");
              props.onSwitch("my_bookings");
            }}
          />
          <Tab
            icon={<CreditScoreIcon />}
            className={classes.nav__text}
            label="Payments"
            href="#payments"
          />
        </div>
        <div className={classes.nav__right}>
          <Tab
            icon={<LogoutIcon />}
            className={classes.nav__text}
            label="Logout"
            href="#logout"
            onClick={() => {
              console.log("to homeeeeeeeee...........");
              props.onSwitch("main");
            }}
          />
        </div>
      </Tabs>
      {/* <Login open={openModal} onClose={() => setOpenModal(false)} /> */}
    </Box>
  );
}

export default withStyles(styleSheet)(NavBarRegistered);