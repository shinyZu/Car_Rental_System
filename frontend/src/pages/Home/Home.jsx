import React, { useEffect, useState } from "react";
import bg__img from "../../assets/images/bg2.jpg";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import Header from "../../components/Header/Header";
import Main from "../Main";
import AdminDashboard from "../../pages/Admin/Dashboard/Dashboard";
import DriverSchedule from "../Driver/Driver";

function Home(props) {
  const { classes } = props;

  // useEffect(() => {
  //   window.scrollTo(0.0);
  // }, []);

  return (
    <div id="home">
      <Header />
      <Main />
    </div>
  );
}

export default withStyles(styleSheet)(Home);
