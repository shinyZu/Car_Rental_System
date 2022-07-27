import React, { useEffect, useState } from "react";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import AdminNavbar from "../../../components/NavBar/AdminNavbar";
import Grid from "@mui/material/Grid";
import CarStatusChart from "../../../components/Charts/CarStatusChart/CarStatusChart";
import DriverStatusChart from "../../../components/Charts/DriverStatusChart/DriverStatusChart";
import DailyIncomeChart from "../../../components/Charts/DailyIncomeChart/DailyIncomeChart";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Footer from "../../../components/Footer/Footer";
import CustomerService from "../../../services/CustomerService";
import RentalRequestService from "../../../services/RentalRequestService";

function AdminDashboard(props) {
  const { classes } = props;
  const [card1, setCard1] = useState("10");
  const [card2, setCard2] = useState("18");
  const [card3, setCard3] = useState("12");

  useEffect(() => {
    getCustomerCount();
    getNoOfTotalRentalsForTheDay();
    getNoOfActiveRentalsForTheDay();
  }, []);

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  async function getCustomerCount() {
    let res = await CustomerService.getCustomerCount();
    if (res.status === 200) {
      console.log(res);
      if (res.data.data < 10) {
        let count = "0" + res.data.data;
        setCard1(count);
      }
    }
  }

  async function getNoOfTotalRentalsForTheDay() {
    let today = formatDate(new Date());
    let res = await RentalRequestService.getNoOfTotalRentalsForTheDay(today);
    if (res.status === 200) {
      console.log(res);
      if (res.data.data < 10) {
        let count = "0" + res.data.data;
        setCard2(count);
      }
    }
  }

  async function getNoOfActiveRentalsForTheDay() {
    let today = formatDate(new Date());
    let res = await RentalRequestService.getNoOfActiveRentalsForTheDay(today);
    if (res.status === 200) {
      console.log(res);
      if (res.data.data < 10) {
        let count = "0" + res.data.data;
        setCard3(count);
      }
    }
  }

  return (
    <>
      <AdminNavbar />
      <Grid
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        className={classes.dashboard_container_1_0}
      >
        <Grid
          container
          xl={10}
          lg={10}
          md={12}
          sm={12}
          xs={12}
          className={classes.dashboard_container_1_1}
          justifyContent="space-between"
        >
          <Grid
            container
            xl={3.3}
            lg={3.3}
            md={3.5}
            sm={3.5}
            xs={3.5}
            className={classes.dashboard_container_1_1_0}
          >
            <Paper
              sx={{
                p: "20px 0px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                backgroundImage: `url("https://www.transparenttextures.com/patterns/wall-4-light.png"); !important`,
              }}
              elevation={12}
              style={{
                borderRadius: "20px",
              }}
            >
              <Typography variant="h1" color="#f1c40f">
                {card1}
              </Typography>
              <Typography variant="h5" color="#f1c40f">
                REGISTERED Customers
              </Typography>
            </Paper>
          </Grid>
          <Grid
            container
            xl={3.3}
            lg={3.3}
            md={12}
            sm={12}
            xs={12}
            className={classes.dashboard_container_1_1_0}
          >
            <Paper
              sx={{
                p: "20px 0px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                // background: "#11558a",
                backgroundImage: `url("https://www.transparenttextures.com/patterns/wall-4-light.png"); !important`,
              }}
              elevation={12}
              style={{ borderRadius: "20px" }}
            >
              <Typography variant="h1" color="#9b59b6">
                {card2}
              </Typography>
              <Typography variant="h5" color="#9b59b6">
                Today's TOTAL Bookings
              </Typography>
            </Paper>
          </Grid>
          <Grid
            container
            xl={3.3}
            lg={3.3}
            md={12}
            sm={12}
            xs={12}
            className={classes.dashboard_container_1_1_0}
          >
            <Paper
              sx={{
                p: "20px 0px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                // background: "#11558a",
                backgroundImage: `url("https://www.transparenttextures.com/patterns/wall-4-light.png"); !important`,
              }}
              elevation={12}
              style={{ borderRadius: "20px" }}
            >
              <Typography variant="h1" color="#2ecc71">
                {card3}
              </Typography>
              <Typography variant="h5" color="#2ecc71">
                Today's ACTIVE Bookings
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid
          container
          xl={10}
          lg={10}
          md={12}
          sm={12}
          xs={12}
          className={classes.dashboard_container_1_2}
          justifyContent="space-between"
        >
          <Grid
            container
            xl={4}
            lg={4}
            md={4}
            sm={4}
            xs={4}
            className={classes.dashboard_container_1_2_0}
            justifyContent="center"
            alignItems="center"
          >
            <CarStatusChart />
          </Grid>
          <Grid
            container
            xl={4.5}
            lg={4.5}
            md={4.5}
            sm={4.5}
            xs={4.5}
            className={classes.dashboard_container_1_2_0}
            justifyContent="center"
            alignItems="center"
          >
            <DailyIncomeChart for="dashboard" page="Dashboard" />
          </Grid>
          <Grid
            container
            xl={3}
            lg={3}
            md={3}
            sm={3}
            xs={3}
            className={classes.dashboard_container_1_2_0}
            justifyContent="center"
            alignItems="center"
          >
            <DriverStatusChart />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default withStyles(styleSheet)(AdminDashboard);
