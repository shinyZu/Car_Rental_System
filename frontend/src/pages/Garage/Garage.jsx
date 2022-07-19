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
        {generalCarList.map((car) => (
          <MyCard
            brand={car.brand}
            passengers={car.passengers}
            extra_KM={car.price_perExtraKM}
            transmission={car.transmission}
            onCardClick={() => {
              console.log("swictheddddddddddd...........");
              props.onSwitch("img");
            }}
          />
        ))}
      </div>

      <div className={classes.fleet__title}>
        <h1>Premium Cars</h1>
      </div>

      <div className={classes.container}>
        {premiumCarList.map((car) => (
          <MyCard
            brand={car.brand}
            passengers={car.passengers}
            extra_KM={car.price_perExtraKM}
            transmission={car.transmission}
            onCardClick={() => {
              props.onSwitch("img");
            }}
          />
        ))}
      </div>

      <div className={classes.fleet__title}>
        <h1>Luxury Cars</h1>
      </div>

      <div className={classes.container}>
        {luxuryCarList.map((car) => (
          <MyCard
            brand={car.brand}
            passengers={car.passengers}
            extra_KM={car.price_perExtraKM}
            transmission={car.transmission}
            onCardClick={() => {
              props.onSwitch("img");
            }}
          />
        ))}
      </div>
    </div>
    // {
    //   switch (renderView) {
    //     case "main":
    //       return(
    //         <div>
    //           <Home />
    //           <Main />
    //         </div>
    //       );
    //       break;
    //     case "img":
    //       return <Car />;
    //       break;
    //     case 2:
    //       break;

    //     default:
    //       break;
    //   }
    // }
  );
}

export default withStyles(styleSheet)(Garage);
