import React, { useEffect, useState } from "react";
import MyCard from "../../components/Card/MyCard";
import { styleSheet } from "./style";
import { withStyles } from "@mui/styles";
// import generalCarList from "../../db/general/generalCars";
// import premiumCarList from "../../db/premium/premiumCars";
// import luxuryCarList from "../../db/luxury/luxuryCars";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Session/Auth";
import CarService from "../../services/CarService";

function Garage(props) {
  const { classes } = props;
  const [generalCarList, setGenerelCarList] = useState([]);
  const [premiumCarList, setPremiumCarList] = useState([]);
  const [luxuryCarList, setLuxuryCarList] = useState([]);
  const [carObj, setCarObj] = useState({});
  // console.log(generalCarList);
  // const navigate = useNavigate();
  // console.log(navigate);

  useEffect(() => {
    getAllCars();
  }, []);

  async function getAllCars() {
    let res = await CarService.getAllCars();
    if (res.status === 200) {
      console.log(res.data.data);
      let carArray = res.data.data;
      console.log(carArray);
      setGenerelCarList([]);
      setPremiumCarList([]);
      setLuxuryCarList([]);
      carArray.map((car, index) => {
        let fleetArray = [
          {
            fleet_id: car.fleet.fleet_id,
            description: car.fleet.description,
            noOfCars: car.fleet.noOfCars,
          },
        ];
        if (car.fleet.description == "General") {
          console.log("General Car");
          setGenerelCarList((prev) => {
            return [
              ...prev,
              {
                reg_no: car.reg_no,
                brand: car.brand,
                color: car.color,
                noOfPassengers: car.noOfPassengers,
                fleet: fleetArray,
                fuelType: car.fuelType,
                transmissionType: car.transmissionType,
                currentStatus: car.currentStatus,
                dailyRate: car.dailyRate,
                monthlyRate: car.monthlyRate,
                freeKM_day: car.freeKM_day,
                freeKM_month: car.freeKM_month,
                price_extraKM: car.price_extraKM,
              },
            ];
          });
          console.log(generalCarList);
        } else if (car.fleet.description == "Premium") {
          console.log("Premium Car");
          setPremiumCarList((prev) => {
            return [
              ...prev,
              {
                reg_no: car.reg_no,
                brand: car.brand,
                color: car.color,
                noOfPassengers: car.noOfPassengers,
                fleet: fleetArray,
                fuelType: car.fuelType,
                transmissionType: car.transmissionType,
                currentStatus: car.currentStatus,
                dailyRate: car.dailyRate,
                monthlyRate: car.monthlyRate,
                freeKM_day: car.freeKM_day,
                freeKM_month: car.freeKM_month,
                price_extraKM: car.price_extraKM,
              },
            ];
          });
        } else if (car.fleet.description == "Luxury") {
          console.log("Premium Car");
          setLuxuryCarList((prev) => {
            return [
              ...prev,
              {
                reg_no: car.reg_no,
                brand: car.brand,
                color: car.color,
                noOfPassengers: car.noOfPassengers,
                fleet: fleetArray,
                fuelType: car.fuelType,
                transmissionType: car.transmissionType,
                currentStatus: car.currentStatus,
                dailyRate: car.dailyRate,
                monthlyRate: car.monthlyRate,
                freeKM_day: car.freeKM_day,
                freeKM_month: car.freeKM_month,
                price_extraKM: car.price_extraKM,
              },
            ];
          });
        }
      });
    }
  }

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
              passengers={car.noOfPassengers}
              extra_KM={car.price_extraKM}
              transmission={car.transmissionType}
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
              passengers={car.noOfPassengers}
              extra_KM={car.price_extraKM}
              transmission={car.transmissionType}
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
              passengers={car.noOfPassengers}
              extra_KM={car.price_extraKM}
              transmission={car.transmissionType}
              image={car.img1}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default withStyles(styleSheet)(Garage);
