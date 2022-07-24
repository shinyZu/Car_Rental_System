import React, { useState } from "react";
import AdminNavbar from "../../../components/NavBar/AdminNavbar";
import { Grid } from "@mui/material";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import Typography from "@mui/material/Typography";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import sample_img from "../../../assets/images/Luxury/BMW/side2.jpg";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import FileChooser from "../../../components/common/FileChooser/FileChooser";
import TableCars from "../../../components/TableSearchPage/TableSearchPage";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RestoreIcon from "@mui/icons-material/Restore";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ManageCar(props) {
  const { classes } = props;
  const [regFormData, setRegFormData] = useState({
    reg_no: "",
    brand: "",
    color: "",
    fleet: "",
    passengers: "",
    fuel: "",
    transmission: "",
    ldw: "",
    daily_rate: "",
    monthly_rate: "",
    free_kmPerDay: "",
    free_kmPerMonth: "",
    price_peExtraKM: "",
  });

  let fuelType = ["Petrol", "Diesel", "Gasoline"];
  let transmissionType = ["Manual", "Auto", "CVT"];
  let carFleet = ["General", "Premium", "Luxury"];
  let ldwFee = ["10000", "15000", "20000"];
  let colors = [
    "White",
    "Black",
    "Gray",
    "Silver",
    "Gold",
    "Red",
    "Blue",
    "Brown",
    "Green",
    "Beige",
    "Yellow",
    "Purple",
  ];

  const [front_img, setFront_Img] = useState("");
  const [rear_img, setRear_Img] = useState("");
  const [side_img, setSide_Img] = useState("");
  const [interior_img, setInterior_Img] = useState("");

  const [files, setFiles] = useState([]);

  function handleImageUpload(e) {
    console.log("uploaded....");
    // if (!e.target.files) {
    //   return;
    // }
    // const file = e.target.files[0];
    // const { name } = file;
    // setFile_NICBack(name);
  }

  function handleFileUpload(e) {
    console.log(files);
    console.log(e.target.files);
    setFiles(() => {
      return [...files, ...e.target.files];
    });
  }
  console.log(files);

  function saveCar() {
    console.log(regFormData);
  }
  return (
    <>
      <AdminNavbar keepSelected={true} />

      {/* //--------------Title---------------- */}

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
          variant="h3"
          color="rgb(55 80 141 / 88%)"
          style={{ marginTop: "20px" }}
        >
          Manage Cars
        </Typography>
      </Grid>

      {/* //-------------------------Subtitle--------------- */}

      <Grid
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        style={{ /* border: "2px solid red" */ marginBottom: "10px" }}
        // justifyContent="center"
        direction="column"
        alignItems="center"
      >
        <Typography variant="h6" style={{ color: "rgb(157 157 157)" }}>
          You can Add, Edit, Remove and View Cars of Easy Car Rental here...
        </Typography>
        <Typography variant="h7" style={{ color: "rgb(157 157 157)" }}>
          (Click on the relevant column to search/filter Cars)
        </Typography>
      </Grid>

      {/* //----------------------Details & Upload----------------- */}

      <Grid
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        // style={{ border: "3px solid red" }}

        justifyContent="center"
      >
        <Grid
          container
          xl={6}
          lg={6}
          md={12}
          sm={12}
          xs={12}
          style={{
            // border: "2px solid white",
            padding: "0px 50px",
            borderRight: "3px groove rgb(255 252 252 / 32%)",
          }}
        >
          <ValidatorForm
            // className="pt-2"
            onSubmit={saveCar}
            // style={{ /* border: "3px solid deeppink",  */ width: "100%" }}
          >
            <Grid
              container
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              style={{ /* border: "4px solid red", */ height: "400px" }}
              justifyContent="space-between"
            >
              {/* //  First Line */}
              <Grid
                container
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                // style={{ border: "2px solid lightgreen" }}
                // direction="column"
                justifyContent="space-between"
              >
                <Grid
                  item
                  xl={3.8}
                  lg={3.8}
                  md={3.8}
                  sm={3.8}
                  xs={3.8}
                  //   style={{ border: "2px solid blue" }}
                  // direction="column"
                  //   justifyContent="center"
                >
                  <TextValidator
                    // id="outlined-basic"
                    label="Registration No"
                    type="text"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required={true}
                    // style={{ marginBottom: "5px" }}
                    validators={["matchRegexp:^[A-Z]{2,}[-][0-9]{4}$"]}
                    errorMessages={["Invalid Registration No"]}
                    value={regFormData.reg_no}
                    onChange={(e) => {
                      setRegFormData({
                        ...regFormData,
                        reg_no: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xl={3.8}
                  lg={3.8}
                  md={3.8}
                  sm={3.8}
                  xs={3.8}
                  //   style={{ border: "2px solid blue" }}
                ></Grid>
                <Grid
                  item
                  xl={3.8}
                  lg={3.8}
                  md={3.8}
                  sm={3.8}
                  xs={3.8}
                  //   style={{ border: "2px solid blue" }}
                ></Grid>
              </Grid>

              {/* // Second Line */}

              <Grid
                container
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                // style={{ border: "2px solid lightgreen" }}
                // direction="column"
                justifyContent="space-between"
              >
                <Grid
                  item
                  xl={3.8}
                  lg={3.8}
                  md={3.8}
                  sm={3.8}
                  xs={3.8}
                  //   style={{ border: "2px solid blue" }}
                  // direction="column"
                  //   justifyContent="center"
                >
                  <TextValidator
                    // id="outlined-basic"
                    label="Brand"
                    type="text"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required={true}
                    // style={{ marginBottom: "5px" }}
                    validators={["matchRegexp:^[A-Z]{2,}[-][0-9]{4}$"]}
                    errorMessages={["Invalid Registration No"]}
                    value={regFormData.reg_no}
                    onChange={(e) => {
                      setRegFormData({
                        ...regFormData,
                        reg_no: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xl={3.8}
                  lg={3.8}
                  md={3.8}
                  sm={3.8}
                  xs={3.8}
                  //   style={{ border: "2px solid blue" }}
                >
                  <Autocomplete
                    disablePortal
                    id="car_color"
                    options={colors}
                    xl={{ width: 300 }}
                    size="small"
                    renderInput={(params) => (
                      <TextField {...params} label="Color" />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xl={3.8}
                  lg={3.8}
                  md={3.8}
                  sm={3.8}
                  xs={3.8}
                  //   style={{ border: "2px solid blue" }}
                  // direction="column"
                  //   justifyContent="center"
                >
                  <TextValidator
                    // id="outlined-basic"
                    label="Passengers"
                    type="number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required={true}
                    value={regFormData.passengers}
                    onChange={(e) => {
                      setRegFormData({
                        // ...regFormData,
                        passengers: e.target.value,
                      });
                    }}
                  />
                </Grid>
              </Grid>

              {/* // Third Line */}

              <Grid
                container
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                // style={{ border: "2px solid lightgreen" }}
                // direction="column"
                justifyContent="space-between"
              >
                <Grid
                  item
                  xl={3.8}
                  lg={3.8}
                  md={3.8}
                  sm={3.8}
                  xs={3.8}
                  //   style={{ border: "2px solid blue" }}
                >
                  <Autocomplete
                    disablePortal
                    id="fleet"
                    options={carFleet}
                    xl={{ width: 300 }}
                    size="small"
                    renderInput={(params) => (
                      <TextField {...params} label="Car Fleet" />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xl={3.8}
                  lg={3.8}
                  md={3.8}
                  sm={3.8}
                  xs={3.8}
                  //   style={{ border: "2px solid blue" }}
                >
                  <Autocomplete
                    disablePortal
                    id="ldw_fee"
                    options={ldwFee}
                    xl={{ width: 300 }}
                    size="small"
                    renderInput={(params) => (
                      <TextField {...params} label="Loss Damage Waiver(Rs)" />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xl={3.8}
                  lg={3.8}
                  md={3.8}
                  sm={3.8}
                  xs={3.8}
                  //   style={{ border: "2px solid blue" }}
                ></Grid>
              </Grid>

              {/* // Fourth Line */}

              <Grid
                container
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                // style={{ border: "2px solid lightgreen" }}
                justifyContent="space-between"
              >
                <Grid
                  item
                  xl={3.8}
                  lg={3.8}
                  md={3.8}
                  sm={3.8}
                  xs={3.8}
                  //   style={{ border: "2px solid blue" }}
                >
                  <Autocomplete
                    disablePortal
                    id="car_color"
                    options={fuelType}
                    xl={{ width: 300 }}
                    size="small"
                    renderInput={(params) => (
                      <TextField {...params} label="Fuel Type" />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xl={3.8}
                  lg={3.8}
                  md={3.8}
                  sm={3.8}
                  xs={3.8}
                  //   style={{ border: "2px solid blue" }}
                >
                  <Autocomplete
                    disablePortal
                    id="car_color"
                    options={transmissionType}
                    xl={{ width: 300 }}
                    size="small"
                    renderInput={(params) => (
                      <TextField {...params} label="Transmission Type" />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xl={3.8}
                  lg={3.8}
                  md={3.8}
                  sm={3.8}
                  xs={3.8}
                  //   style={{ border: "2px solid blue" }}
                ></Grid>
              </Grid>

              {/* // Fifth Line */}

              <Grid
                container
                xl={12}
                // lg={12}
                md={12}
                sm={12}
                xs={12}
                // style={{ border: "2px solid lightgreen" }}
                // direction="column"
                justifyContent="space-between"
              >
                <Grid
                  item
                  xl={3.8}
                  lg={3.8}
                  md={3.8}
                  sm={3.8}
                  xs={3.8}
                  //   style={{ border: "2px solid blue" }}
                >
                  <TextValidator
                    // id="outlined-basic"
                    label="Daily Rate(Rs)"
                    type="number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required={true}
                    value={regFormData.daily_rate}
                    onChange={(e) => {
                      setRegFormData({
                        ...regFormData,
                        daily_rate: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xl={3.8}
                  lg={3.8}
                  md={3.8}
                  sm={3.8}
                  xs={3.8}
                  //   style={{ border: "2px solid blue" }}
                >
                  <TextValidator
                    // id="outlined-basic"
                    label="Monthly Rate (Rs)"
                    type="number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required={true}
                    value={regFormData.monthly_rate}
                    onChange={(e) => {
                      setRegFormData({
                        ...regFormData,
                        monthly_rate: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xl={3.8}
                  lg={3.8}
                  md={3.8}
                  sm={3.8}
                  xs={3.8}
                  //   style={{ border: "2px solid blue" }}
                ></Grid>
              </Grid>

              {/* // Sixth Line */}

              <Grid
                container
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                // style={{ border: "2px solid lightgreen" }}
                // direction="column"
                justifyContent="space-between"
              >
                <Grid
                  item
                  xl={3.8}
                  lg={3.8}
                  md={3.8}
                  sm={3.8}
                  xs={3.8}
                  //   style={{ border: "2px solid blue" }}
                >
                  <TextValidator
                    // id="outlined-basic"
                    label="Free KM per Day"
                    type="number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required={true}
                    value={regFormData.free_kmPerDay}
                    onChange={(e) => {
                      setRegFormData({
                        ...regFormData,
                        free_kmPerDay: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xl={3.8}
                  lg={3.8}
                  md={3.8}
                  sm={3.8}
                  xs={3.8}
                  //   style={{ border: "2px solid blue" }}
                >
                  <TextValidator
                    // id="outlined-basic"
                    label="Free KM per Month"
                    type="number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required={true}
                    value={regFormData.free_kmPerMonth}
                    onChange={(e) => {
                      setRegFormData({
                        ...regFormData,
                        free_kmPerMonth: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xl={3.8}
                  lg={3.8}
                  md={3.8}
                  sm={3.8}
                  xs={3.8}
                  //   style={{ border: "2px solid blue" }}
                >
                  <TextValidator
                    // id="outlined-basic"
                    label="Price per Extra KM"
                    type="number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required={true}
                    value={regFormData.price_peExtraKM}
                    onChange={(e) => {
                      setRegFormData({
                        ...regFormData,
                        price_peExtraKM: e.target.value,
                      });
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              lg={12}
              md={12}
              xs={12}
              sm={12}
              //   style={{ border: "2px solid red" }}
              className={classes.register_btn_container}
            >
              <button type="submit" className={classes.btn__register}>
                Add Car
              </button>
            </Grid>
          </ValidatorForm>
        </Grid>

        {/* //----------Image Upload------------ */}
        <Grid
          container
          xl={5}
          lg={5}
          md={12}
          sm={12}
          xs={12}
          //   style={{ border: "2px solid lightgreen" }}
          justifyContent="center"
        >
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
            <Grid
              container
              xl={10}
              lg={10}
              md={10}
              xs={10}
              sm={10}
              style={{ /* border: "2px solid red", */ height: "85%" }}
              justifyContent="center"
              alignItems="center"
            >
              <ImageList
                sx={{ width: 500, height: 380, margin: 1, cursor: "pointer" }}
                cols={2}
                gap={10}
                rowHeight={180}
              >
                {itemData.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
            <Grid
              container
              xl={6}
              lg={6}
              md={12}
              xs={12}
              sm={12}
              //   style={{ border: "2px solid green" }}
              display="grid"
              justifyContent="center"
              alignItems="center"
            >
              <FileChooser
                text="Upload Images"
                file={front_img}
                multiple={true}
                onUpload={handleFileUpload}
                displayFileName={false}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* //-------------------Car Table--------------- */}
      <Grid
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        style={{
          //   border: "2px solid red",
          marginTop: "5vh",
        }}
      >
        <TableCars page="CR" tableColumns={columns} tableData={rows} />
      </Grid>
    </>
  );
}

export default withStyles(styleSheet)(ManageCar);

const itemData = [
  {
    // img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    img: sample_img,
    title: "Breakfast",
  },
  {
    // img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    img: sample_img,
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    img: sample_img,
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    img: sample_img,
    title: "Coffee",
  },
];

const columns = [
  {
    field: "id",
    headerName: "Actions",
    renderCell: (cellValues) => {
      // console.log(cellValues);
      return (
        <>
          <Tooltip title="Edit">
            <IconButton>
              <EditIcon
                // fontSize="large"
                onClick={() => {
                  console.log("clicked row : " + cellValues.id);
                  //   handleAddRow(cellValues.row);
                  //   handleRemoveRow(cellValues.id);
                }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon
                // fontSize="large"
                onClick={() => {
                  console.log("clicked row : " + cellValues.id);
                  //   handleAddRow(cellValues.row);
                  //   handleRemoveRow(cellValues.id);
                }}
              />
            </IconButton>
          </Tooltip>
        </>
      );
    },
    width: 150,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },

  {
    field: "reg_no",
    headerName: "Registration No",
    width: 130,
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
    field: "color",
    headerName: "Color",
    width: 140,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },

  {
    field: "fleet",
    headerName: "Car Fleet",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },

  {
    field: "fuel",
    headerName: "Fuel Type",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },

  {
    field: "transmission",
    headerName: "Transmission Type",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },

  {
    field: "passengers",
    headerName: "Passengers",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },

  {
    field: "daily_rate",
    headerName: "Daily Rate (Rs)",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },

  {
    field: "monthly_rate",
    headerName: "Monthly Rate (Rs)",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },

  {
    field: "price_extraKM",
    headerName: "Price per Extra KM (Rs)",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },

  {
    field: "freeKM_day",
    headerName: "Free KM per Day",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },

  {
    field: "freeKM_month",
    headerName: "Free KM per Month",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },

  {
    field: "status",
    headerName: "Current Status",
    width: 140,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },
];

const rows = [
  {
    id: "0",
    reg_no: "GC-5951",
    brand: "Suzuki",
    color: "White",
    fleet: "General",
    fuel: "Petrol",
    transmission: "Manual",
    passengers: "04",
    daily_rate: "1000",
    monthly_rate: "64500",
    price_extraKM: "30",
    freeKM_day: "100",
    freeKM_month: "2400",
    status: "Available",
  },

  {
    id: "1",
    reg_no: "GC-5952",
    brand: "Suzuki",
    color: "Black",
    fleet: "General",
    fuel: "Petrol",
    transmission: "Auto",
    passengers: "04",
    daily_rate: "1000",
    monthly_rate: "64500",
    price_extraKM: "30",
    freeKM_day: "100",
    freeKM_month: "2400",
    status: "Available",
  },
];
