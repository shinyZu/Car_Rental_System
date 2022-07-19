import React, { useState } from "react";
import bg__img from "../../assets/images/bg2.jpg";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import Header from "../../components/Header/Header";
import Main from "../Main";

function Home(props) {
  const { classes } = props;
  return (
    <div id="home">
      <Header onSwitch={props.onSwitch} />
      <Main onSwitch={props.onSwitch} />
    </div>
  );
}

export default withStyles(styleSheet)(Home);
