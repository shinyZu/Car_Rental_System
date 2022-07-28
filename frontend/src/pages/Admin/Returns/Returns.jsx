import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../components/NavBar/AdminNavbar";
import TableReturn from "../../../components/TableSearchPage/TableSearchPage";
import { Grid } from "@mui/material";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";

import MaterialTable from "@material-table/core";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import RestoreIcon from "@mui/icons-material/Restore";
import { getRowIdFromRowModel } from "@mui/x-data-grid/hooks/features/rows/gridRowsUtils";

import TextField from "@mui/material/TextField";

import MyButton from "../../../components/common/Button/Button";
import Footer from "../../../components/Footer/Footer";
import RentalRequestService from "../../../services/RentalRequestService";
import MySnackBar from "../../../components/common/Snackbar/MySnackbar";
import RentalPaymentService from "../../../services/RentalPaymentService";
import CarService from "../../../services/CarService";

function RentalReturns(props) {
  const { classes } = props;
  const columns = [
    // {
    //   field: "id",
    //   headerName: "-",
    //   width: 10,
    //   headerClassName: "header_color",
    //   headerAlign: "center",
    // },

    {
      field: "id",
      headerName: "Action",
      renderCell: (cellValues) => {
        //   console.log(cellValues);
        return (
          <Tooltip title="Return">
            <IconButton>
              <RestoreIcon
                // fontSize="large"
                onClick={() => {
                  console.log(cellValues.row);
                  setInvoiceDetails(cellValues.row);
                  setInvoiceIsShown("block");
                }}
              />
            </IconButton>
          </Tooltip>
        );
      },
      width: 100,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "rental_id",
      headerName: "Rental ID",
      width: 170,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "reg_no",
      headerName: "Registration No",
      width: 170,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "nic_no",
      headerName: "Customer NIC",
      width: 200,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "license_no",
      headerName: "Driver License No",
      width: 150,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "km_atPickUp",
      headerName: "Initial Mileage (KM)",
      width: 200,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "km_atReturn",
      headerName: "Final Mileage (KM)",
      width: 200,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },
  ];

  const rows = [
    {
      id: "1",
      rental_id: "RNTL-0001",
      reg_no: "GC-5951",
      customer_nic: "995922121v",
      license_no: "B1234561",
      km_atPickUp: "8000",
      km_atReturn: "-",
    },
    {
      id: "2",
      rental_id: "RNTL-0002",
      reg_no: "GC-5952",
      customer_nic: "995922122v",
      license_no: "null",
      km_atPickUp: "5000",
      km_atReturn: "-",
    },
    {
      id: "3",
      rental_id: "RNTL-0003",
      reg_no: "GC-5953",
      customer_nic: "995922123v",
      license_no: "B1234562",
      km_atPickUp: "7500",
      km_atReturn: "-",
    },
  ];

  const [rentalID, setRentalID] = useState("RNTL-0001");
  const [regNo, setRegNo] = useState("GC-5951");
  const [custNIC, setCustNIC] = useState("995922121v");
  const [datePick, setDatePick] = useState("2022-07-23");
  const [timePick, setTimePick] = useState("10:22");
  const [venuePick, setVenuePick] = useState("Rental Premises");
  const [dateReturn, setDateReturn] = useState("2022-07-25");
  const [timeReturn, setTimeReturn] = useState("13:30");
  const [venueReturn, setVenueReturn] = useState("Rental Premises");

  const [kmAtPick, setKmAtPick] = useState(8000);
  const [kmAtReturn, setKmAtReturn] = useState(0);
  const [kmTravelled, setKmTravelled] = useState(0);
  const [driverStatus, setDriverStatus] = useState("Required");
  const [licenseNo, setLicenseNo] = useState("B1234567");
  const [driverFee, setDriverFee] = useState(0);
  const [ldwFee, setLDWFee] = useState("20000.0");
  const [feeDeducted, setFeeDeducted] = useState(0);
  const [duration, setDuration] = useState(2);

  const [amountReturn, setAmountReturn] = useState(0);
  const [totalRental, setTotalRental] = useState(0);

  const [invoiceIsShown, setInvoiceIsShown] = useState("none");

  const [tableRows, setTableRows] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);

  const [openAlert, setOpenAlert] = useState({
    open: "",
    alert: "",
    severity: "",
    variant: "",
  });

  const [isCalBtnDisable, setIsCalBtnDisable] = useState(true);
  const [isDefectiveBtnDisable, setIsDefectiveBtnDisable] = useState(true);
  const [isMaintBtnDisable, setIsMaintBtnDisable] = useState(true);
  const [isConfirmBtnDisable, setIsConfirmBtnDisable] = useState(true);

  useEffect(() => {
    getAllRentalsToBeReturned();
  }, []);

  function setInvoiceDetails(row) {
    getInvoiceDetailsFromDB(row.rental_id, row.reg_no);
    setRentalID(row.rental_id);
    setRegNo(row.reg_no);
    setCustNIC(row.nic_no);
    setKmAtPick(row.km_atPickUp);
    if (row.license_no == "null") {
      setLicenseNo("-");
      setDriverStatus("Not Required");
    } else {
      setLicenseNo(row.license_no);
      setDriverStatus("Required");
    }
  }

  async function getInvoiceDetailsFromDB(rental_id, reg_no) {
    let res = await RentalRequestService.getInvoiceDetails(rental_id, reg_no);
    console.log(res);
    if (res.status === 200) {
      if (res.data.data != []) {
        let details = res.data.data[0];
        console.log(details);
        setDatePick(details.pickUp_date);
        setTimePick(details.pickUp_time);
        setVenuePick(details.pickUp_venue);
        setDateReturn(details.return_date);
        setTimeReturn(details.return_time);
        setVenueReturn(details.return_venue);
        setLDWFee(details.fee);
        getRentalDuration(rental_id);
      }
    }
  }

  async function getRentalDuration(rental_id) {
    let res = await RentalRequestService.getRentalDuration(rental_id);
    console.log(res);
    if (res.status === 200) {
      if (res.data.data != []) {
        let duration = res.data.data;
        console.log(duration);
        setDuration(duration);
      }
    }
  }

  async function getAllRentalsToBeReturned() {
    let res = await RentalRequestService.getAllRentalsToBeReturned();
    console.log(res);
    if (res.status === 200) {
      if (res.data.data != []) {
        let details = res.data.data;
        console.log(details);
        setTableRows(() => {
          return [...res.data.data];
        });
        console.log(tableRows);
      }
    }
  }

  function handleCalBtnStatus() {
    if (driverFee <= 0 && kmAtReturn <= 0 && feeDeducted <= 0) {
      setIsCalBtnDisable(true);
    } else {
      setIsCalBtnDisable(false);
    }
  }

  async function calculatePayment() {
    console.log("Payment");
    console.log(driverFee);
    if (driverFee == 0 || kmAtReturn == 0 || feeDeducted == 0) {
      setOpenAlert({
        open: true,
        alert: "Please fill the requied fields to Calculate Payment",
        severity: "warning",
        variant: "standard",
      });
    } else if (driverFee < 0 || kmAtReturn < 0 || feeDeducted < 0) {
      setOpenAlert({
        open: true,
        alert: "Invalid Inputs...Check your inputs",
        severity: "warning",
        variant: "standard",
      });
    } else {
      console.log("Cal Payment");
      let details = {
        rental_id: rentalID,
        reg_no: regNo,
        feeDeductedFromLDW: feeDeducted,
        km_atReturn: kmAtReturn,
      };
      console.log(details);
      let res1 = await RentalPaymentService.calculatePaymentForEachCar(details);
      console.log(res1.data.data);

      if (res1.status === 200) {
        let res2 = await RentalRequestService.calculateTotalPaymentForRental(
          rentalID
        );
        console.log(res2);
        let totalPayment = res2.data.data;
        console.log(totalPayment);
        setTotalRental(totalPayment);

        if (res2.status === 200) {
          let res3 = await RentalRequestService.calculateAmountToReturn(
            rentalID
          );
          console.log(res3);
          let returnBack = res3.data.data;
          console.log(returnBack);
          setAmountReturn(returnBack);

          if (res3.status === 200) {
            console.log(res3.data.message);

            let updateInfo = {
              reg_no: regNo,
              currentStatus: "Available",
            };
            let res4 = await CarService.updateCarStatus(updateInfo);
            console.log(res4);
            if (res4.status === 200) {
              setOpenAlert({
                open: true,
                alert: "Payment Recorded Successfully!",
                severity: "success",
                variant: "standard",
              });
              // clearInvoiceFields();
              setIsCalBtnDisable(true);
              setIsDefectiveBtnDisable(false);
              setIsMaintBtnDisable(false);
              setIsConfirmBtnDisable(false);
            }
          } else {
            setOpenAlert({
              open: true,
              alert: res3.response.data.message,
              severity: "error",
              variant: "standard",
            });
          }
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
    }
  }

  function clearInvoiceFields() {
    setRentalID("");
    setRegNo("");
    setCustNIC("");
    setDatePick("");
    setTimePick("");
    setVenuePick("");
    setDateReturn("");
    setTimeReturn("");
    setVenueReturn("");
    setDriverStatus("");
    setLicenseNo("");
    setLDWFee("");
    getRentalDuration("");
    setDriverFee(0);
    setKmAtPick("");
    setKmAtReturn(0);
    setKmTravelled("");
    setLDWFee("");
    setFeeDeducted(0);
    setDuration(0);
    setIsCalBtnDisable(true);
  }

  async function markCarAsDefective() {
    if (totalRental != 0) {
      let updateInfo = {
        reg_no: regNo,
        currentStatus: "Need Maintenance",
      };
      let res = await CarService.updateCarStatus(updateInfo);
      if (res.status === 200) {
        setOpenAlert({
          open: true,
          alert: res.data.message,
          severity: "success",
          variant: "standard",
        });
      }
    }
  }
  async function addCarToMaintenance() {
    if (totalRental != 0) {
      let updateInfo = {
        reg_no: regNo,
        currentStatus: "Under Maintenance",
      };
      let res = await CarService.updateCarStatus(updateInfo);
      if (res.status === 200) {
        setOpenAlert({
          open: true,
          alert: res.data.message,
          severity: "success",
          variant: "standard",
        });
      }
    }
  }
  async function finalizeRentalProcess() {
    if (totalRental != 0) {
      clearInvoiceFields();
      setIsCalBtnDisable(true);
      setIsDefectiveBtnDisable(true);
      setIsMaintBtnDisable(true);
      setIsConfirmBtnDisable(true);
      setInvoiceIsShown("none");
      getAllRentalsToBeReturned();
    }
  }

  return (
    <>
      <AdminNavbar />

      {/* //-------------------Return Table--------------- */}

      <TableReturn
        page="RR"
        pageTitle="Rental Returns"
        pageSubtitle="You can Search,View, Accept Rental Returns and Calculate Rental Payments here...."
        tableColumns={columns}
        // tableData={rows}
        tableData={tableRows.map((detail, index) => ({
          id: index,
          rental_id: detail.rental_id,
          reg_no: detail.reg_no,
          nic_no: detail.nic_no,
          license_no: detail.license_no,
          km_atPickUp: detail.km_atPickUp,
          km_atReturn: detail.km_atReturn,
        }))}
        stickyHeader={true}
        rowsPerPageOptions={5}
      />

      {/* //---------------Invoice Details displayed on Button clicked--------- */}

      <div style={{ /*  border: "2px solid red", */ display: invoiceIsShown }}>
        <Grid
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          //   style={{ border: "2px solid red" }}
          justifyContent="center"
        >
          <Typography
            variant="h6"
            style={{
              // border: "2px solid red",
              color: "rgb(55 80 141 / 88%)",
              margin: "50px 0px 0px 0px",
              fontSize: "3vw",
            }}
            borderBottom="2px solid rgb(55 80 141 / 88%)"
          >
            INVOICE
          </Typography>
        </Grid>

        <Grid
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          style={
            {
              // border: "2px solid lightgreen",
            }
          }
        >
          <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            style={{
              // border: "2px solid red",
              margin: "40px 0px 0px 0px",
            }}
          >
            <Grid
              container
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              style={{
                //   border: "2px solid green",
                marginBottom: "16px",
                height: "fit-content",
              }}
              justifyContent="space-between"
            >
              <Grid
                container
                xl={5.8}
                lg={5.8}
                md={5.8}
                sm={5.8}
                xs={5.8}
                style={
                  {
                    // border: "2px solid blue",
                  }
                }
                direction="column"
                alignItems="end"
                rowGap={2}
              >
                <Typography variant="h7">Rental ID</Typography>
                <Typography variant="h7">Registration No</Typography>
                <Typography variant="h7">Customer NIC</Typography>
              </Grid>
              <Grid
                container
                xl={5.8}
                lg={5.8}
                md={5.8}
                sm={5.8}
                xs={5.8}
                style={
                  {
                    // border: "2px solid blue",
                  }
                }
                direction="column"
                rowGap={2}
              >
                <Typography variant="h7"> : &nbsp; {rentalID}</Typography>
                <Typography variant="h7"> : &nbsp; {regNo}</Typography>
                <Typography variant="h7"> : &nbsp; {custNIC}</Typography>
              </Grid>
            </Grid>

            <Grid
              container
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              style={{
                //   border: "2px solid green",
                marginBottom: "16px",
                height: "fit-content",
              }}
              justifyContent="space-between"
            >
              <Grid
                container
                xl={5.8}
                lg={5.8}
                md={5.8}
                sm={5.8}
                xs={5.8}
                style={
                  {
                    // border: "2px solid blue",
                  }
                }
                direction="column"
                alignItems="end"
                rowGap={2}
              >
                <Typography variant="h7">Pick-up Date</Typography>
                <Typography variant="h7">Pick-up Time</Typography>
                <Typography variant="h7">Pick-up Venue</Typography>
              </Grid>
              <Grid
                container
                xl={5.8}
                lg={5.8}
                md={5.8}
                sm={5.8}
                xs={5.8}
                style={
                  {
                    // border: "2px solid blue",
                  }
                }
                direction="column"
                rowGap={2}
              >
                <Typography variant="h7"> : &nbsp; {datePick}</Typography>
                <Typography variant="h7"> : &nbsp; {timePick}</Typography>
                <Typography variant="h7"> : &nbsp; {venuePick}</Typography>
              </Grid>
            </Grid>

            <Grid
              container
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              style={{
                //   border: "2px solid green",
                marginBottom: "16px",
                height: "fit-content",
              }}
              justifyContent="space-between"
            >
              <Grid
                container
                xl={5.8}
                lg={5.8}
                md={5.8}
                sm={5.8}
                xs={5.8}
                style={
                  {
                    // border: "2px solid blue",
                  }
                }
                direction="column"
                alignItems="end"
                rowGap={2}
              >
                <Typography variant="h7">Return Date</Typography>
                <Typography variant="h7">Return Time</Typography>
                <Typography variant="h7">Return Venue</Typography>
              </Grid>
              <Grid
                container
                xl={5.8}
                lg={5.8}
                md={5.8}
                sm={5.8}
                xs={5.8}
                style={
                  {
                    // border: "2px solid blue",
                  }
                }
                direction="column"
                rowGap={2}
              >
                <Typography variant="h7"> : &nbsp; {dateReturn}</Typography>
                <Typography variant="h7"> : &nbsp; {timeReturn}</Typography>
                <Typography variant="h7"> : &nbsp; {venueReturn}</Typography>
              </Grid>
            </Grid>

            <Grid
              container
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              style={{
                //   border: "2px solid green",
                marginBottom: "16px",
                height: "fit-content",
              }}
              justifyContent="space-between"
            >
              <Grid
                container
                xl={5.8}
                lg={5.8}
                md={5.8}
                sm={5.8}
                xs={5.8}
                style={
                  {
                    // border: "2px solid blue",
                  }
                }
                direction="column"
                alignItems="end"
                rowGap={2}
              >
                <Typography variant="h7">Driver Status</Typography>
                <Typography variant="h7">Driver License No</Typography>
                <Typography variant="h7">Driver Fee(Rs)</Typography>
              </Grid>
              <Grid
                container
                xl={5.8}
                lg={5.8}
                md={5.8}
                sm={5.8}
                xs={5.8}
                style={
                  {
                    // border: "2px solid blue",
                  }
                }
                direction="column"
                rowGap={2}
              >
                <Typography variant="h7"> : &nbsp; {driverStatus}</Typography>
                <Typography variant="h7"> : &nbsp; {licenseNo}</Typography>
                <Typography variant="h7">
                  {" "}
                  : &nbsp;
                  <input
                    value={driverFee}
                    type="number"
                    onChange={(e) => {
                      setDriverFee(e.target.value);
                      handleCalBtnStatus();
                    }}
                  />
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              style={{
                //   border: "2px solid green",
                marginBottom: "16px",
                height: "fit-content",
              }}
              justifyContent="space-between"
            >
              <Grid
                container
                xl={5.8}
                lg={5.8}
                md={5.8}
                sm={5.8}
                xs={5.8}
                style={
                  {
                    // border: "2px solid blue",
                  }
                }
                direction="column"
                alignItems="end"
                rowGap={2}
              >
                <Typography variant="h7">KM At Pick-up</Typography>
                <Typography variant="h7">KM At Return</Typography>
                <Typography variant="h7">KM Travelled</Typography>
              </Grid>
              <Grid
                container
                xl={5.8}
                lg={5.8}
                md={5.8}
                sm={5.8}
                xs={5.8}
                style={
                  {
                    // border: "2px solid blue",
                  }
                }
                direction="column"
                rowGap={2}
              >
                <Typography variant="h7"> : &nbsp; {kmAtPick}</Typography>
                <Typography variant="h7">
                  : &nbsp;
                  <input
                    value={kmAtReturn}
                    type="number"
                    onChange={(e) => {
                      setKmAtReturn(e.target.value);
                      setKmTravelled(e.target.value - kmAtPick);
                      handleCalBtnStatus();
                    }}
                  />
                </Typography>
                <Typography variant="h7"> : &nbsp; {kmTravelled}</Typography>
              </Grid>
            </Grid>

            <Grid
              container
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              style={{
                //   border: "2px solid green",
                marginBottom: "16px",
                height: "fit-content",
              }}
              justifyContent="space-between"
            >
              <Grid
                container
                xl={5.8}
                lg={5.8}
                md={5.8}
                sm={5.8}
                xs={5.8}
                style={
                  {
                    // border: "2px solid blue",
                  }
                }
                direction="column"
                alignItems="end"
                rowGap={2}
              >
                <Typography variant="h7">Loss Damage Waiver(Rs)</Typography>
                <Typography variant="h7">Fee Deducted (Rs)</Typography>
                <Typography variant="h7">Rental Duration</Typography>
              </Grid>
              <Grid
                container
                xl={5.8}
                lg={5.8}
                md={5.8}
                sm={5.8}
                xs={5.8}
                style={
                  {
                    // border: "2px solid blue",
                  }
                }
                direction="column"
                rowGap={2}
              >
                <Typography variant="h7"> : &nbsp; {ldwFee}</Typography>
                <Typography variant="h7">
                  : &nbsp;
                  <input
                    value={feeDeducted}
                    type="number"
                    onChange={(e) => {
                      setFeeDeducted(e.target.value);
                      handleCalBtnStatus();
                    }}
                  />
                </Typography>
                <Typography variant="h7">
                  {" "}
                  : &nbsp;
                  {duration < 30 && duration > 0
                    ? duration + " Day/s"
                    : duration / 30 >= 1
                    ? (duration / 30) % 1 == 0
                    : +(duration / 30) + " Month/s"
                    ? (duration / 30).toFixed(1) + " Month/s"
                    : duration == 0
                    ? "0 Days"
                    : null}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* //---------Calculate Button-------------*/}

          <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            // style={{ border: "2px solid blue" }}
            justifyContent="center"
          >
            <MyButton
              label="Calculate Payment"
              variant="outlined"
              type="button"
              className={classes.calculate_btn}
              onClick={calculatePayment}
              disabled={isCalBtnDisable}
              btnDisableStyle={{ backgroundColor: "#92c3b9 !important" }}
            />
          </Grid>

          {/* //---------Payment Details------------ */}

          <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            style={{
              //   border: "2px solid green",
              margin: "30px 16px",
              height: "fit-content",
            }}
            justifyContent="space-between"
          >
            <Grid
              container
              xl={5.8}
              lg={5.8}
              md={5.8}
              sm={5.8}
              xs={5.8}
              style={
                {
                  // border: "2px solid blue",
                }
              }
              direction="column"
              alignItems="end"
              rowGap={2}
            >
              <Typography variant="h7">Amount To Return Back (Rs)</Typography>
              <Typography variant="h7">Total Payment (Rs)</Typography>
            </Grid>
            <Grid
              container
              xl={5.8}
              lg={5.8}
              md={5.8}
              sm={5.8}
              xs={5.8}
              style={
                {
                  // border: "2px solid blue",
                }
              }
              direction="column"
              rowGap={2}
            >
              <Typography variant="h7"> : &nbsp; {amountReturn}</Typography>
              <Typography variant="h7"> : &nbsp; {totalRental}</Typography>
            </Grid>
          </Grid>

          {/* //---------Confirm Return, AddTo Maintenance, Mark Defective Buttons-------------should update km-AtPickUp = km_AtReturn in DB  */}

          <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            style={{ /* border: "2px solid red", */ marginBottom: "25px" }}
            justifyContent="center"
            // alignItems="center"
          >
            <Grid
              container
              xl={4}
              lg={4}
              md={4}
              sm={4}
              xs={4}
              style={
                {
                  // border: "2px solid blue" /* ,  marginBottom: "20px"  */,
                }
              }
              justifyContent="center"
            >
              <MyButton
                label="Mark Defective"
                variant="outlined"
                type="button"
                disabled={isDefectiveBtnDisable}
                className={classes.mark_defective_btn}
                onClick={markCarAsDefective}
              />
            </Grid>
            <Grid
              container
              xl={4}
              lg={4}
              md={4}
              sm={4}
              xs={4}
              style={
                {
                  // border: "2px solid blue" /* ,  marginBottom: "20px"  */,
                }
              }
              justifyContent="center"
            >
              <MyButton
                label="Add To Maintenance"
                variant="outlined"
                type="button"
                disabled={isMaintBtnDisable}
                className={classes.add_to_maintenance_btn}
                onClick={addCarToMaintenance}
              />
            </Grid>
            <Grid
              container
              xl={4}
              lg={4}
              md={4}
              sm={4}
              xs={4}
              style={
                {
                  // border: "2px solid blue" /* ,  marginBottom: "20px"  */,
                }
              }
              justifyContent="center"
            >
              <MyButton
                label="Confirm Return"
                variant="outlined"
                type="button"
                disabled={isConfirmBtnDisable}
                className={classes.confirm_return_btn}
                onClick={finalizeRentalProcess} // mark car as Available if not mark as defective or added to maintenance
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
      <MySnackBar
        open={openAlert.open}
        alert={openAlert.alert}
        severity={openAlert.severity}
        variant={openAlert.variant}
        onClose={() => {
          setOpenAlert({ open: false });
        }}
      />
    </>
  );
}

export default withStyles(styleSheet)(RentalReturns);

// On Add To Maintenace --> should add details to "Under Maintanace Table" with date
// On Mark defective --> should add details to "Need Maintanace Table" with date

/* let date = new Date();
//   const getDate = () => {
//     return date.toLocaleString("en-US", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });
//   };
//   console.log(getDate());

let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

if (month < 10) {
  month = "0" + month;
} else {
  month = month;
}
console.log(day + "-" + month + "-" + year); */
