import React, { useEffect, useState } from "react";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import DriverNavbar from "../../../components/NavBar/DriverNavbar";
import NavBarRegistered from "../../../components/NavBar/NavBarRegistered";
import Driver from "../../Driver/Driver";
import { useAuth } from "../../Session/Auth";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from "../../../components/Avatar/Avatar";
import TextField from "@mui/material/TextField";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import profile from "../../../assets/images/female_profile.jpg";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import FileChooser from "../../../components/common/FileChooser/FileChooser";
import CustomerService from "../../../services/CustomerService";
import MySnackBar from "../../../components/common/Snackbar/MySnackbar";

function MyProfile(props) {
  const auth = useAuth();
  console.log(auth);
  const { classes } = props;
  const [nicNo, setNicNo] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [profileData, setProfileData] = useState({
    nic_no: "",
    license_no: "",
    address: "",
    contact_no: "",
    email: "",
    password: "",
    avatar_img: "",
  });

  const [openErrorMessage, setOpenErrorMessage] = useState({
    open: "",
    alert: "",
    severity: "",
    variant: "",
  });

  const [profileImg, setProfileImg] = useState(profile);

  useEffect(() => {
    getCustomerByEmail(auth.user.email);
  }, []);

  async function getCustomerByEmail(email) {
    let res = await CustomerService.getCustomerByEmail(email);
    if (res.status === 200) {
      console.log(res.data.data);
      let customer = res.data.data;
      setProfileData({
        nic_no: customer.nic_no,
        license_no: customer.license_no,
        address: customer.address,
        contact_no: "0" + customer.contact_no,
        email: customer.email,
        password: "",
        avatar_img: "",
      });
    }
  }

  async function updateProfile() {
    console.log("profile updated");
    console.log(profileData);
    let res1 = await CustomerService.updateCustomer(profileData);

    if (res1.status === 200) {
      setOpenErrorMessage({
        open: true,
        // alert: "Profile Updated Successfully!",
        alert: res1.data.data,
        severity: "success",
        variant: "standard",
      });
    } else {
      setOpenErrorMessage({
        open: true,
        alert: res1.response.data.message,
        severity: "error",
        variant: "standard",
      });
    }
  }

  function handleAvatarUpload(e) {
    const { files } = e.target;
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const { result } = e.target;
      console.log(result);
      if (result) {
        setProfileImg(result); // urls
      }
    };
    fileReader.readAsDataURL(files[0]);
  }

  return (
    <>
      {auth.user && auth.user.userStatus == "Customer" && <NavBarRegistered />}

      {auth.user && auth.user.userStatus == "Driver" && <DriverNavbar />}

      <Grid
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        // style={{ border: "2px solid red" }}
        className={classes.main__container}
      >
        <Grid
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          // style={{ border: "2px solid blue" }}
          justifyContent="space-around"
        >
          <Grid
            container
            xl={4.5}
            lg={4.5}
            md={4.5}
            sm={4.5}
            xs={4.5}
            // style={{ border: "2px solid red" }}
            justifyContent="center"
            alignItems="center"
          >
            <Paper
              sx={{
                p: "100px 0px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "90%",
              }}
              elevation={12}
            >
              <Avatar page="profile" profile_img={profileImg} />
              <FileChooser
                page="profile"
                onUpload={(e) => {
                  handleAvatarUpload(e);
                  setProfileData({
                    ...profileData,
                    profile_img: e.target.files[0],
                  });
                }}
              />
            </Paper>
          </Grid>

          <Grid
            container
            xl={6.8}
            lg={6.8}
            md={6.8}
            sm={6.8}
            xs={6.8}
            // style={{ border: "2px solid green" }}
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              container
              xl={10}
              lg={10}
              md={10}
              sm={10}
              xs={10}
              // style={{ border: "2px solid green" }}
              justifyContent="center"
            >
              <ValidatorForm
                className="pt-2"
                onSubmit={updateProfile}
                // style={{ border: "2px solid red" }}
              >
                <Grid
                  container
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  // style={{ border: "2px solid green" }}
                >
                  <Grid
                    item
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    // style={{ border: "2px solid green" }}
                  >
                    {/* <TextValidator
                      id="txt_nicNo"
                      label="NIC No"
                      fullWidth
                      value={nicNo}
                      style={{ marginBottom: "15px" }}
                      onChange={() => setNicNo(nicNo)}
                    /> */}
                    <TextValidator
                      label="NIC No"
                      type="text"
                      variant="outlined"
                      // size="small"
                      fullWidth
                      required={true}
                      validators={["matchRegexp:^[0-9]{9}[v]|[0-9]{12}$"]}
                      errorMessages={["123456789v or 123456789012"]}
                      value={profileData.nic_no}
                      style={{ marginBottom: "15px" }}
                      onChange={(e) => {
                        setProfileData({
                          ...profileData,
                          nic_no: e.target.value,
                        });
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    // style={{ border: "2px solid green" }}
                  >
                    {/* <TextField
                      id="txt_LicenseNo"
                      label="License No"
                      fullWidth
                      value={licenseNo}
                      style={{ marginBottom: "15px" }}
                      onChange={() => setLicenseNo(licenseNo)}
                    /> */}
                    <TextValidator
                      label="License No"
                      type="text"
                      variant="outlined"
                      // size="small"
                      fullWidth
                      required={true}
                      validators={["matchRegexp:^[B][0-9]{7}$"]}
                      errorMessages={["Invalid License Number"]}
                      value={profileData.license_no}
                      style={{ marginBottom: "15px" }}
                      onChange={(e) => {
                        setProfileData({
                          ...profileData,
                          license_no: e.target.value,
                        });
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    // style={{ border: "2px solid green" }}
                  >
                    {/* <TextField
                  id="txt_address"
                  label="Address"
                  fullWidth
                  value={address}
                  style={{ marginBottom: "15px" }}
                  onChange={() => setAddress(address)}
                /> */}
                    <TextValidator
                      label="Address"
                      type="text"
                      variant="outlined"
                      // size="small"
                      fullWidth
                      required={true}
                      value={profileData.address}
                      style={{ marginBottom: "15px" }}
                      onChange={(e) => {
                        setProfileData({
                          ...profileData,
                          address: e.target.value,
                        });
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    // style={{ border: "2px solid green" }}
                  >
                    {/* <TextField
                    id="txt_contact"
                    label="Contact No"
                    fullWidth
                    value={contact}
                    style={{ marginBottom: "15px" }}
                    onChange={() => setContact(contact)}
                  /> */}
                    <TextValidator
                      label="Contact No"
                      type="number"
                      variant="outlined"
                      // size="small"
                      fullWidth
                      required={true}
                      validators={["matchRegexp:^[0-9]{10}$"]}
                      errorMessages={["Invalid contact no"]}
                      value={profileData.contact_no}
                      style={{ marginBottom: "15px" }}
                      onChange={(e) => {
                        setProfileData({
                          ...profileData,
                          contact_no: e.target.value,
                        });
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    // style={{ border: "2px solid green" }}
                  >
                    {/* <TextField
                  id="txt_email"
                  label="Email"
                  fullWidth
                  value={email}
                  style={{ marginBottom: "18px" }}
                  onChange={() => setEmail(email)}
                /> */}
                    <TextValidator
                      label="Email"
                      type="email"
                      variant="outlined"
                      // size="small"
                      fullWidth
                      required={true}
                      validators={[
                        "matchRegexp:^[A-z|0-9]{4,}@(gmail)(.com|.lk)$",
                      ]}
                      errorMessages={["invalid email address"]}
                      value={profileData.email}
                      style={{ marginBottom: "15px" }}
                      onChange={(e) => {
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        });
                      }}
                    />
                  </Grid>
                  <Grid
                    container
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    // style={{ border: "2px solid blue" }}
                    justifyContent="space-between"
                    // alignItems="center"
                  >
                    <Grid
                      container
                      xl={8.5}
                      lg={8.5}
                      md={8.5}
                      sm={8.5}
                      xs={8.5}
                      // style={{ border: "2px solid red" }}
                      // display="grid"
                      direction="row"
                    >
                      <Grid
                        item
                        xl={12}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        // style={{ border: "2px solid green" }}
                      >
                        {/* <TextField
                          id="txt_newPwd"
                          label="New Password"
                          fullWidth
                          // style={{ width: "400px !important" }}
                          value={newPwd}
                          style={{ marginBottom: "15px" }}
                          onChange={() => setNewPwd(newPwd)}
                        /> */}
                        <TextValidator
                          label="Password"
                          type="password"
                          variant="outlined"
                          // size="small"
                          fullWidth
                          // error={errorConfirm}
                          required={true}
                          value={profileData.password}
                          style={{ marginBottom: "15px" }}
                          onChange={(e) => {
                            setProfileData({
                              ...profileData,
                              password: e.target.value,
                            });
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      xl={3}
                      lg={3}
                      md={3}
                      sm={3}
                      xs={3}
                      // style={{ border: "2px solid red" }}
                      justifyContent="end"
                    >
                      {/* <button className={classes.btn__changePwd}>
                        Change Password
                      </button> */}
                    </Grid>
                  </Grid>
                  <button className={classes.btn__update_profile}>
                    Update Profile
                  </button>
                </Grid>
              </ValidatorForm>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <MySnackBar
        open={openErrorMessage.open}
        alert={openErrorMessage.alert}
        severity={openErrorMessage.severity}
        variant={openErrorMessage.variant}
        onClose={() => {
          setOpenErrorMessage({ open: false });
        }}
      />
    </>
  );
}

export default withStyles(styleSheet)(MyProfile);
