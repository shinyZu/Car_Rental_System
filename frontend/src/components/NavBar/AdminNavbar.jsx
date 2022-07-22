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
import GridViewIcon from "@mui/icons-material/GridView";
import GroupIcon from "@mui/icons-material/Group";
import EngineeringIcon from "@mui/icons-material/Engineering";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ConstructionIcon from "@mui/icons-material/Construction";
import PriceChangeIcon from "@mui/icons-material/PriceChange";

function AdminNavbar(props) {
  const [value, setValue] = useState("");

  function changePage(e) {
    setValue(e.target.innerText);
  }

  const { classes } = props;
  return (
    <>
      <Box className={classes.nav__bar}>
        <Tabs onChange={changePage} className={classes.nav__tabs}>
          <div className={classes.nav_left}>
            <Link to="/dashboard" className={classes.nav__text}>
              <Tab
                value={0}
                icon={<GridViewIcon />}
                className={classes.nav__text}
                label="Dashboard"
              />
            </Link>

            <Link smooth to="/manage_car" className={classes.nav__text}>
              <Tab
                value={1}
                icon={<DirectionsCarIcon />}
                className={classes.nav__text}
                label="Cars"
              />
            </Link>

            <Link smooth to="/manage_customer" className={classes.nav__text}>
              <Tab
                value={2}
                icon={<GroupIcon />}
                className={classes.nav__text}
                label="Customers"
              />
            </Link>

            <Link smooth to="/manage_driver" className={classes.nav__text}>
              <Tab
                value={3}
                icon={<EngineeringIcon />}
                className={classes.nav__text}
                label="Drivers"
              />
            </Link>

            <Link smooth to="/rental_requests" className={classes.nav__text}>
              <Tab
                value={3}
                icon={<ListAltIcon />}
                className={classes.nav__text}
                label="Rentals"
              />
            </Link>

            <Link smooth to="/return_details" className={classes.nav__text}>
              <Tab
                value={3}
                icon={<KeyboardReturnIcon />}
                className={classes.nav__text}
                label="Returns"
              />
            </Link>

            <Link smooth to="/maintenance" className={classes.nav__text}>
              <Tab
                value={3}
                icon={<ConstructionIcon />}
                className={classes.nav__text}
                label="Maintenance"
              />
            </Link>

            <Link smooth to="/income" className={classes.nav__text}>
              <Tab
                value={3}
                icon={<PriceChangeIcon />}
                className={classes.nav__text}
                label="Income"
              />
            </Link>
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
    </>
  );
}
export default withStyles(styleSheet)(AdminNavbar);
