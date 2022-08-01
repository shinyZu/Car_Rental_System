import React, { useState, useEffect } from "react";
import Footer from "../../../components/Footer/Footer";
import AdminNavbar from "../../../components/NavBar/AdminNavbar";
import Rentals from "../../../components/TableSearchPage/TableSearchPage";
import RentalRequestService from "../../../services/RentalRequestService";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ConfirmDialog from "../../../components/common/ConfirmDialog/ConfirmDialog";
import MySnackBar from "../../../components/common/Snackbar/MySnackbar";

function RentalRequests() {
  const columns = [
    {
      field: "id",
      headerName: "Action/Status",
      renderCell: (cellValues) => {
        return (
          <>
            {tableRows[cellValues.id].requestStatus === "Pending" ? (
              <Tooltip title="Accept/Deny Request">
                <IconButton>
                  <BorderColorIcon
                    onClick={() => {
                      console.log("clicked row : " + cellValues.id);
                      console.log(tableRows[cellValues.id]);
                      acceptRental(cellValues.id, tableRows[cellValues.id]);
                    }}
                  />
                </IconButton>
              </Tooltip>
            ) : tableRows[cellValues.id].requestStatus === "Denied" ? (
              <Tooltip title="Request Denied">
                <IconButton>
                  <CancelIcon
                    style={{ color: "red" }}
                    onClick={() => {
                      // console.log("clicked row : " + cellValues.id);
                      // console.log(tableRows[cellValues.id]);
                    }}
                  />
                </IconButton>
              </Tooltip>
            ) : tableRows[cellValues.id].requestStatus === "Accepted" ? (
              <Tooltip title="Mark Active">
                <IconButton>
                  <HistoryToggleOffIcon
                    // style={{ color: "red" }}
                    onClick={() => {
                      markRentalActive(tableRows[cellValues.id]);
                    }}
                  />
                </IconButton>
              </Tooltip>
            ) : tableRows[cellValues.id].requestStatus === "Active" ? (
              <Tooltip title="Active Rentals">
                <IconButton>
                  <AccessTimeFilledIcon
                    // style={{ color: "red" }}
                    onClick={() => {
                      // console.log("clicked row : " + cellValues.id);
                      // console.log(tableRows[cellValues.id]);
                    }}
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Request Finalized">
                <IconButton>
                  <DoneAllIcon
                    onClick={() => {
                      console.log("clicked row : " + cellValues.id);
                      // console.log(tableRows[cellValues.id]);
                    }}
                  />
                </IconButton>
              </Tooltip>
            )}
          </>
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
      field: "nic_no",
      headerName: "Customer NIC",
      width: 140,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    // {
    //   field: "contact_no",
    //   headerName: "Customer Contact",
    //   width: 130,
    //   headerClassName: "header_color",
    //   headerAlign: "center",
    //   align: "Center",
    // },

    {
      field: "requestStatus",
      headerName: "Request Status",
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
      width: 130,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "license_no",
      headerName: "Driver License No",
      width: 140,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "km_atPickUp",
      headerName: "KM At PickUp",
      width: 140,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "km_atReturn", // null at first after returned updated
      headerName: "KM At Return",
      width: 140,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    // {
    //   field: "driver_fee", // null at first after returned updated
    //   headerName: "Driver Fee(Rs)",
    //   width: 140,
    //   headerClassName: "header_color",
    //   headerAlign: "center",
    //   align: "Center",
    // },

    {
      field: "totalPaymentForRental", // null at first after returned updated
      headerName: "Rental Payment(Rs)",
      width: 140,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },
  ];
  const [tableRows, setTableRows] = useState([]);

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

  useEffect(() => {
    loadAllRentalDetails();
  }, []);

  async function loadAllRentalDetails() {
    let res = await RentalRequestService.getAllRequestDetails();
    if (res.status === 200) {
      console.log(res);
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

  function markRentalActive(rental) {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure you want to mark this Rental as Active ?",
      subTitle: "You can't revert this operation",
      action: "Active",
      confirmBtnStyle: {
        backgroundColor: "rgb(26, 188, 156)",
        color: "white",
      },
      onConfirm: () => proceedMarkRentalActive(rental),
    });
  }

  async function proceedMarkRentalActive(rental) {
    let data = { rental_id: rental.rental_id, requestStatus: "Active" };
    let res = await RentalRequestService.updateRequestStatus(data);
    console.log(res);
    if (res.status === 200) {
      setConfirmDialog({ isOpen: false });
      setOpenAlert({
        open: true,
        alert: "Rental " + rental.rental_id + " is now Active!",
        severity: "success",
        variant: "standard",
      });
      loadAllRentalDetails();
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

  function acceptRental(index, rental) {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure you want to ACCEPT this Request ?",
      subTitle: "You can't revert this operation",
      acceptLabel: "Accept",
      denyLabel: "Deny",
      action: "Save",
      action2: "Deny",
      confirmBtnStyle: {
        backgroundColor: "rgb(26, 188, 156)",
        color: "white",
      },
      denyBtnStyle: {
        backgroundColor: "red",
        color: "white",
      },
      onConfirm: () => proceedAccept(rental),
      onDeny: () => proceedDeny(rental),
    });
  }

  async function proceedAccept(rental) {
    let data = { rental_id: rental.rental_id, requestStatus: "Accepted" };
    console.log(data);
    let res = await RentalRequestService.acceptRental(data);
    console.log(res);
    if (res.status === 200) {
      setConfirmDialog({ isOpen: false });
      setOpenAlert({
        open: true,
        alert: res.data.message,
        severity: "success",
        variant: "standard",
      });
      loadAllRentalDetails();
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

  async function proceedDeny(rental) {
    let data = { rental_id: rental.rental_id, requestStatus: "Denied" };
    console.log(data);
    let res = await RentalRequestService.denyRental(data);
    console.log(res);
    if (res.status === 200) {
      setConfirmDialog({ isOpen: false });
      setOpenAlert({
        open: true,
        alert: res.data.message,
        severity: "success",
        variant: "standard",
      });
      loadAllRentalDetails();
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

  return (
    <>
      <AdminNavbar />
      <Rentals
        page="R"
        pageTitle="Rental Requests"
        pageSubtitle="You can Search and View all Rentals here...."
        tableColumns={columns}
        tableData={tableRows.map((request, index) => ({
          id: index,
          rental_id: request.rental_id,
          reg_no: request.reg_no,
          nic_no: request.nic_no,
          requestStatus: request.requestStatus,
          pickUp_date: request.pickUp_date,
          pickUp_time: request.pickUp_time,
          pickUp_venue: request.pickUp_venue,
          return_date: request.return_date,
          return_time: request.return_time,
          return_venue: request.return_venue,
          license_no: request.license_no,
          km_atPickUp: request.km_atPickUp,
          km_atReturn: request.km_atReturn,
          totalPaymentForRental: request.totalPaymentForRental,
        }))}
        rowsPerPageOptions={5}
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

export default RentalRequests;

const rows = [];
