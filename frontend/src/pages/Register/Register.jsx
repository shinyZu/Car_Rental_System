import React, { useState, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import login__img from "../../assets/images/bg11.jpg";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style.js";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import FileChooser from "../../components/common/FileChooser/FileChooser";
import MyTextField from "../../components/common/TextField/TextField";
import Dialog from "@mui/material/Dialog";
import { useLocation } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import { Grid } from "@mui/material";
import { matchRegexp } from "react-form-validator-core/lib/ValidationRules";

function Register(props) {
  const { classes } = props;
  const [file_nicFront, setFile_NICFront] = useState("");
  const [file_nicBack, setFile_NICBack] = useState("");
  const [file_license, setFile_License] = useState("");
  const [errorConfirm, setErrorConfirm] = useState(false);
  const [regFormData, setRegFormData] = useState({
    email: "",
    new_pwd: "",
    confirm_pwd: "",
    address: "",
    contact: "",
    nic_no: "",
    license_no: "",
    nic_img_front: "",
    nic_img_back: "",
    license_img: "",
  });

  const { state } = useLocation();
  // const { data } = state;
  // console.log(useLocation());
  // let isOpen = state.open;
  // console.log(props);
  // console.log(state.data.d);
  // console.log(data);
  // console.log(isOpen);

  useEffect(() => {
    // console.log("I re-rendered");
    if (props.open) window.scrollTo(0, 0);
  });
  if (!props.open) return null;

  function handleNICFrontUpload(e) {
    console.log("uploaded");
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    setFile_NICFront(name);
  }

  function handleNICBackUpload(e) {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    setFile_NICBack(name);
  }

  function handleLicenseUpload(e) {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    setFile_License(name);
  }

  function registerCustomer() {
    console.log(regFormData);
    // console.log(regFormData.new_pwd);
    // console.log(regFormData.confirm_pwd);
    // if (regFormData.new_pwd != regFormData.confirm_pwd) {
    //   console.log("pwds doesn't match");
    //   setErrorConfirm("Passwords Doesn't Match");
    // }
  }

  return (
    <div id="#register" className={classes.register__overlay}>
      <div className={classes.register__container}>
        <img
          src={login__img}
          className={classes.register__left}
          width="500px"
        />
        <div className={classes.register__right}>
          <p className={classes.register__closeBtn} onClick={props.onClose}>
            X
          </p>

          <div className={classes.register__title}>
            <Typography className={classes.font__family} variant="h4">
              Register
            </Typography>
            <PersonIcon className={classes.register__icon} />
          </div>

          <Grid
            container
            lg={12}
            md={12}
            xs={12}
            sm={12}
            // style={{ border: "2px solid red" }}
            // className={classes.register__content}
            justifyContent="center"
          >
            {/* <div className={classes.register__content}>
            <MyTextField
              id="email"
              label="Email"
              type="email"
              required={true}
            />

            <div className={classes.content__sub_container}>
              <MyTextField
                id="new_pwd"
                label="New Password"
                type="password"
                style={{ marginRight: "5px" }}
                required={true}
              />
              <MyTextField
                id="confirm_pwd"
                label="Confirm Password"
                type="password"
                required={true}
              />
            </div>

            <div className={classes.content__sub_container}>
              <MyTextField
                id="address"
                label="Address"
                type="text"
                style={{ marginRight: "5px" }}
                required={true}
              />
              <MyTextField
                id="contact"
                label="Contact No"
                type="text"
                required={true}
              />
            </div>

            <div className={classes.content__sub_container}>
              <MyTextField
                id="nic_no"
                label="NIC No"
                type="text"
                style={{ marginRight: "5px" }}
                required={true}
              />
              <MyTextField
                id="license_no"
                label="License No"
                type="text"
                style={{ marginBottom: "15px" }}
                required={true}
              />
            </div>

            <FileChooser
              text=" Upload NIC (Front)"
              file={file_nicFront}
              onUpload={handleNICFrontUpload}
              />
            <FileChooser
              text=" Upload NIC (Back)"
              file={file_nicBack}
              onUpload={handleNICBackUpload}
              />
            <FileChooser
              text=" Upload License"
              file={file_license}
              onUpload={handleLicenseUpload}
              />
          </div> */}

            {/* <div className={classes.register_btn_container}>
            <button className={classes.btn__register}>Register</button>
          </div> */}

            <ValidatorForm className="pt-2" onSubmit={registerCustomer}>
              <Grid
                container
                lg={12}
                md={12}
                xs={12}
                sm={12}
                // style={{ border: "2px solid red" }}
                className={classes.register__content}
              >
                <Grid
                  item
                  lg={12}
                  md={12}
                  xs={12}
                  sm={12}
                  // style={{ border: "2px solid red" }}
                  className={classes.register__content}
                >
                  <TextValidator
                    // id="outlined-basic"
                    label="Email"
                    type="email"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required={true}
                    style={{ marginBottom: "5px" }}
                    // style={{ marginLeft: "10px" }}
                    // validators={["isEmail"]}
                    validators={[
                      "matchRegexp:^[A-z|0-9]{4,}@(gmail)(.com|.lk)$",
                    ]}
                    errorMessages={["Invalid email address"]}
                    value={regFormData.email}
                    onChange={(e) => {
                      setRegFormData({ ...regFormData, email: e.target.value });
                    }}
                  />
                </Grid>
                <Grid
                  item
                  lg={6}
                  md={6}
                  xs={6}
                  sm={6}
                  // style={{ border: "2px solid red" }}
                  className={classes.register__content}
                >
                  <TextValidator
                    // id="outlined-basic"
                    label="New Password"
                    type="password"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required={true}
                    // helperText="Minimum 8 characters"
                    style={{ marginBottom: "5px" }}
                    // style={{ marginLeft: "10px" }}
                    validators={["matchRegexp:^[A-z|0-9|@]{8,}$"]}
                    errorMessages={["Must have atleast 8 characters"]}
                    value={regFormData.new_pwd}
                    onChange={(e) => {
                      setRegFormData({
                        ...regFormData,
                        new_pwd: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid
                  item
                  lg={6}
                  md={6}
                  xs={6}
                  sm={6}
                  // style={{ border: "2px solid red" }}
                  className={classes.register__content}
                >
                  <TextValidator
                    // id="outlined-basic"
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={errorConfirm}
                    required={true}
                    style={{ marginBottom: "5px" }}
                    // style={{ marginLeft: "10px" }}

                    value={regFormData.confirm_pwd}
                    onChange={(e) => {
                      // console.log(regFormData.new_pwd);
                      // console.log(regFormData.confirm_pwd);
                      // console.log(e.target.value);
                      if (regFormData.new_pwd != e.target.value) {
                        setErrorConfirm(true);
                      } else {
                        setErrorConfirm(false);
                      }
                      setRegFormData({
                        ...regFormData,
                        confirm_pwd: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid
                  item
                  lg={6}
                  md={6}
                  xs={6}
                  sm={6}
                  // style={{ border: "2px solid red" }}
                  className={classes.register__content}
                >
                  <TextValidator
                    // id="outlined-basic"
                    label="Address"
                    type="text"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required={true}
                    style={{ marginBottom: "5px" }}
                    // style={{ marginLeft: "10px" }}

                    value={regFormData.address}
                    onChange={(e) => {
                      setRegFormData({
                        ...regFormData,
                        address: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid
                  item
                  lg={6}
                  md={6}
                  xs={6}
                  sm={6}
                  // style={{ border: "2px solid red" }}
                  className={classes.register__content}
                >
                  <TextValidator
                    // id="outlined-basic"
                    label="Contact No"
                    type="number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required={true}
                    style={{ marginBottom: "5px" }}
                    // style={{ marginLeft: "10px" }}
                    validators={["matchRegexp:^[0-9]{10}$"]}
                    errorMessages={["Invalid contact no"]}
                    value={regFormData.contact}
                    onChange={(e) => {
                      setRegFormData({
                        ...regFormData,
                        contact: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid
                  item
                  lg={6}
                  md={6}
                  xs={6}
                  sm={6}
                  // style={{ border: "2px solid red" }}
                  className={classes.register__content}
                >
                  <TextValidator
                    // id="outlined-basic"
                    label="NIC No"
                    type="text"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required={true}
                    style={{ marginBottom: "5px" }}
                    // style={{ marginLeft: "10px" }}
                    validators={["matchRegexp:^[0-9]{9}[v]|[0-9]{12}$"]}
                    errorMessages={["123456789v or 123456789012"]}
                    value={regFormData.nic_no}
                    onChange={(e) => {
                      setRegFormData({
                        ...regFormData,
                        nic_no: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid
                  item
                  lg={6}
                  md={6}
                  xs={6}
                  sm={6}
                  // style={{ border: "2px solid red" }}
                  className={classes.register__content}
                >
                  <TextValidator
                    // id="outlined-basic"
                    label="License No"
                    type="text"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required={true}
                    style={{ marginBottom: "5px" }}
                    validators={["matchRegexp:^[B][0-9]{7}$"]}
                    errorMessages={["Invalid License Number"]}
                    value={regFormData.license_no}
                    onChange={(e) => {
                      setRegFormData({
                        ...regFormData,
                        license_no: e.target.value,
                      });
                    }}
                  />
                </Grid>

                {/* <Grid
                  container
                  lg={12}
                  md={12}
                  xs={12}
                  sm={12}
                  className={classes.upload__section}
                  // style={{ border: "2px solid red" }}
                  // justifyContent="center"
                  // alignItems="center"
                > */}
                <Grid
                  container
                  lg={6}
                  md={6}
                  xs={6}
                  sm={6}
                  // style={{ border: "2px solid red" }}
                  className={classes.register__content}
                >
                  <FileChooser
                    text="NIC(Front)"
                    file={file_nicFront}
                    onUpload={handleNICFrontUpload}
                    displayFileName={true}
                  />
                </Grid>

                <Grid
                  container
                  lg={7}
                  md={7}
                  xs={6}
                  sm={6}
                  // style={{ border: "2px solid red" }}
                  className={classes.register__content}
                >
                  <FileChooser
                    text="NIC(Back)"
                    file={file_nicBack}
                    onUpload={handleNICBackUpload}
                    displayFileName={true}
                  />
                </Grid>

                <Grid
                  container
                  lg={6}
                  md={6}
                  xs={6}
                  sm={6}
                  // style={{ border: "2px solid red" }}
                  className={classes.register__content}
                >
                  <FileChooser
                    text="License"
                    file={file_license}
                    onUpload={handleLicenseUpload}
                    displayFileName={true}
                  />
                </Grid>
                {/* </Grid> */}
                <Grid
                  container
                  lg={12}
                  md={12}
                  xs={12}
                  sm={12}
                  // style={{ border: "2px solid red" }}
                  // className={classes.register__content}
                  className={classes.register_btn_container}
                >
                  <button type="submit" className={classes.btn__register}>
                    Register
                  </button>
                </Grid>
              </Grid>
            </ValidatorForm>

            <div className={classes.register__footer}>
              {props.disableLogin ? null : (
                <p>
                  Already a Member?{" "}
                  <Link
                    to="#login"
                    onClick={() => {
                      props.onSwitch();
                    }}
                  >
                    Login
                  </Link>
                </p>
              )}
            </div>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styleSheet)(Register);

{
  /* <input accept="image/*" multiple type="file" /> */
}
