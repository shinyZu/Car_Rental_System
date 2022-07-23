import React, { useState } from "react";
import AdminNavbar from "../../../components/NavBar/AdminNavbar";
import Returns from "../../../components/TableSearchPage/TableSearchPage";
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

const columns = [
  {
    field: "id",
    headerName: "-",
    width: 10,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "rental_id",
    headerName: "Rental ID",
    width: 150,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "reg_no",
    headerName: "Registration No",
    width: 150,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "customer_nic",
    headerName: "Customer NIC",
    width: 200,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "license_no",
    headerName: "Driver License No",
    width: 150,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "km_atPickUp",
    headerName: "Initial Mileage (KM)",
    width: 200,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "km_atReturn",
    headerName: "Final Mileage (KM)",
    width: 200,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "action",
    headerName: "Action",
    renderCell: (cellValues) => {
      //   console.log(cellValues);
      return (
        <Tooltip title="Return">
          <IconButton>
            <RestoreIcon
              fontSize="large"
              onClick={() => {
                console.log(cellValues.row);
              }}
            />
          </IconButton>
        </Tooltip>
      );
    },
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
  },
];

const rows = [
  {
    id: "1",
    rental_id: "RNTL-0001",
    reg_no: "GC-5951",
    customer_nic: "995922121v",
    license_no: "B1234567",
    km_atPickUp: "8000",
    km_atReturn: "8500",
  },
  {
    id: "2",
    rental_id: "RNTL-0002",
    reg_no: "GC-5951",
    customer_nic: "995922121v",
    license_no: "B1234567",
    km_atPickUp: "8000",
    km_atReturn: "8500",
  },
  {
    id: "3",
    rental_id: "RNTL-0003",
    reg_no: "GC-5951",
    customer_nic: "995922121v",
    license_no: "B1234567",
    km_atPickUp: "8000",
    km_atReturn: "8500",
  },
];

function RentalReturns(props) {
  const { classes } = props;
  const [data, setData] = useState("");

  function getRentalDetails(row) {
    console.log(row);
  }
  return (
    <>
      <AdminNavbar />
      <Returns
        page="RR"
        pageTitle="Rental Returns"
        pageSubtitle="You can Search,View, Accept Rental Returns and Calculate Rental Payments here...."
        tableColumns={columns}
        tableData={rows}
        stickyHeader={true}
        // handleCellClick={(param, event) => {
        //   event.stopPropagation();
        // }}
        handleRowClick={(param, event) => {
          event.stopPropagation();
        }}
        // getRowId={(rows) => rows.rental_id}
      />
    </>

    // <MaterialTable
    //   title="Basic Validation Preview"
    //   columns={[
    //     {
    //       title: "Name",
    //       field: "name",
    //       validate: (rowData) => rowData.name !== "",
    //     },
    //     {
    //       title: "Surname",
    //       field: "surname",
    //       validate: (rowData) => rowData.surname.length > 3,
    //     },
    //     {
    //       title: "Birth Year",
    //       field: "birthYear",
    //       type: "numeric",
    //       validate: (rowData) => rowData.birthYear > 1900,
    //     },
    //     {
    //       title: "Birth Place",
    //       field: "birthCity",
    //       lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
    //     },
    //   ]}
    //   data={[
    //     { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
    //     {
    //       name: "Zerya Betül",
    //       surname: "Baran",
    //       birthYear: 2017,
    //       birthCity: 34,
    //     },
    //   ]}
    //   editable={{
    //     onRowAdd: (newData) =>
    //       new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //           setData([...data, newData]);
    //           resolve();
    //         }, 1000);
    //       }),
    //     onRowUpdate: (newData, oldData) =>
    //       new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //           const dataUpdate = [...data];
    //           const index = oldData.tableData.id;
    //           dataUpdate[index] = newData;
    //           setData(dataUpdate);

    //           resolve();
    //         }, 1000);
    //       }),
    //   }}
    // />
  );
}

export default withStyles(styleSheet)(RentalReturns);
