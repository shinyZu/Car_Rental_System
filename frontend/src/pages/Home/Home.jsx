import React from "react";
import bg__img from "../../assets/images/bg2.jpg";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import Header from "../../components/Header/Header";

function Home(props) {
  const { classes } = props;
  return (
    <div id="home">
      <Header />
    </div>
  );
}

export default withStyles(styleSheet)(Home);
