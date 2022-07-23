import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import NavBarRegistered from "../NavBar/NavBarRegistered";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MyTable from "../common/Table/Table";
import Box from "@mui/material/Box";

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

function TableSearchPage(props) {
  const { classes } = props;

  return (
    <>
      <Grid
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        className={classes.title__container}
        direction="column"
        alignItems="center"
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
          {props.page == "C" ? (
            <Typography
              className={classes.text_style}
              variant="h3"
              color="rgb(55 80 141 / 88%)"
            >
              {/* My Bookings */}
              {props.pageTitle}
            </Typography>
          ) : (
            <Typography
              className={classes.text_style}
              variant="h3"
              color="#4283c7"
            >
              {/* My Bookings */}
              {props.pageTitle}
            </Typography>
          )}

          <Typography
            className={classes.text_style}
            variant="h6"
            style={{ color: "rgb(157 157 157)" }}
          >
            {/* Hope you enjoyed our service.......You can Search and View all your
            Bookings here....... */}
            {props.pageSubtitle}
          </Typography>
        </Paper>
      </Grid>

      {props.page == "C" ? (
        <Grid
          container
          // xl={11}
          // lg={11}
          xl={props.page == "B" ? 10.3 : props.page == "C" ? 7.58 : 7.53}
          lg={props.page == "B" ? 10 : props.page == "C" ? 10.1 : 10}
          md={11}
          sm={11}
          xs={11}
          className={classes.search__bar}
          // direction="column"
          justifyContent="space-between"
        >
          <Grid
            container
            xl={6}
            lg={6}
            md={6}
            sm={6}
            xs={6}
            className={classes.search__bar}
            style={{ margin: " 10px auto" }}
            direction="column"
            alignItems="flex-start"
            // direction="rows"
            // alignItems="center"
            // justifyContent="center"
          >
            <Paper
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
                borderRadius: "8px",
              }}
              elevation={12}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={props.searchbarPlaceholder}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid
            container
            xl={6}
            lg={6}
            md={6}
            sm={6}
            xs={6}
            className={classes.search__bar}
            style={{ margin: " 10px auto" }}
            direction="column"
            alignItems="flex-end"
          >
            <Paper
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
                borderRadius: "8px",
              }}
              elevation={12}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={props.searchbarPlaceholder2}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          xl={6}
          lg={6}
          md={6}
          sm={6}
          xs={6}
          className={classes.search__bar}
          direction="column"
          alignItems="center"
        >
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
              borderRadius: "10px",
            }}
            elevation={12}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={props.searchbarPlaceholder}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      )}

      {props.page == "C" ? (
        <Grid
          container
          xl={props.page == "B" ? 10.3 : props.page == "C" ? 7.58 : 7.53}
          lg={props.page == "B" ? 10 : props.page == "C" ? 10.1 : 10}
          md={10}
          sm={10}
          xs={10}
          className={classes.table__container}
        >
          <Box
            sx={{
              // height: 300,
              width: "100%",
              boxShadow: 1,
              // border: 2,

              "& .header_color": {
                backgroundColor: "#4a619b",
                color: "white",
              },
            }}
          >
            <MyTable
              rows={props.tableData}
              columns={props.tableColumns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              // checkboxSelection
            />
          </Box>
        </Grid>
      ) : (
        <Grid
          container
          xl={props.page == "B" ? 10.3 : props.page == "C" ? 7.58 : 7.53}
          lg={props.page == "B" ? 10 : props.page == "C" ? 10.1 : 10}
          md={10}
          sm={10}
          xs={10}
          className={classes.table__container}
        >
          <Box
            sx={{
              // height: 300,
              width: "100%",
              boxShadow: 1,
              // border: 2,

              "& .header_color": {
                backgroundColor: "#287eb5",
                color: "white",
              },
            }}
          >
            <MyTable
              rows={props.tableData}
              columns={props.tableColumns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              // checkboxSelection
            />
          </Box>
        </Grid>
      )}
    </>
  );
}

export default withStyles(styleSheet)(TableSearchPage);

{
  /* <Grid
  container
  xl={props.page == "B" ? 10.3 : props.page == "C" ? 7.58 : 7.53}
  lg={props.page == "B" ? 10 : props.page == "C" ? 10.1 : 10}
  md={10}
  sm={10}
  xs={10}
  className={classes.table__container}
>
  <Box
    sx={{
      // height: 300,
      width: "100%",
      boxShadow: 1,
      // border: 2,

      "& .header_color": {
        backgroundColor: "#287eb5",
        color: "white",
      },
    }}
  >
    <MyTable
      rows={props.tableData}
      columns={props.tableColumns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      // checkboxSelection
    />
  </Box>
</Grid>; */
}
