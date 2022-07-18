import React, { useState, useEffect } from "react";
import login__img from "../../assets/images/bg1.jpg";
import TextField from "@mui/material/TextField";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style.js";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import FileChooser from "../../components/FileChooser/FileChooser";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Register(props) {
  const { classes } = props;
  const [file_nicFront, setFile_NICFront] = useState("");
  const [file_nicBack, setFile_NICBack] = useState("");
  const [file_license, setFile_License] = useState("");

  useEffect(() => {
    // console.log("I re-rendered");
    window.scrollTo(0, 0);
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

  return (
    <div className={classes.register__overlay}>
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

          <div className={classes.register__content}>
            <TextField
              //   autoFocus
              required={true}
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              size="small"
            />

            <div className={classes.content__sub_container}>
              <TextField
                //   autoFocus
                required={true}
                margin="dense"
                id="new_pwd"
                label="New Password"
                type="password"
                fullWidth
                variant="outlined"
                size="small"
                style={{ marginRight: "5px" }}
              />
              <TextField
                //   autoFocus
                required={true}
                margin="dense"
                id="confirm_pwd"
                label="Confirm Password"
                type="password"
                fullWidth
                variant="outlined"
                size="small"
              />
            </div>

            <div className={classes.content__sub_container}>
              <TextField
                //   autoFocus
                required={true}
                margin="dense"
                id="address"
                label="Address"
                type="text"
                fullWidth
                variant="outlined"
                size="small"
                style={{ marginRight: "5px" }}
              />
              <TextField
                //   autoFocus
                required={true}
                margin="dense"
                id="contact"
                label="Contact No"
                type="text"
                fullWidth
                variant="outlined"
                size="small"
              />
            </div>

            <div className={classes.content__sub_container}>
              <TextField
                //   autoFocus
                required={true}
                margin="dense"
                id="nic_no"
                label="NIC No"
                type="text"
                fullWidth
                variant="outlined"
                size="small"
                style={{ marginRight: "5px" }}
              />
              <TextField
                //   autoFocus
                required={true}
                margin="dense"
                id="license_no"
                label="License No"
                type="text"
                fullWidth
                variant="outlined"
                size="small"
                style={{ marginBottom: "15px" }}
              />
            </div>

            {/* <input accept="image/*" multiple type="file" /> */}
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
          </div>

          <div className={classes.register_btn_container}>
            <button className={classes.btn__register}>Register</button>
          </div>

          <div className={classes.register__footer}>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styleSheet)(Register);
