import React, { useState } from "react";
import AdminNavbar from "../../../components/NavBar/AdminNavbar";
import Grid from "@mui/material/Grid";
import DailyIncomeChart from "../../../components/Charts/DailyIncomeChart/DailyIncomeChart";
import WeeklyIncomeChart from "../../../components/Charts/WeeklyIncomeChart/WeeklyIncomeChart";
import MonthlyIncomeChart from "../../../components/Charts/MonthyInomeChart/MonthlyIncomeChart";
import AnnualIncomeChart from "../../../components/Charts/AnnualIncomeChart/AnnualIncomeChart";

import isWeekend from "date-fns/isWeekend";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";

function Income() {
  const [dateValue, setDateValue] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  function getDate(newValue) {
    let date = newValue.toLocaleDateString();
    let [month, day, year] = date.split("/");

    if (day < 10 && month < 10) {
      day = `0${day}`;
      month = `0${month}`;
    } else if (month < 10) {
      month = `0${month}`;
    } else if (day < 10) {
      day = `0${day}`;
    }
    const newDate = `${year}-${month}-${day}`;
    // console.log(newDate);
    setDateValue(newDate);
    // console.log(dateValue);
  }

  return (
    <>
      <AdminNavbar />

      <div style={{ position: "absolute", top: "140px", left: "20px" }}>
        <Button
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
          style={{ backgroundColor: "#1e3799", padding: "10px" }}
        >
          <CalendarMonthIcon />
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
              orientation="portrait"
              openTo="day"
              value={dateValue}
              onChange={(newValue) => {
                getDate(newValue);
              }}
              //   closeOnSelect={true}
              //   shouldCloseOnSelect={true}
              onAccept={() => {
                console.log("Accepted");
                // handleClose();
                //should send the request to get all 4 types of income
              }}
              onClose={() => {
                console.log("Closed");
                handleClose();
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Popover>
      </div>

      <Grid
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        style={{ height: "86vh" }}
        justifyContent="center"
      >
        <Grid
          container
          xl={11.5}
          lg={11}
          md={11}
          sm={11}
          xs={11}
          columnGap={6}
          //   style={{ border: "2px solid blue" }}
          justifyContent="center"
        >
          <Grid
            container
            xl={5}
            lg={5}
            md={12}
            sm={12}
            xs={12}
            justifyContent="center"
            alignItems="center"
            // style={{ border: "2px solid pink" }}
          >
            <DailyIncomeChart />
          </Grid>
          <Grid
            container
            xl={5}
            lg={5}
            md={12}
            sm={12}
            xs={12}
            justifyContent="center"
            alignItems="center"
            // style={{ border: "2px solid green" }}
          >
            <WeeklyIncomeChart />
          </Grid>
        </Grid>
        <Grid
          container
          xl={10}
          lg={11}
          md={11}
          sm={11}
          xs={11}
          justifyContent="center"
          columnGap={6}
          //   style={{ border: "2px solid blue" }}
        >
          <Grid
            container
            xl={5}
            lg={5}
            md={12}
            sm={12}
            xs={12}
            justifyContent="center"
            alignItems="center"
            // style={{ border: "2px solid pink" }}
          >
            <MonthlyIncomeChart />
          </Grid>
          <Grid
            container
            xl={5}
            lg={5}
            md={12}
            sm={12}
            xs={12}
            justifyContent="center"
            alignItems="center"
            // style={{ border: "2px solid green" }}
          >
            <AnnualIncomeChart />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Income;
