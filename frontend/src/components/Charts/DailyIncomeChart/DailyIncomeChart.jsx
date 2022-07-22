import React, { useState } from "react";

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

function DailyIncomeChart() {
  const [year, setYear] = useState("2022");
  const [month, setMonth] = useState("July");
  const [week, setWeek] = useState("01");
  const [day, setDay] = useState("Monday");

  const dataSource = [
    { day: "Monday", income: 100000 },
    { day: "Tuesday", income: 105000 },
    { day: "Wednesday", income: 450000 },
    { day: "Thursday", income: 309000 },
    { day: "Friday", income: 309440 },
    { day: "Saturday", income: 209000 },
    { day: "Sunday", income: 109000 },
  ];

  return (
    // <>
    <Chart
      id="chart"
      palette="Soft"
      dataSource={dataSource}
      //   size={{ width: "100", height: "400px" }}
    >
      <Size height={300} width={600} />
      <CommonSeriesSettings
        argumentField="day"
        valueField="income"
        type="bar"
        ignoreEmptyPoints={true}
        barPadding={0.4}
      >
        <Format type="thousands" />
      </CommonSeriesSettings>
      <SeriesTemplate nameField="day" forma />
      <Title
        text="Daily Income"
        subtitle={`as of Week ${week} - ${month} ${year}`}
      />

      <Tooltip enabled={true} />
    </Chart>
    // </>
  );
}

export default DailyIncomeChart;
