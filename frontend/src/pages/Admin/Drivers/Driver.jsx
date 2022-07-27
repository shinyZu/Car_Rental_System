import React, { useState, useEffect } from "react";
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
import DriverService from "../../../services/DriverService";
// import MyTextField from "../../../components/common/TextField/TextField";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";

const rows = [];

// let driverList = ["B1234567", "B1234567", "B1234567", "B1234567"];
let driverList = [];

function ManageDrivers(props) {
  const columns = [
    {
      field: "id",
      headerName: "Actions",
      renderCell: (cellValues) => {
        // console.log(cellValues);
        return (
          <>
            <Tooltip title="Change Driver">
              <IconButton>
                <EditIcon
                  // fontSize="large"
                  onClick={() => {
                    console.log("clicked row : " + cellValues.id);
                    // console.log(carData[cellValues.id]);
                    changeAssignedDriver(
                      cellValues.id,
                      tableRows[cellValues.id]
                    );
                  }}
                />
              </IconButton>
            </Tooltip>
          </>
        );
      },
      width: 100,
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
      field: "reg_no",
      headerName: "Registration No",
      width: 140,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "rental_id",
      headerName: "Rental ID",
      width: 130,
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
      field: "contact_no",
      headerName: "Driver Contact",
      width: 140,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },
  ];

  const { classes } = props;
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [tableRows, setTableRows] = useState([]);
  // const [driverList, setDriverList] = useState([]);
  const [changeInfo, setChangeInfo] = useState([]);
  const [id, setId] = useState("");
  const [currentDriver, setCurrentDriver] = useState("");

  useEffect(() => {
    getSchedulesOfAllDrivers();
    getAllDrivers();
  }, []);

  useEffect(() => {
    console.log(changeInfo);
  }, [changeInfo]);

  function changeAssignedDriver(index, row) {
    let info = {};
    info = { rental_id: row.rental_id, license_no: row.license_no };
    setChangeInfo((changeInfo) => ({
      ...changeInfo,
      ...info,
    }));

    let res = DriverService.changeAssignedDriver();
  }

  async function getSchedulesOfAllDrivers() {
    let res = await DriverService.getSchedulesOfAllDrivers();
    if (res.status === 200) {
      console.log(res);

      if (res.data.data != []) {
        let schedules = res.data.data;
        console.log(schedules);
        setTableRows(() => {
          return [...res.data.data];
        });
        console.log(tableRows);
      }
    }
  }

  async function getAllDrivers() {
    let res = await DriverService.getAllDrivers();
    if (res.status === 200) {
      console.log(res);

      if (res.data.data != []) {
        let drivers = res.data.data;
        console.log(drivers);
        driverList.length = 0;
        drivers.map((driver) => {
          driverList.push(driver.license_no);
        });
        console.log(driverList);
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
              // rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              rows={tableRows.map((schedule, index) => ({
                id: index,
                rental_id: schedule.rental_id,
                license_no: schedule.license_no,
                reg_no: schedule.reg_no,
                pickUp_date: schedule.pickUp_date,
                pickUp_time: schedule.pickUp_time,
                pickUp_venue: schedule.pickUp_venue,
                return_date: schedule.return_date,
                return_time: schedule.return_time,
                return_venue: schedule.return_venue,
                contact_no: "0" + schedule.contact_no,
              }))}
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
                id="txt_rental_id"
                label="Rental ID"
                defaultValue="    "
                variant="outlined"
                fullWidth
                value={changeInfo.rental_id}
                // placeholder={changeInfo.rental_id}
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
                id="txt_currentDriver"
                label="Current Driver"
                defaultValue="    "
                variant="outlined"
                fullWidth
                value={changeInfo.license_no}
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
                id="cmb_drivers"
                options={driverList}
                // inputValue={regFormData.transmissionType}
                fullWidth
                xl={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Change Driver To" fullWidth />
                )}
                onChange={(e, v) => {
                  setChangeInfo({
                    ...changeInfo,
                    new_driver: v,
                  });
                }}
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
