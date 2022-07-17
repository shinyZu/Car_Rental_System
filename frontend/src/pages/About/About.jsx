import React from "react";
import logo from "../../assets/images/logo1.jpg";
import Navbar from "../../components/NavBar/Navbar";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";

function About(props) {
  const { classes } = props;
  return (
    <div id="about" className={classes.about__bg}>
      <h1>Hello About</h1>
      <h1>Hello About</h1>
      <h1>Hello About</h1>
      <h1>Hello About</h1>
      <h1>Hello About</h1>
      <h1>Hello About</h1>
      <h1>Hello About</h1>
      <h1>Hello About</h1>
      <h1>Hello About</h1>
      <h1>Hello About</h1>
      <h1>Hello About</h1>
      <h1>Hello About</h1>
      <h1>Hello About</h1>
      <h1>Hello About</h1>
      <h1>Hello About</h1>
      {/* <h1>Hello Home</h1>
      <h1>Hello Home</h1>
      <h1>Hello Home</h1>
      <h1>Hello Home</h1>
      <h1>Hello Home</h1>
      <h1>Hello Home</h1>
      <h1>Hello Home</h1> */}
    </div>
  );
}

export default withStyles(styleSheet)(About);
