import React, { useState, Fragment, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import MyButton from "../../components/common/Button/Button";
import FileChooser from "../../components/common/FileChooser/FileChooser";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers-pro";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
// import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CarFleetService from "../../services/CarFleetService";
import MySnackBar from "../common/Snackbar/MySnackbar";
import RentalRequestService from "../../services/RentalRequestService";
import { useAuth } from "../../pages/Session/Auth";
import CustomerService from "../../services/CustomerService";
import ConfirmDialog from "../../components/common/ConfirmDialog/ConfirmDialog";

function CarReservePane(props) {
  const { classes } = props;
  const auth = useAuth();
  const [nextRentalID, setNextRentalID] = useState(null);
  const [customerNIC, setCustomerNIC] = useState(null);
  const [pickUp_date, setPickUp_date] = useState(null);
  const [pickUp_time, setPickUp_time] = useState(null);
  const [pickUp_venue, setPickUp_venue] = useState("");
  const [return_date, setReturn_date] = useState(null);
  const [return_time, setReturn_time] = useState(null);
  const [return_venue, setReturn_venue] = useState("");
  const [ldw, setLDW] = useState(null);
  const [driverRequire, setDriverRequire] = useState(null);
  const [reciept, setReciept] = useState(null);
  const [isBtnDisable, setIsBtnDisable] = useState(true);
  // const [reserveInfo, setReserveInfo] = useState({
  //   nextRentalID: "",
  //   customerNIC: "",
  //   pickUp_date: "",
  //   pickUp_time: "",
  //   pickUp_venue: "",
  //   return_date: "",
  //   return_time: "",
  //   return_venue: "",
  //   ldw: "",
  //   driverRequire: "",
  //   reciept: "",
  // });

  const [openAlert, setOpenAlert] = useState({
    open: false,
    alert: "",
    severity: "",
    variant: "",
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    confirmBtnStyle: {},
    action: "",
  });

  let venueList = ["Rental Premises", "Galle", "Colombo", "Panadura"];
  let driverStatus = ["Required", "Not Required"];

  const navigate = useNavigate();

  useEffect(() => {
    getLDWFee(props.fleet, props.regNo);
    getCustomerByEmail(auth.user.email);
  }, []);

  function handleRecieptUpload(e) {
    console.log("uploaded");
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    setReciept(name);
    // setReserveInfo({ ...reserveInfo, reciept: name });
  }
  if (!props.open) return null;

  function formatDate(date) {
    // console.log(new Date(pickUp_date).toString());
    // console.log(new Date(pickUp_date).toISOString());
    // console.log(new Date(pickUp_date).toISOString().split("T")[0]);
    return new Date(date).toISOString().split("T")[0];
  }

  function formatTime(time) {
    // console.log(
    //   time.toLocaleString("en-US", {
    //     hour: "numeric",
    //     minute: "numeric",
    //     hour12: true,
    //   })
    // );
    console.log(time);
    // console.log(time.toLocaleString("en-US").split(",")[1].split(" PM")[0]);
    // return time.toLocaleString("en-US").split(",")[1].split(" AM|PM")[0];
    return time.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });
  }

  async function getCustomerByEmail(email) {
    let res = await CustomerService.getCustomerByEmail(email);
    if (res.status === 200) {
      // console.log(res.data.data);
      setCustomerNIC(res.data.data.nic_no);
      // setReserveInfo({ ...reserveInfo, customerNIC: res.data.data.nic_no });
    }
  }

  async function getLDWFee(fleet, reg_no) {
    let res = await CarFleetService.getLDWFeeByDescription(fleet, reg_no);
    if (res.status === 200) {
      setLDW(res.data.data);
      // setReserveInfo({ ...reserveInfo, ldw: res.data.data });
    } else {
      setOpenAlert({
        open: true,
        alert: res.response.data.message,
        severity: "error",
        variant: "standard",
      });
    }
  }

  let data;

  async function handleReservation() {
    if (
      reciept != null &&
      pickUp_date != null &&
      return_date != null &&
      pickUp_time != null &&
      return_time != null
      // reserveInfo.reciept != null &&
      // reserveInfo.pickUp_date != null &&
      // reserveInfo.return_date != null &&
      // reserveInfo.pickUp_time != null &&
      // reserveInfo.return_time != null
    ) {
      let res1 = await RentalRequestService.generateNextID();
      console.log(res1);
      if (res1.status === 200) {
        console.log(res1);
        setNextRentalID(res1.data.data);
        // setReserveInfo({ ...reserveInfo, nextRentalID: res1.data.data });
        data = {
          rental_id: nextRentalID,
          pickUp_date: formatDate(pickUp_date),
          pickUp_time: formatTime(pickUp_time),
          pickUp_venue: pickUp_venue,
          return_date: formatDate(return_date),
          return_time: formatTime(return_time),
          return_venue: return_venue,
          requestStatus: "Pending",
          totalPaymentForRental: 0.0,
          amountToReturn: 0.0,
          customer: {
            nic_no: customerNIC,
          },
          admin: null,
          rentalDetails: [
            {
              rental_id: nextRentalID,
              reg_no: props.regNo,
              driverStatus: driverRequire,
              driver: null,
              feeDeductedFromLDW: 0.0,
              km_atPickUp: props.mileage,
              km_atReturn: 0.0,
              km_travelled: 0.0,
            },
          ],
        };
        console.log(data);
        console.log("All filled");
        let res2 = await RentalRequestService.placeRentalRequest(data);
        if (res2.status === 201) {
          console.log(res2);
          setOpenAlert({
            open: true,
            alert: res2.data.message,
            severity: "success",
            variant: "standard",
          });
          setPickUp_date("");
          setPickUp_time("");
          setPickUp_venue("");
          setReturn_date("");
          setReturn_time("");
          setReturn_venue("");
          setDriverRequire("");
          setLDW("");
          setReciept("");
          // setReserveInfo({});
          props.onClose();
          // navigate("/confirmation_details", { state: {invoice:data, fleet:props.fleet,brand:props.brand} });
          navigate("/confirmation_details", {
            state: {
              rental_id: nextRentalID,
              requestStatus: "Pending",
              brand: props.brand,
            },
          });
        } else {
          setOpenAlert({
            open: true,
            alert: res2.response.data.message,
            severity: "error",
            variant: "standard",
          });
        }
      } else {
        setOpenAlert({
          open: true,
          alert: res1.response.data.message,
          severity: "error",
          variant: "standard",
        });
      }

      // navigate("/confirmation_details");
    } else {
      setOpenAlert({
        open: true,
        alert: "Please fill all the fields to proceed Reservation",
        severity: "warning",
        variant: "standard",
      });
    }
  }

  return (
    <div className={classes.reserve__container}>
      {/* <Grid container>
      <p onClick={props.onClose}>X</p> 
      </Grid> */}

      <Grid
        container
        // spacing={1}
        columnSpacing={2}
        className={classes.container__2}
      >
        <Grid
          item
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          spacing={3}
          className={classes.reserve__closeBtn}
        >
          <p onClick={props.onClose} style={{ margin: "0px" }}>
            X
          </p>
        </Grid>
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
          <Typography className={classes.text_style} variant="h4">
            Reservation Details
          </Typography>
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="PickUp Date"
              value={pickUp_date}
              inputFormat="dd/MM/yyyy"
              onChange={(newValue) => {
                setPickUp_date(newValue);
                // setReserveInfo({ ...reserveInfo, pickUp_date: newValue });
              }}
              renderInput={(params) => <TextField {...params} fullWidth />}
              disablePast
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          {/* <MyTextField
            id="return_date"
            type="date"
            label="Return Date"
            focus={true}
          /> */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Return Date"
              value={return_date}
              onChange={(newValue) => {
                setReturn_date(newValue);
                // setReserveInfo({ ...reserveInfo, return_date: newValue });
              }}
              renderInput={(params) => <TextField {...params} fullWidth />}
              // inputFormat="dd-MM-yyyy"
              disablePast
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="PickUp Time"
              ampm={false}
              ampmInClock={false}
              // openTo="hours"
              // views={["hours", "minutes", "seconds"]}
              inputFormat="HH:mm:ss"
              mask="__:__:__"
              value={pickUp_time}
              onChange={(newValue) => {
                setPickUp_time(newValue);
                // setReserveInfo({ ...reserveInfo, pickUp_time: newValue });
              }}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Return Time"
              ampmInClock={false}
              ampm={false}
              inputFormat="HH:mm:ss"
              mask="__:__:__"
              value={return_time}
              onChange={(newValue) => {
                setReturn_time(newValue);
                // setReserveInfo({ ...reserveInfo, return_time: newValue });
              }}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Autocomplete
            disablePortal
            id="pickUp_venue"
            options={venueList}
            xl={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Pick Up Venue" />
            )}
            onChange={(e, v) => {
              setPickUp_venue(v);
              // setReserveInfo({ ...reserveInfo, pickUp_venue: v });
            }}
            // size="medium"
          />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Autocomplete
            disablePortal
            id="return_venue"
            options={venueList}
            xl={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Return Venue" />
            )}
            onChange={(e, v) => {
              setReturn_venue(v);
              // setReserveInfo({ ...reserveInfo, return_venue: v });
            }}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Autocomplete
            disablePortal
            id="driver_status"
            options={driverStatus}
            xl={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Driver" />}
            onChange={(e, v) => {
              setDriverRequire(v);
              // setReserveInfo({ ...reserveInfo, driverRequire: v });
            }}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <TextField
            id="outlined-multiline-flexible"
            label="Loss Damage Waiver (Rs)"
            fullWidth
            value={ldw}
            disabled
            focused
            // multiline
            // maxRows={4}
            // onChange={() => setLDW(ldw)}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <FileChooser
            text=" Upload Reciept"
            file={reciept}
            onUpload={handleRecieptUpload}
            style={{ width: "500px" }}
            displayFileName={true}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Typography
            className={classes.text_style}
            variant="h7"
            style={{ color: "#7f8c8d" }}
          >
            Please pay the above Fee to the Bank and upoad the Confirmation
            Reciept
          </Typography>
        </Grid>

        <Grid
          item
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className={classes.reserve__btn__cell}
        >
          <MyButton
            label="Reserve"
            size="small"
            variant="outlined"
            type="button"
            // disabled={isBtnDisable}
            className={classes.reserve__btn}
            style={{ backgroundColor: "red" }}
            onClick={() => {
              handleReservation();
              // navigate("/confirmation_details");
            }}
          />
        </Grid>
      </Grid>
      <MySnackBar
        open={openAlert.open}
        alert={openAlert.alert}
        severity={openAlert.severity}
        variant={openAlert.variant}
        onClose={() => {
          setOpenAlert({ open: false });
        }}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
}

export default withStyles(styleSheet)(CarReservePane);
