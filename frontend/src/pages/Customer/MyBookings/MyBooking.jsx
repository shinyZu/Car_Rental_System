import React, { useEffect, useState } from "react";
import NavBarRegistered from "../../../components/NavBar/NavBarRegistered";
import MyBookingDetails from "../../../components/TableSearchPage/TableSearchPage";
// import { Grid } from "@mui/material";
// import { withStyles } from "@mui/styles";
// import { styleSheet } from "./style";
// import Typography from "@mui/material/Typography";
// import Paper from "@mui/material/Paper";
// import InputBase from "@mui/material/InputBase";
// import IconButton from "@mui/material/IconButton";
// import SearchIcon from "@mui/icons-material/Search";
// import MyTable from "../../../components/common/Table/Table";
// import { DataGrid } from "@mui/x-data-grid";
// import Box from "@mui/material/Box";

const columns = [
  {
    field: "rental_id",
    headerName: "Booking ID",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "reg_no",
    headerName: "Reg No",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "brand",
    headerName: "Brand",
    width: 200,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "pickUp_date",
    headerName: "PickUp Date",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "pickUp_time",
    headerName: "PickUp Time",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "pickUp_venue",
    headerName: "PickUp Venue",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "return_date",
    headerName: "Return Date",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "return_time",
    headerName: "Return Time",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "return_venue",
    headerName: "Return Venue",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "request_status",
    headerName: "Booking Status",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "driver_status",
    headerName: "Driver Status",
    width: 140,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "driver_contact",
    headerName: "Driver Contact",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
  },
];

const rows = [
  // {
  //   rental_id: "RNTL-0001",
  //   reg_no: "GC-5951",
  //   brand: "Suzuki",
  //   pickUp_date: "2022-07-21",
  //   pickUp_time: "12:00:00",
  //   pickUp_venue: "asas",
  //   return_date: "2022-07-24",
  //   return_time: "assa",
  //   return_venue: "asa",
  //   request_status: "Accepted",
  //   driver_status: "Required",
  //   driver_contact: "0776455451",
  // },
  // {
  //   rental_id: "RNTL-0001",
  //   reg_no: "GC-5951",
  //   brand: "Suzuki",
  //   pickUp_date: "2022-07-21",
  //   pickUp_time: "12:00:00",
  //   pickUp_venue: "asas",
  //   return_date: "2022-07-24",
  //   return_time: "assa",
  //   return_venue: "asa",
  //   request_status: "Accepted",
  //   driver_status: "Required",
  //   driver_contact: "0776455451",
  // },
];

function MyBooking(props) {
  const { classes } = props;

  return (
    <>
      <NavBarRegistered />
      <MyBookingDetails
        page="B"
        pageTitle="My Bookings"
        pageSubtitle="Hope you enjoyed our service.......You can Search and View all your Bookings here......."
        searchbarPlaceholder="Search My Bookings"
        // tableWidth_xl={10}
        // tableWidth_lg={10}
        tableColumns={columns}
        tableData={rows}
      />
    </>
  );
}

export default MyBooking;
// export default withStyles(styleSheet)(MyBooking);
