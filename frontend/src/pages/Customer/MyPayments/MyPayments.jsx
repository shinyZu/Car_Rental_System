import React from "react";
import NavBarRegistered from "../../../components/NavBar/NavBarRegistered";
import MyPaymentDetails from "../../../components/TableSearchPage/TableSearchPage";

const columns = [
  {
    field: "rental_id",
    headerName: "Booking ID",
    width: 150,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "reg_no",
    headerName: "Reg No",
    width: 150,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "ldw_fee",
    headerName: "Loss Damage Waiver Fee",
    width: 200,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "rental_fee",
    headerName: "Rental Fee",
    width: 200,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "driver_fee",
    headerName: "Driver Charges",
    width: 150,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "total_rental",
    headerName: "Total Payment",
    width: 200,
    headerClassName: "header_color",
    headerAlign: "center",
  },

  {
    field: "date_paid",
    headerName: "Date of Payment",
    width: 148,
    headerClassName: "header_color",
    headerAlign: "center",
  },
];

const rows = [
  // {
  //   rental_id: "RNTL-0001",
  //   reg_no: "GC-5951",
  //   brand: "Suzuki",
  //   pickUp_date: "2022-07-21",
  //   pickUp_time: "12:00:00",
  //   pickUp_venue: "asas",
  //   return_date: "2022-07-24",
  //   return_time: "assa",
  //   return_venue: "asa",
  //   request_status: "Accepted",
  //   driver_status: "Required",
  //   driver_contact: "0776455451",
  // },
  // {
  //   rental_id: "RNTL-0001",
  //   reg_no: "GC-5951",
  //   brand: "Suzuki",
  //   pickUp_date: "2022-07-21",
  //   pickUp_time: "12:00:00",
  //   pickUp_venue: "asas",
  //   return_date: "2022-07-24",
  //   return_time: "assa",
  //   return_venue: "asa",
  //   request_status: "Accepted",
  //   driver_status: "Required",
  //   driver_contact: "0776455451",
  // },
];

function MyPayments() {
  return (
    <>
      <NavBarRegistered />
      <MyPaymentDetails
        page="P"
        pageTitle="My Payments"
        pageSubtitle="Hope you enjoyed our service.......You can Search and View all your Payments here......."
        searchbarPlaceholder="Search My Payments"
        // tableWidth_xl={7.5}
        // tableWidth_lg={10}
        tableColumns={columns}
        tableData={rows}
      />
    </>
  );
}

export default MyPayments;
