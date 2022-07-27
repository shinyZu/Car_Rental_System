import React, { useEffect, useState } from "react";
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
import CarService from "../../../services/CarService";
import MySnackBar from "../../../components/common/Snackbar/MySnackbar";
import FileUploadService from "../../../services/FileUploadService";
import ConfirmDialog from "../../../components/common/ConfirmDialog/ConfirmDialog";

function ManageCar(props) {
  const { classes } = props;
  const [regFormData, setRegFormData] = useState({
    id: "",
    reg_no: "",
    brand: "",
    color: "",
    fleet: "",
    fuelType: "",
    transmissionType: "",
    noOfPassengers: "",
    dailyRate: "",
    monthlyRate: "",
    price_extraKM: "",
    freeKM_day: "",
    freeKM_month: "",
    ldw: "",
    currentStatus: "",
  });

  const [btnProps, setBtnProps] = useState({
    btnLabel: "Add Car",
    btnColor: "#1abc9c",
  });

  const [carData, setCarData] = useState([]);

  let fuelTypes = ["Petrol", "Diesel", "Gasoline"];
  let transmissionType = ["Manual", "Auto", "CVT"];
  // let carFleet = ["General", "Premium", "Luxury"];
  let carFleet = [
    { fleet: "General", fee: "10000" },
    { fleet: "Premium", fee: "15000" },
    { fleet: "Luxury", fee: "20000" },
  ];
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

  const [openAlert, setOpenAlert] = useState({
    open: "",
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
                    console.log(carData[cellValues.id]);
                    loadDataToFields(cellValues.id, carData[cellValues.id]);
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
                    deleteCar(carData[cellValues.id]);
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

  const [filesToUpload, setFilesToUpload] = useState([]);
  const data = new FormData();

  //----------------
  const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;
  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);
  const validImageFiles = [];
  //---------------------

  function handleImageUpload(e) {
    const { files } = e.target;

    // get the selected files one by one & if they are valid add to array "validImageFiles"
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.match(imageTypeRegex)) {
        validImageFiles.push(file);
      }
    }

    setFilesToUpload(validImageFiles);

    console.log(validImageFiles);
    console.log(filesToUpload);

    if (validImageFiles.length) {
      setImageFiles(validImageFiles);
      return;
    } else {
      console.log(images);
      setOpenAlert({
        open: true,
        alert: "You can upload only (png/jpg/jpeg)",
        severity: "warning",
        variant: "standard",
      });
    }
  }

  useEffect(() => {
    let images = [],
      fileReaders = [];
    let isCancel = false;

    if (imageFiles.length) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            images.push(result); // urls
          }
          if (images.length === imageFiles.length && !isCancel) {
            setImages(images);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }

    return () => {
      isCancel = true;
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
    };
  }, [imageFiles]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    console.log("filesToUpload re-rendered");
    setFilesToUpload([]);
  }, []);

  function clearRegForm() {
    setRegFormData({
      id: "",
      reg_no: "",
      brand: "",
      color: "",
      fleet: "",
      fuelType: "",
      transmissionType: "",
      noOfPassengers: "",
      dailyRate: "",
      monthlyRate: "",
      price_extraKM: "",
      freeKM_day: "",
      freeKM_month: "",
      ldw: "",
      currentStatus: "",
    });
  }

  function clearFiles() {
    setImages([]);
    setFilesToUpload([]);
  }

  async function loadData() {
    let res = await CarService.getAllCars();
    console.log(res); // object
    console.log(res.data.data); // array
    if (res.status === 200) {
      setCarData(() => {
        return [...res.data.data];
      });
      console.log(carData);
    }
  }

  let tempArray = [];
  async function loadDataToFields(rowId, car) {
    // console.log(carData[rowId].fleet.description);
    let fd = carData[rowId].fleet.description;
    let fleet_fee;
    carFleet.map((f, i) => {
      if (f.fleet == fd) {
        console.log(f.fee);
        fleet_fee = f.fee;
      }
    });
    setBtnProps({ btnLabel: "Edit Details", btnColor: "rgb(74 102 165)" });
    setRegFormData({
      reg_no: car.reg_no,
      brand: car.brand,
      color: car.color,
      fleet: car.fleet.description,
      fuelType: car.fuelType,
      transmissionType: car.transmissionType,
      noOfPassengers: car.noOfPassengers,
      dailyRate: car.dailyRate,
      monthlyRate: car.monthlyRate,
      price_extraKM: car.price_extraKM,
      freeKM_day: car.freeKM_day,
      freeKM_month: car.freeKM_month,
      ldw: fleet_fee,
      currentStatus: car.currentStatus,
    });

    // let res = await FileUploadService.getCarFiles();
    // // console.log(res);
    // // if (res.status === 200) {
    //   // setImages(() => {
    //   //   return [...res.data.data];
    //   // });
    //   // tempArray = res.data.data;
    //   // console.log(tempArray);
    //   // setImages(...tempArray);
    //   // console.log(images);
    // }
  }

  function handleSaveUpdateBtn() {
    if (btnProps.btnLabel == "Add Car") {
      setConfirmDialog({
        isOpen: true,
        title: "Are you sure you want to Save this Car ?",
        subTitle: "You can't revert this operation",
        onConfirm: () => saveCar(),
      });
    } else {
      setConfirmDialog({
        isOpen: true,
        title: "Are you sure you want to Update this Car ?",
        subTitle: "You can't revert this operation",
        onConfirm: () => updateCar(),
      });
    }
  }

  async function proceedSave() {
    // if (filesToUpload.length !== 0) {
    //   console.log("files are choosen");

    let res1 = await CarService.saveCar(regFormData);
    console.log(res1);
    if (res1.status === 201) {
      console.log("Car is saved...now save the images");

      data.append("front", filesToUpload[0]);
      data.append("rear", filesToUpload[1]);
      data.append("side", filesToUpload[2]);
      data.append("interior", filesToUpload[3]);

      let res2 = await FileUploadService.uploadCarFiles(
        regFormData.reg_no,
        regFormData.fleet,
        regFormData.brand,
        data
      );

      if (res2.status === 200) {
        console.log("all done...........");
        setOpenAlert({
          open: true,
          alert: res1.data.message,
          severity: "success",
          variant: "standard",
        });
        loadData();
        clearRegForm();
        clearFiles();
        setConfirmDialog({ isOpen: false });
      } else {
        setConfirmDialog({ isOpen: false });
        setOpenAlert({
          open: true,
          alert: res2.response.data.message,
          severity: "error",
          variant: "standard",
        });
      }
    } else {
      setConfirmDialog({ isOpen: false });
      setOpenAlert({
        open: true,
        alert: res1.response.data.message,
        severity: "error",
        variant: "standard",
      });
    }
    // } else {
    //   setOpenAlert({
    //     open: true,
    //     alert: "Please choose the Images for " + regFormData.brand,
    //     severity: "warning",
    //     variant: "standard",
    //   });
    // }
  }

  function saveCar() {
    // console.log(regFormData);
    // console.log(filesToUpload);
    // console.log(validImageFiles);
    // console.log(data);

    if (filesToUpload.length !== 0) {
      console.log("files are choosen");

      setConfirmDialog({
        isOpen: true,
        title: "Are you sure you want to Save this Car ?",
        subTitle: "You can't revert this operation",
        action: "Save",
        confirmBtnStyle: {
          backgroundColor: "rgb(26, 188, 156)",
          color: "white",
        },
        onConfirm: () => proceedSave(),
      });
    } else {
      setOpenAlert({
        open: true,
        alert: "Please choose Image Files for " + regFormData.brand,
        severity: "warning",
        variant: "standard",
      });
    }
  }

  async function proceedUpdate() {
    console.log("updated");

    if (filesToUpload.length !== 0) {
      // if update is done with images

      let res1 = await CarService.updateCar(regFormData);
      console.log(res1);
      if (res1.status === 200) {
        console.log("Car is Updatd...now update the images");

        data.append("front", filesToUpload[0]);
        data.append("rear", filesToUpload[1]);
        data.append("side", filesToUpload[2]);
        data.append("interior", filesToUpload[3]);

        let res2 = await FileUploadService.uploadCarFiles(
          regFormData.reg_no,
          regFormData.fleet,
          regFormData.brand,
          data
        );

        if (res2.status === 200) {
          console.log("all done...........");
          setOpenAlert({
            open: true,
            alert: res1.data.message,
            severity: "success",
            variant: "standard",
          });
          loadData();
          clearRegForm();
          clearFiles();
          setConfirmDialog({ isOpen: false });
          setBtnProps({ btnLabel: "Add Car", btnColor: "rgb(26, 188, 156)" });
        } else {
          setConfirmDialog({ isOpen: false });
          setOpenAlert({
            open: true,
            alert: res2.response.data.message,
            severity: "error",
            variant: "standard",
          });
        }
      } else {
        setConfirmDialog({ isOpen: false });
        setOpenAlert({
          open: true,
          alert: res1.response.data.message,
          severity: "error",
          variant: "standard",
        });
      }
    } else {
      // if want to update without images
      let res = await CarService.updateCar(regFormData);
      console.log(res);
      if (res.status === 200) {
        setOpenAlert({
          open: true,
          alert: res.data.message,
          severity: "success",
          variant: "standard",
        });
        loadData();
        clearRegForm();
        clearFiles();
        setConfirmDialog({ isOpen: false });
        setBtnProps({ btnLabel: "Add Car", btnColor: "rgb(26, 188, 156)" });
      } else {
        setConfirmDialog({ isOpen: false });
        setOpenAlert({
          open: true,
          alert: res.response.data.message,
          severity: "error",
          variant: "standard",
        });
      }
    }
  }

  function updateCar() {
    console.log(filesToUpload);
    if (filesToUpload.length === 0) {
      // if no images are selected or if update doesn't need any images
      setConfirmDialog({
        isOpen: true,
        title: "No any Image Files selected, want to continue?",
        subTitle: "or click No to select image files and proceed",
        confirmBtnStyle: { backgroundColor: "#2c4ea9", color: "white" },
        onConfirm: () => proceedUpdate(),
      });
    } else {
      // if want to update with images
      setConfirmDialog({
        isOpen: true,
        title: "Are you sure you want to Update this Car ?",
        subTitle: "You can't revert this operation",
        confirmBtnStyle: { backgroundColor: "#2c4ea9", color: "white" },
        onConfirm: () => proceedUpdate(),
      });
    }
  }

  async function proceedDelete(reg_no) {
    console.log(reg_no);
    let res = await CarService.deleteCar(reg_no);
    if (res.status === 200) {
      setOpenAlert({
        open: true,
        alert: res.data.message,
        severity: "success",
        variant: "standard",
      });
      loadData();
      clearRegForm();
      clearFiles();
      setConfirmDialog({ isOpen: false });
    } else {
      setOpenAlert({
        open: true,
        alert: res.response.data.message,
        severity: "error",
        variant: "standard",
      });
    }
  }

  function deleteCar(car) {
    console.log(car);
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure you want to remove this Car?",
      subTitle: "You can't revert this operation",
      confirmBtnStyle: { backgroundColor: "red", color: "white" },
      action: "Delete",
      onConfirm: () => proceedDelete(car.reg_no),
    });
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
            // onSubmit={saveCar}
            onSubmit={btnProps.btnLabel == "Add Car" ? saveCar : updateCar}
            // onSubmit={handleSaveUpdateBtn}
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
                    id="txt_reg_no"
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
                    id="txt_brand"
                    label="Brand"
                    type="text"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required={true}
                    // style={{ marginBottom: "5px" }}
                    validators={["matchRegexp:^[A-z0-9 () /]*$"]}
                    errorMessages={["Invalid Registration No"]}
                    value={regFormData.brand}
                    onChange={(e) => {
                      setRegFormData({
                        ...regFormData,
                        brand: e.target.value,
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
                    id="cmb_color"
                    disablePortal
                    options={colors}
                    inputValue={regFormData.color}
                    xl={{ width: 300 }}
                    size="small"
                    renderInput={(params) => (
                      <TextField {...params} label="Color" />
                    )}
                    onChange={(e, v) => {
                      setRegFormData({
                        ...regFormData,
                        color: v,
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
                  // direction="column"
                  //   justifyContent="center"
                >
                  <TextValidator
                    id="txt_passengers"
                    label="Passengers"
                    type="number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required={true}
                    value={regFormData.noOfPassengers}
                    onChange={(e) => {
                      setRegFormData({
                        ...regFormData,
                        noOfPassengers: e.target.value,
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
                    id="cmb_fleet"
                    disablePortal
                    inputValue={regFormData.fleet}
                    options={carFleet}
                    getOptionLabel={(option) => option.fleet}
                    xl={{ width: 300 }}
                    size="small"
                    renderInput={(params) => (
                      <TextField {...params} label="Car Fleet" />
                    )}
                    // onInputChange={(e) => {
                    //   console.log(e);
                    // }}
                    onChange={(e, v) => {
                      console.log(v);
                      setRegFormData({
                        ...regFormData,
                        fleet: v.fleet,
                        ldw: v.fee,
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
                    id="cmb_ldw_fee"
                    disablePortal
                    // options={ldwFee}
                    options={carFleet}
                    getOptionLabel={(option) => option.fee}
                    inputValue={regFormData.ldw}
                    xl={{ width: 300 }}
                    size="small"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Loss Damage Waiver(Rs)"
                        // value={regFormData.ldw}
                      />
                    )}
                    onChange={(e, v) => {
                      setRegFormData({
                        ...regFormData,
                        ldw: v.fee,
                        fleet: v.fleet,
                      });
                    }}
                    // isOptionEqualToValue={(option, v) => {
                    //   // console.log(option);
                    //   // console.log(v);
                    //   console.log(option === v);
                    //   console.log(regFormData.fleet);
                    //   // option.value === regFormData.fleet
                    // }}
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
                    id="cmb_fuel_type"
                    disablePortal
                    options={fuelTypes}
                    inputValue={regFormData.fuelType}
                    xl={{ width: 300 }}
                    size="small"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Fuel Type"
                        // value={regFormData.fuelType}
                      />
                    )}
                    onChange={(e, v) => {
                      setRegFormData({
                        ...regFormData,
                        fuelType: v,
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
                    id="cmb_gear"
                    disablePortal
                    options={transmissionType}
                    inputValue={regFormData.transmissionType}
                    xl={{ width: 300 }}
                    size="small"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Transmission Type"
                        // value={regFormData.transmissionType}
                      />
                    )}
                    onChange={(e, v) => {
                      setRegFormData({
                        ...regFormData,
                        transmissionType: v,
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
                    id="txt_daily_rate"
                    label="Daily Rate(Rs)"
                    type="number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required={true}
                    value={regFormData.dailyRate}
                    onChange={(e) => {
                      setRegFormData({
                        ...regFormData,
                        dailyRate: e.target.value,
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
                    id="txt_monthly_rate"
                    label="Monthly Rate (Rs)"
                    type="number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required={true}
                    value={regFormData.monthlyRate}
                    onChange={(e) => {
                      setRegFormData({
                        ...regFormData,
                        monthlyRate: e.target.value,
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
                    id="txt_km_per_day"
                    label="Free KM per Day"
                    type="number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required={true}
                    value={regFormData.freeKM_day}
                    onChange={(e) => {
                      setRegFormData({
                        ...regFormData,
                        freeKM_day: e.target.value,
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
                    id="txt_km_per_month"
                    label="Free KM per Month"
                    type="number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required={true}
                    value={regFormData.freeKM_month}
                    onChange={(e) => {
                      setRegFormData({
                        ...regFormData,
                        freeKM_month: e.target.value,
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
                    id="txt_price_per_extraKM"
                    label="Price per Extra KM"
                    type="number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required={true}
                    value={regFormData.price_extraKM}
                    onChange={(e) => {
                      setRegFormData({
                        ...regFormData,
                        price_extraKM: e.target.value,
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
              <button
                type="submit"
                className={classes.btn__register}
                style={{ backgroundColor: btnProps.btnColor }}
              >
                {btnProps.btnLabel}
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
                style={{ border: "2px solid #ccc" }}
                sx={{ width: 500, height: 374, margin: 1, cursor: "pointer" }}
                cols={2}
                gap={10}
                rowHeight={180}
              >
                {/* {itemData.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      // src={}
                      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))} */}

                {/* //--------------- */}

                <ImageListItem key={0}>
                  <img
                    src={images[0]}
                    alt={imageTitles[0].title}
                    loading="lazy"
                  />
                </ImageListItem>
                <ImageListItem key={1}>
                  <img
                    src={images[1]}
                    alt={imageTitles[1].title}
                    loading="lazy"
                  />
                </ImageListItem>
                <ImageListItem key={2}>
                  <img
                    src={images[2]}
                    alt={imageTitles[1].title}
                    loading="lazy"
                  />
                </ImageListItem>
                <ImageListItem key={3}>
                  <img
                    src={images[3]}
                    alt={imageTitles[1].title}
                    loading="lazy"
                  />
                </ImageListItem>
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
                // file={front_img}
                multiple={true}
                onUpload={(e) => {
                  // handleFileUpload(e);
                  // setCarImages(e);
                  handleImageUpload(e);
                }}
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
        <TableCars
          page="CR"
          tableColumns={columns}
          tableData={carData.map((item, index) => ({
            id: index,
            reg_no: item.reg_no,
            brand: item.brand,
            color: item.color,
            fleet: item.fleet.description,
            fuel: item.fuelType,
            transmission: item.transmissionType,
            passengers: item.noOfPassengers,
            daily_rate: item.dailyRate,
            monthly_rate: item.monthlyRate,
            price_extraKM: item.price_extraKM,
            freeKM_day: item.freeKM_day,
            freeKM_month: item.freeKM_month,
            status: item.currentStatus,
          }))}
          // getRowId={(row) => row.reg_no}
          rowsPerPageOptions={5}
        />
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
      ;
    </>
  );
}

export default withStyles(styleSheet)(ManageCar);

// const columns = [
//   {
//     field: "id",
//     headerName: "Actions",
//     renderCell: (cellValues) => {
//       // console.log(cellValues);
//       return (
//         <>
//           <Tooltip title="Edit">
//             <IconButton>
//               <EditIcon
//                 // fontSize="large"
//                 onClick={() => {
//                   console.log("clicked row : " + cellValues.id);
//                   console.log(carData[cellValues.id]);
//                   //   handleAddRow(cellValues.row);
//                   //   handleRemoveRow(cellValues.id);
//                 }}
//               />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="Delete">
//             <IconButton>
//               <DeleteIcon
//                 // fontSize="large"
//                 onClick={() => {
//                   console.log("clicked row : " + cellValues.id);
//                   //   handleAddRow(cellValues.row);
//                   //   handleRemoveRow(cellValues.id);
//                 }}
//               />
//             </IconButton>
//           </Tooltip>
//         </>
//       );
//     },
//     width: 150,
//     headerClassName: "header_color",
//     headerAlign: "center",
//     align: "Center",
//   },

//   {
//     field: "reg_no",
//     headerName: "Registration No",
//     width: 130,
//     headerClassName: "header_color",
//     headerAlign: "center",
//     align: "Center",
//   },

//   {
//     field: "brand",
//     headerName: "Brand",
//     width: 140,
//     headerClassName: "header_color",
//     headerAlign: "center",
//     align: "Center",
//   },

//   {
//     field: "color",
//     headerName: "Color",
//     width: 140,
//     headerClassName: "header_color",
//     headerAlign: "center",
//     align: "Center",
//   },

//   {
//     field: "fleet",
//     headerName: "Car Fleet",
//     width: 130,
//     headerClassName: "header_color",
//     headerAlign: "center",
//     align: "Center",
//   },

//   {
//     field: "fuel",
//     headerName: "Fuel Type",
//     width: 130,
//     headerClassName: "header_color",
//     headerAlign: "center",
//     align: "Center",
//   },

//   {
//     field: "transmission",
//     headerName: "Transmission Type",
//     width: 130,
//     headerClassName: "header_color",
//     headerAlign: "center",
//     align: "Center",
//   },

//   {
//     field: "passengers",
//     headerName: "Passengers",
//     width: 130,
//     headerClassName: "header_color",
//     headerAlign: "center",
//     align: "Center",
//   },

//   {
//     field: "daily_rate",
//     headerName: "Daily Rate (Rs)",
//     width: 130,
//     headerClassName: "header_color",
//     headerAlign: "center",
//     align: "Center",
//   },

//   {
//     field: "monthly_rate",
//     headerName: "Monthly Rate (Rs)",
//     width: 130,
//     headerClassName: "header_color",
//     headerAlign: "center",
//     align: "Center",
//   },

//   {
//     field: "price_extraKM",
//     headerName: "Price per Extra KM (Rs)",
//     width: 130,
//     headerClassName: "header_color",
//     headerAlign: "center",
//     align: "Center",
//   },

//   {
//     field: "freeKM_day",
//     headerName: "Free KM per Day",
//     width: 130,
//     headerClassName: "header_color",
//     headerAlign: "center",
//     align: "Center",
//   },

//   {
//     field: "freeKM_month",
//     headerName: "Free KM per Month",
//     width: 130,
//     headerClassName: "header_color",
//     headerAlign: "center",
//     align: "Center",
//   },

//   {
//     field: "status",
//     headerName: "Current Status",
//     width: 140,
//     headerClassName: "header_color",
//     headerAlign: "center",
//     align: "Center",
//   },
// ];

// let rows = [
//   {
//     id: "GC-5951",
//     reg_no: "GC-5951",
//     brand: "Suzuki",
//     color: "White",
//     fleet: "General",
//     fuel: "Petrol",
//     transmission: "Manual",
//     passengers: "04",
//     daily_rate: "1000",
//     monthly_rate: "64500",
//     price_extraKM: "30",
//     freeKM_day: "100",
//     freeKM_month: "2400",
//     status: "Available",
//   },

//   {
//     id: "1",
//     reg_no: "GC-5952",
//     brand: "Suzuki",
//     color: "Black",
//     fleet: "General",
//     fuel: "Petrol",
//     transmission: "Auto",
//     passengers: "04",
//     daily_rate: "1000",
//     monthly_rate: "64500",
//     price_extraKM: "30",
//     freeKM_day: "100",
//     freeKM_month: "2400",
//     status: "Available",
//   },
// ];

const imageTitles = ["front", "rear", "side", "interior"];

// setFiles(() => {
//       return [...files, ...e.target.files];
//     });
