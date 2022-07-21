import React, { useState } from "react";
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
import { useLocation, useParams } from "react-router-dom";
import Box from "@mui/material/Box";

function CarDetail(props) {
  const [mainImgURL, setMainImgURL] = useState(sub__img1);
  const [openReservePane, setOpenReservePane] = useState(false);
  const [openDailog, setOpenDialog] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true);

  const { classes } = props;

  const { state } = useLocation();
  let fleet = state.fleet;
  let carInfo = state.data.generalCarList;
  let selectedCar = state.selectedCar.index;
  // console.log(useLocation());
  // console.log(carInfo);
  // console.log(selectedCar);
  // console.log(fleet);
  // console.log(carInfo[selectedCar]);

  if (fleet == "General") {
    carInfo = state.data.generalCarList;
  } else if (fleet == "Premium") {
    carInfo = state.data.premiumCarList;
  } else if (fleet == "Luxury") {
    carInfo = state.data.luxuryCarList;
  }

  function handleImageClick(e) {
    // console.log(e.target.id);
    // console.log(e.target.style);
    // console.log(e.target.style.backgroundImage.split("/")[3].slice(0, -2));
    // let tempURL = e.target.style.backgroundImage.split("/")[3].slice(0, -2);
    if (e.target.id == 1) {
      setMainImgURL(sub__img1);
    } else if (e.target.id == 2) {
      setMainImgURL(sub__img2);
    } else if (e.target.id == 3) {
      setMainImgURL(sub__img3);
    } else if (e.target.id == 4) {
      setMainImgURL(sub__img4);
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
      {isRegistered ? <NavbarRegistered /> : <NavbarGuest />}
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
          <Button
            className={classes.container__main__img}
            style={{ backgroundImage: `url(${mainImgURL})` }}
          ></Button>

          <Grid
            item
            xl={6}
            lg={6}
            md={6}
            sm={6}
            xs={6}
            className={classes.container__sub__imgs}
          >
            <Button
              id={1}
              style={{ backgroundImage: `url(${sub__img1})` }}
              className={classes.car__views}
              onClick={handleImageClick}
            />
            <Button
              id={2}
              style={{ backgroundImage: `url(${sub__img2})` }}
              className={classes.car__views}
              onClick={handleImageClick}
            />
            <Button
              id={3}
              style={{ backgroundImage: `url(${sub__img3})` }}
              className={classes.car__views}
              onClick={handleImageClick}
            />
            <Button
              id={4}
              style={{ backgroundImage: `url(${sub__img4})` }}
              className={classes.car__views}
              onClick={handleImageClick}
            />
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
                Reg No
              </Typography>

              <Typography variant="h6" className={classes.description_key}>
                Fleet
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
                Mileage
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
                : &nbsp;&nbsp;&nbsp;{carInfo[selectedCar].fleet}
              </Typography>

              <Typography variant="h6" className={classes.description_value}>
                : &nbsp;&nbsp;&nbsp;{carInfo[selectedCar].passengers}
              </Typography>

              <Typography variant="h6" className={classes.description_value}>
                : &nbsp;&nbsp;&nbsp;{carInfo[selectedCar].transmission}
              </Typography>

              <Typography variant="h6" className={classes.description_value}>
                : &nbsp;&nbsp;&nbsp;{carInfo[selectedCar].fuel}
              </Typography>

              <Typography variant="h6" className={classes.description_value}>
                : &nbsp;&nbsp;&nbsp;{carInfo[selectedCar].color}
              </Typography>

              <Typography variant="h6" className={classes.description_value}>
                : &nbsp;&nbsp;&nbsp;{carInfo[selectedCar].mileage}
              </Typography>

              <Typography variant="h6" className={classes.description_value}>
                : &nbsp;&nbsp;&nbsp;{carInfo[selectedCar].daily_rate}
              </Typography>

              <Typography variant="h6" className={classes.description_value}>
                : &nbsp;&nbsp;&nbsp;{carInfo[selectedCar].freeKM_perDay}
              </Typography>

              <Typography variant="h6" className={classes.description_value}>
                : &nbsp;&nbsp;&nbsp;{carInfo[selectedCar].monthly_rate}
              </Typography>

              <Typography variant="h6" className={classes.description_value}>
                : &nbsp;&nbsp;&nbsp;{carInfo[selectedCar].freeKM_perMonth}
              </Typography>

              <Typography variant="h6" className={classes.description_value}>
                : &nbsp;&nbsp;&nbsp;{carInfo[selectedCar].price_perExtraKM}
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
              onClick={isRegistered ? popupReservePane : popupDialog}
            />
          </Grid>
        </Grid>
      </Grid>

      {isRegistered ? (
        <CarReservePane open={openReservePane} onClose={closeReservePane} />
      ) : (
        <Dialog
          open={openDailog}
          onClose={closeDialog}
          title={"Want To Reserve a Car?"}
          content={
            "To Reserve a Car you have to first Register as a Member of Easy Car Rental"
          }
        />
      )}
    </div>
  );
}

export default withStyles(styleSheet)(CarDetail);
