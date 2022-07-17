import React from "react";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";

function Footer(props) {
  const { classes } = props;
  const year = new Date().getFullYear();
  return (
    <footer className={classes.footer}>
      <p className={classes.footer__p}>Copyright &copy; {year}</p>
    </footer>
  );
}

export default withStyles(styleSheet)(Footer);
