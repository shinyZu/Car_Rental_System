import React, { useEffect } from "react";
import Footer from "../components/Footer/Footer";
import NavbarGuest from "../components/NavBar/NavbarGuest";
import About from "../pages/About/About";
import Garage from "../pages/Garage/Garage";
import CarStatusChart from "../components/Charts/CarStatusChart/CarStatusChart";
import DriverStatusChart from "../components/Charts/DriverStatusChart/DriverStatusChart";
import MonthlyIncomeChart from "../components/Charts/MonthyInomeChart/MonthlyIncomeChart";
import AnnualIncomeChart from "../components/Charts/AnnualIncomeChart/AnnualIncomeChart";
import WeeklyIncomeChart from "../components/Charts/WeeklyIncomeChart/WeeklyIncomeChart";
import DailyIncomeChart from "../components/Charts/DailyIncomeChart/DailyIncomeChart";

function Main(props) {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <div>
      <About />
      <Garage />
      <Footer />
      <CarStatusChart />
      <DriverStatusChart />
      <MonthlyIncomeChart />
      <AnnualIncomeChart />
      <WeeklyIncomeChart />
      <DailyIncomeChart />
    </div>
  );
}

export default Main;
