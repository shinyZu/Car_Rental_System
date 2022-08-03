import React, { useState, useEffect } from "react";
import NavbarGuest from "../../components/NavBar/NavbarGuest";
import NavbarRegistered from "../../components/NavBar/NavBarRegistered";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./car_detail";
import { Button, Paper } from "@mui/material";
import MyButton from "../../components/common/Button/Button";
import sub__img1 from "../../assets/images/Luxury/BMW/front.jpg";
import sub__img2 from "../../assets/images/Luxury/BMW/side1.jpg";
import sub__img3 from "../../assets/images/Luxury/BMW/side2.jpg";
import sub__img4 from "../../assets/images/Luxury/BMW/back.jpg";
import Typography from "@mui/material/Typography";
import CarReservePane from "../../components/Car/CarReservePane";
import Dialog from "../../components/Dialog/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { useAuth } from "../Session/Auth";
import DriverNavbar from "../../components/NavBar/DriverNavbar";
import AdminNavbar from "../../components/NavBar/AdminNavbar";
import CarService from "../../services/CarService";
import FileUploadService from "../../services/FileUploadService";
import { Url } from "devextreme-react/chart";

function CarDetail(props) {
  const [mainImgURL, setMainImgURL] = useState("");
  const [openReservePane, setOpenReservePane] = useState(false);
  const [openDailog, setOpenDialog] = useState(false);
  const [isGuest, setIsGuest] = useState(true);
  const [mileage, setMileage] = useState("");
  const [front, setFront] = useState("");
  const [rear, setRear] = useState("");
  const [side, setSide] = useState("");
  const [interior, setInterior] = useState("");
  const { classes } = props;
  const baseURL = "http://localhost:8080/easycar/";
  const auth = useAuth();
  console.log(auth);

  useEffect(() => {
    if (auth.user.email == null) {
      setIsGuest(true);
    } else {
      setIsGuest(false);
    }
  });

  const { state } = useLocation();
  let fleet = state.fleet;
  let carInfo = state.data.generalCarList;
  let selectedCar = state.selectedCar.index;
  // console.log(useLocation());
  // console.log(carInfo);
  // console.log(selectedCar);
  // console.log(fleet);
  // console.log(state);
  // console.log(carInfo[selectedCar]);

  if (fleet == "General") {
    carInfo = state.data.generalCarList;
  } else if (fleet == "Premium") {
    carInfo = state.data.premiumCarList;
  } else if (fleet == "Luxury") {
    carInfo = state.data.luxuryCarList;
  }

  // console.log(carInfo);
  function handleImageClick(e) {
    console.log(e.target.id);
    // console.log(e.target.style);
    // console.log(e.target.style.backgroundImage.split("/")[3].slice(0, -2));
    // let tempURL = e.target.style.backgroundImage.split("/")[3].slice(0, -2);
    // if (e.target.id == 1) {
    //   setMainImgURL(sub__img1);
    // } else if (e.target.id == 2) {
    //   setMainImgURL(sub__img2);
    // } else if (e.target.id == 3) {
    //   setMainImgURL(sub__img3);
    // } else if (e.target.id == 4) {
    //   setMainImgURL(sub__img4);
    // }
    console.log(front);
    console.log(rear);
    console.log(side);
    console.log(interior);

    if (e.target.id == 1) {
      setMainImgURL(front);
    } else if (e.target.id == 2) {
      setMainImgURL(rear);
    } else if (e.target.id == 3) {
      setMainImgURL(side);
    } else if (e.target.id == 4) {
      setMainImgURL(interior);
    }

    console.log(mainImgURL);
  }

  useEffect(() => {
    getMileage(carInfo[selectedCar].reg_no);
    getCarImages(carInfo[selectedCar].reg_no);
  }, [front]);

  async function getCarImages(reg_no) {
    console.log(reg_no);
    let res = await FileUploadService.getCarImages(reg_no);
    if (res.status === 200) {
      console.log(res);
      setFront(res.data.data[0]);
      setMainImgURL(front);
      console.log(front);
      // sub__img1 = front;
      // console.log(sub__img1);
      setRear(res.data.data[1]);
      console.log(rear);
      setSide(res.data.data[2]);
      console.log(side);
      setInterior(res.data.data[3]);
      console.log(interior);
      // console.log(res.data.data[0].split("/easycar"));
      // console.log(
      //   baseURL + "api/v1/upload" + res.data.data[0].split("/easycar")[1]
      // );
      // setFront(
      //   baseURL + "api/v1/upload" + res.data.data[0].split("/easycar")[1]
      // );
      // console.log(front);
    }
  }

  async function getMileage(reg_no) {
    let res = await CarService.getMileage(reg_no);
    if (res.status === 200) {
      if (res.data.data != []) {
        setMileage(res.data.data);
      }
    }
  }

  function popupReservePane() {
    console.log("open Reserve Pane");
    setOpenReservePane(true);
  }

  function popupDialog() {
    console.log("open Dialog");
    setOpenDialog(true);
  }

  function closeReservePane() {
    setOpenReservePane(false);
  }

  function closeDialog() {
    setOpenDialog(false);
  }

  return (
    <div id="carInfo">
      {isGuest ? (
        <NavbarGuest />
      ) : auth.user && auth.user.userStatus == "Driver" ? (
        <DriverNavbar />
      ) : auth.user && auth.user.userStatus == "Admin" ? (
        <AdminNavbar />
      ) : auth.user && auth.user.userStatus == "Customer" ? (
        <NavbarRegistered />
      ) : (
        <NavbarGuest />
      )}
      <Grid container spacing={5} className={classes.container__1}>
        <Grid
          item
          // container
          xl={7}
          lg={6}
          md={6}
          sm={6}
          xs={6}
          className={classes.container__left}
          direction="column"
        >
          {/* <Button
            // className={classes.container__main__img}
            style={{
              background: `url(${mainImgURL}) !important`,
            }}
          > */}
          <img src={mainImgURL} className={classes.container__main__img} />
          {/* </Button> */}

          <Grid
            item
            xl={6}
            lg={6}
            md={6}
            sm={6}
            xs={6}
            className={classes.container__sub__imgs}
          >
            {/* <Button
              id={1}
              // style={{ backgroundImage: `url(${front})` }}
              style={{ backgroundImage: `url(${front}) !important` }}
              // className={classes.car__views}
              // onClick={handleImageClick}
            > */}
            <img
              id={1}
              src={front}
              className={classes.car__views}
              onClick={handleImageClick}
            />
            {/* </Button> */}
            {/* <Button
              id={2}
              style={{ backgroundImage: `url(${rear})` }}
              // className={classes.car__views}
              // onClick={handleImageClick}
            > */}
            <img
              id={2}
              src={rear}
              className={classes.car__views}
              onClick={handleImageClick}
            />
            {/* </Button> */}
            {/* <Button
              id={3}
              style={{ backgroundImage: `url(${side})` }}
              // className={classes.car__views}
              // onClick={handleImageClick}
            > */}
            <img
              id={3}
              src={side}
              className={classes.car__views}
              onClick={handleImageClick}
            />
            {/* </Button> */}
            {/* <Button
              id={4}
              style={{ backgroundImage: `url(${interior})` }}
              // className={classes.car__views}
              // onClick={handleImageClick}
            > */}
            <img
              id={4}
              src={interior}
              className={classes.car__views}
              onClick={handleImageClick}
            />
            {/* </Button> */}
          </Grid>
        </Grid>

        <Grid
          container
          item
          xl={5}
          lg={6}
          md={6}
          sm={6}
          xs={6}
          className={classes.container__right}
          alignItems="center"
        >
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            // style={{ border: "2px solid red" }}
          >
            <Typography variant="h3" className={classes.description_key}>
              {carInfo[selectedCar].brand}
            </Typography>
          </Grid>

          <Grid
            container
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            spacing={4}
            style={{ height: "60vh" }}
          >
            <Grid
              item
              container
              xl={5}
              lg={5}
              md={6}
              sm={6}
              xs={6}
              className={classes.container__right_content_keys}
              direction="column"
            >
              <Typography variant="h6" className={classes.description_key}>
                Registration No
              </Typography>

              <Typography variant="h6" className={classes.description_key}>
                Car Fleet
              </Typography>

              <Typography variant="h6" className={classes.description_key}>
                Passengers
              </Typography>

              <Typography variant="h6" className={classes.description_key}>
                Transmission Type
              </Typography>

              <Typography variant="h6" className={classes.description_key}>
                Fuel Type
              </Typography>

              <Typography variant="h6" className={classes.description_key}>
                Color
              </Typography>

              <Typography variant="h6" className={classes.description_key}>
                Mileage(KM)
              </Typography>

              <Typography variant="h6" className={classes.description_key}>
                Daily Rate(Rs)
              </Typography>

              <Typography variant="h6" className={classes.description_key}>
                Free KM per Day
              </Typography>

              <Typography variant="h6" className={classes.description_key}>
                Monthly Rate(Rs)
              </Typography>

              <Typography variant="h6" className={classes.description_key}>
                Free KM per Month
              </Typography>

              <Typography variant="h6" className={classes.description_key}>
                Price per Extra KM(Rs)
              </Typography>
            </Grid>

            <Grid
              container
              item
              xl={7}
              lg={6}
              md={6}
              sm={4}
              xs={6}
              className={classes.container__right_content_values}
              direction="column"
            >
              <Typography variant="h6" className={classes.description_value}>
                : &nbsp;&nbsp;&nbsp; {carInfo[selectedCar].reg_no}
              </Typography>

              <Typography variant="h6" className={classes.description_value}>
                : &nbsp;&nbsp;&nbsp;{carInfo[selectedCar].fleet[0].description}
              </Typography>

              <Typography variant="h6" className={classes.description_value}>
                : &nbsp;&nbsp;&nbsp;{carInfo[selectedCar].noOfPassengers}
              </Typography>

              <Typography variant="h6" className={classes.description_value}>
                : &nbsp;&nbsp;&nbsp;{carInfo[selectedCar].transmissionType}
              </Typography>

              <Typography variant="h6" className={classes.description_value}>
                : &nbsp;&nbsp;&nbsp;{carInfo[selectedCar].fuelType}
              </Typography>

              <Typography variant="h6" className={classes.description_value}>
                : &nbsp;&nbsp;&nbsp;{carInfo[selectedCar].color}
              </Typography>

              <Typography variant="h6" className={classes.description_value}>
                {/* : &nbsp;&nbsp;&nbsp;{carInfo[selectedCar].mileage} */}:
                &nbsp;&nbsp;&nbsp;{mileage}
              </Typography>

              <Typography variant="h6" className={classes.description_value}>
                : &nbsp;&nbsp;&nbsp;{carInfo[selectedCar].dailyRate}
              </Typography>

              <Typography variant="h6" className={classes.description_value}>
                : &nbsp;&nbsp;&nbsp;{carInfo[selectedCar].freeKM_day}
              </Typography>

              <Typography variant="h6" className={classes.description_value}>
                : &nbsp;&nbsp;&nbsp;{carInfo[selectedCar].monthlyRate}
              </Typography>

              <Typography variant="h6" className={classes.description_value}>
                : &nbsp;&nbsp;&nbsp;{carInfo[selectedCar].freeKM_month}
              </Typography>

              <Typography variant="h6" className={classes.description_value}>
                : &nbsp;&nbsp;&nbsp;{carInfo[selectedCar].price_extraKM}
              </Typography>
            </Grid>
          </Grid>
          <Grid container xl={12} lg={12} md={6} sm={6} xs={6}>
            <MyButton
              label="Rent Now"
              size="small"
              variant="outlined"
              type="button"
              className={classes.reserve__btn}
              onClick={
                isGuest
                  ? popupDialog
                  : auth.user && auth.user.userStatus == "Driver"
                  ? popupDialog
                  : (auth.user && auth.user.userStatus == "Customer") ||
                    (auth.user && auth.user.userStatus == "Admin")
                  ? popupReservePane
                  : popupDialog
              }
            />
          </Grid>
        </Grid>
      </Grid>

      {isGuest ? (
        <Dialog
          open={openDailog}
          onClose={closeDialog}
          title={"Want To Reserve a Car?"}
          content={
            "To Reserve a Car you have to first Register at Easy Car Rental "
          }
        />
      ) : auth.user && auth.user.userStatus == "Driver" ? (
        <Dialog
          open={openDailog}
          onClose={closeDialog}
          title={"Want To Reserve a Car?"}
          content={"To Reserve a Car you have to register as a Customer"}
        />
      ) : (auth.user && auth.user.userStatus == "Customer") ||
        auth.user.userStatus == "Admin" ? (
        <CarReservePane
          open={openReservePane}
          onClose={closeReservePane}
          regNo={carInfo[selectedCar].reg_no}
          mileage={carInfo[selectedCar].mileage}
          fleet={state.fleet}
          brand={carInfo[selectedCar].brand}
        />
      ) : null}
    </div>
  );
}

export default withStyles(styleSheet)(CarDetail);
