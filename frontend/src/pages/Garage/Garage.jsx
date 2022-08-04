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
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

function Garage(props) {
  const { classes } = props;
  const [generalCarList, setGenerelCarList] = useState([]);
  const [premiumCarList, setPremiumCarList] = useState([]);
  const [luxuryCarList, setLuxuryCarList] = useState([]);
  const [carObj, setCarObj] = useState({});
  const [images, setImages] = useState([]);
  const [frontImage, setFrontImage] = useState("");

  //Filter pane
  const noOfPassengers = ["02", "04", "05"];
  const carBrands = ["Suzuki", "Toyota", "Perodua", "Mercedes", "BMW"];
  const fuelTypes = ["Petrol", "Diesel", "Gasoline"];
  const transmissionTypes = ["Manual", "Auto", "CVT"];

  const [passengers, setPassengers] = useState("");
  const [brand, setBrand] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmissionType, setTransmissionType] = useState("");

  useEffect(() => {
    setPassengers(null);
    setBrand(null);
    setFuelType(null);
    setTransmissionType(null);
    getAllCars();
  }, []);

  useEffect(() => {
    if (
      (passengers == null || passengers == "") &&
      (brand == null || brand == "") &&
      (fuelType == null || fuelType == "") &&
      (transmissionType == null || transmissionType == "")
    ) {
      getAllCars();
    } else {
      console.log(passengers);
      console.log(brand);
      console.log(fuelType);
      console.log(transmissionType);

      sortCarsByPassengers(passengers);
      sortCarsByBrand(brand);
      sortCarsByFuelType(fuelType);
      sortCarsByTransmissionType(transmissionType);
    }
  }, [passengers, brand, fuelType, transmissionType]);

  async function createLists(carArray) {
    console.log(carArray);
    setGenerelCarList([]);
    setPremiumCarList([]);
    setLuxuryCarList([]);

    await Promise.allSettled(
      carArray.map(async (car, index) => {
        let fleetArray = [
          {
            fleet_id: car.fleet.fleet_id,
            description: car.fleet.description,
            noOfCars: car.fleet.noOfCars,
          },
        ];
        if (car.fleet.description == "General") {
          let res = await FileUploadService.getAllFrontImages(
            car.brand,
            car.reg_no
          );

          let promises = [];
          promises.push(res.data.data[0]);

          let img;
          let results = await Promise.allSettled(promises);
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
                image: img,
              },
            ];
          });
        } else if (car.fleet.description == "Premium") {
          let res = await FileUploadService.getAllFrontImages(
            car.brand,
            car.reg_no
          );
          let promises = [];
          promises.push(res.data.data[0]);
          let img;
          let results = await Promise.allSettled(promises);
          results.map((r, index) => {
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
          let res = await FileUploadService.getAllFrontImages(
            car.brand,
            car.reg_no
          );
          let promises = [];
          promises.push(res.data.data[0]);
          let img;
          let results = await Promise.allSettled(promises);
          results.map((r, index) => {
            img = r.value;
          });
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

  async function sortCarsByPassengers(passengers) {
    let res = await CarService.sortCarsByNoOfPassengers(passengers);
    if (res.status === 200) {
      let carArray = res.data.data;
      createLists(carArray);
    }
  }

  async function sortCarsByBrand(brand) {
    let res = await CarService.sortCarsByBrand(brand);
    if (res.status === 200) {
      let carArray = res.data.data;
      createLists(carArray);
    }
  }

  async function sortCarsByFuelType(fuelType) {
    let res = await CarService.sortCarsByFuelType(fuelType);
    if (res.status === 200) {
      let carArray = res.data.data;
      createLists(carArray);
    }
  }

  async function sortCarsByTransmissionType(transmissionType) {
    let res = await CarService.sortCarsByTransmissionType(transmissionType);
    if (res.status === 200) {
      let carArray = res.data.data;
      createLists(carArray);
    }
  }

  async function getAllCars() {
    console.log(1);
    console.log(generalCarList);
    let res = await CarService.getAllCars();
    if (res.status === 200) {
      // console.log(res.data.data);
      let carArray = res.data.data;
      // console.log(carArray);

      // setGenerelCarList([]);
      // setPremiumCarList([]);
      // setLuxuryCarList([]);

      createLists(carArray);

      // await Promise.allSettled(
      //   carArray.map(async (car, index) => {
      //     console.log(2);
      //     let fleetArray = [
      //       {
      //         fleet_id: car.fleet.fleet_id,
      //         description: car.fleet.description,
      //         noOfCars: car.fleet.noOfCars,
      //       },
      //     ];
      //     if (car.fleet.description == "General") {
      //       console.log(3);
      //       console.log("General Car");

      //       let res = await FileUploadService.getAllFrontImages(
      //         car.brand,
      //         car.reg_no
      //       );

      //       let promises = [];
      //       promises.push(res.data.data[0]);

      //       let img;
      //       let results = await Promise.allSettled(promises);
      //       console.log(results);
      //       results.map((r, index) => {
      //         img = r.value;
      //       });

      //       setGenerelCarList((prev) => {
      //         return [
      //           ...prev,
      //           {
      //             reg_no: car.reg_no,
      //             brand: car.brand,
      //             color: car.color,
      //             noOfPassengers: car.noOfPassengers,
      //             fleet: fleetArray,
      //             fuelType: car.fuelType,
      //             transmissionType: car.transmissionType,
      //             currentStatus: car.currentStatus,
      //             dailyRate: car.dailyRate,
      //             monthlyRate: car.monthlyRate,
      //             freeKM_day: car.freeKM_day,
      //             freeKM_month: car.freeKM_month,
      //             price_extraKM: car.price_extraKM,
      //             // image: getFrontImagesOfGeneral(car.brand, car.reg_no),
      //             image: img,
      //           },
      //         ];
      //       });

      //       console.log(generalCarList);
      //       console.log(generalCarList.length);
      //     } else if (car.fleet.description == "Premium") {
      //       console.log("Premium Car");
      //       console.log(car.reg_no);
      //       let res = await FileUploadService.getAllFrontImages(
      //         car.brand,
      //         car.reg_no
      //       );
      //       let promises = [];
      //       promises.push(res.data.data[0]);
      //       let img;
      //       let results = await Promise.allSettled(promises);
      //       results.map((r, index) => {
      //         console.log(r.value);
      //         img = r.value;
      //       });
      //       setPremiumCarList((prev) => {
      //         return [
      //           ...prev,
      //           {
      //             reg_no: car.reg_no,
      //             brand: car.brand,
      //             color: car.color,
      //             noOfPassengers: car.noOfPassengers,
      //             fleet: fleetArray,
      //             fuelType: car.fuelType,
      //             transmissionType: car.transmissionType,
      //             currentStatus: car.currentStatus,
      //             dailyRate: car.dailyRate,
      //             monthlyRate: car.monthlyRate,
      //             freeKM_day: car.freeKM_day,
      //             freeKM_month: car.freeKM_month,
      //             price_extraKM: car.price_extraKM,
      //             image: img,
      //           },
      //         ];
      //       });
      //     } else if (car.fleet.description == "Luxury") {
      //       console.log("Premium Car");
      //       let res = await FileUploadService.getAllFrontImages(
      //         car.brand,
      //         car.reg_no
      //       );
      //       let promises = [];
      //       promises.push(res.data.data[0]);
      //       let img;
      //       let results = await Promise.allSettled(promises);
      //       results.map((r, index) => {
      //         console.log(r.value);
      //         img = r.value;
      //       });
      //       console.log(luxuryCarList);
      //       console.log(luxuryCarList.length);
      //       setLuxuryCarList((prev) => {
      //         return [
      //           ...prev,
      //           {
      //             reg_no: car.reg_no,
      //             brand: car.brand,
      //             color: car.color,
      //             noOfPassengers: car.noOfPassengers,
      //             fleet: fleetArray,
      //             fuelType: car.fuelType,
      //             transmissionType: car.transmissionType,
      //             currentStatus: car.currentStatus,
      //             dailyRate: car.dailyRate,
      //             monthlyRate: car.monthlyRate,
      //             freeKM_day: car.freeKM_day,
      //             freeKM_month: car.freeKM_month,
      //             price_extraKM: car.price_extraKM,
      //             image: img,
      //           },
      //         ];
      //       });
      //     }
      //   })
      // );
    }
  }

  return (
    <div id="garage" className={classes.garage__container}>
      <Grid
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        // style={{ border: "2px solid red" }}
        className={classes.filter__container}
        // direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Paper
          sx={{
            // p: "100px 0px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: "80%",
          }}
          elevation={12}
        >
          <Grid
            item
            xl={2}
            lg={2}
            md={2}
            sm={2}
            xs={2}
            // style={{ border: "2px solid blue" }}
            // style={{ marginRight: "15px" }}
            className={classes.filter__container}
            justifyContent="center"
            alignItems="center"
          >
            <Autocomplete
              // disablePortal
              id="passengers"
              options={noOfPassengers}
              fullWidth
              // xl={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Passengers" />
              )}
              // size="small"
              disabledItemsFocusable
              onChange={(e, v) => {
                setPassengers(v);
                console.log(passengers);
              }}
            />
          </Grid>
          <Grid
            item
            xl={2}
            lg={2}
            md={2}
            sm={2}
            xs={2}
            // style={{ border: "2px solid blue" }}
            // style={{ marginRight: "15px" }}
            className={classes.filter__container}
            justifyContent="center"
            alignItems="center"
          >
            <Autocomplete
              // disablePortal
              id="brands"
              options={carBrands}
              fullWidth
              // xl={{ marginRight: 30 }}
              renderInput={(params) => <TextField {...params} label="Brand" />}
              // size="small"
              disabledItemsFocusable
              onChange={(e, v) => {
                setBrand(v);
                console.log(brand);
                console.log(v);
              }}
              // onClose={(e) => {
              //   // getAllCars();
              //   console.log(e);
              // }}
            />
          </Grid>
          <Grid
            item
            xl={2}
            lg={2}
            md={2}
            sm={2}
            xs={2}
            // style={{ border: "2px solid blue" }}
            // style={{ marginRight: "15px" }}
            className={classes.filter__container}
            justifyContent="center"
            alignItems="center"
          >
            <Autocomplete
              // disablePortal
              id="fuel_type"
              options={fuelTypes}
              fullWidth
              // xl={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Fuel Type" />
              )}
              // size="small"
              disabledItemsFocusable
              onChange={(e, v) => {
                setFuelType(v);
                console.log(fuelType);
              }}
            />
          </Grid>
          <Grid
            item
            xl={2}
            lg={2}
            md={2}
            sm={2}
            xs={2}
            // style={{ border: "2px solid blue" }}
            // style={{ marginRight: "15px" }}
            className={classes.filter__container}
            justifyContent="center"
            alignItems="center"
          >
            <Autocomplete
              disablePortal
              id="transmission_type"
              options={transmissionTypes}
              fullWidth
              // xl={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Transmission Type" />
              )}
              // size="small"
              disabledItemsFocusable
              onChange={(e, v) => {
                setTransmissionType(v);
                console.log(transmissionType);
              }}
            />
          </Grid>
          {/* <Grid
            item
            xl={2}
            lg={2}
            md={2}
            sm={2}
            xs={2}
            // style={{ border: "2px solid blue" }}
            style={{ marginRight: "15px" }}
            className={classes.filter__container}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              component="label"
              variant="outlined"
              startIcon={<AddAPhotoIcon />}
            ></Button>
          </Grid> */}
        </Paper>
      </Grid>
      <div className={classes.fleet__title} style={{ marginTop: "55px" }}>
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
