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
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import MyBooking from "../../pages/Customer/MyBookings/MyBooking";
import Home from "../../pages/Home/Home";
import { HashLink } from "react-router-hash-link";

function NavBarRegistered(props) {
  const [value, setValue] = useState("");
  //   const [openModal, setOpenModal] = useState(false);

  function changePage(e) {
    // console.log(e);
    // console.log("Page Changed...");
    setValue(e.target.innerText);
  }

  const { classes } = props;

  return (
    <Box className={classes.nav__bar}>
      <Tabs value={value} onChange={changePage} className={classes.nav__tabs}>
        <div className={classes.nav_left}>
          <Link to="/" className={classes.nav__text}>
            <Tab
              icon={<HomeIcon />}
              className={classes.nav__text}
              label="Home"
            />
          </Link>

          <HashLink smooth to="/#garage" className={classes.nav__text}>
            <Tab
              icon={<DirectionsCarIcon />}
              className={classes.nav__text}
              label="Cars"
            />
          </HashLink>

          <HashLink smooth to="/my_bookings" className={classes.nav__text}>
            <Tab
              icon={<FactCheckIcon />}
              className={classes.nav__text}
              label="My Bookings"
            />
          </HashLink>

          <HashLink smooth to="/payments" className={classes.nav__text}>
            <Tab
              icon={<CreditScoreIcon />}
              className={classes.nav__text}
              label="Payments"
            />
          </HashLink>
        </div>
        <div className={classes.nav__right}>
          <Link to="/" className={classes.nav__text}>
            <Tab
              icon={<LogoutIcon />}
              className={classes.nav__text}
              label="Logout"
            />
          </Link>
        </div>
      </Tabs>
    </Box>
  );
}

export default withStyles(styleSheet)(NavBarRegistered);
