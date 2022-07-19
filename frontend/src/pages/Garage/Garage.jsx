import React, { useState } from "react";
import MyCard from "../../components/Card/MyCard";
import { styleSheet } from "./style";
import { withStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import Car from "../Car/Car";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Garage(props) {
  const { classes } = props;

  return (
    <div id="garage" className={classes.garage__container}>
      <div className={classes.fleet__title}>
        <h1>General Cars</h1>
      </div>
      <div className={classes.container}>
        <MyCard
          brand="Suzuki Alto - Premium"
          passengers={4}
          extra_KM="30.00"
          transmission="Auto"
          onCardClick={() => {
            console.log("swictheddddddddddd...........");
            props.onSwitch("img");
          }}
        />
        <MyCard
          brand="Suzuki Alto - Premium"
          passengers={4}
          extra_KM="30.00"
          transmission="Auto"
          onCardClick={() => {
            props.onSwitch("img");
          }}
        />
        <MyCard
          brand="Suzuki Alto - Premium"
          passengers={4}
          extra_KM="30.00"
          transmission="Auto"
          onCardClick={() => {
            props.onSwitch("img");
          }}
        />
        <MyCard
          brand="Suzuki Alto - Premium"
          passengers={4}
          extra_KM="30.00"
          transmission="Auto"
          onCardClick={() => {
            props.onSwitch("img");
          }}
        />
        <MyCard
          brand="Suzuki Alto - Premium"
          passengers={4}
          extra_KM="30.00"
          transmission="Auto"
          onCardClick={() => {
            props.onSwitch("img");
          }}
        />
      </div>
      <div className={classes.fleet__title}>
        <h1>Premium Cars</h1>
      </div>
      <div className={classes.container}>
        <MyCard
          brand="Suzuki Alto - Premium"
          passengers={4}
          extra_KM="30.00"
          transmission="Auto"
        />
        <MyCard
          brand="Suzuki Alto - Premium"
          passengers={4}
          extra_KM="30.00"
          transmission="Auto"
        />
        <MyCard
          brand="Suzuki Alto - Premium"
          passengers={4}
          extra_KM="30.00"
          transmission="Auto"
        />
        <MyCard
          brand="Suzuki Alto - Premium"
          passengers={4}
          extra_KM="30.00"
          transmission="Auto"
        />
      </div>
      <div className={classes.fleet__title}>
        <h1>Luxury Cars</h1>
      </div>
      <div className={classes.container}>
        <MyCard
          brand="Suzuki Alto - Premium"
          passengers={4}
          extra_KM="30.00"
          transmission="Auto"
        />
        <MyCard
          brand="Suzuki Alto - Premium"
          passengers={4}
          extra_KM="30.00"
          transmission="Auto"
        />
        <MyCard
          brand="Suzuki Alto - Premium"
          passengers={4}
          extra_KM="30.00"
          transmission="Auto"
        />
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
