import React from "react";
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
            <a href="#body-header">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#cars">Cars</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <a href="#contact">Login</a>
          </li>
          <li>
            <a href="#contact">Register</a>
          </li>
        </ul>
      </nav>

      <div className="my-name text-center">
        <h1>Easy Car Rental</h1>
        <h2>Drive of Your Life....</h2>
      </div>

      <nav id="social-links">
        <ul className="horizontal-list text-center">
          <li>
            <a href="#">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fab fa-github"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fab fa-whatsapp"></i>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
