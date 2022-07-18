import React from "react";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import logo from "../../assets/images/logo2.jpg";

function Avatar(props) {
  const { classes } = props;
  return (
    <div className={classes.avatar__container}>
      <img src={logo} className={classes.avatar__img} />
    </div>
  );
}

export default withStyles(styleSheet)(Avatar);
