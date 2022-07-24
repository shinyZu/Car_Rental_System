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

function Maintenance(props) {
  const { classes } = props;
  const [rowToMaintenance, setRowToMaintenance] = useState({});
  const [table1Rows, setTable1Rows] = useState([]);
  const [table2Rows, setTable2Rows] = useState([]);

  let table1_columns = [
    {
      field: "id",
      headerName: "Actions",
      renderCell: (cellValues) => {
        // console.log(cellValues);
        return (
          <>
            <Tooltip title="Add To Maintenance">
              <IconButton>
                <ConstructionIcon
                  fontSize="large"
                  onClick={() => {
                    console.log("clicked row : " + cellValues.id);
                    handleAddRow(cellValues.row);
                    handleRemoveRow(cellValues.id);
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
      field: "mileage",
      headerName: "Mileage",
      width: 150,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "fleet",
      headerName: "Car Fleet",
      width: 150,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "transmission",
      headerName: "Transmission Type",
      width: 200,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "fuel",
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
      field: "date_added",
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
      renderCell: (row) => {
        // console.log(row);
        return (
          <>
            <Tooltip title="Back To Service">
              <IconButton>
                <RestoreIcon
                  fontSize="large"
                  onClick={() => {
                    console.log("clicked row : " + row.id);
                    console.log(row.row);
                    // setInvoiceDetails(cellValues.row);
                    // setInvoiceIsShown("block");
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
      field: "mileage",
      headerName: "Mileage",
      width: 150,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "fleet",
      headerName: "Car Fleet",
      width: 150,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "transmission",
      headerName: "Transmission Type",
      width: 200,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "fuel",
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
      field: "date_added",
      headerName: "Date Added",
      width: 150,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },
  ];

  useEffect(() => {
    setTable1Rows([
      {
        id: "0",
        reg_no: "GC-5951",
        brand: "Suzuki",
        mileage: "8000",
        fleet: "General",
        transmission: "Manual",
        fuel: "Petrol",
        color: "White",
        date_added: "2022-07-24",
      },

      {
        id: "1",
        reg_no: "PC-5952",
        brand: "Toyota",
        mileage: "7600",
        fleet: "Premium",
        transmission: "Auto",
        fuel: "Petrol",
        color: "Blue",
        date_added: "2022-07-23",
      },
    ]);

    setTable2Rows([
      // {
      //   id: "3",
      //   reg_no: "GC-5951",
      //   brand: "GC-5951",
      //   mileage: "GC-5951",
      //   fleet: "GC-5951",
      //   transmission: "GC-5951",
      //   fuel: "GC-5951",
      //   color: "GC-5951",
      //   date_added: "GC-5951",
      // },
      // {
      //   id: "4",
      //   reg_no: "GC-5951",
      //   brand: "GC-5951",
      //   mileage: "GC-5951",
      //   fleet: "GC-5951",
      //   transmission: "GC-5951",
      //   fuel: "GC-5951",
      //   color: "GC-5951",
      //   date_added: "GC-5951",
      // },
      // {
      //   id: "5",
      //   reg_no: "GC-5951",
      //   brand: "GC-5951",
      //   mileage: "GC-5951",
      //   fleet: "GC-5951",
      //   transmission: "GC-5951",
      //   fuel: "GC-5951",
      //   color: "GC-5951",
      //   date_added: "GC-5951",
      // },
      // {
      //   id: "6",
      //   reg_no: "GC-5951",
      //   brand: "GC-5951",
      //   mileage: "GC-5951",
      //   fleet: "GC-5951",
      //   transmission: "GC-5951",
      //   fuel: "GC-5951",
      //   color: "GC-5951",
      //   date_added: "GC-5951",
      // },
    ]);
  }, []);

  function handleAddRow(row) {
    // console.log(row);
    // console.log(tableRows);
    setTable2Rows((previous) => {
      //   console.log(previous);
      return [...previous, row];
    });
    // console.log(tableRows);
  }

  function handleRemoveRow(index) {
    //need uniqu row ids
    setTable1Rows((previous) => {
      let resultRow = table1Rows.filter((row) => row.id == index);
      console.log(resultRow[0]);
      console.log(index);
      console.log(resultRow[0].id);
      //   table1Rows.splice(index, 1);
      //   if (index == 0) {
      //     return [table1Rows.slice(resultRow.id, 1)];
      //   }
      return [...previous.slice(resultRow.id, 1)];
    });
  }

  return (
    <>
      <AdminNavbar />

      <TableMaintenance
        page="NM"
        pageTitle="Maintenance Details"
        pageSubtitle="You can Search,View, Add or Remove Cars from Maintenance here...."
        tableColumns={table1_columns}
        tableData={table1Rows}
        stickyHeader={true}
      />

      <TableMaintenance
        page="UM"
        pageTitle="Maintenance Details"
        pageSubtitle="You can Search,View, Add or Remove Cars from Maintenance here...."
        tableColumns={table2_columns}
        tableData={table2Rows}
        stickyHeader={true}
      />
    </>
  );
}

export default Maintenance;
