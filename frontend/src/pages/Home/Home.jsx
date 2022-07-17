import React from "react";
import bg__img from "../../assets/images/bg2.jpg";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import Garage from "../Garage/Garage";

function Home(props) {
  const { classes } = props;
  return (
    <div>
      <h1>Hello Home</h1>
      <h1>Hello Home</h1>
      <h1>Hello Home</h1>
      <h1>Hello Home</h1>
      <h1>Hello Home</h1>
      <h1>Hello Home</h1>
      <h1>Hello Home</h1>
      <h1>Hello Home</h1>
    </div>
    // <div
    //   style={{ backgroundImage: `url(${bg__img})` }}
    //   className={classes.home__bg}
    // >
    //   <Garage />
    // </div>
  );
}

export default withStyles(styleSheet)(Home);
