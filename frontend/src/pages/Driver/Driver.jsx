import React from "react";
import { styleSheet } from "./style";
import { withStyles } from "@mui/styles";
import DriverNavbar from "../../components/NavBar/DriverNavbar.jsx";
import Driver from "../Admin/Drivers/Driver";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

import DriverScheduleTable from "../../components/common/Table/Table";
import Box from "@mui/material/Box";

import Autocomplete from "@mui/material/Autocomplete";
import MyButton from "../../components/common/Button/Button";
import DriverSchedules from "../../components/TableSearchPage/TableSearchPage";
import { Grid } from "@mui/material";

function DriverSchedule(props) {
  const { classes } = props;
  let driverList = ["B1234567", "B1234567", "B1234567", "B1234567"];
  return (
    <>
      <DriverNavbar />
      {/* <Driver /> */}

      <DriverSchedules
        page="DS"
        pageTitle="My Schedule"
        pageSubtitle="You can Search and View all your Schedules here...."
        tableColumns={columns}
        tableData={rows}
      />
    </>
  );
}

export default withStyles(styleSheet)(DriverSchedule);

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
    field: "reg_no",
    headerName: "Registration No",
    width: 140,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },

  {
    field: "brand",
    headerName: "Brand",
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
    width: 135,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },
];

const rows = [];
