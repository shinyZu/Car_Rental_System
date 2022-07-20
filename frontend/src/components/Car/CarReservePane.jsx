import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import { Button } from "@mui/material";
import MyButton from "../../components/common/Button/Button";
import FileChooser from "../../components/common/FileChooser/FileChooser";
import MyTextField from "../../components/common/TextField/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";

function CarReservePane(props) {
  const [reciept, setReciept] = useState("");
  // const [value, setValue] = React.useState(null);
  const { classes } = props;

  let venueList = ["Rental Premises", "Galle", "Colombo", "Panadura"];
  let driverStatus = ["Required", "Not Required"];

  function handleRecieptUpload(e) {
    console.log("uploaded");
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    setReciept(name);
  }

  if (!props.open) return null;

  return (
    <div className={classes.reserve__container}>
      {/* <Grid container>
      <p onClick={props.onClose}>X</p> 
      </Grid> */}
      <Grid
        container
        spacing={1}
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
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <MyTextField
            id="pickUp_date"
            label="Pick Up Date"
            focus={true}
            type="date"
            className={classes.container__2__txtfield}
            // color="red"
            // inputProps={{ className: d.input }}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <MyTextField
            id="pickUp_time"
            type="time"
            label="Pick Up Time"
            focus={true}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <MyTextField
            id="return_date"
            type="date"
            label="Return Date"
            focus={true}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <MyTextField
            id="return_time"
            type="time"
            label="Return Time"
            focus={true}
          />
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
            size="small"
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
            size="small"
          />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Autocomplete
            disablePortal
            id="return_venue"
            options={driverStatus}
            xl={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Driver" />}
            size="small"
          />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <MyTextField
            id="ldw"
            type="text"
            label="Loss damage Waiver(Rs)"
            focus={true}
          />
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <FileChooser
            text=" Upload Reciept"
            file={reciept}
            onUpload={handleRecieptUpload}
          />
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
            label="Reserve Car"
            size="small"
            variant="outlined"
            type="button"
            className={classes.reserve__btn}
            // style={{ backgroundColor: "red" }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styleSheet)(CarReservePane);
