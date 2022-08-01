import React, { useEffect, useState } from "react";

import {
  Chart,
  SeriesTemplate,
  CommonSeriesSettings,
  Title,
  Tooltip,
  Format,
  Label,
  Connector,
  Size,
} from "devextreme-react/chart";
import { propsToClassKey } from "@mui/styles";
import IncomeService from "../../../services/IncomeService";

function DailyIncomeChart(props) {
  const [year, setYear] = useState("2022");
  const [month, setMonth] = useState("July");
  const [week, setWeek] = useState("1");
  const [day, setDay] = useState("Monday");
  const [income, setIncome] = useState("0");

  // let dataSource = [
  //   { day: "Monday", income: 100000 },
  //   { day: "Tuesday", income: 105000 },
  //   { day: "Wednesday", income: 500000 },
  //   { day: "Thursday", income: 309000 },
  //   { day: "Friday", income: 309440 },
  //   { day: "Saturday", income: 209000 },
  //   { day: "Sunday", income: 109000 },
  // ];

  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    calculateDailyIncome();
  }, []);

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  async function calculateDailyIncome() {
    let today = formatDate(new Date());
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    setMonth(month);
    setYear(year);
    // let res = await IncomeService.getDailyIncome(today);
    let res = await IncomeService.getDailyIncome("2021-06-27");
    if (res.status === 200) {
      if (res.data.data != null) {
        let incomeData = res.data.data;
        incomeData.map((dailyData, index) => {
          let data = { day: dailyData.day, income: dailyData.income };
          setDataSource((currentDS) => [...currentDS, data]);
          console.log(dailyData);
        });
      }
    }
  }

  return (
    // <>
    <Chart
      id="chart"
      palette="Soft"
      dataSource={dataSource}
      //   size={{ width: "100", height: "400px" }}
    >
      {props.for == "dashboard" ? (
        <Size height={300} width={400} />
      ) : (
        <Size height={300} width={600} />
      )}

      <CommonSeriesSettings
        argumentField="day"
        valueField="income"
        type="bar"
        ignoreEmptyPoints={true}
        barPadding={0.4}
      >
        <Format type="hundreds" />
      </CommonSeriesSettings>
      <SeriesTemplate nameField="day" format />
      <Title
        text="Daily Income"
        subtitle={
          props.page == "Dashboard"
            ? "as of this week"
            : `as of Week 0${week} - ${month} ${year}`
        }
      />

      <Tooltip enabled={true} />
    </Chart>
    // </>
  );
}

export default DailyIncomeChart;

// useEffect(() => {
//   if (props.data.length != 0) {
//     setList(props.data);
//     console.log(props.data);
//     setList(props.data);
//     console.log(list);
//     setDay(list[0].day);
//     setWeek(list[0].week);
//     setMonth(list[0].month);
//     setYear(list[0].year);
//     setIncome(list[0].income);
//   }
// });
// console.log(list);

// let dataSource = [];

// {
//   list.map((bar) => {
//     dataSource = [{ day: bar.day, income: bar.income }];
//   });
// }
