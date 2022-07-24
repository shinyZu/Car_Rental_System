import React, {
  useEffect,
  useState,
  useNavigate,
  Redirect,
  useHistory,
} from "react";
import { Link } from "react-router-dom";
import login__img from "../../assets/images/bg11.jpg";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style.js";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import MyTextField from "../../components/common/TextField/TextField";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Grid } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function Login(props) {
  const { classes } = props;
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    pwd: "",
    status: "",
  });

  let userRoles = ["Customer", "Admin", "Driver"];

  useEffect(() => {
    // console.log("I re-rendered");
    window.scrollTo(0, 0);
  });

  // let navigate = useNavigate();

  // let history = useHistory();

  function logCustomer() {
    // // console.log(loginFormData);
    // if (loginFormData.status == "Admin") {
    //   console.log("Customer Logged Successfully");
    //   // navigate("/dashboard");
    <Redirect to="/dashboard" />;
    // }
    // console.log(history);
    // history.push("/dashboard");
  }

  if (!props.open) return null;

  return (
    <>
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

            <ValidatorForm className="pt-2" onSubmit={logCustomer}>
              <Grid
                container
                lg={12}
                md={12}
                xs={12}
                sm={12}
                // style={{ border: "2px solid red" }}
                rowGap={2}
                className={classes.login__content}
              >
                <Grid
                  item
                  lg={12}
                  md={12}
                  xs={12}
                  sm={12}
                  // style={{ border: "2px solid red" }}
                  // className={classes.register__content}
                >
                  <TextValidator
                    // id="outlined-basic"
                    label="Email"
                    type="email"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required={true}
                    // style={{ marginBottom: "5px" }}
                    // style={{ marginLeft: "10px" }}
                    validators={[
                      "matchRegexp:^[A-z|0-9]{4,}@(gmail)(.com|.lk)$",
                    ]}
                    errorMessages={["invalid email address"]}
                    value={loginFormData.email}
                    onChange={(e) => {
                      setLoginFormData({
                        ...loginFormData,
                        email: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid
                  // container
                  item
                  lg={12}
                  md={12}
                  xs={12}
                  sm={12}
                  // style={{ border: "2px solid red" }}
                  // className={classes.login__content}
                >
                  <TextValidator
                    // id="outlined-basic"
                    label="Password"
                    type="password"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required={true}
                    style={{ marginBottom: "5px" }}
                    // style={{ marginLeft: "10px" }}
                    validators={["matchRegexp:^[A-z|0-9|@]{8,}$"]}
                    errorMessages={["must have atleast 8 characters"]}
                    value={loginFormData.pwd}
                    onChange={(e) => {
                      setLoginFormData({
                        ...loginFormData,
                        pwd: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Autocomplete
                    disablePortal
                    id="role"
                    options={userRoles}
                    // xl={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Login As" />
                    )}
                    size="small"
                    disabledItemsFocusable
                    onChange={(e, v) => {
                      setLoginFormData({
                        ...loginFormData,
                        status: v,
                      });
                      // console.log(loginFormData.status);
                    }}
                  />
                </Grid>
                <Grid
                  container
                  lg={12}
                  md={12}
                  xs={12}
                  sm={12}
                  // style={{ border: "2px solid red" }}
                  // className={classes.register__content}
                  className={classes.login_btn_container}
                >
                  <button className={classes.btn__login}>Login</button>
                  {/* <Link
                  smooth
                  to="/dashboard" 
                  onClick={logCustomer}
                >
                </Link> */}
                </Grid>
              </Grid>
            </ValidatorForm>

            {/* <div className={classes.login__content}>
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
          </div> */}

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
    </>
  );
}

export default withStyles(styleSheet)(Login);
