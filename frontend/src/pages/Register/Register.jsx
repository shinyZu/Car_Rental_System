import React, { useState, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import login__img from "../../assets/images/bg11.jpg";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style.js";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useNavigate, useLocation } from "react-router-dom";
import FileChooser from "../../components/common/FileChooser/FileChooser";
import MyTextField from "../../components/common/TextField/TextField";
import Dialog from "@mui/material/Dialog";
import Button from "../../components/common/Button/Button";
import { Grid } from "@mui/material";
import { matchRegexp } from "react-form-validator-core/lib/ValidationRules";
import { useAuth } from "../Session/Auth";
import CustomerService from "../../services/CustomerService";
import FileUploadService from "../../services/FileUploadService";
import MySnackBar from "../../components/common/Snackbar/MySnackbar";

function Register(props) {
  const { classes } = props;
  const [file_nicFront, setFile_NICFront] = useState("");
  const [file_nicBack, setFile_NICBack] = useState("");
  const [file_license, setFile_License] = useState("");
  const [errorConfirm, setErrorConfirm] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [regFormData, setRegFormData] = useState({
    email: "",
    password: "",
    confirm_pwd: "",
    address: "",
    contact_no: "",
    nic_no: "",
    license_no: "",
    nic_front: "",
    nic_back: "",
    license_img: "",
  });

  const [openErrorMessage, setOpenErrorMessage] = useState({
    open: "",
    alert: "",
    severity: "",
    variant: "",
  });

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation;
  let data = new FormData();

  const { state } = useLocation();

  useEffect(() => {
    // console.log("I re-rendered");
    if (props.open) window.scrollTo(0, 0);
  });
  if (!props.open) return null;

  function handleNICFrontUpload(e) {
    console.log("uploaded");
    console.log(e.target.files);
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    setFile_NICFront(name);
    // setUploadedFiles([...uploadedFiles, name]);
    data.append("nic_front", file);
    // setRegFormData({ nic_front: name });
  }

  function handleNICBackUpload(e) {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    setFile_NICBack(name);
    // setUploadedFiles([...uploadedFiles, name]);
    data.append("nic_back", file);
    // setRegFormData({ nic_back: name });
  }

  function handleLicenseUpload(e) {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    setFile_License(name);
    // setUploadedFiles([...uploadedFiles, name]);
    data.append("license_img", file);
    // setRegFormData({ license_img: name });
  }

  function clearRegForm() {
    setRegFormData({
      email: "",
      password: "",
      confirm_pwd: "",
      address: "",
      contact_no: "",
      nic_no: "",
      license_no: "",
      nic_front: "",
      nic_back: "",
      license_img: "",
    });
  }

  async function registerCustomer() {
    // console.log(regFormData);
    // console.log(file_nicFront);
    // console.log(file_nicBack);
    // console.log(file_license);
    // console.log(data);

    // setRegFormData({ ...regFormData, nic_front: file_nicFront });
    // setRegFormData({ ...regFormData, nic_back: file_nicBack });
    // setRegFormData({ ...regFormData, license_img: file_license });

    console.log(regFormData);

    if (regFormData.password !== regFormData.confirm_pwd) {
      setOpenErrorMessage({
        open: true,
        alert: "Passwords doesn't match",
        severity: "error",
        variant: "standard",
      });
      return;
    }

    if (file_nicFront != "" && file_nicBack != "" && file_license != "") {
      console.log("registered");
      let res1 = await CustomerService.saveCustomer(regFormData);
      // console.log(res);
      if (res1.status === 201) {
        console.log("Customer is saved...now save the images");

        data.append("nic_front", regFormData.nic_front);
        data.append("nic_back", regFormData.nic_back);
        data.append("license_img", regFormData.license_img);

        let res2 = await FileUploadService.uploadCustomerFiles(
          regFormData.nic_no,
          data
        );

        if (res2.status === 200) {
          console.log("all done...........");
          auth.login({
            email: regFormData.email,
            password: regFormData.password,
            userStatus: "Customer",
          });
          props.onClose();
          clearRegForm();
          props.handleSnackbar();
        } else {
          setOpenErrorMessage({
            open: true,
            alert: res2.response.data.message,
            severity: "error",
            variant: "standard",
          });
        }
      } else {
        setOpenErrorMessage({
          open: true,
          alert: res1.response.data.message,
          severity: "error",
          variant: "standard",
        });
      }
    } else {
      setOpenErrorMessage({
        open: true,
        alert: "Please choose the given files...",
        severity: "warning",
        variant: "standard",
      });
    }

    // data.append("nic_front", regFormData.nic_front);
    // data.append("nic_back", regFormData.nic_back);
    // data.append("license_img", regFormData.license_img);

    // let res = await FileUploadService.uploadCustomerFiles(
    //   regFormData.nic_no,
    //   data
    // );
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
                    value={regFormData.password}
                    onChange={(e) => {
                      setRegFormData({
                        ...regFormData,
                        password: e.target.value,
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
                      if (regFormData.password != e.target.value) {
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
                    value={regFormData.contact_no}
                    onChange={(e) => {
                      setRegFormData({
                        ...regFormData,
                        contact_no: e.target.value,
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
                    // file={file_nicFront}
                    // onUpload={handleNICFrontUpload}
                    file={file_nicFront}
                    onUpload={(e) => {
                      handleNICFrontUpload(e);
                      setRegFormData({
                        ...regFormData,
                        nic_front: e.target.files[0],
                      });
                    }}
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
                    // file={file_nicBack}
                    // onUpload={handleNICBackUpload}
                    file={file_nicBack}
                    onUpload={(e) => {
                      handleNICBackUpload(e);
                      setRegFormData({
                        ...regFormData,
                        nic_back: e.target.files[0],
                      });
                    }}
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
                    // file={file_license}
                    // onUpload={handleLicenseUpload}
                    file={file_license}
                    onUpload={(e) => {
                      handleLicenseUpload(e);
                      setRegFormData({
                        ...regFormData,
                        license_img: e.target.files[0],
                      });
                    }}
                    displayFileName={true}
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
      <MySnackBar
        open={openErrorMessage.open}
        alert={openErrorMessage.alert}
        severity={openErrorMessage.severity}
        variant={openErrorMessage.variant}
        onClose={() => {
          setOpenErrorMessage({ open: false });
        }}
      />
    </div>
  );
}

export default withStyles(styleSheet)(Register);

{
  /* <input accept="image/*" multiple type="file" /> */
}
