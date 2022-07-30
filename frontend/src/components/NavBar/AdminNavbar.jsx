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
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../pages/Session/Auth";

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

  const auth = useAuth();
  const navigate = useNavigate();

  const handleAdminLogout = () => {
    console.log("logged out");
    auth.logout();
    navigate("/");
  };

  const handleChange = (event, newValue) => {
    console.log(event);
    console.log(newValue);
    setValue(newValue);
  };

  function changePage(e) {
    setValue(e.target.innerText);
  }

  const { classes } = props;
  console.log(auth);

  const navLinkStyle = ({ isActive }) => {
    // isActive will be set to true if the link is the current route
    return {
      color: isActive ? "rgb(232 249 0)" : "normal",
    };
  };

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
            <Link to="/" className={classes.nav__text}>
              <Tab
                icon={<HomeIcon />}
                className={classes.nav__text}
                label="Home"
              />
            </Link>
            <NavLink
              to="/dashboard"
              className={classes.nav__text}
              style={navLinkStyle}
            >
              <Tab
                value={0}
                icon={<GridViewIcon />}
                className={classes.nav__text}
                label="Dashboard"
              />
            </NavLink>

            <NavLink
              smooth
              to="/manage_car"
              className={classes.nav__text}
              style={navLinkStyle}
            >
              <Tab
                value={1}
                icon={<DirectionsCarIcon />}
                className={classes.nav__text}
                label="Cars"
                // onSelect={() => {
                //   setNavTabCars("2px solid white");
                // }}
                // style={{ borderBottom: navTabCars }}
              />
            </NavLink>

            <NavLink
              smooth
              to="/manage_customer"
              className={classes.nav__text}
              style={navLinkStyle}
            >
              <Tab
                value={2}
                icon={<GroupIcon />}
                className={classes.nav__text}
                label="Customers"
              />
            </NavLink>

            <NavLink
              smooth
              to="/manage_driver"
              className={classes.nav__text}
              style={navLinkStyle}
            >
              <Tab
                value={3}
                icon={<EngineeringIcon />}
                className={classes.nav__text}
                label="Drivers"
              />
            </NavLink>

            <NavLink
              smooth
              to="/rental_requests"
              className={classes.nav__text}
              style={navLinkStyle}
            >
              <Tab
                value={4}
                icon={<ListAltIcon />}
                className={classes.nav__text}
                label="Rentals"
              />
            </NavLink>

            <NavLink
              smooth
              to="/return_details"
              className={classes.nav__text}
              style={navLinkStyle}
            >
              <Tab
                value={5}
                icon={<KeyboardReturnIcon />}
                className={classes.nav__text}
                label="Returns"
              />
            </NavLink>

            <NavLink
              smooth
              to="/maintenance"
              className={classes.nav__text}
              style={navLinkStyle}
            >
              <Tab
                value={6}
                icon={<ConstructionIcon />}
                className={classes.nav__text}
                label="Maintenance"
              />
            </NavLink>

            <NavLink
              smooth
              to="/income"
              className={classes.nav__text}
              style={navLinkStyle}
            >
              <Tab
                value={7}
                icon={<PriceChangeIcon />}
                className={classes.nav__text}
                label="Income"
              />
            </NavLink>
          </div>
          <div className={classes.nav__right}>
            {/* <NavLink
              to="/"
              className={classes.nav__text}
              // onClick={handleLogout}
            > */}
            <Tab
              icon={<LogoutIcon />}
              className={classes.nav__text}
              label="Logout"
              onClick={handleAdminLogout}
            />
            {/* </NavLink> */}
          </div>
        </Tabs>
      </Box>
    </>
  );
}
export default withStyles(styleSheet)(AdminNavbar);
