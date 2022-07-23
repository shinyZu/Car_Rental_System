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

function MonthlyIncomeChart() {
  const [year, setYear] = useState("2021");

  const dataSource = [
    { month: "Jan", income: 100000 },
    { month: "Feb", income: 105000 },
    { month: "Mar", income: 100000 },
    { month: "Apr", income: 210000 },
    { month: "May", income: 309000 },
    { month: "Jun", income: 432000 },
    { month: "Jul", income: 234400 },
    { month: "Aug", income: 543000 },
    { month: "Sep", income: 700234 },
    { month: "Oct", income: 839600 },
    { month: "Nov", income: 754900 },
    { month: "Dec", income: 400800 },
  ];

  return (
    <>
      <Chart id="chart" palette="Soft" dataSource={dataSource}>
        <Size height={300} width={600} />
        <CommonSeriesSettings
          argumentField="month"
          valueField="income"
          type="bar"
          ignoreEmptyPoints={true}
          barPadding={0.4}
        />
        <SeriesTemplate nameField="month" />
        <Title text="Monthly Income" subtitle={`in 'Rs' as of year ${year}`} />
        <Tooltip
          enabled={true}
          //   horizontalAlignment="center"
          //   verticalAlignment="center"
        >
          {/* <Format type="millions" /> */}
        </Tooltip>
      </Chart>
    </>
  );
}

export default MonthlyIncomeChart;
