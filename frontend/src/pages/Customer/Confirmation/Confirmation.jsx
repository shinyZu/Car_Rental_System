import React, { useEffect, useState } from "react";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import NavBarRegistered from "../../../components/NavBar/NavBarRegistered";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Grid } from "@mui/material";

function Confirmation(props) {
  const { classes } = props;
  const [bookingStatus, setBookingStatus] = useState("Accepted");
  const [rentalID, setRentalID] = useState("RNTL-0000");
  const [customerEmail, setCustomerEmail] = useState("kamal@gmail.com");

  const [invoice, setInvoice] = useState({
    customer_nic: "995922121v",
    reg_no: "LC-5953",
    brand: "BMW i8",
    fleet: "Luxury",
    ldw: "20000",
    driver_contact: "0766455451",
    p_date: "2022-07-21",
    p_time: "09:30",
    p_venue: "Rental Premises",
    r_date: "2022-07-25",
    r_time: "13:00",
    r_venue: "Rental Premises",
  });

  useEffect(() => {
    if (props.requestStatus == "Accepted") {
      setBookingStatus("Accepted");
      setRentalID(props.nextRentalID);
    } else if (props.requestStatus == "Denied") {
      setBookingStatus("Denied");
    }
  }, []);

  return (
    <>
      <NavBarRegistered />
      <Grid container xl={12} lg={12} md={12} sm={12} xs={12}>
        <Paper
          sx={{
            m: "20px auto",
            p: "20px 10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
          }}
          elevation={12}
        >
          <Typography variant="h2" color="#16a085">
            <CheckCircleIcon
              fontSize="100px"
              className={classes.confirm__icon}
            />
            Request {bookingStatus}
          </Typography>
        </Paper>
      </Grid>
      <Grid container xl={12} lg={12} md={12} sm={12} xs={12}>
        <Paper
          sx={{
            m: "10px auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
          }}
          elevation={0}
        >
          <Typography variant="h6" color="#b7b6b6" align="center">
            Thank you for trusting our service..... We wish you have a safe
            ride.....
            <Typography variant="h5" color="#898989" align="center">
              Your Rental ID is : <b>{rentalID}</b>
            </Typography>
            (Please make a <b>note</b> of your Rental ID <b>now</b>, which may
            be useful in case you need to get more details regarding your
            booking)
            <Typography variant="h6" color="#b7b6b6" align="center">
              You may have recieved a confirmation email to{" "}
              <email>{customerEmail}</email>, if not please contact us....
            </Typography>
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
        justifyContent="center"
      >
        <Typography variant="h5" sx={{ m: "1vh 22vw auto" }}>
          INVOICE
        </Typography>
      </Grid>
      <Grid
        container
        xl={9}
        lg={9}
        md={9}
        sm={9}
        xs={9}
        className={classes.invoice__container1_0}
        sx={{ m: "2vh 22vw auto" }}
        style={{ height: "35vh" }}
        justifyContent="center"
      >
        <Grid
          container
          xl={5}
          lg={5.5}
          md={12}
          sm={12}
          xs={12}
          className={classes.invoice__container1_1}
          style={{ height: "100%" }}
        >
          <Grid
            container
            // item
            xl={4}
            lg={4}
            md={4}
            sm={4}
            xs={4}
            className={classes.invoice__container1_1_1}
            sx={{ m: "5px auto" }}
            rowGap={2}
          >
            <Typography variant="h7">Customer NIC</Typography>
            <Typography variant="h7">Registration No</Typography>
            <Typography variant="h7">Brand</Typography>
            <Typography variant="h7">Car Fleet</Typography>
            <Typography variant="h7">Loss Damage Waiver</Typography>
            <Typography variant="h7">Driver Contact</Typography>
          </Grid>
          <Grid
            container
            xl={8}
            lg={8}
            md={8}
            sm={8}
            xs={8}
            className={classes.invoice__container1_1_2}
            sx={{ m: "5px auto" }}
            style={{ height: "100%" }}
            rowGap={2}
          >
            <Typography variant="h7">: &nbsp;{invoice.customer_nic}</Typography>
            <Typography variant="h7">: &nbsp;{invoice.reg_no}</Typography>
            <Typography variant="h7">: &nbsp;{invoice.brand}</Typography>
            <Typography variant="h7">: &nbsp;{invoice.fleet}</Typography>
            <Typography variant="h7">: &nbsp;{invoice.ldw}</Typography>
            <Typography variant="h7">
              : &nbsp;{invoice.driver_contact}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          xl={6}
          lg={6}
          md={12}
          sm={12}
          xs={12}
          className={classes.invoice__container1_2}
          style={{ height: "100%" }}
        >
          <Grid
            container
            xl={4}
            lg={4}
            md={4}
            sm={4}
            xs={4}
            className={classes.invoice__container1_1_1}
            sx={{ m: "5px auto" }}
            rowGap={2}
          >
            <Typography variant="h7">PickUp Date</Typography>
            <Typography variant="h7">PickUp Time</Typography>
            <Typography variant="h7">PickUp Venue</Typography>
            <Typography variant="h7">Return Date</Typography>
            <Typography variant="h7">Return Time</Typography>
            <Typography variant="h7">Return Venue</Typography>
          </Grid>
          <Grid
            container
            xl={8}
            lg={8}
            md={8}
            sm={8}
            xs={8}
            className={classes.invoice__container1_1_2}
            sx={{ m: "5px auto" }}
            style={{ height: "100%" }}
            rowGap={2}
          >
            <Typography variant="h7">: &nbsp;{invoice.p_date}</Typography>
            <Typography variant="h7">: &nbsp;{invoice.p_time}</Typography>
            <Typography variant="h7">: &nbsp;{invoice.p_venue}</Typography>
            <Typography variant="h7">: &nbsp;{invoice.r_date}</Typography>
            <Typography variant="h7">: &nbsp;{invoice.r_time}</Typography>
            <Typography variant="h7">: &nbsp;{invoice.r_venue}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default withStyles(styleSheet)(Confirmation);
