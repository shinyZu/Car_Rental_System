import React from "react";
import MyCard from "../../components/Card/MyCard";
import { styleSheet } from "./style";
import { withStyles } from "@mui/styles";

function Garage(props) {
  const { classes } = props;
  return (
    <div>
      <div className={classes.fleet__title}>
        <h1>General Cars</h1>
      </div>
      <div className={classes.container}>
        <MyCard />
        <MyCard />
        <MyCard />
      </div>
      <div className={classes.fleet__title}>
        <h1>Premium Cars</h1>
      </div>
      <div className={classes.container}>
        <MyCard />
        <MyCard />
        <MyCard />
        <MyCard />
        <MyCard />
        <MyCard />
        <MyCard />
      </div>
      <div className={classes.fleet__title}>
        <h1>Luxury Cars</h1>
      </div>
      <div className={classes.container}>
        <MyCard />
        <MyCard />
        <MyCard />
      </div>
    </div>
  );
}

export default withStyles(styleSheet)(Garage);
