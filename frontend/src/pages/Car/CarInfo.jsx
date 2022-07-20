import React from "react";
import NavbarGuest from "../../components/NavBar/NavbarGuest";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
// import main__img from "../../assets/images/Luxury/BMW/front.jpg";
import sub__img1 from "../../assets/images/Luxury/BMW/front.jpg";
import sub__img2 from "../../assets/images/Luxury/BMW/side1.jpg";
import sub__img3 from "../../assets/images/Luxury/BMW/side2.jpg";
import sub__img4 from "../../assets/images/Luxury/BMW/back.jpg";
import { Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function CarInfo(props) {
  const { classes } = props;
  return (
    <div>
      <NavbarGuest />
      <div className={classes.container__1}>
        <div className={classes.container__left}>
          <Button
            className={classes.container__main__img}
            style={{ backgroundImage: `url(${sub__img1})` }}
          ></Button>
          <div className={classes.container__sub__imgs}>
            {/* <KeyboardArrowLeftIcon className={classes.arrow__icons} /> */}

            <Button
              style={{ backgroundImage: `url(${sub__img1})` }}
              className={classes.car__views}
            />
            <Button
              style={{ backgroundImage: `url(${sub__img2})` }}
              className={classes.car__views}
            />
            <Button
              style={{ backgroundImage: `url(${sub__img3})` }}
              className={classes.car__views}
            />
            <Button
              style={{ backgroundImage: `url(${sub__img4})` }}
              className={classes.car__views}
            />
            {/* <KeyboardArrowRightIcon className={classes.arrow__icons} /> */}
          </div>
        </div>
        <div className={classes.container__right}></div>
      </div>
      <div className={classes.container__2}></div>
    </div>
  );
}

export default withStyles(styleSheet)(CarInfo);
