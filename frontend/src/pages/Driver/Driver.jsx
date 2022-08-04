import React, { useEffect, useState } from "react";
import { styleSheet } from "./style";
import { withStyles } from "@mui/styles";
import DriverNavbar from "../../components/NavBar/DriverNavbar.jsx";
import DriverSchedules from "../../components/TableSearchPage/TableSearchPage";
import { useAuth } from "../Session/Auth";
import DriverService from "../../services/DriverService";

function DriverSchedule(props) {
  const { classes } = props;
  const auth = useAuth();
  const [license_no, setLicenseNo] = useState("");
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
      field: "brand",
      headerName: "Brand",
      width: 180,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },

    {
      field: "requestStatus",
      headerName: "Rental Status",
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
      width: 135,
      headerClassName: "header_color",
      headerAlign: "center",
      align: "Center",
    },
  ];
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    getDriverByEmail(auth.user.email);
    getMySchedule(license_no);
  }, [license_no]);

  async function getDriverByEmail(email) {
    let res = await DriverService.searchDriverByEmail(email);
    if (res.status === 200) {
      console.log(res.data.data);
      setLicenseNo(res.data.data.license_no);
      getMySchedule(license_no);
    }
  }

  async function getMySchedule(license_no) {
    let res = await DriverService.getWorkSchedule(license_no);
    if (res.status === 200) {
      console.log(res.data.data);
      let schedules = res.data.data;
      console.log(schedules);
      setTableRows(() => {
        return [...res.data.data];
      });
      console.log(tableRows);
    }
  }

  return (
    <>
      <DriverNavbar />
      {/* <Driver /> */}

      <DriverSchedules
        page="DS"
        pageTitle="My Schedule"
        pageSubtitle="You can Search and View all your Schedules here...."
        tableColumns={columns}
        tableData={tableRows.map((schedule, index) => ({
          id: index,
          rental_id: schedule.rental_id,
          license_no: schedule.license_no,
          reg_no: schedule.reg_no,
          brand: schedule.brand,
          requestStatus: schedule.requestStatus,
          pickUp_date: schedule.pickUp_date,
          pickUp_time: schedule.pickUp_time,
          pickUp_venue: schedule.pickUp_venue,
          return_date: schedule.return_date,
          return_time: schedule.return_time,
          return_venue: schedule.return_venue,
          contact_no: "0" + schedule.contact_no,
        }))}
      />
    </>
  );
}

export default withStyles(styleSheet)(DriverSchedule);

const rows = [];
