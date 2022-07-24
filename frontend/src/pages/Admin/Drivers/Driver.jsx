import React, { useState } from "react";
import AdminNavbar from "../../../components/NavBar/AdminNavbar";
import { Grid } from "@mui/material";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

import DriverScheduleTable from "../../../components/common/Table/Table";
import Box from "@mui/material/Box";

import Autocomplete from "@mui/material/Autocomplete";
import MyButton from "../../../components/common/Button/Button";
import Footer from "../../../components/Footer/Footer";
// import MyTextField from "../../../components/common/TextField/TextField";

const columns = [
  {
    field: "rental_id",
    headerName: "Rental ID",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },

  {
    field: "license_no",
    headerName: "License No",
    width: 140,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },

  {
    field: "pickUp_date",
    headerName: "PickUp Date",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },

  {
    field: "pickUp_time",
    headerName: "PickUp Time",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },

  {
    field: "pickUp_venue",
    headerName: "PickUp Venue",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },

  {
    field: "return_date",
    headerName: "Return Date",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },

  {
    field: "return_time",
    headerName: "Return Time",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },

  {
    field: "return_venue",
    headerName: "Return Venue",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },

  {
    field: "driver_contact",
    headerName: "Driver Contact",
    width: 140,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },
];

const rows = [];

let driverList = ["B1234567", "B1234567", "B1234567", "B1234567"];

function ManageDrivers(props) {
  const { classes } = props;
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

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
        // style={{ border: "2px solid red" }}
        direction="column"
        alignItems="center"
        // className={classes.container}
      >
        <Paper
          sx={{
            p: "20px 0px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
          }}
          elevation={0}
        >
          <Typography
            // style={{ border: "2px solid red" }}
            variant="h3"
            color="rgb(55 80 141 / 88%)"
          >
            Driver Details
          </Typography>

          <Typography
            variant="h6"
            style={{ /* border: "2px solid red", */ color: "rgb(157 157 157)" }}
          >
            You can Search, View and Change the Assigned Drivers here...
          </Typography>
          <Typography variant="h7" style={{ color: "rgb(157 157 157)" }}>
            (Click on the relevant column to search/filter Schedule details...)
          </Typography>
        </Paper>
      </Grid>
      <Grid
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        // style={{ border: "2px solid red" }}
        // direction="column"
        justifyContent="center"
      >
        <Typography
          variant="h6"
          style={{
            // border: "2px solid red",
            color: "rgb(55 80 141 / 88%)",
            marginBottom: "15px",
          }}
          borderBottom="2px solid rgb(55 80 141 / 88%)"
        >
          Driver Schedule
        </Typography>
      </Grid>

      {/* <Grid
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        style={{ border: "2px solid red" }}
        justifyContent="center"
      >
        <Grid
          container
          // xl={11}
          // lg={11}
          xl={7.5}
          lg={10}
          md={12}
          sm={12}
          xs={12}
          style={{ border: "2px solid green" }}
          justifyContent="center"
        >
          <Grid
            container
            xl={5}
            lg={5}
            md={5}
            sm={5}
            xs={5}
            style={{ border: "2px solid yellow" }}
          >
            <Grid
              item
              xl={10}
              lg={10}
              md={10}
              sm={10}
              xs={10}
              style={{ border: "2px solid deeppink", margin: " 10px" }}
            >
              <Paper
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                  height: "52px",
                  borderRadius: "8px",
                }}
                elevation={3}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Driver by License No"
                />
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
          </Grid>

          <Grid
            container
            xl={7}
            lg={7}
            md={7}
            sm={7}
            xs={7}
            style={{ border: "2px solid lightgreen" }}
          >
            <Grid
              item
              xl={5.5}
              lg={5.5}
              md={5.5}
              sm={5.5}
              xs={5.5}
              style={{ margin: " 10px auto " }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="From"
                  value={dateFrom}
                  onChange={(newValue) => {
                    setDateFrom(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  inputFormat="dd/MM/yyyy"
                />
              </LocalizationProvider>
            </Grid>
            <Grid
              item
              xl={5.5}
              lg={5.5}
              md={5.5}
              sm={5.5}
              xs={5.5}
              style={{ margin: " 10px auto" }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="To"
                  value={dateTo}
                  onChange={(newValue) => {
                    setDateTo(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  inputFormat="dd/MM/yyyy"
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}

      <Grid
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        // style={{ border: "2px solid red" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          xl={7.51}
          lg={10.03}
          md={10}
          sm={10}
          xs={10}
          //   style={{ border: "2px solid blue" }}
        >
          <Box
            sx={{
              height: "58vh",
              width: "100%",
              boxShadow: 1,
              // border: 2,

              "& .header_color": {
                backgroundColor: "#4a619b",
                color: "white",
              },
            }}
          >
            <DriverScheduleTable
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              //   checkboxSelection
            />
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        // style={{ border: "2px solid red" }}
        // direction="column"
        justifyContent="center"
      >
        <Typography
          variant="h6"
          style={{
            // border: "2px solid red",
            color: "rgb(55 80 141 / 88%)",
            margin: "90px 0px 0px 0px",
          }}
          borderBottom="2px solid rgb(55 80 141 / 88%)"
        >
          Change Assigned Drivers
        </Typography>
      </Grid>

      <Grid
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        style={{ /* border: "2px solid deeppink", */ height: "150px" }}
        justifyContent="center"
        alignItems="center"
      >
        <Paper
          sx={{
            p: "20px 0px",
            width: "90%",
            borderRadius: "10px",
          }}
          elevation={12}
        >
          <Grid
            container
            xl={7.56}
            lg={9.9}
            md={12}
            sm={12}
            xs={12}
            style={{
              // border: "2px solid red",
              height: "60px",
              margin: "10px auto",
            }}
            justifyContent="space-around"
          >
            <Grid
              container
              xl={2.8}
              lg={2.8}
              md={2.8}
              sm={2.8}
              xs={2.8}
              // style={{ border: "2px solid blue" }}
              justifyContent="center"
            >
              <TextField
                disabled
                id="outlined-disabled"
                label="Rental ID"
                defaultValue="    "
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid
              container
              xl={2.8}
              lg={2.8}
              md={2.8}
              sm={2.8}
              xs={2.8}
              // style={{ border: "2px solid blue" }}
              justifyContent="center"
            >
              <TextField
                disabled
                id="outlined-disabled"
                label="Current Driver"
                defaultValue="    "
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid
              container
              xl={2.8}
              lg={2.8}
              md={2.8}
              sm={2.8}
              xs={2.8}
              // style={{ border: "2px solid blue" }}
              justifyContent="center"
            >
              <Autocomplete
                disablePortal
                id="drivers"
                options={driverList}
                fullWidth
                xl={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Change Driver To" fullWidth />
                )}
              />
            </Grid>
            <Grid
              container
              xl={2.8}
              lg={2.8}
              md={2.8}
              sm={2.8}
              xs={2.8}
              // style={{ border: "2px solid blue" }}
              justifyContent="flex-end"
            >
              <MyButton
                label="Change Driver"
                variant="outlined"
                type="button"
                className={classes.change_btn}
                style={{ backgroundColor: "red" }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default withStyles(styleSheet)(ManageDrivers);
