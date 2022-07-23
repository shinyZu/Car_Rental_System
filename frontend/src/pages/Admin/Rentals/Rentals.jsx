import React from "react";
import Footer from "../../../components/Footer/Footer";
import AdminNavbar from "../../../components/NavBar/AdminNavbar";
import Rentals from "../../../components/TableSearchPage/TableSearchPage";

const columns = [
  {
    field: "rental_id",
    headerName: "Rental ID",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "reg_no",
    headerName: "Registration No",
    width: 140,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "customer_nic",
    headerName: "Customer NIC",
    width: 140,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "request_status",
    headerName: "Request Status",
    width: 140,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "pickUp_date",
    headerName: "PickUp Date",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "pickUp_time",
    headerName: "PickUp Time",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "pickUp_venue",
    headerName: "PickUp Venue",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "return_date",
    headerName: "Return Date",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "return_time",
    headerName: "Return Time",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "return_venue",
    headerName: "Return Venue",
    width: 130,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "license_no",
    headerName: "Driver License No",
    width: 140,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "km_atPickUp",
    headerName: "KM At PickUp",
    width: 140,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "km_atReturn", // null at first after returned updated
    headerName: "KM At Return",
    width: 140,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "driver_fee", // null at first after returned updated
    headerName: "Driver Fee(Rs)",
    width: 140,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "total_rental", // null at first after returned updated
    headerName: "Rental Payment(Rs)",
    width: 140,
    headerClassName: "header_color",
    headerAlign: "center",
  },
];

const rows = [];

function RentalRequests() {
  return (
    <>
      <AdminNavbar />
      <Rentals
        page="R"
        pageTitle="Rental Requests"
        pageSubtitle="You can Search and View all Rentals here...."
        // searchbarPlaceholder="Search by NIC No"
        // searchbarPlaceholder2="Search by License No"
        // tableWidth_xl={10}
        // tableWidth_lg={10}
        tableColumns={columns}
        tableData={rows}
      />
    </>
  );
}

export default RentalRequests;
