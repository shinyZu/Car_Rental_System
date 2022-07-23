import React from "react";
import AdminNavbar from "../../../components/NavBar/AdminNavbar";
import Grid from "@mui/material/Grid";
import DailyIncomeChart from "../../../components/Charts/DailyIncomeChart/DailyIncomeChart";
import WeeklyIncomeChart from "../../../components/Charts/WeeklyIncomeChart/WeeklyIncomeChart";
import MonthlyIncomeChart from "../../../components/Charts/MonthyInomeChart/MonthlyIncomeChart";
import AnnualIncomeChart from "../../../components/Charts/AnnualIncomeChart/AnnualIncomeChart";

function Income() {
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
        style={{ height: "86vh" }}
        // display="flex"
        // direction="column"
        justifyContent="center"
        // alignItems="center"
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
