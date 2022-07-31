import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../components/NavBar/AdminNavbar";
import TableMaintenance from "../../../components/TableSearchPage/TableSearchPage";
import { Grid } from "@mui/material";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import Typography from "@mui/material/Typography";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RestoreIcon from "@mui/icons-material/Restore";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddIcon from "@mui/icons-material/Add";
import ConstructionIcon from "@mui/icons-material/Construction";
import CarService from "../../../services/CarService";
import MySnackBar from "../../../components/common/Snackbar/MySnackbar";
import ConfirmDialog from "../../../components/common/ConfirmDialog/ConfirmDialog";

function Maintenance(props) {
  const { classes } = props;
  const [rowToMaintenance, setRowToMaintenance] = useState({});
  const [table1Rows, setTable1Rows] = useState([]);
  const [table2Rows, setTable2Rows] = useState([]);
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

  let table1_columns = [
    {
      field: "id",
      headerName: "Actions",
      renderCell: (cellValues) => {
        return (
          <>
            <Tooltip title="Add To Maintenance">
              <IconButton>
                <ConstructionIcon
                  onClick={() => {
                    console.log("clicked row : " + cellValues.id);
                    // console.log(cellValues.row.reg_no);
                    addToMaintanence(cellValues.row.reg_no);
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
      width: 150,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "brand",
      headerName: "Brand",
      width: 200,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "km_atPickUp",
      headerName: "Mileage",
      width: 150,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "description",
      headerName: "Car Fleet",
      width: 150,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "transmissionType",
      headerName: "Transmission Type",
      width: 200,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "fuelType",
      headerName: "Fuel Type",
      width: 150,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "color",
      headerName: "Color",
      width: 150,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "return_date",
      headerName: "Date Added",
      width: 150,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },
  ];

  let table2_columns = [
    {
      field: "id",
      headerName: "Actions",
      renderCell: (cellValues) => {
        return (
          <>
            <Tooltip title="Back To Service">
              <IconButton>
                <RestoreIcon
                  onClick={() => {
                    addCarBackToService(cellValues.row.reg_no);
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
      width: 150,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "brand",
      headerName: "Brand",
      width: 200,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "km_atPickUp",
      headerName: "Mileage",
      width: 150,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "description",
      headerName: "Car Fleet",
      width: 150,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "transmissionType",
      headerName: "Transmission Type",
      width: 200,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "fuelType",
      headerName: "Fuel Type",
      width: 150,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "color",
      headerName: "Color",
      width: 150,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "return_date",
      headerName: "Date Added",
      width: 150,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },
  ];

  useEffect(() => {
    getAllDefectiveCars();
    getAllCarsUnderMaintenance();
  }, []);

  function addToMaintanence(reg_no) {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure you want to add this car to Maintenance ?",
      subTitle: "You can't revert this operation",
      action: "Add",
      confirmBtnStyle: {
        backgroundColor: "rgb(26, 188, 156)",
        color: "white",
      },
      onConfirm: () =>
        updateCarStatus({
          reg_no: reg_no,
          currentStatus: "Under Maintenance",
        }),
    });
  }

  function addCarBackToService(reg_no) {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure you want to return this Car Back to Service ?",
      subTitle: "You can't revert this operation",
      action: "Return",
      confirmBtnStyle: {
        backgroundColor: "rgb(26, 188, 156)",
        color: "white",
      },
      onConfirm: () =>
        updateCarStatus({
          reg_no: reg_no,
          currentStatus: "Available",
        }),
    });
  }

  async function updateCarStatus(data) {
    // let updateInfo = {
    //   reg_no: reg_no,
    //   currentStatus: "Under Maintenance",
    // };
    let res = await CarService.updateCarStatus(data);
    if (res.status === 200) {
      if (data.currentStatus == "Available") {
        setOpenAlert({
          open: true,
          alert: "Car " + data.reg_no + " has returned back to Service",
          severity: "success",
          variant: "standard",
        });
      } else {
        setOpenAlert({
          open: true,
          alert: "Car " + data.reg_no + " added To Maintenance",
          severity: "success",
          variant: "standard",
        });
      }

      getAllDefectiveCars();
      getAllCarsUnderMaintenance();
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

  async function getAllDefectiveCars() {
    let res = await CarService.getCarsToRepair("Need Maintenance");
    if (res.status === 200) {
      if (res.data.data != []) {
        let details = res.data.data;
        console.log(details);
        setTable1Rows(() => {
          return [...res.data.data];
        });
        console.log(table1Rows);
      }
    }
  }

  async function getAllCarsUnderMaintenance() {
    let res = await CarService.getCarsToRepair("Under Maintenance");
    if (res.status === 200) {
      if (res.data.data != []) {
        let details = res.data.data;
        console.log(details);
        setTable2Rows(() => {
          return [...res.data.data];
        });
        console.log(table2Rows);
      }
    }
  }

  return (
    <>
      <AdminNavbar />

      <TableMaintenance
        page="NM"
        pageTitle="Maintenance Details"
        pageSubtitle="You can Search,View, Add or Remove Cars from Maintenance here...."
        tableColumns={table1_columns}
        tableData={table1Rows.map((row, index) => ({
          id: index,
          reg_no: row.reg_no,
          brand: row.brand,
          km_atPickUp: row.km_atPickUp,
          description: row.description,
          transmissionType: row.transmissionType,
          fuelType: row.fuelType,
          color: row.color,
          return_date: row.return_date,
        }))}
        // tableData={[]}
        stickyHeader={true}
      />

      <TableMaintenance
        page="UM"
        pageTitle="Maintenance Details"
        pageSubtitle="You can Search,View, Add or Remove Cars from Maintenance here...."
        tableColumns={table2_columns}
        // tableData={table2Rows}
        tableData={table2Rows.map((row, index) => ({
          id: index,
          reg_no: row.reg_no,
          brand: row.brand,
          km_atPickUp: row.km_atPickUp,
          description: row.description,
          transmissionType: row.transmissionType,
          fuelType: row.fuelType,
          color: row.color,
          return_date: row.return_date,
        }))}
        stickyHeader={true}
      />
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
    </>
  );
}

export default Maintenance;
