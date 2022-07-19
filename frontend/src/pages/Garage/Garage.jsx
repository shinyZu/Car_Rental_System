import React, { useState } from "react";
import MyCard from "../../components/Card/MyCard";
import { styleSheet } from "./style";
import { withStyles } from "@mui/styles";
import generalCarList from "../../db/general/generalCars";
import premiumCarList from "../../db/premium/premiumCars";
import luxuryCarList from "../../db/luxury/luxuryCars";

function Garage(props) {
  const { classes } = props;

  return (
    <div id="garage" className={classes.garage__container}>
      <div className={classes.fleet__title}>
        <h1>General Cars</h1>
      </div>

      <div className={classes.container}>
        {generalCarList.map((car, index) => (
          <MyCard
            key={index}
            id={index}
            brand={car.brand}
            passengers={car.passengers}
            extra_KM={car.price_perExtraKM}
            transmission={car.transmission}
            onCardClick={(e) => {
              console.log("swictheddddddddddd...........");
              // console.log(e.target.parentNode);
              console.log(index);
              // console.log(e.target.parentElement.parentElement.children[1]);
              props.onSwitch("img", generalCarList, index);
            }}
          />
        ))}
      </div>

      <div className={classes.fleet__title}>
        <h1>Premium Cars</h1>
      </div>

      <div className={classes.container}>
        {premiumCarList.map((car, index) => (
          <MyCard
            key={index}
            id={index}
            brand={car.brand}
            passengers={car.passengers}
            extra_KM={car.price_perExtraKM}
            transmission={car.transmission}
            onCardClick={() => {
              props.onSwitch("img", premiumCarList, index);
            }}
          />
        ))}
      </div>

      <div className={classes.fleet__title}>
        <h1>Luxury Cars</h1>
      </div>

      <div className={classes.container}>
        {luxuryCarList.map((car, index) => (
          <MyCard
            key={index}
            id={index}
            brand={car.brand}
            passengers={car.passengers}
            extra_KM={car.price_perExtraKM}
            transmission={car.transmission}
            image={car.img1}
            onCardClick={() => {
              props.onSwitch("img", luxuryCarList, index);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default withStyles(styleSheet)(Garage);
