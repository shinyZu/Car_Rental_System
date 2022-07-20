import React, { useState } from "react";
import MyCard from "../../components/Card/MyCard";
import { styleSheet } from "./style";
import { withStyles } from "@mui/styles";
import generalCarList from "../../db/general/generalCars";
import premiumCarList from "../../db/premium/premiumCars";
import luxuryCarList from "../../db/luxury/luxuryCars";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Garage(props) {
  const { classes } = props;

  // console.log(generalCarList);
  // const navigate = useNavigate();
  // console.log(navigate);

  return (
    <div id="garage" className={classes.garage__container}>
      <div className={classes.fleet__title}>
        <h1>General Cars</h1>
      </div>

      <div className={classes.container}>
        {generalCarList.map((car, index) => (
          <Link
            // to={{ pathname: "/car_details", state: { generalCarList } }}
            key={index}
            to="/car_details"
            state={{
              fleet: "General",
              data: { generalCarList },
              selectedCar: { index },
            }}
            className={classes.card__text}
          >
            <MyCard
              key={index}
              id={index}
              brand={car.brand}
              passengers={car.passengers}
              extra_KM={car.price_perExtraKM}
              transmission={car.transmission}
            />
          </Link>
        ))}
      </div>

      <div className={classes.fleet__title}>
        <h1>Premium Cars</h1>
      </div>

      <div className={classes.container}>
        {premiumCarList.map((car, index) => (
          <Link
            key={index}
            to="/car_details"
            state={{
              fleet: "Premium",
              data: { premiumCarList },
              selectedCar: { index },
            }}
            className={classes.card__text}
          >
            <MyCard
              key={index}
              id={index}
              brand={car.brand}
              passengers={car.passengers}
              extra_KM={car.price_perExtraKM}
              transmission={car.transmission}
            />
          </Link>
        ))}
      </div>

      <div className={classes.fleet__title}>
        <h1>Luxury Cars</h1>
      </div>

      <div className={classes.container}>
        {luxuryCarList.map((car, index) => (
          <Link
            key={index}
            to="/car_details"
            state={{
              fleet: "Luxury",
              data: { luxuryCarList },
              selectedCar: { index },
            }}
            className={classes.card__text}
          >
            <MyCard
              key={index}
              id={index}
              brand={car.brand}
              passengers={car.passengers}
              extra_KM={car.price_perExtraKM}
              transmission={car.transmission}
              image={car.img1}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default withStyles(styleSheet)(Garage);
