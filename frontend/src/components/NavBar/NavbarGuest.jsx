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
import { HashLink } from "react-router-hash-link";
import Home from "../../pages/Home/Home";

function NavbarGuest(props) {
  const [value, setValue] = useState("");
  const [openRegister, setOpenRegister] = useState(false);

  function changePage(e) {
    // console.log("Page Changed...");
    // console.log(e);
    // console.log(e.target.innerText);
    setValue(e.target.innerText);
  }

  function popupRegister() {
    setOpenRegister(true);
  }

  const { classes } = props;
  return (
    <>
      <Box
        className={classes.nav__bar}
        // style={{ backgroundColor: "#205a76 !important" }}
        style={{ backgroundColor: "#0c5199" }}
      >
        <Tabs onChange={changePage} className={classes.nav__tabs}>
          <div className={classes.nav_left}>
            <Link to="/" className={classes.nav__text}>
              <Tab
                value={0}
                // onChange={changePage}
                icon={<HomeIcon />}
                className={classes.nav__text}
                label="Home"
              />
            </Link>

            <HashLink smooth to="/#about" className={classes.nav__text}>
              <Tab
                value={1}
                icon={<EmojiTransportationIcon />}
                className={classes.nav__text}
                label="About"
              />
            </HashLink>

            <HashLink smooth to="/#garage" className={classes.nav__text}>
              <Tab
                value={2}
                icon={<DirectionsCarIcon />}
                className={classes.nav__text}
                label="Cars"
              />
            </HashLink>

            <HashLink smooth to="/#contact" className={classes.nav__text}>
              <Tab
                value={3}
                icon={<CallIcon />}
                className={classes.nav__text}
                label="Contact"
              />
            </HashLink>
          </div>
          <div className={classes.nav__right}>
            {/* <Link
            to="#"
            state={{ data: { d: true } }}
            className={classes.nav__text}
            onClick={popupRegister}
          > */}
            <Tab
              value={4}
              icon={<HowToRegIcon />}
              className={classes.nav__text}
              label="Register"
              onClick={popupRegister}
            />
            {/* </Link> */}
          </div>
        </Tabs>
      </Box>
      {openRegister ? (
        <div>
          <Register
            open={true}
            onClose={() => {
              setOpenRegister(false);
            }}
            disableLogin={true}
          />
          {/* <Home /> */}
        </div>
      ) : // console.log("flaseeeeeeeeeeeeeeeee")
      null}
    </>
  );
}
export default withStyles(styleSheet)(NavbarGuest);
