import React, { useState, useEffect } from "react";
import login__img from "../../assets/images/bg1.jpg";
import TextField from "@mui/material/TextField";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style.js";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

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
              margin="dense"
              id="name"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              size="small"
              //   style={{ marginBottom: "15px" }}
            />
            <div className={classes.content__sub_container}>
              <TextField
                //   autoFocus
                margin="dense"
                id="name"
                label="New Password"
                type="password"
                fullWidth
                variant="outlined"
                size="small"
                style={{ marginRight: "5px" }}
              />
              <TextField
                //   autoFocus
                margin="dense"
                id="name"
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
                margin="dense"
                id="name"
                label="Address"
                type="text"
                fullWidth
                variant="outlined"
                size="small"
                style={{ marginRight: "5px" }}
              />
              <TextField
                //   autoFocus
                margin="dense"
                id="name"
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
                required="true"
                margin="dense"
                id="name"
                label="NIC No"
                type="text"
                fullWidth
                variant="outlined"
                size="small"
                style={{ marginRight: "5px" }}
              />
              <TextField
                //   autoFocus
                margin="dense"
                id="name"
                label="License No"
                type="text"
                fullWidth
                variant="outlined"
                size="small"
                style={{ marginBottom: "15px" }}
              />
            </div>
            {/* <input accept="image/*" multiple type="file" /> */}

            <div className={classes.upload__section}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<UploadFileIcon />}
                sx={{ marginRight: "1rem" }}
                className={classes.upload__btn}
              >
                Upload NIC (Front)
                <input
                  type="file"
                  accept="*"
                  hidden
                  onChange={handleNICFrontUpload}
                />
              </Button>
              <Box className={classes.uploaded__file}>{file_nicFront}</Box>
              {/* <input type="text" className={classes.uploaded__file}>
                {file_nicFront}
              </input> */}
            </div>

            <div className={classes.upload__section}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<UploadFileIcon />}
                sx={{ marginRight: "1rem" }}
                className={classes.upload__btn}
              >
                Upload NIC (Back)
                <input
                  type="file"
                  accept="*"
                  hidden
                  onChange={handleNICBackUpload}
                />
              </Button>
              <Box className={classes.uploaded__file}>{file_nicBack}</Box>
            </div>

            <div className={classes.upload__section}>
              <Button
                component="label"
                variant="standard"
                startIcon={<UploadFileIcon />}
                sx={{ marginRight: "1rem" }}
                className={classes.upload__btn}
              >
                Upload License
                <input
                  type="file"
                  accept="*"
                  hidden
                  onChange={handleLicenseUpload}
                />
              </Button>
              <Box className={classes.uploaded__file}>{file_license}</Box>
            </div>
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
