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

function DailyIncomeChart(props) {
  const [year, setYear] = useState("2022");
  const [month, setMonth] = useState("July");
  const [week, setWeek] = useState("1");
  const [day, setDay] = useState("Monday");
  const [income, setIncome] = useState("0");

  let [list, setList] = useState([]);

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
  let dataSource = [
    { day: "Monday", income: 100000 },
    { day: "Tuesday", income: 105000 },
    { day: "Wednesday", income: 500000 },
    { day: "Thursday", income: 309000 },
    { day: "Friday", income: 309440 },
    { day: "Saturday", income: 209000 },
    { day: "Sunday", income: 109000 },
  ];

  // let dataSource = [];

  // {
  //   list.map((bar) => {
  //     dataSource = [{ day: bar.day, income: bar.income }];
  //   });
  // }

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
      <SeriesTemplate nameField="day" forma />
      <Title
        text="Daily Income"
        subtitle={`as of Week 0${week} - ${month} ${year}`}
      />

      <Tooltip enabled={true} />
    </Chart>
    // </>
  );
}

export default DailyIncomeChart;
