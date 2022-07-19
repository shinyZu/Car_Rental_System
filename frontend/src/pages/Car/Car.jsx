import React, { useState } from "react";
import Navbar from "../../components/NavBar/Navbar";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./car.js";
import { Button } from "@mui/material";
import sub__img1 from "../../assets/images/Luxury/BMW/front.jpg";
import sub__img2 from "../../assets/images/Luxury/BMW/side1.jpg";
import sub__img3 from "../../assets/images/Luxury/BMW/side2.jpg";
import sub__img4 from "../../assets/images/Luxury/BMW/back.jpg";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Typography from "@mui/material/Typography";

function Car(props) {
  const [mainImgURL, setMainImgURL] = useState(sub__img1);
  const { classes, carInfo } = props;

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

  return (
    <div id="carInfo">
      <Navbar onSwitch={props.onSwitch} />
      <Grid
        container
        spacing={5}
        className={classes.container__1}
        // direction="row"
      >
        <Grid
          item
          //   container
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
            {/* <KeyboardArrowLeftIcon className={classes.arrow__icons} /> */}
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
            {/* <KeyboardArrowRightIcon className={classes.arrow__icons} /> */}
          </Grid>
        </Grid>

        <Grid
          item
          xl={5}
          lg={6}
          md={6}
          sm={6}
          xs={6}
          className={classes.container__right}
        >
          <Grid
            item
            xl={6}
            lg={6}
            md={6}
            sm={6}
            xs={6}
            className={classes.container__right_content}
            // direction="column"
          >
            <Typography variant="h3" className={classes.description_key}>
              {carInfo[props.selectedCar].brand}
            </Typography>

            <Typography variant="h6" className={classes.description_key}>
              Reg No &nbsp; &nbsp;:
              <Typography variant="h7" className={classes.description_value}>
                &nbsp;&nbsp;&nbsp;{carInfo[props.selectedCar].reg_no}
              </Typography>
            </Typography>

            <Typography variant="h6" className={classes.description_key}>
              Fleet &nbsp; &nbsp;:
              <Typography variant="h7" className={classes.description_value}>
                &nbsp;&nbsp;&nbsp;{carInfo[props.selectedCar].fleet}
              </Typography>
            </Typography>

            <Typography variant="h6" className={classes.description_key}>
              Passengers &nbsp; &nbsp;:
              <Typography variant="h7" className={classes.description_value}>
                &nbsp;&nbsp;&nbsp;{carInfo[props.selectedCar].passengers}
              </Typography>
            </Typography>

            <Typography variant="h6" className={classes.description_key}>
              Transmission Type &nbsp; &nbsp;:
              <Typography variant="h7" className={classes.description_value}>
                &nbsp;&nbsp;&nbsp;{carInfo[props.selectedCar].transmission}
              </Typography>
            </Typography>

            <Typography variant="h6" className={classes.description_key}>
              Fuel Type &nbsp; &nbsp;:
              <Typography variant="h7" className={classes.description_value}>
                &nbsp;&nbsp;&nbsp;{carInfo[props.selectedCar].fuel}
              </Typography>
            </Typography>

            <Typography variant="h6" className={classes.description_key}>
              Color &nbsp; &nbsp;:
              <Typography variant="h7" className={classes.description_value}>
                &nbsp;&nbsp;&nbsp;{carInfo[props.selectedCar].color}
              </Typography>
            </Typography>

            <Typography variant="h6" className={classes.description_key}>
              Mileage &nbsp; &nbsp;:
              <Typography variant="h7" className={classes.description_value}>
                &nbsp;&nbsp;&nbsp;{carInfo[props.selectedCar].mileage}
              </Typography>
            </Typography>

            <Typography variant="h6" className={classes.description_key}>
              Daily Rate(Rs) &nbsp; &nbsp;:
              <Typography variant="h7" className={classes.description_value}>
                &nbsp;&nbsp;&nbsp;{carInfo[props.selectedCar].daily_rate}
              </Typography>
            </Typography>

            <Typography variant="h6" className={classes.description_key}>
              Free KM per Day &nbsp; &nbsp;:
              <Typography variant="h7" className={classes.description_value}>
                &nbsp;&nbsp;&nbsp;{carInfo[props.selectedCar].freeKM_perDay}
              </Typography>
            </Typography>

            <Typography variant="h6" className={classes.description_key}>
              Monthly Rate(Rs) &nbsp; &nbsp;:
              <Typography variant="h7" className={classes.description_value}>
                &nbsp;&nbsp;&nbsp;{carInfo[props.selectedCar].monthly_rate}
              </Typography>
            </Typography>

            <Typography variant="h6" className={classes.description_key}>
              Free KM per Month &nbsp; &nbsp;:
              <Typography variant="h7" className={classes.description_value}>
                &nbsp;&nbsp;&nbsp;{carInfo[props.selectedCar].freeKM_perMonth}
              </Typography>
            </Typography>

            <Typography variant="h6" className={classes.description_key}>
              Price per Extra KM(Rs) &nbsp; &nbsp;:
              <Typography variant="h7" className={classes.description_value}>
                &nbsp;&nbsp;&nbsp;{carInfo[props.selectedCar].price_perExtraKM}
              </Typography>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid
        // container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        className={classes.container__2}
      ></Grid> */}
    </div>
  );
}

// export default Car;
export default withStyles(styleSheet)(Car);
