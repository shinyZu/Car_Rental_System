import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import login__img from "../../assets/images/bg11.jpg";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style.js";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import MyTextField from "../../components/common/TextField/TextField";

function Login(props) {
  const { classes } = props;

  useEffect(() => {
    // console.log("I re-rendered");
    window.scrollTo(0, 0);
  });
  if (!props.open) return null;

  return (
    <div className={classes.login__overlay}>
      <div className={classes.login__container}>
        <img src={login__img} className={classes.login__left} width="400px" />

        <div className={classes.login__right}>
          <p className={classes.login__closeBtn} onClick={props.onClose}>
            X
          </p>

          <div className={classes.login__title}>
            <Typography className={classes.font__family} variant="h4">
              Login
            </Typography>
            <PersonIcon className={classes.login__icon} />
          </div>

          <div className={classes.login__content}>
            <MyTextField
              id="email"
              label="Email"
              type="email"
              required={true}
              style={{ marginBottom: "15px" }}
            />
            <MyTextField
              id="pwd"
              label="Password"
              type="password"
              required={true}
            />
          </div>

          <div className={classes.login_btn_container}>
            <button className={classes.btn__login}>Login</button>
          </div>

          <div className={classes.login__footer}>
            <p>
              Not a Member?{" "}
              <Link
                to="#register"
                onClick={() => {
                  props.onSwitch();
                }}
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styleSheet)(Login);
