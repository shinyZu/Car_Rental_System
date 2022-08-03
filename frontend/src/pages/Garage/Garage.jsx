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
import FileUploadService from "../../services/FileUploadService";

function Garage(props) {
  const { classes } = props;
  const [generalCarList, setGenerelCarList] = useState([]);
  const [premiumCarList, setPremiumCarList] = useState([]);
  const [luxuryCarList, setLuxuryCarList] = useState([]);
  const [carObj, setCarObj] = useState({});
  const [images, setImages] = useState([]);
  const [frontImage, setFrontImage] = useState("");
  // const [promises, setPromises] = useState([]);
  // console.log(generalCarList);
  // const navigate = useNavigate();
  // console.log(navigate);
  // let promises = [];

  useEffect(() => {
    getAllCars();
    // getAllFrontImages(generalCarList[0].brand, generalCarList[0].reg_no);
    // getAllFrontImages("Suzuki Alto Premium", "PB-5951");
    // getFrontImagesOfGeneral();
    // promises = [];
  }, []);

  // async function getFrontImagesOfGeneral() {
  //   console.log(generalCarList);
  //   // promises = null;
  //   for (let car of generalCarList) {
  //     console.log(car.reg_no);
  //     let res = await FileUploadService.getAllFrontImages(
  //       car.brand,
  //       car.reg_no
  //     );
  //     promises.push(res);

  //     results = await Promise.all(promises);
  //     // console.log(results);
  //   }
  //   results.map((result) => {
  //     console.log(result);
  //     setFrontImage(result.data.data[0]);
  //     // setImages((prev) => {
  //     //   return [frontImage];
  //     // });
  //   });
  // }

  // async function getFrontImagesOfGeneral(brand, reg_no) {
  //   // async function getFrontImagesOfGeneral() {
  //   console.log(generalCarList);
  //   for (let car of generalCarList) {
  //     console.log(car.reg_no);
  //     let res = await FileUploadService.getAllFrontImages(brand, reg_no);
  //     if (res.status === 200) {
  //       // console.log(res);
  //       setFrontImage(res.data.data[0]);
  //       // console.log(res.data.data[0]);
  //       // setGenerelCarList((prev) => {
  //       //   return [...prev, { a: res.data.data[0] }];
  //       // });
  //       promises.push(res.data.data[0]);
  //       // return frontImage;
  //     }
  //     console.log(car.image);
  //   }
  //   console.log(promises);
  //   let results = await Promise.allSettled(promises);
  //   console.log(results);
  //   results.map((r, index) => {
  //     console.log(r);
  //     console.log(r.value);
  //     // console.log(Promise.allSettled(generalCarList[index].image));
  //     // setGenerelCarList((prev) => {
  //     //   return [...prev, { image: r }];
  //     // });
  //     return r.value;
  //   });
  //   console.log(generalCarList);
  // }

  // async function getAllFrontImages(brand, reg_no) {
  //   console.log(1);
  //   let res = await FileUploadService.getAllFrontImages(brand, reg_no);
  //   if (res.status === 200) {
  //     console.log(res);
  //     setFrontImage(res.data.data[0]);
  //     console.log(frontImage);
  //     console.log(images);
  //     // setImages([]);
  //     setImages((prev) => {
  //       return [...prev, frontImage];
  //     });
  //     console.log(images);
  //     return frontImage;
  //     // console.log(images[0]);
  //   } else {
  //     console.log(res);
  //   }
  // }

  async function getAllCars() {
    console.log(1);
    console.log(generalCarList);
    let res = await CarService.getAllCars();
    if (res.status === 200) {
      // console.log(res.data.data);
      let carArray = res.data.data;
      // console.log(carArray);

      setGenerelCarList([]);
      setPremiumCarList([]);
      setLuxuryCarList([]);

      await Promise.allSettled(
        carArray.map(async (car, index) => {
          console.log(2);
          let fleetArray = [
            {
              fleet_id: car.fleet.fleet_id,
              description: car.fleet.description,
              noOfCars: car.fleet.noOfCars,
            },
          ];
          if (car.fleet.description == "General") {
            console.log(3);
            console.log("General Car");

            let res = await FileUploadService.getAllFrontImages(
              car.brand,
              car.reg_no
            );

            let promises = [];
            promises.push(res.data.data[0]);

            let img;
            let results = await Promise.allSettled(promises);
            console.log(results);
            results.map((r, index) => {
              img = r.value;
            });

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
                  // image: getFrontImagesOfGeneral(car.brand, car.reg_no),
                  image: img,
                },
              ];
            });

            console.log(generalCarList);
            console.log(generalCarList.length);
          } else if (car.fleet.description == "Premium") {
            console.log("Premium Car");
            console.log(car.reg_no);
            let res = await FileUploadService.getAllFrontImages(
              car.brand,
              car.reg_no
            );
            let promises = [];
            promises.push(res.data.data[0]);
            let img;
            let results = await Promise.allSettled(promises);
            results.map((r, index) => {
              console.log(r.value);
              img = r.value;
            });
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
                  image: img,
                },
              ];
            });
          } else if (car.fleet.description == "Luxury") {
            console.log("Premium Car");
            let res = await FileUploadService.getAllFrontImages(
              car.brand,
              car.reg_no
            );
            let promises = [];
            promises.push(res.data.data[0]);
            let img;
            let results = await Promise.allSettled(promises);
            results.map((r, index) => {
              console.log(r.value);
              img = r.value;
            });
            console.log(luxuryCarList);
            console.log(luxuryCarList.length);
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
                  image: img,
                },
              ];
            });
          }
        })
      );
    }
  }

  return (
    <div id="garage" className={classes.garage__container}>
      <div className={classes.fleet__title}>
        <h1>General Cars</h1>
      </div>

      <div className={classes.container}>
        {generalCarList.map(
          (car, index) =>
            index <= 4 && (
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
                  image={car.image}
                  // image={getAllFrontImages(car.brand, car.reg_no)}
                />
              </Link>
            )
        )}
      </div>

      <div className={classes.fleet__title}>
        <h1>Premium Cars</h1>
      </div>

      <div className={classes.container}>
        {premiumCarList.map(
          (car, index) =>
            index <= 3 && (
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
                  image={car.image}
                />
              </Link>
            )
        )}
      </div>

      <div className={classes.fleet__title}>
        <h1>Luxury Cars</h1>
      </div>

      <div className={classes.container}>
        {luxuryCarList.map(
          (car, index) =>
            (index <= 1 || index <= 2) && (
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
                  image={car.image}
                />
              </Link>
            )
        )}
      </div>
    </div>
  );
}

export default withStyles(styleSheet)(Garage);
