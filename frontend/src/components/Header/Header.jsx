import React from "react";
import { Link } from "react-router-dom";
import bg__img from "../../assets/images/bg2.jpg";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style.css";
import Navbar from "../NavBar/Navbar";

function Header(props) {
  const { classes } = props;
  return (
    <header className="body-header">
      <nav>
        <ul className="horizontal-list text-center">
          <li>
            <Link to="#home">Home</Link>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#garage">Cars</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <Link to="#login">Login</Link>
          </li>
          <li>
            <a href="#register">Register</a>
          </li>
        </ul>
      </nav>

      {/* <Navbar /> */}

      <div className="title text-center">
        <h1>Easy Car Rental</h1>
        <h3>Drive of Your Life....</h3>
      </div>
    </header>
  );
}

export default Header;
