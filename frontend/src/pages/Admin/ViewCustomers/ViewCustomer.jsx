import React, { useEffect, useState } from "react";
import { withStyles } from "@mui/styles";
import { styleSheet } from "./style";
import AdminNavbar from "../../../components/NavBar/AdminNavbar";
import Grid from "@mui/material/Grid";
import CustomerView from "../../../components/TableSearchPage/TableSearchPage";
import Footer from "../../../components/Footer/Footer";
import CustomerService from "../../../services/CustomerService";

const columns = [
  {
    field: "nic_no",
    headerName: "NIC No",
    width: 180,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },

  {
    field: "license_no",
    headerName: "License No",
    width: 180,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },

  {
    field: "email",
    headerName: "Email",
    width: 280,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },

  {
    field: "address",
    headerName: "Address",
    width: 250,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },

  {
    field: "contact_no",
    headerName: "Contact No",
    width: 180,
    headerClassName: "header_color",
    headerAlign: "center",
    align: "Center",
  },

  // {
  //   field: "rental_status",
  //   headerName: "Rental Status",
  //   width: 140,
  //   headerClassName: "header_color",
  //   headerAlign: "center",
  // },
];

let rows = [];

function ViewCustomerPage() {
  const [tableRows, setTableRows] = useState([]);
  useEffect(() => {
    loadAllCustomers();
  }, []);

  async function loadAllCustomers() {
    let res = await CustomerService.getAllCustomers();
    if (res.status === 200) {
      // rows = res.data.data;
      // console.log(rows);
      console.log(res);

      if (res.data.data != []) {
        let customers = res.data.data;
        console.log(customers);
        // customers.map((customer, index) => {
        //   let newRow = {
        //     nic_no: customer.nic_no,
        //     license_no: customer.license_no,
        //     email: customer.email,
        //     address: customer.address,
        //     contact_no: customer.contact_no,
        //   };
        //   setTableRows((currentRow) => [newRow]);
        // });
        setTableRows(() => {
          return [...res.data.data];
        });
        console.log(tableRows);
      }
    }
  }

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
        // tableData={rows}
        tableData={tableRows.map((customer, index) => ({
          id: index,
          nic_no: customer.nic_no,
          license_no: customer.license_no,
          email: customer.email,
          address: customer.address,
          contact_no: "0" + customer.contact_no,
        }))}
      />
    </>
  );
}

export default withStyles(styleSheet)(ViewCustomerPage);
