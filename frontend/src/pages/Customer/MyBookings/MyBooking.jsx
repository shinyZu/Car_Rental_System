import React, { useEffect, useState } from "react";
import NavBarRegistered from "../../../components/NavBar/NavBarRegistered";
import MyBookingDetails from "../../../components/TableSearchPage/TableSearchPage";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import FlakyIcon from "@mui/icons-material/Flaky";
import { useAuth } from "../../Session/Auth";
import CustomerService from "../../../services/CustomerService";
import RentalRequestService from "../../../services/RentalRequestService";

function MyBooking(props) {
  const { classes } = props;
  const auth = useAuth();
  const [customerNIC, setCustomerNIC] = useState(null);
  const [tableRows, setTableRows] = useState([]);
  const columns = [
    {
      field: "id",
      headerName: "Actions",
      renderCell: (cellValues) => {
        return (
          <>
            <Tooltip title="Check Status">
              <IconButton>
                <FlakyIcon
                  onClick={() => {
                    console.log("clicked row : " + cellValues.id);
                    console.log(cellValues.id);
                    // checkbookingStatus(tableRows[cellValues.id])
                  }}
                />
              </IconButton>
            </Tooltip>
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
      headerName: "Booking ID",
      width: 130,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "reg_no",
      headerName: "Reg No",
      width: 130,
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
      field: "requestStatus",
      headerName: "Booking Status",
      width: 130,
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
      field: "driverStatus",
      headerName: "Driver Status",
      width: 140,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "driver_contact",
      headerName: "Driver Contact",
      width: 130,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "totalPaymentForRental",
      headerName: "Payment",
      width: 130,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },
  ];

  useEffect(() => {
    getCustomerByEmail(auth.user.email);
    getMyBookings(customerNIC);
  }, [customerNIC]);

  async function getCustomerByEmail(email) {
    let res = await CustomerService.getCustomerByEmail(email);
    if (res.status === 200) {
      setCustomerNIC(res.data.data.nic_no);
      getMyBookings(customerNIC);
    }
  }

  async function getMyBookings(customerNIC) {
    let res = await RentalRequestService.getCustomerBookings(customerNIC);
    if (res.status === 200) {
      if (res.data.data != []) {
        let bookings = res.data.data;
        // console.log(bookings);
        setTableRows(() => {
          return [...res.data.data];
        });
        // console.log(tableRows);
      }
    }
  }

  return (
    <>
      <NavBarRegistered />
      <MyBookingDetails
        page="B"
        pageTitle="My Bookings"
        pageSubtitle="Hope you enjoyed our service.......You can Search and View all your Bookings here......."
        searchbarPlaceholder="Search My Bookings"
        tableColumns={columns}
        tableData={tableRows.map((booking, index) => ({
          id: index,
          rental_id: booking.rental_id,
          reg_no: booking.reg_no,
          brand: booking.brand,
          requestStatus: booking.requestStatus,
          pickUp_date: booking.pickUp_date,
          pickUp_time: booking.pickUp_time,
          pickUp_venue: booking.pickUp_venue,
          return_date: booking.return_date,
          return_time: booking.return_time,
          return_venue: booking.return_venue,
          driverStatus: booking.driverStatus,
          driver_contact: "0" + booking.contact_no,
          totalPaymentForRental: booking.totalPaymentForRental,
        }))}
      />
    </>
  );
}

export default MyBooking;
// export default withStyles(styleSheet)(MyBooking);
