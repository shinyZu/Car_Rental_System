import React, { useState, useEffect } from "react";
import Footer from "../../../components/Footer/Footer";
import AdminNavbar from "../../../components/NavBar/AdminNavbar";
import Rentals from "../../../components/TableSearchPage/TableSearchPage";
import RentalRequestService from "../../../services/RentalRequestService";

function RentalRequests() {
  const [tableRows, setTableRows] = useState([]);

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
        // tableData={rows}
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
      />
    </>
  );
}

export default RentalRequests;

const columns = [
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
    field: "customer_nic",
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

const rows = [];
