import React, { useState } from "react";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import AdminNavbar from "../../../components/NavBar/AdminNavbar";
import Grid from "@mui/material/Grid";
import CustomerView from "../../../components/TableSearchPage/TableSearchPage";
import Footer from "../../../components/Footer/Footer";

const columns = [
  {
    field: "nic_no",
    headerName: "NIC No",
    width: 180,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "license_no",
    headerName: "License No",
    width: 180,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "email",
    headerName: "Email",
    width: 280,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "address",
    headerName: "Address",
    width: 250,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "contact_no",
    headerName: "Contact No",
    width: 180,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "rental_status",
    headerName: "Rental Status",
    width: 140,
    headerClassName: "header_color",
    headerAlign: "center",
  },
];

const rows = [];

function ViewCustomerPage() {
  return (
    <>
      <AdminNavbar />
      <CustomerView
        page="C"
        pageTitle="Customer Details"
        pageSubtitle="You can Search and View Customer Details here...."
        searchbarPlaceholder="Search by NIC No"
        searchbarPlaceholder2="Search by License No"
        // tableWidth_xl={10}
        // tableWidth_lg={10}
        tableColumns={columns}
        tableData={rows}
      />
    </>
  );
}

export default withStyles(styleSheet)(ViewCustomerPage);
