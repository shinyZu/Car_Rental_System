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
  const [navTabBorder, setNavTabBorder] = useState("");
  const [navTabDashBaord, setNavTabDashBaord] = useState("");
  const [navTabCars, setNavTabCars] = useState("");
  const [navTabCustomer, setNavTabCustomer] = useState("");
  const [navTaDrivers, setNavTabDrivers] = useState("");
  const [navTabRentals, setNavTabRentals] = useState("");
  const [navTabReturns, setNavTabReturns] = useState("");
  const [navTabMaintenance, setNavTabMaintenance] = useState("");
  const [navTabIncome, setNavTabIcome] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    console.log(event);
    console.log(newValue);
    setValue(newValue);
  };

  function changePage(e) {
    setValue(e.target.innerText);
  }

  function handleSelect(e) {
    console.log(e);
  }
  const { classes } = props;
  return (
    <>
      <Box
        className={classes.nav__bar}
        style={{ backgroundColor: "rgb(28 48 98)" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          className={classes.nav__tabs}
          indicatorColor="#fff !important"
        >
          <div className={classes.nav_left}>
            <Link to="/dashboard" className={classes.nav__text}>
              <Tab
                value={0}
                icon={<GridViewIcon />}
                className={classes.nav__text}
                label="Dashboard"
                // onClickCapture={(e) => {
                //   console.log(e);
                //   setNavTabDashBaord("2px solid white");
                // }}
                // style={{ borderBottom: navTabDashBaord }}
                // selected={isSelected}
                // onClick={(e) => {
                //   // e.preventDefault();
                //   setIsSelected(true);
                //   handleSelect(e);
                // }}
              />
            </Link>

            <Link smooth to="/manage_car" className={classes.nav__text}>
              <Tab
                value={1}
                icon={<DirectionsCarIcon />}
                className={classes.nav__text}
                label="Cars"
                onSelect={() => {
                  setNavTabCars("2px solid white");
                }}
                style={{ borderBottom: navTabCars }}
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
                value={4}
                icon={<ListAltIcon />}
                className={classes.nav__text}
                label="Rentals"
              />
            </Link>

            <Link smooth to="/return_details" className={classes.nav__text}>
              <Tab
                value={5}
                icon={<KeyboardReturnIcon />}
                className={classes.nav__text}
                label="Returns"
              />
            </Link>

            <Link smooth to="/maintenance" className={classes.nav__text}>
              <Tab
                value={6}
                icon={<ConstructionIcon />}
                className={classes.nav__text}
                label="Maintenance"
              />
            </Link>

            <Link smooth to="/income" className={classes.nav__text}>
              <Tab
                value={7}
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
