import React from "react";
import MyCard from "../../components/Card/MyCard";
import { styleSheet } from "./style";
import { withStyles } from "@mui/styles";

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
        <MyCard
          brand="Suzuki Alto - Premium"
          passengers={4}
          extra_KM="30.00"
          transmission="Auto"
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
  );
}

export default withStyles(styleSheet)(Garage);
